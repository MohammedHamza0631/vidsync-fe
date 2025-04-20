import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, ArrowRight } from "lucide-react"

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "gray",
  darkLineColor = "gray",
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`
      )}
      style={gridStyles}>
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent to-90% dark:from-zinc-950" />
    </div>
  );
}

const HeroSection = React.forwardRef((
  {
    className,
    title = "Build products for everyone",
    subtitle = {
      regular: "Designing your projects faster with ",
      gradient: "the largest figma UI kit.",
    },
    description = "Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
    ctaText = "Browse courses",
    ctaHref = "#",
    secondaryCtaText,
    secondaryCtaHref,
    bottomImage = {
      light: "https://images.unsplash.com/photo-1714978444538-9097293e5b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVsdGlwbGUlMjBwZW9wbGUlMjB3YXRjaGluZyUyMHZpZGVvfGVufDB8fDB8fHww",
      dark: "https://images.unsplash.com/photo-1714978444538-9097293e5b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVsdGlwbGUlMjBwZW9wbGUlMjB3YXRjaGluZyUyMHZpZGVvfGVufDB8fDB8fHww",
    },
    gridOptions,
    ...props
  },
  ref,
) => {
  return (
    <div className={cn("relative min-h-screen flex flex-col justify-center items-center -mt-24 pt-24", className)} ref={ref} {...props}>
      <div className="absolute top-0 inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,#1b103f_0%,#0f172a_100%)] opacity-90" />
      
      <section className="relative max-w-full mx-auto z-1 min-h-screen flex flex-col justify-center">
        <RetroGrid {...gridOptions} />
        <div className="max-w-screen-xl z-10 mx-auto px-4 py-12 md:py-28 gap-12 md:px-8">
          <div className="space-y-5 max-w-3xl leading-0 lg:leading-5 mx-auto text-center px-2 md:px-0">
            <h1
              className="text-sm text-gray-300 dark:text-gray-200 group font-geist mx-auto px-5 py-2 bg-gradient-to-tr from-indigo-300/20 via-indigo-400/20 to-transparent dark:from-indigo-300/20 dark:via-indigo-400/20 border-[2px] border-indigo-500/20 dark:border-indigo-500/20 rounded-3xl w-fit">
              {title}
              <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
            </h1>
            <h2
              className="text-3xl md:text-4xl lg:text-6xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto bg-[linear-gradient(180deg,_#F9FAFB_0%,_rgba(255,255,255,0.85)_100%)]
  dark:bg-[linear-gradient(180deg,_#FFFFFF_0%,_rgba(255,255,255,0.85)_100%)]">
              {subtitle.regular}
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] to-[#f472b6] dark:from-purple-300 dark:to-pink-300">
                {subtitle.gradient}
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-300 dark:text-gray-200 px-2 md:px-0">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 px-4 md:px-0">
              <span className="relative inline-block overflow-hidden rounded-full p-[1.5px] w-full sm:w-auto">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-gray-950 text-xs font-medium backdrop-blur-3xl">
                  <a
                    href={ctaHref}
                    className="inline-flex items-center justify-center w-full rounded-full border border-purple-500 bg-zinc-950 px-8 py-4 text-white hover:from-zinc-300/30 hover:via-purple-400/40 hover:to-transparent dark:hover:from-zinc-300/10 dark:hover:via-purple-400/30 transition-all sm:w-auto">
                    {ctaText}
                  </a>
                </div>
              </span>
              
              {secondaryCtaText && (
                <span className="relative inline-block overflow-hidden rounded-full p-[1px] w-full sm:w-auto">
                  <span
                    className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-30 bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <div
                    className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-zinc-950 text-xs font-medium backdrop-blur-3xl">
                    <a
                      href={secondaryCtaHref}
                      className="inline-flex w-full items-center justify-center rounded-full border border-purple-400 bg-transparent px-8 py-4 text-white hover:bg-purple-700/10 transition-all sm:w-auto">
                      {secondaryCtaText}
                    </a>
                  </div>
                </span>
              )}
            </div>
          </div>
          {bottomImage && (
            <div className="mt-16 md:mt-32 mx-4 md:mx-10 relative z-10">
              <div className="aspect-video overflow-hidden rounded-lg border border-indigo-500/20 shadow-lg">
                <img
                  src={bottomImage.dark}
                  className="w-full h-full object-cover"
                  alt="Watch party preview"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
})
HeroSection.displayName = "HeroSection"

export { HeroSection }
