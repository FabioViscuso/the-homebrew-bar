import useCocktailsStore from "@/store/store";
import { FormEvent, MutableRefObject, useRef } from "react";

import { returnRandomCocktail } from "@/lib/utils/returnRandCocktail";
import { saveToLocal } from "@/lib/utils/saveToLocal";

import { Poiret_One } from "next/font/google";
const poiret = Poiret_One({ subsets: ["latin"], weight: "400" });

export default function InputGroup() {
  const inputValueRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const updateCocktails = useCocktailsStore((state) => state.updateCocktails);

  const handleRandomValueSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    const incomingRandomCocktail = await returnRandomCocktail()
    saveToLocal(incomingRandomCocktail);
    updateCocktails(incomingRandomCocktail)
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

    saveToLocal(incomingCocktails);
    updateCocktails(incomingCocktails)
  };

  return (
    <div
      id="explore-input-group"
      className=" pt-10 w-screen lg:w-full overflow-x-scroll snap-x snap-mandatory lg:overflow-hidden flex flex-row flex-nowrap lg:justify-center items-center gap-6 md:gap-12 lg:gap-24 "
    >
      <div className=" w-screen lg:w-auto snap-start grow-0 shrink-0 flex items-center gap-6 md:gap-12 lg:gap-24 px-12 pb-10 lg:px-0 lg:pb-0 ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full ">
          <input
            ref={inputValueRef}
            className={`${poiret.className} text-lg lg:text-2xl bg-black bg-opacity-40 [backdrop-filter:blur(4px)] text-[#fff] placeholder:text-white rounded-md lg:w-[clamp(5rem,30vmax,30rem)] neon-button-border [box-shadow:0px_0px_40px_1px_#888] `}
            type="text"
            placeholder="Type here, try 'Mojito'"
          />
          <button
            type="submit"
            className=" text-4xl lg:text-6xl neon-button-red "
          >
            Search
          </button>
        </form>

        <span className=" text-5xl hidden lg:block ">Or</span>
        <p className=" text-4xl flex lg:hidden flex-col items-center [text-shadow:0px_0px_2px_#fff] ">
          Or <span className=" [text-shadow:0px_0px_4px_#fff] ">⇨</span>
        </p>
      </div>

      <div className=" w-screen lg:w-auto snap-start grow-0 shrink-0 flex justify-center items-center ">
        <button
          onClick={handleRandomValueSubmit}
          role="button"
          className=" text-5xl lg:text-6xl neon-button-red neon-button-border "
        >
          Surprise me!
        </button>
      </div>
    </div>
  );
}
