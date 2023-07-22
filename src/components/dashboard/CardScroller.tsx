import { Cocktail } from "@/lib/types/CocktailObj";
import CocktailCard from "./CocktailCard";

export default function CardScroller({ cocktails }: { cocktails: Cocktail[] }) {
  return (
    <div className=" my-auto max-w-6xl snap-x snap-mandatory overflow-x-auto flex items-center gap-24 ">
      {cocktails.map((cocktail: Cocktail) => (
        <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
      ))}
    </div>
  );
}
