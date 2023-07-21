"use client";

import { useState } from "react";
import DashboardLink from "../../components/dashboard/DashboardLink";
import Explore from "../../components/dashboard/views/Explore";
import Favorites from "../../components/dashboard/views/Favorites";
import About from "../../components/dashboard/views/About";

enum Views {
  Explore = "explore",
  Favorites = "favorites",
  About = "about"
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
      <nav className="fixed top-0 left-0 right-0 flex justify-start items-center gap-20 border-b">
        <DashboardLink
          id={Views.Explore}
          isActive={currentView}
          onClick={viewSelector}
        >
          Explore
        </DashboardLink>
        <DashboardLink id={Views.Favorites} isActive={currentView} onClick={viewSelector}>
          Favorites
        </DashboardLink>
        <DashboardLink id={Views.About} isActive={currentView} onClick={viewSelector}>
          About
        </DashboardLink>
      </nav>
      {currentView === Views.Explore && <Explore />}
      {currentView === Views.Favorites && <Favorites />}
      {currentView === Views.About && <About />}
    </main>
  );
}
