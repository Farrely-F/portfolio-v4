import { CarSvg } from "./car-svg"

/** Reduced-motion stand-in for the 3D world: static car with CSS speed lines. */
export function HeroFallback() {
  return (
    <div aria-hidden className="relative z-0 mx-6 mb-12 hidden h-28 overflow-hidden md:mx-8 motion-reduce:block">
      <span className="speed-line top-[22%]" />
      <span className="speed-line top-[48%] [animation-delay:-0.5s]" />
      <span className="speed-line top-[74%] [animation-delay:-0.9s]" />
      <CarSvg className="relative h-full w-full text-foreground/70" />
    </div>
  )
}
