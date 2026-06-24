import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Gloria_Hallelujah } from "next/font/google";
import "./globals.css";
import ColloqueBot from "@/components/ColloqueBot";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500"],
});

const gloriaHallelujah = Gloria_Hallelujah({
  subsets: ["latin"],
  variable: "--font-gloria",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "Colloque",
    template: "%s | Colloque",
  },
  description: "Read well. Think sharp. Speak with weight.",
  metadataBase: new URL("https://colloque.in"),
  openGraph: {
    siteName: "Colloque",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${dmSans.variable} ${gloriaHallelujah.variable} antialiased`}
      >
        {children}
        <ColloqueBot />
      </body>
    </html>
  );
}
