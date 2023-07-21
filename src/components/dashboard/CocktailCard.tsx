import { useEffect, useState } from "react";
import Image from "next/image";

import { Poiret_One } from "next/font/google";
const poiret = Poiret_One({ subsets: ["latin"], weight: "400" });

export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  [key: string]: string;
}

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
    <div className={`${poiret.className} flex `}>
      <Image
        src={cocktail.strDrinkThumb}
        alt={`picture of ${cocktail.strDrink}`}
        width={100}
        height={100}
        className=" w-14 h-14 rounded-l-md"
      />
    <div>
      <p className="text-lg">{cocktail.strDrink}</p>
      <div>
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

      <p className="text-lg">
        {cocktail.strInstructions}
      <button role="button" /*  onClick={HANDLERHERE} */>&nbsp; See more</button>
    </p>

      {isFavorite ? (
        <button role="button" /* onClick={handleRemoveFromFavorites} */>
          Remove from collection
        </button>
      ) : (
        <button role="button" onClick={handleSaveToFavorites}>
          Save to collection
        </button>
      )}

    </div>
    </div>
  );
}

export default CocktailCard;
