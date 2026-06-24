import type { Metadata } from "next";
import VideoHero from "@/components/VideoHero";

export const metadata: Metadata = {
  title: "Colloque",
  description: "Read well. Think sharp. Speak with weight. A curated space for ideas, books, and the examined life.",
  openGraph: {
    title: "Colloque",
    description: "Read well. Think sharp. Speak with weight.",
    url: "https://colloque.in",
    images: [{ url: "/api/og?title=Colloque", width: 1200, height: 630 }],
  },
};

export default function Home() {
  return (
    <main>
      <VideoHero />
    </main>
  );
}