"use client";

export default function Scroller() {
  const handleScroll = (event: React.MouseEvent<HTMLParagraphElement>) => {
    const partTwo = document.querySelector("#part-2");
    partTwo?.scrollIntoView({behavior: 'smooth'});
  };
  return (
    <p
      onClick={handleScroll}
      className={`text-3xl [text-shadow:0px_0px_3px_#fff] p-6 pt-2 absolute flex gap-5 items-baseline flex-nowrap whitespace-nowrap lg:hidden bottom-10 left-1/2 -translate-x-1/2 `}
    >
      Tap/Scroll for more
      <span
        className={
          " inline-block w-2 h-2 bg-white rounded-full [box-shadow:0px_0px_10px_4px_#fff] ring-offset-0 bounce "
        }
      ></span>
    </p>
  );
}
