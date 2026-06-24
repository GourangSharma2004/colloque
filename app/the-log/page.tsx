import type { Metadata } from "next";
import { getLogEntries } from "@/lib/sanity-fetch";
import { urlFor } from "@/sanity/lib/image";
import { isSanityConfigured } from "@/sanity/env";
import TheLogClient, { type BlogPost } from "./TheLogClient";

export const metadata: Metadata = {
  title: "The Log",
  description: "A personal log of ideas, weeks, and things worth writing down. Building in public, one entry at a time.",
  openGraph: {
    title: "The Log | Colloque",
    description: "A personal log of ideas, weeks, and things worth writing down.",
    url: "https://colloque.in/the-log",
    images: [{ url: "/api/og?title=The+Log", width: 1200, height: 630 }],
  },
};

export const revalidate = 60;

const PAST_ENTRIES_STATIC = [
  {
    slug: "week-00-april-2026",
    week: "Week 00 · April 2026",
    headline: "The quiet before everything started to make sense",
  },
  {
    slug: "week-minus-01-march-2026",
    week: "Week −01 · March 2026",
    headline: "On running out of excuses and into motion",
  },
  {
    slug: "week-minus-02-march-2026",
    week: "Week −02 · March 2026",
    headline: "Three books, two ideas, one decision I'd been avoiding",
  },
  {
    slug: "week-minus-03-february-2026",
    week: "Week −03 · Feb 2026",
    headline: "Building in public — the discomfort and why it matters",
  },
];

const SAMPLE_COMMENTS = [
  {
    name: "Arjun M.",
    date: "April 20, 2026",
    text: "The bit about trusting your own judgment hit differently. I've been in that same loop for months.",
  },
  {
    name: "Priya S.",
    date: "April 21, 2026",
    text: "This is exactly what I needed to read this week. Keep writing, Gourang.",
  },
];

const BLOG_POSTS_STATIC: BlogPost[] = [
  {
    slug: "week-01-april-2026",
    week: "Week 01 · April 2026",
    headline: "The week I decided to stop waiting for perfect",
    excerpt: "Three things I'd been sitting on for weeks all started clicking into place at once. Not because I planned it.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
    body: [],
    likesCount: 47,
  },
  {
    slug: "week-00-april-2026",
    week: "Week 00 · April 2026",
    headline: "The quiet before everything started to make sense",
    excerpt: "Some weeks nothing happens and everything changes. This was that week.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    body: [],
    likesCount: 23,
  },
  {
    slug: "week-minus-01-march-2026",
    week: "Week −01 · March 2026",
    headline: "On running out of excuses and into motion",
    excerpt: "The excuses were good ones. That was the problem.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    body: [],
    likesCount: 18,
  },
  {
    slug: "week-minus-02-march-2026",
    week: "Week −02 · March 2026",
    headline: "Three books, two ideas, one decision I'd been avoiding",
    excerpt: "Reading is easy. Deciding what to do with what you've read is the harder work.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    body: [],
    likesCount: 31,
  },
];

export default async function TheLogPage({
  searchParams,
}: {
  searchParams: { q?: string; section?: string };
}) {
  const query = searchParams.q?.toLowerCase().trim() ?? "";
  const targetId = searchParams.section ?? "";

  let blogPosts = BLOG_POSTS_STATIC;
  let pastEntries = PAST_ENTRIES_STATIC;

  if (isSanityConfigured) {
    const sanityEntries = await getLogEntries();
    if (sanityEntries.length > 0) {
      blogPosts = sanityEntries.map((entry) => ({
        slug: entry.slug.current,
        week: entry.publishedAt
          ? new Date(entry.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "",
        headline: entry.title,
        excerpt: entry.excerpt ?? "",
        image: entry.coverImage ? urlFor(entry.coverImage).width(1200).url() : "",
        body: entry.body ?? [],
        likesCount: entry.likesCount,
      }));

      pastEntries = sanityEntries.slice(1).map((entry) => ({
        slug: entry.slug.current,
        week: entry.publishedAt
          ? new Date(entry.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "",
        headline: entry.title,
      }));
    }
  }

  return (
    <TheLogClient
      blogPosts={blogPosts}
      pastEntries={pastEntries}
      sampleComments={SAMPLE_COMMENTS}
      query={query}
      targetId={targetId}
    />
  );
}
