import { FormEvent, MutableRefObject, useEffect, useRef } from "react";
import useCocktailsStore from "@/store/store";

import { Cocktail } from "@/lib/types/CocktailObj";
import CocktailCard from "../CocktailCard";
import { Poiret_One, Sacramento } from "next/font/google";
const poiret = Poiret_One({ subsets: ["latin"], weight: "400" });
const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

export default function Explore() {
  const inputValueRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const cocktails = useCocktailsStore((state) => state.cocktails);
  const updateCocktails = useCocktailsStore((state) => state.updateCocktails);

  const syncState = (cocktails: []) => {
    localStorage.removeItem("lastSearch");
    localStorage.setItem("lastSearch", JSON.stringify(cocktails));
    updateCocktails(cocktails);
  };

  /* Had to extract this one for use in the useEffect */
  const returnRandomCocktail = async () => {
    const data = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const jsonData = await data.json();
    const incomingRandomCocktail = jsonData.drinks;

    syncState(incomingRandomCocktail);
  };

  const handleRandomValueSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    returnRandomCocktail();
  };

  /* 
  TODO: future development will see this function a bit more generic.
  TODO: as more filters are added, it will decide which endpoint to call with which data
   */
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const value = inputValueRef.current!.value.replaceAll(" ", "+");
    const data = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`
    );
    const jsonData = await data.json();
    const incomingCocktails = jsonData.drinks;

    syncState(incomingCocktails);
  };

  /* To avoid unnecessary calls to the API, on each re-render  */
  useEffect(() => {
    const lastSearch: [] = JSON.parse(
      localStorage.getItem("lastSearch") as string
    );
    if (lastSearch && lastSearch.length > 0) {
      updateCocktails(lastSearch);
    } else {
      returnRandomCocktail();
    }
  }, []);

  return (
    <div
      className={`${sacramento.className} h-full w-full mt-20 pt-10 flex flex-col items-center justify-between gap-5 overflow-x-hidden `}
    >
      <div className="flex items-center gap-24">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            ref={inputValueRef}
            className={`${poiret.className} text-2xl bg-black bg-opacity-40 [backdrop-filter:blur(4px)] text-[#fff] placeholder:text-white rounded-md w-[clamp(3rem,30vw,30rem)] neon-button-border [box-shadow:0px_0px_40px_1px_#888] `}
            type="text"
            placeholder="Type here, try something like 'Mojito'"
          />
          <button type="submit" className="text-6xl neon-button-red ">
            Search
          </button>
        </form>
        <span className="text-5xl">Or</span>
        <button
          onClick={handleRandomValueSubmit}
          role="button"
          className="text-5xl neon-button-red neon-button-border "
        >
          Surprise me!
        </button>
      </div>
      <div className=" my-auto max-w-6xl snap-x snap-mandatory overflow-x-auto flex items-center gap-24 ">
        {cocktails.map((cocktail: Cocktail) => (
          <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
        ))}
      </div>
      <div className=" w-full h-0 border-b-4 border-white [box-shadow:1px_0px_200px_10px_#fff]"></div>
    </div>
  );
}
