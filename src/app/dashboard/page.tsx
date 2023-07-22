"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import DashboardLink from "@/components/dashboard/DashboardLink";
import Explore from "@/components/dashboard/views/Explore";
import Favorites from "@/components/dashboard/views/Favorites";
import About from "@/components/dashboard/views/About";
import HamburgerMenuModal from "@/components/dashboard/HamburgerMenuModal";
import { Views } from "@/lib/types/DashboardViews";

import { icons } from "@/lib/iconsImport";
import { Sacramento } from "next/font/google";
const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

export default function Landing() {
  const [currentView, setCurrentView] = useState<Views>(Views.Explore);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  const viewSelector = (event: React.MouseEvent<HTMLButtonElement>) => {
    const ID = (event.target as HTMLButtonElement).id;
    /* Since I'm passing Views values to the buttons as IDs, this is relatively safe */
    setCurrentView(ID as Views);
    if (isHamburgerMenuOpen) {
      setIsHamburgerMenuOpen(false)
    }
  };

  const handleHamburgerMenuToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen)
  };

  return (
    <main id="application" className=" bg-wall flex h-[100svh] flex-col items-center justify-between">
      <nav className={`${sacramento.className} fixed top-0 left-0 right-0 h-20 px-6 flex justify-between items-center border-b-4 [box-shadow:0px_0px_200px_1px_#aaa] bg-black bg-opacity-40 [backdrop-filter:blur(4px)] select-none `}>
        <div className="flex gap-2 md:gap-5 items-center ">
            <h1 className={`${sacramento.className} text-xl md:text-3xl lg:text-4xl neon-blue mt-2 `}>The Homebrew Bar</h1>
            <Image src={icons.cocktailIcon} alt="" width={128} className=" w-6 md:w-10 lg:w-12 neon-button-pink " />
        </div>
        <div className=" hidden lg:flex gap-16">
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
        <div className="block lg:hidden">
          <button role="hamburger menu open"
          className={`text-4xl neon-button-red`}
          onClick={handleHamburgerMenuToggle}>{isHamburgerMenuOpen ? 'Close' : 'Menu'}</button>
          {isHamburgerMenuOpen &&
            createPortal(
            <HamburgerMenuModal onClick={handleHamburgerMenuToggle} viewSelector={viewSelector} currentView={currentView} />,
            document.querySelector('#application')!
          )}
        </div>
      </nav>
      {currentView === Views.Explore && <Explore />}
      {currentView === Views.Favorites && <Favorites />}
      {currentView === Views.About && <About />}
    </main>
  );
}
