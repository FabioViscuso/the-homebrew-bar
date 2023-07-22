import { useEffect, useState } from "react";
import Image from "next/image";

import { Poiret_One } from "next/font/google";
import { Cocktail } from "@/lib/types/CocktailObj";
const poiret = Poiret_One({ subsets: ["latin"], weight: "400" });

export interface CocktailCardProps {
  cocktail: Cocktail;
}

export function CocktailCard({ cocktail }: CocktailCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSaveToFavorites = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    let actualFavorites: Cocktail[] = JSON.parse(
      localStorage.getItem("favorites") as string
    );

    if (!actualFavorites) {
      actualFavorites = [];
    }
    const hasMatch = actualFavorites.some(
      (item: Cocktail) => item.idDrink === cocktail.idDrink
    );
    if (!hasMatch) {
      actualFavorites.push(cocktail);
      localStorage.setItem("favorites", JSON.stringify(actualFavorites));
      setIsFavorite(true);
    }
  };

  /* 
    TODO: need to implement a handeRemoveFromFavorites function ASAP 
  */

  useEffect(() => {
    const hasMatch = (
      JSON.parse(localStorage.getItem("favorites") as string) as []
    )?.some((item: Cocktail) => item.idDrink === cocktail.idDrink);
    if (hasMatch) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [isFavorite]);

  return (
    <div className={`${poiret.className} cocktail-card bg-black bg-opacity-70 [backdrop-filter:blur(4px)] rounded-r-md `}>
      <Image
        src={cocktail.strDrinkThumb}
        alt={`picture of ${cocktail.strDrink}`}
        width={200}
        height={200}
        className="image w-full h-full rounded-l-md object-cover"
      />
      <div className="ingredients">
        <p className="text-2xl text-[#00f0ff] mb-2">{cocktail.strDrink}</p>
        {Object.keys(cocktail).map((key: string) => {
          if (key.startsWith("strIngredient") && cocktail[key]) {
            const ingredientIndex = key.substring(13);
            const measureKey = `strMeasure${ingredientIndex}`;
            const measure = cocktail[measureKey];
            return (
              <p key={key}>
                {cocktail[key]}
                {measure ? `: ${measure}` : null}
              </p>
            );
          }
          return null;
        })}
      </div>

      <p className="instructions text-lg">
        {cocktail.strInstructions.length < 120
          ? cocktail.strInstructions
          : cocktail.strInstructions.slice(0, 120) + '...'}
        {cocktail.strInstructions.length >= 150 && 
        <button role="button" className=" text-[#00f0ff] " /*  onClick={HANDLERHERE} */>
          &nbsp;See more
        </button>}
      </p>

      {isFavorite ? (
        <button
          role="button"
          className="favorites-button text-xl text-[#ff0000] [border-top:1px_solid_#fff] bg-red-600 bg-opacity-10" /* onClick={handleRemoveFromFavorites} */
        >
          Remove from favorites
        </button>
      ) : (
        <button
          role="button"
          className="favorites-button text-xl text-[#00f0ff] [border-top:1px_solid_#fff] bg-teal-500 bg-opacity-10"
          onClick={handleSaveToFavorites}
        >
          Save to favorites
        </button>
      )}
    </div>
  );
}

export default CocktailCard;
