import { Poiret_One, Sacramento } from "next/font/google";
import Image from "next/image";
import { icons } from "@/lib/iconsImport";

const poiret = Poiret_One({ subsets: ["latin"], weight: "400" });
const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

export default function Landing() {
  return (
    <main
      className={` flex min-h-screen flex-row items-center justify-between `}
    >
      <div className={"h-full w-full flex items-center justify-center "}>
        <h1
          className={` relative ${sacramento.className} [font-size:clamp(3rem,10vmax,10rem)] neon neon-flicker neon-blue leading-tight `}
        >
          The<br></br> Homebrew<br></br> Bar
          <Image
            src={icons.cocktailIcon}
            width={128}
            height={128}
            alt=""
            className={" w-[clamp(3rem,10vmax,9rem)] hero-cocktail neon-icon-flicker "}
          />
        </h1>
      </div>
      <div className={" shrink-0 basis-[35vw] h-[100svh] bg-cocktail "}>
        <div className="bg-overlay p-6 [text-shadow:0px_0px_2px_#fff] ">
          <p className=" text-3xl ">
            Expecting guests? Want to impress friends or surprise your significant
            other for a special occasion? Or, why not dedicate a moment just for
            yourself?
          </p>
          <p className=" mt-6 text-3xl ">
            Embark on a journey to become an experienced barman, and unlock the secrets of cocktail making, in the comfort of your home or on the go.
          </p>
          <p className=" mt-6 text-3xl ">And the best thing: it’s free!</p>
        </div>
        </div>
    </main>
  );
}
