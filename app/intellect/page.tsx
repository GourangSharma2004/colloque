import { Suspense } from "react";
import type { Metadata } from "next";
import IntellectClient, { IdeaItem } from "./IntellectClient";
import { getArticles } from "@/lib/sanity-fetch";
import { urlFor } from "@/sanity/lib/image";
import { isSanityConfigured } from "@/sanity/env";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Intellect",
  description: "Sharp ideas across philosophy, science, economics, and culture. Essays written to shift how you see the world.",
  openGraph: {
    title: "Intellect | Colloque",
    description: "Sharp ideas across philosophy, science, economics, and culture.",
    url: "https://colloque.in/intellect",
    images: [{ url: "/api/og?title=Intellect", width: 1200, height: 630 }],
  },
};

// ── Static fallback data ──────────────────────────────────────────────────────
const IDEAS_STATIC: IdeaItem[] = [
  {
    slug: "case-against-sugar",
    title: "The Case Against Sugar",
    hook: "How a century of misread science may have made two of the world's most devastating chronic diseases all but inevitable.",
    opening: "",
    domain: "Metabolic Biology",
    origin: "via Gary Taubes",
    image: "/Sugar.avif",
  },
  {
    slug: "why-english-is-weird",
    title: "Why English Is Genuinely Weird",
    hook: "English is not merely unusual in its spelling — it is structurally, historically, and grammatically unlike any other language on Earth.",
    opening: "",
    domain: "Linguistic History",
    origin: "Original",
    image: "/English Language.jpg",
  },
  {
    slug: "problem-of-mindfulness",
    title: "The Problem of Mindfulness",
    hook: "Mindfulness presents itself as ideology-free — but beneath its calm surface lie metaphysical commitments that quietly reshape how we understand ourselves.",
    opening: "",
    domain: "Philosophy & Ethics",
    origin: "Original",
    image: "/Mindfullness.jpg",
  },
  {
    slug: "end-of-work-crisis-of-meaning",
    title: "The End of Work and the Crisis of Meaning",
    hook: "Work was never just economic. It was the story we told about who we are — and automation is making that story obsolete.",
    opening: "",
    domain: "Labour & Political Economy",
    origin: "Original",
    image: "/Work.png",
  },
  {
    slug: "golden-quarter",
    title: "The Golden Quarter",
    hook: "Between 1945 and 1971, humanity produced more transformative innovation than in the half-century that followed. The question is not just why it happened — it's why it stopped.",
    opening: "",
    domain: "History of Science",
    origin: "Original",
    image: "/innovation.webp",
  },
  {
    slug: "are-coders-worth-it",
    title: "Are Coders Worth It?",
    hook: "A structural examination of how tech labor markets create enormous wage premiums — and what that premium actually signals about value, scarcity, and the stories we tell ourselves.",
    opening: "",
    domain: "Labour Economics",
    origin: "Original",
    image: "/Code.jpg",
  },
  {
    slug: "the-power-thinker",
    title: "The Power Thinker",
    hook: "Why Foucault refused to define power — and why that refusal was itself the most philosophically serious move he could make.",
    opening: "",
    domain: "Political Philosophy",
    origin: "via Michel Foucault",
    image: "/Power.webp",
  },
  {
    slug: "the-orgasm-cure",
    title: "The Orgasm Cure",
    hook: "What if we could expand ecstasy, reduce stress, and lift depression — all by delaying and extending orgasm?",
    opening: "",
    domain: "Psychology & Physiology",
    origin: "Original",
    image: "/Orgasm.jpg",
  },
  {
    slug: "poor-teeth",
    title: "Poor Teeth",
    hook: "If you have a mouthful of teeth shaped by a childhood in poverty, don't go knocking on the door of American privilege.",
    opening: "",
    domain: "Social Inequality",
    origin: "Original",
    image: "/teeth.jpg",
  },
  {
    slug: "the-presence-of-power",
    title: "The Presence of Power",
    hook: "Rammohun Roy's radical claim — that good governance must be close — and why it still matters in an age of abstraction.",
    opening: "",
    domain: "Political Theory",
    origin: "via Rammohun Roy",
    image: "/presence.jpg",
  },
  {
    slug: "time-is-an-object",
    title: "Time is an Object",
    hook: "Not a backdrop, an illusion, or an emergent phenomenon — time has a physical size that can be measured in laboratories.",
    opening: "",
    domain: "Physics & Philosophy",
    origin: "Original",
    image: "/time.jpg",
  },
  {
    slug: "why-self-harm",
    title: "Why Self-Harm?",
    hook: "Cutting brings relief because emotion and pain criss-cross in the brain. Can we untangle the circuits and stop the cycle?",
    opening: "",
    domain: "Neuroscience",
    origin: "Original",
    image: "/self-harm.jpg",
  },
];

// ─── Server Component (ISR) ───────────────────────────────────────────────────

export default async function IntellectPage() {
  let ideas: IdeaItem[] = IDEAS_STATIC;

  if (isSanityConfigured) {
    const sanityArticles = await getArticles();
    if (sanityArticles.length >= IDEAS_STATIC.length) {
      ideas = sanityArticles.map((a) => ({
        slug: a.slug.current,
        title: a.title,
        hook: a.excerpt ?? "",
        opening: "",
        domain: a.categories?.[0] ?? "",
        origin: a.author ?? "",
        image: a.coverImage ? urlFor(a.coverImage).width(800).url() : "",
      }));
    }
  }

  return (
    <Suspense fallback={null}>
      <IntellectClient ideas={ideas} />
    </Suspense>
  );
}
