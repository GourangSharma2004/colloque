// TEMPLATE: Clone this file for other pillar pages

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SearchHighlight from "@/components/SearchHighlight";
import { motion } from "framer-motion";
import { getBookSummaries } from "@/lib/sanity-fetch";

import { urlFor } from "@/sanity/lib/image";
import { isSanityConfigured } from "@/sanity/env";
import BookSummariesClient from "./BookSummariesClient";

export const metadata: Metadata = {
  title: "Book Summaries",
  description: "Deep-read summaries of books worth your time — philosophy, science, business, and the examined life.",
  openGraph: {
    title: "Book Summaries | Colloque",
    description: "Deep-read summaries of books worth your time.",
    url: "https://colloque.in/book-summaries",
    images: [{ url: "/api/og?title=Book+Summaries", width: 1200, height: 630 }],
  },
};

export const revalidate = 60;

// ── Featured books data (fallback) ─────────────────────────────────────────────
const FEATURED_BOOKS_STATIC = [
  {
    title: "Ikigai",
    author: "Héctor García & Francesc Miralles",
    tags: "Philosophy · Japan",
    quote: "The Japanese secret to a long and happy life — and what it actually demands of you.",
    cover: "/ikigai-cover.jpg",
    href: "/read?file=/ikigai-summary.html",
    coverBg: "#E2DAD0",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel & Blake Masters",
    tags: "Entrepreneurship · Startups",
    quote: "Every great business is built on a secret the world hasn't found yet.",
    cover: "/zero to one.jpg",
    href: "/read?file=/zero-to-one-summary.html",
    coverBg: "#E0D8CE",
  },
  {
    title: "Dopamine Nation",
    author: "Dr. Anna Lembke",
    tags: "Neuroscience · Addiction",
    quote: "We are all, in some way, addicted. The question is whether we're willing to feel the pain.",
    cover: "/Dopamine Nation.jpg",
    href: "/read?file=/dopamine-nation-summary.html",
    coverBg: "#E2DAD0",
  },
  {
    title: "Can't Hurt Me",
    author: "David Goggins",
    tags: "Mindset · Resilience",
    quote: "Most people only use 40% of their potential. The question is what you're willing to do with the rest.",
    cover: "/Cant hurt Me.jpg",
    href: "/read?file=/cant-hurt-me-summary.html",
    coverBg: "#E0D8CE",
  },
  {
    title: "CRUSH IT!",
    author: "Gary Vaynerchuk",
    tags: "Entrepreneurship · Personal Brand",
    quote: "Your passion is the one unfair advantage no one else can replicate.",
    cover: "/crush it.jpg",
    href: "/read?file=/crush-it-summary.html",
    coverBg: "#E2DAD0",
  },
  {
    title: "Diary of a CEO",
    author: "Steven Bartlett",
    tags: "Business · Leadership",
    quote: "Your story is the most powerful thing you own. Build the brand before you build the empire.",
    cover: "/DIARY.jpg",
    href: "/read?file=/diary-of-a-ceo-guide.html",
    coverBg: "#D6CFC6",
  },
  {
    title: "Someday is Today",
    author: "Matthew Dicks",
    tags: "Productivity · Creativity",
    quote: "Someday is not a day of the week. The only thing between you and your creative work is time you haven't claimed.",
    cover: "/SOMEDAY.jpg",
    href: "/read?file=/someday-is-today-guide.html",
    coverBg: "#DDD7CF",
  },
  {
    title: "Men Are from Mars, Women Are from Venus",
    author: "John Gray",
    tags: "Relationships · Psychology",
    quote: "Understanding the fundamental differences between men and women is the first step to a fulfilling relationship.",
    cover: "/MEN.jpg",
    href: "/read?file=/mars-venus-guide.html",
    coverBg: "#D6CFC6",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    tags: "Productivity · Focus",
    quote: "In an economy defined by distraction, the ability to focus without interruption is becoming both rare and enormously valuable.",
    cover: "/DeepWork.JPEG",
    href: "/read?file=/deep-work-guide.html",
    coverBg: "#DDD7CF",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    tags: "Finance · Behaviour",
    quote: "Getting wealthy is about earning more. Staying wealthy is about behaviour — and that has nothing to do with intelligence.",
    cover: "/money.png",
    href: "/read?file=/psychology-of-money-guide.html",
    coverBg: "#D6CFC6",
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    tags: "Self-Help · Philosophy",
    quote: "The desire for more positive experience is itself a negative experience. Embrace the struggle.",
    cover: "/art.jpg",
    href: "/read?file=/subtle-art-complete.html",
    coverBg: "#DDD7CF",
  },
  {
    title: "How to Sell Anything to Anybody",
    author: "Joe Girard",
    tags: "Sales · Business",
    quote: "Every single person you meet is a potential customer — if you treat them like a human being first.",
    cover: "/sell.jpg",
    href: "/read?file=/how-to-sell-anything-girard.html",
    coverBg: "#D6CFC6",
  },
  {
    title: "Thinking in Systems",
    author: "Donella H. Meadows",
    tags: "Systems · Strategy",
    quote: "You can't understand a system until you see it as a whole — not as a collection of parts.",
    cover: "/think.jpg",
    href: "/read?file=/systems.html",
    coverBg: "#E2DAD0",
  },
  {
    title: "Stillness is the Key",
    author: "Ryan Holiday",
    tags: "Stoicism · Mindfulness",
    quote: "In a world that never stops, the ability to be still is the ultimate competitive advantage.",
    cover: "/stillness.jpg",
    href: "/read?file=/Stillness.html",
    coverBg: "#E0D8CE",
  },
  {
    title: "The Quick and Easy Way to Effective Speaking",
    author: "Dale Carnegie",
    tags: "Communication · Public Speaking",
    quote: "Good public speakers are made, not born. The ability to speak with confidence is a learnable skill — and this book shows you exactly how.",
    cover: "/Book%201/9789388144353.webp",
    href: "/read?file=/Book%201/The-Quick-and-Easy-Way-to-Effective-Speaking-Summary.html",
    coverBg: "#E2DAD0",
  },
  {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    tags: "Relationships · Communication",
    quote: "The only way to influence people is to talk about what they want. Master that one principle, and every room you walk into becomes an opportunity.",
    cover: "/Book%202/1_OtxsMJ5huAFwANLR6lONyw.jpg",
    href: "/read?file=/Book%202/how-to-win-friends-summary.html",
    coverBg: "#D6CFC6",
  },
];

// ── Library placeholder data ──────────────────────────────────────────────────
const LIBRARY_BOOKS = [
  {
    genre: "Psychology",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    readTime: "30 min",
    hook: "Two systems. One makes you human. The other makes you wrong.",
  },
  {
    genre: "History",
    title: "The Lessons of History",
    author: "Will & Ariel Durant",
    readTime: "20 min",
    hook: "Everything civilisation has learned, compressed into an argument.",
  },
  {
    genre: "Philosophy",
    title: "Antifragile",
    author: "Nassim Taleb",
    readTime: "28 min",
    hook: "Some things don't just survive chaos. They need it.",
  },
  {
    genre: "Productivity",
    title: "Deep Work",
    author: "Cal Newport",
    readTime: "22 min",
    hook: "The ability to focus is becoming rare and valuable at the same time.",
  },
  {
    genre: "Memoir",
    title: "Shoe Dog",
    author: "Phil Knight",
    readTime: "32 min",
    hook: "The obsessive, risk-everything origin story of the shoe that changed sport forever.",
  },
  {
    genre: "Creativity",
    title: "Big Magic",
    author: "Elizabeth Gilbert",
    readTime: "18 min",
    hook: "Creative living beyond fear — ideas are alive, and they're looking for a worthy partner.",
  },
  {
    genre: "Relationships",
    title: "Mating in Captivity",
    author: "Esther Perel",
    readTime: "24 min",
    hook: "Desire and domesticity are opposites. Can you sustain both in the same relationship?",
  },
  {
    genre: "Philosophy",
    title: "The Courage to Be Disliked",
    author: "Ichiro Kishimi & Fumitake Koga",
    readTime: "26 min",
    hook: "Adler's radical idea: all your problems are interpersonal, and freedom comes from accepting that.",
  },
  {
    genre: "Stoicism",
    title: "Meditations",
    author: "Marcus Aurelius",
    readTime: "20 min",
    hook: "Private notes from the most powerful man in the world — written only for himself.",
  },
];

// ── Shared tokens ─────────────────────────────────────────────────────────────
const sp = "px-6 md:px-16 lg:px-24";

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#9A8E7E",
};

// ─────────────────────────────────────────────────────────────────────────────

export default async function BookSummariesPage({
  searchParams,
}: {
  searchParams: { q?: string; section?: string };
}) {
  const query = searchParams.q?.toLowerCase().trim() ?? "";
  const targetId = searchParams.section ?? "";

  // Fetch from Sanity or use static fallback
  let featuredBooks = FEATURED_BOOKS_STATIC;
  if (isSanityConfigured) {
    const sanityBooks = await getBookSummaries();
    if (sanityBooks.length >= FEATURED_BOOKS_STATIC.length) {
      featuredBooks = sanityBooks.map((book) => ({
        title: book.title,
        author: book.author,
        tags: book.categories?.join(" · ") ?? "",
        quote: book.excerpt ?? "",
        cover: book.coverImage ? urlFor(book.coverImage).width(600).url() : "",
        href: `/book-summaries/${book.slug.current}`,
        coverBg: "#E2DAD0",
      }));
    }
  }

  return (
    <BookSummariesClient
      featuredBooks={featuredBooks}
      libraryBooks={LIBRARY_BOOKS}
      query={query}
      targetId={targetId}
    />
  );
}
