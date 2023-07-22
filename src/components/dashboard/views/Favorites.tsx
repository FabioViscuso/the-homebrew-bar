import { useEffect, useState } from "react";
import CardScroller from "../CardScroller";

import { Cocktail } from "@/lib/types/CocktailObj";

import { Sacramento } from "next/font/google";
const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

export default function Favorites() {
  const [favorites, setFavorites] = useState([] as Cocktail[]);

  const handleFavoritesCleanup = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    localStorage.setItem("favorites", JSON.stringify([]));
    setFavorites([]);
  };

  useEffect(() => {
    const localFavorites: Cocktail[] = JSON.parse(
      localStorage.getItem("favorites") as string
    );
    if (localFavorites) {
      setFavorites(localFavorites);
    }
  }, [favorites]);

  return (
    <section
      className={`${sacramento.className} h-full w-full mt-20 pt-10 flex flex-col items-center justify-between gap-5 overflow-x-hidden `}
    >
      {favorites && favorites.length > 0 
      ? <CardScroller cocktails={favorites} /> 
      : <h2 className={` text-3xl md:text-4xl lg:text-6xl neon-blue `}>No favorites! Explore some more</h2>}
      <button
        role="button"
        onClick={handleFavoritesCleanup}
        className=" text-2xl md:text4xl lg:text-6xl neon-button-red neon-button-border "
      >
        Clear Favorites
      </button>
      <div className=" w-full h-0 border-b-4 border-white [box-shadow:1px_0px_200px_10px_#fff]"></div>
    </section>
  );
}
