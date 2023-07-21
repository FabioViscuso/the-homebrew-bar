"use client";

import { useState } from "react";
import Image from "next/image";
import { icons } from "@/lib/iconsImport";
import DashboardLink from "../../components/dashboard/DashboardLink";
import Explore from "../../components/dashboard/views/Explore";
import Favorites from "../../components/dashboard/views/Favorites";
import About from "../../components/dashboard/views/About";

import { Poiret_One, Sacramento } from "next/font/google";
const poiret = Poiret_One({ subsets: ["latin"], weight: "400" });
const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

enum Views {
  Explore = "explore",
  Favorites = "favorites",
  About = "about",
}

export default function Landing() {
  const [currentView, setCurrentView] = useState<Views>(Views.Explore);

  const viewSelector = (event: React.MouseEvent<HTMLButtonElement>) => {
    const ID = (event.target as HTMLButtonElement).id;
    /* Since I'm passing Views values to the buttons as IDs, this is relatively safe */
    setCurrentView(ID as Views);
  };

  return (
    <main className=" bg-wall flex min-h-screen flex-col items-center justify-between p-24 ">
      <nav className={`${sacramento.className} fixed top-0 left-0 right-0 py-3 px-6 flex justify-between items-center border-b`}>
        <div className="flex gap-5 items-center ">
            <h1 className={`${sacramento.className} text-4xl neon-blue mt-2 `}>The Homebrew Bar</h1>
            <Image src={icons.cocktailIcon} alt="" width={128} className=" w-12 neon-button-pink " />
        </div>
        <div className=" hidden md:flex gap-16">
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
        <div className="block md:hidden">
          <p>Hamburger placeholder</p>
        </div>
      </nav>
      {currentView === Views.Explore && <Explore />}
      {currentView === Views.Favorites && <Favorites />}
      {currentView === Views.About && <About />}
    </main>
  );
}
