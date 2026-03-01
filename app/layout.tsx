import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: `${siteConfig.name} — ${siteConfig.title}`,
  description: siteConfig.tagline,
  icons: { icon: "/favicon.svg" },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${instrumentSerif.variable} font-sans bg-surface-950 text-warm-100 min-h-screen`}
      >
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold-600 focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <Header />
        <main>{children}</main>
        <Footer />

        {/* Film grain texture */}
        <svg className="hidden">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
        </svg>
        <div className="grain-overlay" style={{ filter: "url(#grain)" }} />
      </body>
    </html>
  );
}
