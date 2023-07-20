import { Poiret_One, Sacramento } from "next/font/google";
import Image from "next/image";
import { icons } from "@/lib/iconsImport";
import Link from "next/link";

const poiret = Poiret_One({ subsets: ["latin"], weight: "400" });
const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

export default function Landing() {
  return (
    <main
      className={` bg-wall overflow-y-scroll snap-y snap-mandatory flex h-screen flex-col lg:flex-row items-center justify-between select-none `}
    >
      <div
        className={
          " relative snap-start grow-0 shrink-0 basis-full mx-auto lg:basis-0 h-[100svh] w-full flex items-center justify-center "
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
            " w-[clamp(3rem,10vmax,9rem)] hero-cocktail neon-icon-flicker top-60 lg:top-48 xl:top-32 xl:left-64 "
          }
        />
        <p
          className={`${sacramento.className} hero-sign [font-size:clamp(1rem,2vmin+1rem,5rem)] neon-button-border neon-button-pink neon-icon-flicker bottom-44 md:bottom-22 lg:bottom-18 xl:bottom-24 right-10 md:right-32 lg:-right-12 `}
        >
          Always open
        </p>
      </div>
      <div
        className={
          " snap-start shrink-0 grow-0 basis-full lg:basis-[35vw] h-[100svh] w-full [text-shadow:0px_0px_2px_#fff] py-8 px-8 bg-black bg-opacity-20 [backdrop-filter:blur(2px)] flex flex-col "
        }
      >
        <p className=" text-2xl md:text-3xl lg:text-2xl xl:text-3xl ">
          Expecting guests? Want to impress friends or surprise your significant
          other for a special occasion? Or, why not dedicate a moment just for
          yourself?
        </p>
        <p className="  mt-6 text-2xl md:text-3xl lg:text-2xl xl:text-3xl ">
          Embark on a journey to become an experienced barman, and unlock the
          secrets of cocktail making, in the comfort of your home or on the go.
        </p>
        <p className=" mt-6 text-2xl md:text-3xl lg:text-2xl xl:text-3xl ">
          Discover new recipes, save them for later, get inspired. For free!
        </p>
        <Link href={'/dashboard'} className={`${sacramento.className} text-center text-3xl md:text-5xl lg:text-4xl xl:text-6xl mt-auto neon-button-border neon-button-red `}>
          Let's start mixing!
        </Link>
      </div>
    </main>
  );
}
