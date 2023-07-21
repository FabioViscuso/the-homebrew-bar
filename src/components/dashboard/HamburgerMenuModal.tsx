"use client";

import DashboardLink from "../../components/dashboard/DashboardLink";
import { Views } from "@/lib/types/DashboardViews";

import { Sacramento } from "next/font/google";
const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  viewSelector: (event: React.MouseEvent<HTMLButtonElement>) => void;
  currentView: string;
}

export default function HamburgerMenuModal({
  currentView,
  viewSelector,
  onClick,
}: Props) {
  return (
    <main className=" fixed top-20 bottom-0 left-0 right-0 z-50 bg-black bg-opacity-40 [backdrop-filter:blur(4px)] ">
      <div className={`${sacramento.className} flex flex-col justify-center items-center gap-16 h-full `}>
        <DashboardLink
          id={Views.Explore}
          currentView={currentView}
          onClick={viewSelector}
        >
          Explore
        </DashboardLink>
        <DashboardLink
          id={Views.Favorites}
          currentView={currentView}
          onClick={viewSelector}
        >
          Favorites
        </DashboardLink>
        <DashboardLink
          id={Views.About}
          currentView={currentView}
          onClick={viewSelector}
        >
          About
        </DashboardLink>
      </div>
    </main>
  );
}
