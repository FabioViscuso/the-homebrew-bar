import Image from "next/image";

import { icons } from "@/lib/iconsImport";
import { Sacramento } from "next/font/google";
const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

export default function About() {
  return (
    <section
      className={` h-full w-full mt-20 pt-10 flex flex-col items-center justify-between overflow-x-hidden `}
    >
      <div className="flex items-center">
        <div
          className={
            " relative hidden lg:flex items-start justify-center grow-0 shrink-0 basis-full lg:basis-0 mx-auto w-full "
          }
        >
          <h1
            className={` ${sacramento.className} [font-size:clamp(4.5rem,10vmax,10rem)] neon neon-flicker neon-blue leading-tight `}
          >
            The<br></br> Homebrew<br></br> Bar
          </h1>
          <Image
            src={icons.cocktailIcon}
            width={128}
            height={128}
            alt=""
            className={
              " w-[clamp(3rem,10vmax,9rem)] hero-cocktail neon-icon-flicker md:top-22 lg:top-10 xl:top-14 xl:left-[15rem] "
            }
          />
          <p
            className={`${sacramento.className} hero-sign [font-size:clamp(1rem,2vmin+1rem,5rem)] neon-button-border neon-button-pink neon-icon-flicker bottom-60 md:bottom-22 lg:-bottom-10 xl:bottom-14 right-10 md:right-32 lg:-right-2 `}
          >
            Always open
          </p>
        </div>
        <div
          id="part-2"
          className={
            " snap-start shrink-0 grow-0 basis-full lg:basis-[35vw] w-full [text-shadow:0px_0px_2px_#fff] py-8 px-8 flex flex-col "
          }
        >
          <p className=" text-2xl md:text-4xl lg:text-2xl xl:text-3xl text-center lg:text-left ">
            Made with 🍸 by Fabio Viscuso, mostly while sober.
          </p>
          <p className="  mt-6 text-2xl md:text-4xl lg:text-2xl xl:text-3xl text-center lg:text-left ">
            Stack used for this project:
          </p>
          <div className="flex flex-wrap gap-5">
            <Image
              src={icons.next}
              alt={`next-icon`}
              className="w-16 h-16 [filter:drop-shadow(0px_0px_4px_#fff)]"
            />
            <Image
              src={icons.react}
              alt={`react-icon`}
              className="w-16 h-16 [filter:drop-shadow(0px_0px_4px_#fff)]"
            />
            <Image
              src={icons.typescript}
              alt={`typescript-icon`}
              className="w-16 h-16  [filter:drop-shadow(0px_0px_4px_#fff)]"
            />
            <Image
              src={icons.tailwindCSS}
              alt={`tailwind-icon`}
              className="w-16 h-16 [filter:drop-shadow(0px_0px_4px_#fff)]"
            />
            <Image
              src={icons.zustand}
              alt={`zustand-icon`}
              className="w-16 h-16  [filter:drop-shadow(0px_0px_4px_#fff)] object-cover"
            />
          </div>
          <p className=" mt-6 text-2xl md:text-4xl lg:text-2xl xl:text-3xl text-center lg:text-left ">
            Want to take a peek at the code?{" "}
            <a
              href="https://github.com/FabioViscuso/the-homebrew-bar"
              target="_blank"
              className="neon-button-red"
            >
              Look here
            </a>
          </p>
        </div>
      </div>
      <div className=" w-full h-0 border-b-4 border-white [box-shadow:1px_0px_200px_10px_#fff]"></div>
    </section>
  );
}
