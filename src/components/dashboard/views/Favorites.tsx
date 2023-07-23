import { use, useEffect, useState } from "react";
import CardScroller from "../CardScroller";
import useCocktailsStore from "@/store/store";

import { Cocktail } from "@/lib/types/CocktailObj";

import { Poiret_One, Sacramento } from "next/font/google";
const poiret = Poiret_One({ subsets: ["latin"], weight: "400" });
const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

export default function Favorites() {
  const [searchString, setSearchString] = useState("");
  const favs = useCocktailsStore(e => e.favoriteCocktails)
  const addToFavs = useCocktailsStore((state) => state.addToFavorites);
  const removeAllFavs = useCocktailsStore((state) => state.clearAllFavorites);

  const handleFavoritesCleanup = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    localStorage.removeItem("favorites");
    removeAllFavs();
  };

  let localFavorites: Cocktail[] = favs || JSON.parse(
    localStorage.getItem("favorites") as string
  ) || [];
  const filteredLocalFavorites = localFavorites?.filter((cocktail) =>
    cocktail.strDrink.toLowerCase().includes(searchString.toLowerCase())
  );

  useEffect(() => {
    console.log(localFavorites)
    if (localFavorites.length === 0) {
      localFavorites.forEach((cocktail) => addToFavs(cocktail));
    }
  }, [addToFavs,]);

  return (
    <section
      className={`${sacramento.className} h-full w-full mt-20 pt-10 flex flex-col items-center justify-between gap-5 overflow-x-hidden `}
    >
      {localFavorites && localFavorites.length > 0 && (
        <div className="flex gap-10">
          <input
            type="text"
            placeholder="Nice list! Search from your favorites"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            className={`${poiret.className} text-lg lg:text-2xl bg-black bg-opacity-40 [backdrop-filter:blur(4px)] text-[#fff] placeholder:text-white rounded-md lg:w-[clamp(5rem,30vmax,30rem)] neon-button-border [box-shadow:0px_0px_40px_1px_#888] `}
          />
          <button
            role="button"
            onClick={handleFavoritesCleanup}
            className=" text-2xl md:text4xl lg:text-4xl neon-button-red neon-button-border "
          >
            Clear Favorites
          </button>
        </div>
      )}
      {localFavorites &&
        localFavorites.length > 0 &&
        searchString.length === 0 && (
          <CardScroller cocktails={localFavorites} />
        )}
      {filteredLocalFavorites &&
        filteredLocalFavorites.length > 0 &&
        searchString.length > 0 && (
          <CardScroller cocktails={filteredLocalFavorites} />
        )}
      {localFavorites.length === 0 && (
        <h2 className="text-6xl neon-red">No Favorites</h2>
      )}
      {filteredLocalFavorites.length === 0 && searchString.length > 0 && (
        <h2 className="text-6xl neon-red">No Match</h2>
      )}
      <div className=" w-full h-0 border-b-4 border-white [box-shadow:1px_0px_200px_10px_#fff]"></div>
    </section>
  );
}
