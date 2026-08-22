import type { Metadata } from "next";
import { Instrument_Serif, Outfit, Syne } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import GradualBlur from "@/components/GradualBlur";
import SmoothScroll from "@/components/SmoothScroll";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AdsMagnify — Performance Marketing & Creative Engine",
  description:
    "AI-powered performance marketing agency in Mumbai. Growth details and creative scale that feel like magic.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${syne.variable} ${outfit.variable}`}
    >
      <body className="bg-[#FAF9F6] text-[#111827] antialiased selection:bg-[#004AAD] selection:text-white">
        <SmoothScroll>
          <ScrollProgress />
          <CustomCursor />
          {children}
          {/* Fixed Viewport Bottom Gradual Blur (Ansh Dhanani - React Bits) */}
          <GradualBlur
            target="window"
            position="bottom"
            height="7rem"
            strength={2}
            divCount={5}
            curve="bezier"
            exponential
            opacity={1}
          />
        </SmoothScroll>
      </body>
    </html>
  );
}

