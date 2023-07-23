"use client";

import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import CocktailCard from "./CocktailCard";
import { Cocktail } from "@/lib/types/CocktailObj";

import { Poiret_One } from "next/font/google";
const poiret = Poiret_One({ subsets: ["latin"], weight: "400" });

export default function CardScroller({ cocktails }: { cocktails: Cocktail[] }) {
  const divRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(divRef);

  return (
    <div>
      <p className={`${poiret.className} text-lg ml-1 mb-2`}>
          Drag around to scroll
      </p>
      <div
        id="card-scroller"
        className=" flex items-center gap-24 my-auto w-screen md:max-w-[85vw] overflow-x-scroll "
        {...events}
        ref={divRef}
      >
        {cocktails.map((cocktail: Cocktail) => (
          <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
        ))}
      </div>
    </div>
  );
}
