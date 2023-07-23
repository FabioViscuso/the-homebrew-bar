import { useEffect } from "react";
import useCocktailsStore from "@/store/store";

import CardScroller from "../CardScroller";
import InputGroup from "../InputGroup";

import { returnRandomCocktail } from "@/lib/utils/returnRandCocktail";
import { saveToLocal } from "@/lib/utils/saveToLocal";

import { Sacramento } from "next/font/google";
import { Cocktail } from "@/lib/types/CocktailObj";
const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

export default function Explore() {
  const cocktails = useCocktailsStore((state) => state.cocktails);
  const updateCocktails = useCocktailsStore((state) => state.updateCocktails);

  /* To avoid unnecessary calls to the API, on each re-render  */
  useEffect(() => {
    async function firstRetrieve () {
      const incomingRandomCocktail: Cocktail[] = await returnRandomCocktail();
      saveToLocal(incomingRandomCocktail)
      updateCocktails(incomingRandomCocktail)
    }
    const lastSearch: [] = JSON.parse(
      localStorage.getItem("lastSearch") as string
    );
    if (lastSearch && lastSearch.length > 0) {
      updateCocktails(lastSearch);
    } else {
      firstRetrieve()
    }
  }, [updateCocktails]);

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
