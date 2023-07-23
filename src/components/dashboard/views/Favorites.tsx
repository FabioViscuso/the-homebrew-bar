import { useEffect } from "react";
import CardScroller from "../CardScroller";

import { Cocktail } from "@/lib/types/CocktailObj";

import { Sacramento } from "next/font/google";
import useCocktailsStore from "@/store/store";
const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

export default function Favorites() {
  const addToFavs = useCocktailsStore(state => state.addToFavorites)
  const removeAllFavs = useCocktailsStore(state => state.clearAllFavorites)
  const favCocktails = useCocktailsStore(state => state.favoriteCocktails);
  
  const handleFavoritesCleanup = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    localStorage.setItem("favorites", JSON.stringify([]));
    removeAllFavs();
  };

  const locals: Cocktail[] = JSON.parse(localStorage.getItem('favorites') as string)
  useEffect(() => {
    locals.forEach((cocktail) => addToFavs(cocktail))
  }, []);

  return (
    <section
      className={`${sacramento.className} h-full w-full mt-20 pt-10 flex flex-col items-center justify-between gap-5 overflow-x-hidden `}
    >
      {locals && locals.length > 0 && (
        <button
          role="button"
          onClick={handleFavoritesCleanup}
          className=" text-2xl md:text4xl lg:text-6xl neon-button-red neon-button-border "
        >
          Clear Favorites
        </button>
      )}
      {locals && locals.length > 0 ? (
        <CardScroller cocktails={locals} />
      ) : (
        <h2 className={` text-3xl md:text-4xl lg:text-6xl neon-blue `}>
          No favorites! Explore some more
        </h2>
      )}
      <div className=" w-full h-0 border-b-4 border-white [box-shadow:1px_0px_200px_10px_#fff]"></div>
    </section>
  );
}
