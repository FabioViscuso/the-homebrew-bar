"use client";

import { Cocktail } from "@/lib/types/CocktailObj";
import CocktailCard from "./CocktailCard";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function CardScroller({ cocktails }: { cocktails: Cocktail[] }) {
  const divRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(divRef);

  return (
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
  );
}
