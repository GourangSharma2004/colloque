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
    href: "/read?file=/case_against_sugar.html",
  },
  {
    slug: "why-english-is-weird",
    title: "Why English Is Genuinely Weird",
    hook: "English is not merely unusual in its spelling — it is structurally, historically, and grammatically unlike any other language on Earth.",
    opening: "",
    domain: "Linguistic History",
    origin: "Original",
    image: "/English Language.jpg",
    href: "/read?file=/why-english-is-genuinely-weird.html",
  },
  {
    slug: "problem-of-mindfulness",
    title: "The Problem of Mindfulness",
    hook: "Mindfulness presents itself as ideology-free — but beneath its calm surface lie metaphysical commitments that quietly reshape how we understand ourselves.",
    opening: "",
    domain: "Philosophy & Ethics",
    origin: "Original",
    image: "/Mindfullness.jpg",
    href: "/read?file=/mindfulness.html",
  },
  {
    slug: "end-of-work-crisis-of-meaning",
    title: "The End of Work and the Crisis of Meaning",
    hook: "Work was never just economic. It was the story we told about who we are — and automation is making that story obsolete.",
    opening: "",
    domain: "Labour & Political Economy",
    origin: "Original",
    image: "/Work.png",
    href: "/read?file=/work.html",
  },
  {
    slug: "golden-quarter",
    title: "The Golden Quarter",
    hook: "Between 1945 and 1971, humanity produced more transformative innovation than in the half-century that followed. The question is not just why it happened — it's why it stopped.",
    opening: "",
    domain: "History of Science",
    origin: "Original",
    image: "/innovation.webp",
    href: "/read?file=/innovation.html",
  },
  {
    slug: "are-coders-worth-it",
    title: "Are Coders Worth It?",
    hook: "A structural examination of how tech labor markets create enormous wage premiums — and what that premium actually signals about value, scarcity, and the stories we tell ourselves.",
    opening: "",
    domain: "Labour Economics",
    origin: "Original",
    image: "/Code.jpg",
    href: "/read?file=/are-coders-worth-it.html",
  },
  {
    slug: "the-power-thinker",
    title: "The Power Thinker",
    hook: "Why Foucault refused to define power — and why that refusal was itself the most philosophically serious move he could make.",
    opening: "",
    domain: "Political Philosophy",
    origin: "via Michel Foucault",
    image: "/Power.webp",
    href: "/read?file=/foucault-power-thinker.html",
  },
  {
    slug: "the-orgasm-cure",
    title: "The Orgasm Cure",
    hook: "What if we could expand ecstasy, reduce stress, and lift depression — all by delaying and extending orgasm?",
    opening: "",
    domain: "Psychology & Physiology",
    origin: "Original",
    image: "/Orgasm.jpg",
    href: "/read?file=/orgasm_cure_rif.html",
  },
  {
    slug: "poor-teeth",
    title: "Poor Teeth",
    hook: "If you have a mouthful of teeth shaped by a childhood in poverty, don't go knocking on the door of American privilege.",
    opening: "",
    domain: "Social Inequality",
    origin: "Original",
    image: "/teeth.jpg",
    href: "/read?file=/poor-teeth.html",
  },
  {
    slug: "the-presence-of-power",
    title: "The Presence of Power",
    hook: "Rammohun Roy's radical claim — that good governance must be close — and why it still matters in an age of abstraction.",
    opening: "",
    domain: "Political Theory",
    origin: "via Rammohun Roy",
    image: "/presence.jpg",
    href: "/read?file=/presence-of-power.html",
  },
  {
    slug: "time-is-an-object",
    title: "Time is an Object",
    hook: "Not a backdrop, an illusion, or an emergent phenomenon — time has a physical size that can be measured in laboratories.",
    opening: "",
    domain: "Physics & Philosophy",
    origin: "Original",
    image: "/time.jpg",
    href: "/read?file=/time-is-an-object.html",
  },
  {
    slug: "why-self-harm",
    title: "Why Self-Harm?",
    hook: "Cutting brings relief because emotion and pain criss-cross in the brain. Can we untangle the circuits and stop the cycle?",
    opening: "",
    domain: "Neuroscience",
    origin: "Original",
    image: "/self-harm.jpg",
    href: "/read?file=/why-self-harm-doc.html",
  },
  {
    slug: "the-play-deficit",
    title: "The Play Deficit",
    hook: "Decades of structured schooling have quietly stolen the one thing children most need to become functioning adults — and the consequences are now impossible to ignore.",
    opening: "",
    domain: "Developmental Psychology",
    origin: "via Peter Gray",
    image: "/intellect%201/play.jpg",
    href: "/read?file=/intellect%201/the-play-deficit.html",
  },
  {
    slug: "the-macho-sperm-myth",
    title: "The Macho Sperm Myth",
    hook: "How centuries of male-coded storytelling hijacked the science of human reproduction — and why the consequences still play out in fertility clinics today.",
    opening: "",
    domain: "Biology & Belief",
    origin: "Original",
    image: "/intellect%202/Sperm.jpg",
    href: "/read?file=/intellect%202/macho-sperm-myth.html",
  },
  {
    slug: "exodus",
    title: "Exodus",
    hook: "The engineering case for becoming a multi-planet species — and why it may be the only serious answer to the oldest silence in cosmology.",
    opening: "",
    domain: "Cosmology & Civilisation",
    origin: "Original",
    image: "/intellect%203/exodus.png",
    href: "/read?file=/intellect%203/exodus.html",
  },
];

// ─── Server Component (ISR) ───────────────────────────────────────────────────

export default async function IntellectPage() {
  let ideas: IdeaItem[] = IDEAS_STATIC;

  // Sanity override intentionally disabled until CMS is fully populated

  return (
    <Suspense fallback={null}>
      <IntellectClient ideas={ideas} />
    </Suspense>
  );
}
