import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import { Cocktail } from "@/lib/types/CocktailObj";

import FullCocktailCard from "./FullCocktailCard";

import { Poiret_One } from "next/font/google";
const poiret = Poiret_One({ subsets: ["latin"], weight: "400" });

export interface CocktailCardProps {
  cocktail: Cocktail;
}

export default function CocktailCard({ cocktail }: CocktailCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFullCardOpen, setIsFullCardOpen] = useState(false);

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
    return;
  };

  const handleRemoveFromFavorites = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    let actualFavorites: Cocktail[] = JSON.parse(
      localStorage.getItem("favorites") as string
    );

    const idToRemove = event.currentTarget.id;
    const index = actualFavorites.findIndex(
      (cocktail) => cocktail.idDrink === idToRemove
    );
    actualFavorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(actualFavorites));

    setIsFavorite(false);
    return;
  };

  const handleFullCardToggle = () => {
    setIsFullCardOpen(!isFullCardOpen);
  };

  useEffect(() => {
    const hasMatch = (
      JSON.parse(localStorage.getItem("favorites") as string) as []
    )?.some((item: Cocktail) => item.idDrink === cocktail.idDrink);
    if (hasMatch) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [cocktail.idDrink]);

  /* 
  TODO: Fuse the two different cards into one adaptable component
*/
  return (
    <>
      {/* DESKTOP CARD */}
      <div
        className={`${poiret.className} hidden lg:flex lg:cocktail-card grow-0 shrink-0 bg-black bg-opacity-70 [backdrop-filter:blur(4px)] rounded-md select-none `}
      >
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
            : cocktail.strInstructions.slice(0, 120) + "..."}
          {cocktail.strInstructions.length >= 120 && (
            <button
              role="button"
              className=" text-[#00f0ff] "
              onClick={handleFullCardToggle}
            >
              &nbsp;See more
            </button>
          )}
        </p>

        {isFavorite ? (
          <button
            id={cocktail.idDrink}
            role="button"
            className="favorites-button text-xl text-[#ff0000] [border-top:1px_solid_#fff] bg-red-600 bg-opacity-10"
            onClick={handleRemoveFromFavorites}
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
        {isFullCardOpen &&
          createPortal(
            <FullCocktailCard
              cocktail={cocktail}
              onClick={handleFullCardToggle}
            />,
            document.querySelector("#application")!
          )}
      </div>

      {/* MOBILE CARD */}
      <div
        className={`${poiret.className} flex flex-col lg:hidden grow-0 shrink-0 w-8/12 h-full bg-black bg-opacity-70 [backdrop-filter:blur(4px)] rounded-md `}
      >
        <p className="text-2xl text-[#00f0ff] mb-2 p-2">{cocktail.strDrink}</p>

        <div className="flex flex-col flex-1 p-2 max-h-24 overflow-y-auto ">
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

        <p className="text-lg flex-1 p-2 border-t border-[#fff]">
          {cocktail.strInstructions.length < 120
            ? cocktail.strInstructions
            : cocktail.strInstructions.slice(0, 120) + "..."}
          {cocktail.strInstructions.length >= 120 && (
            <button
              role="button"
              className=" text-[#00f0ff] "
              onClick={handleFullCardToggle}
            >
              &nbsp;See more
            </button>
          )}
        </p>

        {isFavorite ? (
          <button
            id={cocktail.idDrink}
            role="button"
            className="favorites-button text-xl text-[#ff0000] [border-top:1px_solid_#fff] bg-red-600 bg-opacity-10"
            onClick={handleRemoveFromFavorites}
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
        {isFullCardOpen &&
          createPortal(
            <FullCocktailCard
              cocktail={cocktail}
              onClick={handleFullCardToggle}
            />,
            document.querySelector("#application")!
          )}
      </div>
    </>
  );
}
