import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { profile } from "@/lib/data";
import "./globals.css";

export const ensureStatic = "navigation";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

const description =
  "Maryam Basit — teacher, school administrator and artist based in Klang, Selangor, Malaysia.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.website),
  title: {
    default: "Maryam Basit — Teacher, Administrator & Artist",
    template: "%s · Maryam Basit",
  },
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Maryam Basit",
    title: "Maryam Basit — Teacher, Administrator & Artist",
    description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fff8f9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrument.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Scroll-reveal styles only apply once JS is confirmed running */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="min-h-dvh bg-blush-50 font-sans text-ink">{children}</body>
    </html>
  );
}
