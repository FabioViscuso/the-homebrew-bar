import { useEffect } from "react";
import useCocktailsStore from "@/store/store";

import CardScroller from "../CardScroller";
import InputGroup from "../InputGroup";

import { Sacramento } from "next/font/google";
const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

export default function Explore() {
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
    <section
      className={`${sacramento.className} h-full w-full mt-20 flex flex-col items-center justify-between gap-5 overflow-x-hidden `}
    >
      <InputGroup />
      <CardScroller cocktails={cocktails} />
      <div className=" w-full h-0 border-b-4 border-white [box-shadow:1px_0px_200px_10px_#fff]"></div>
    </section>
  );
}
