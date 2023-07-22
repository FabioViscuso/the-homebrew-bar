import Image from "next/image";

import { Cocktail } from "@/lib/types/CocktailObj";

import { Sacramento } from "next/font/google";
const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

export interface CocktailFullCardProps {
  cocktail: Cocktail;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function FullCocktailCard({
  cocktail,
  onClick,
}: CocktailFullCardProps) {
  return (
    <section className=" fixed top-20 bottom-0 left-0 right-0 z-50 bg-black bg-opacity-60 [backdrop-filter:blur(4px)] flex items-center  overflow-y-scroll ">
      <div className=" flex flex-col justify-around items-center w-3/4 mx-auto h-full">
        <h2
          className={`${sacramento.className} hidden lg:block text-6xl neon-blue `}
        >
          {cocktail.strDrink}
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image
            src={cocktail.strDrinkThumb}
            alt={`${cocktail.strDrink}-image`}
            height={200}
            width={200}
            className="hidden lg:block rounded-full"
          />
          <div className="flex flex-col self-start gap-3 border-y-2 lg:border-x-2 lg:border-y-0 border-[#fff] lg:px-6">
            {Object.keys(cocktail).map((key: string) => {
              if (key.startsWith("strIngredient") && cocktail[key]) {
                const ingredientIndex = key.substring(13);
                const measureKey = `strMeasure${ingredientIndex}`;
                const measure = cocktail[measureKey];
                return (
                  <p key={key} className="text-lg lg:text-2xl">
                    {cocktail[key]}
                    {measure ? `: ${measure}` : null}
                  </p>
                );
              }
              return null;
            })}
          </div>
          <p className="w-full lg:w-[clamp(4rem,40vw,30rem)] text-lg lg:text-2xl">
            {cocktail.strInstructions}
          </p>
        </div>
        <button
          className="neon-button-red neon-button-border text-2xl"
          onClick={onClick}
        >
          Close
        </button>
      </div>
    </section>
  );
}
