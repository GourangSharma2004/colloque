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
    slug: "week-03-july-2026",
    week: "Week 03 · July 2026",
    headline: "The Sprint — running against the clock, on purpose",
  },
  {
    slug: "week-02-june-2026",
    week: "Week 02 · June 2026",
    headline: "The rename that made it real",
  },
  {
    slug: "week-01-june-2026",
    week: "Week 01 · June 2026",
    headline: "The week the Pattern got a name",
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
    slug: "week-03-july-2026",
    week: "Week 03 · July 2026",
    headline: "The Sprint — running against the clock, on purpose",
    excerpt: "A two-week sprint, dated and scoped. The plan is made, the direction is locked. The real test isn't what got built — it's whether the five reels and the logs actually ship on schedule, or whether 'almost ready' creeps back in.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    body: [
      "This is the week the planning stopped and the clock started. The frame: a two-week sprint, dated and scoped, running July 1–15 — Colloque dev (desktop CSS fixes, Instagram integration, the auth bug, mobile version), content production (Intellect docs, Book Summary docs, Weekly AI Dispatch, weekly logs), and a five-reel production run for \"Read the Frame.\" Naming a sprint with hard dates is itself a Pattern 01 countermeasure — it's the opposite of waiting for 100% readiness.",
      "Content cadence, not content perfection: the \"Learning from Movies\" Hinglish scripts (Fight Club, 12 Angry Men, Atonement) and the \"Read the Frame\" reels are volume plays — five reels in two weeks is a rep count, not a masterpiece count. That's a deliberate rebuttal to the pattern of \"stopped iterating after one low-view cycle.\"",
      "What's queued, not done yet: Pattern 02 of the Personal Pattern Index is agreed as the next session — you finished diagnosing Pattern 01 but haven't sat down with the next one yet. AI Resources and Community remain the two unbuilt pillars of Colloque. Both are on the sprint board.",
      "Where this week actually sits: early-to-mid sprint. The plan is made, the direction is locked, execution is underway but the sprint isn't closed. The real test of this week isn't what got built — it's whether the five reels and the weekly logs actually ship on schedule, or whether \"almost ready\" creeps back in.",
    ],
    likesCount: 12,
  },
  {
    slug: "week-02-june-2026",
    week: "Week 02 · June 2026",
    headline: "The rename that made it real",
    excerpt: "Converse became Colloque. Not a cosmetic change — it came with a locked spec and a monetization model. Naming the thing precisely is its own form of commitment.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    body: [
      "This was a quieter, more structural week — less \"building,\" more \"deciding what the thing actually is.\" Converse became Colloque. Not a cosmetic change — it came with a locked spec: four pillars (Book Summaries, Intellectual Deep-Dives, AI Hub, Community), a monetization model (3 months free → ₹99/month Founding Member, price locked forever → freemium at 6 months), and scene-by-scene copy for the landing page, ending on \"This is where the thinking gets loud.\"",
      "Naming the thing precisely is its own form of commitment — it's harder to hide behind \"still figuring out what this is\" once the spec is locked. The name change was the decision that made the project feel real.",
      "PharmaCommute closed out. The CIPL internship project — RFID Smart Cartons, GxP/21 CFR Part 11 compliance, 11 modules — went from build to report, synopsis, and panel presentation. A full, external, graded finish. Worth noting against Pattern 01: this one did get finished and presented, fully, to a panel. That's evidence against the \"I never fully try\" story, not for it.",
      "RIF (Reading Intelligence Framework) took shape here too — 11 structured prompts across nine intellectual domains, designed to turn your reading into shareable, compact documentation. Systems thinking applied to your own reading habit. The gym six-day PPL split, morning journaling, temple visits — these stayed constant underneath all of it. The infrastructure of the week, not the headline.",
    ],
    likesCount: 28,
  },
  {
    slug: "week-01-june-2026",
    week: "Week 01 · June 2026",
    headline: "The week the Pattern got a name",
    excerpt: "The Personal Pattern Index started here. You weren't just building Colloque anymore — you were building a system to catch yourself in the act of avoiding.",
    image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&w=1200&q=80",
    body: [
      "This was the week the Personal Pattern Index started, and it changed the register of everything else. You weren't just building Colloque anymore — you were building a system to catch yourself in the act of avoiding. Colloque's core pages — Landing, Book Summaries, Intellect, The Log — were locked into a finished state. The cream/charcoal/gold visual identity (Cormorant Garamond + DM Sans) stopped being a moodboard and became a real, shipped system.",
      "What got named: Pattern 01 — \"The Shield of Unreadiness.\" The mechanism: avoid full effort so a full failure is never possible. You traced it back past JEE, past the CGPA collapse, to a pre-Class 11 identity of \"naturally exceptional\" that never learned how to grind visibly. The 100% standard you hold Colloque to isn't quality control — it's armor.",
      "The tell: you assigned yourself homework — show Colloque to friends as-is on a Google Meet, post 3 short-form pieces, keep a daily Evidence Log — and the fact that this needed to be assigned rather than just done is the pattern itself, in real time.",
      "Undercurrent: EY/BCG interview prep was running in parallel, sharpening your MailCrux, FinPilot, and PharmaCommute narratives. Good pressure — external stakes forcing you to say your work out loud, which is exactly the relational-accountability lever that worked on your CGPA turnaround.",
    ],
    likesCount: 41,
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

  // Sanity override intentionally disabled until CMS is fully populated

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
