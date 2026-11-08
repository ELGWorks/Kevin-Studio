import type { Metadata } from "next";
import { Hanken_Grotesk, Unbounded } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/data/portfolio";
import "./globals.css";

// Display font. The CSS variable keeps its old name so nothing else has to change.
const display = Unbounded({
  subsets: ["latin"],
  variable: "--font-syne",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  title: `${site.name} | Logo designer and sketch artist`,
  description: site.intro,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${hanken.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}