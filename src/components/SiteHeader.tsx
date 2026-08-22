import Link from "next/link";

interface SiteHeaderProps {
  /** "onLight" = ink logo for a light hero behind it. "onDark" = an
   * inverted (white) logo for a dark hero behind it. */
  theme?: "onLight" | "onDark";
}

export default function SiteHeader({ theme = "onLight" }: SiteHeaderProps) {
  const logoFilter = theme === "onDark" ? "brightness-0 invert" : "";

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 bg-transparent pt-[max(0.75rem,env(safe-area-inset-top))]">
      <div className="flex w-full items-center justify-center px-4 py-3 sm:px-6 sm:py-4 md:px-10 md:py-6">
        <Link href="/" className="pointer-events-auto">
          <img
            src="/full_logo.svg"
            alt="AdsMagnify"
            className={`block h-8 w-auto object-contain sm:h-9 md:h-11 ${logoFilter}`}
          />
        </Link>
      </div>
    </header>
  );
}
