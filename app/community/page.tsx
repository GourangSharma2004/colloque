import { Suspense } from "react";
import type { Metadata } from "next";
import CommunityClient from "./CommunityClient";

export const metadata: Metadata = {
  title: "Community",
  description: "Join a curated community of thinkers, readers, and builders. Conversations that go beyond the surface.",
  openGraph: {
    title: "Community | Colloque",
    description: "Join a curated community of thinkers, readers, and builders.",
    url: "https://colloque.in/community",
    images: [{ url: "/api/og?title=Community", width: 1200, height: 630 }],
  },
};

export default function CommunityPage() {
  return (
    <Suspense fallback={null}>
      <CommunityClient />
    </Suspense>
  );
}
