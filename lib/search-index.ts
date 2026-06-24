// Centralized search index for all sections of Colloque

// Import dynamically generated HTML content index
import { HTML_SEARCH_INDEX, HTML_CONTENT_MAP } from './generated-search-index';

export type SearchResult = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  section: "intellect" | "book-summaries" | "ai-resources" | "community" | "the-log" | "documentation";
  textMatch?: string[];
  sectionId?: string;
  matchType?: "title" | "heading" | "content";
  fullContent?: string;
  headings?: Array<{ level: number; text: string; id: string }>;
};

// Intellect ideas
const IDEAS: SearchResult[] = [
  {
    id: "case-against-sugar",
    title: "The Case Against Sugar",
    description: "How a century of misread science may have made two of the world's most devastating chronic diseases all but inevitable.",
    category: "Metabolic Biology",
    href: "/intellect/case-against-sugar",
    section: "intellect",
  },
  {
    id: "why-english-is-weird",
    title: "Why English Is Genuinely Weird",
    description: "English is not merely unusual in its spelling — it is structurally, historically, and grammatically unlike any other language on Earth.",
    category: "Linguistic History",
    href: "/intellect/why-english-is-weird",
    section: "intellect",
  },
  {
    id: "problem-of-mindfulness",
    title: "The Problem of Mindfulness",
    description: "Mindfulness presents itself as ideology-free — but beneath its calm surface lie metaphysical commitments that quietly reshape how we understand ourselves.",
    category: "Philosophy & Ethics",
    href: "/intellect/problem-of-mindfulness",
    section: "intellect",
  },
  {
    id: "end-of-work-crisis-of-meaning",
    title: "The End of Work and the Crisis of Meaning",
    description: "Work was never just economic. It was the story we told about who we are — and automation is making that story obsolete.",
    category: "Labour & Political Economy",
    href: "/intellect/end-of-work-crisis-of-meaning",
    section: "intellect",
  },
  {
    id: "golden-quarter",
    title: "The Golden Quarter",
    description: "Between 1945 and 1971, humanity produced more transformative innovation than in the half-century that followed.",
    category: "History of Science",
    href: "/intellect/golden-quarter",
    section: "intellect",
  },
  {
    id: "are-coders-worth-it",
    title: "Are Coders Worth It?",
    description: "A structural examination of how tech labor markets create enormous wage premiums — and what that premium actually signals about value.",
    category: "Labour Economics",
    href: "/intellect/are-coders-worth-it",
    section: "intellect",
  },
  {
    id: "the-power-thinker",
    title: "The Power Thinker",
    description: "Why Foucault refused to define power — and why that refusal was itself the most philosophically serious move he could make.",
    category: "Political Philosophy",
    href: "/intellect/the-power-thinker",
    section: "intellect",
  },
  {
    id: "the-orgasm-cure",
    title: "The Orgasm Cure",
    description: "What if we could expand ecstasy, reduce stress, and lift depression — all by delaying and extending orgasm?",
    category: "Psychology & Physiology",
    href: "/intellect/the-orgasm-cure",
    section: "intellect",
  },
  {
    id: "poor-teeth",
    title: "Poor Teeth",
    description: "If you have a mouthful of teeth shaped by a childhood in poverty, don't go knocking on the door of American privilege.",
    category: "Social Inequality",
    href: "/intellect/poor-teeth",
    section: "intellect",
  },
  {
    id: "the-presence-of-power",
    title: "The Presence of Power",
    description: "Rammohun Roy's radical claim — that good governance must be close — and why it still matters in an age of abstraction.",
    category: "Political Theory",
    href: "/intellect/the-presence-of-power",
    section: "intellect",
  },
];

// Book summaries
const BOOKS: SearchResult[] = [
  {
    id: "ikigai",
    title: "Ikigai",
    description: "The Japanese secret to a long and happy life — and what it actually demands of you.",
    category: "Philosophy · Japan",
    href: "/book-summaries/ikigai",
    section: "book-summaries",
  },
  {
    id: "zero-to-one",
    title: "Zero to One",
    description: "Every great business is built on a secret the world hasn't found yet.",
    category: "Entrepreneurship · Startups",
    href: "/book-summaries/zero-to-one",
    section: "book-summaries",
  },
  {
    id: "dopamine-nation",
    title: "Dopamine Nation",
    description: "We are all, in some way, addicted. The question is whether we're willing to feel the pain.",
    category: "Neuroscience · Addiction",
    href: "/book-summaries/dopamine-nation",
    section: "book-summaries",
  },
  {
    id: "cant-hurt-me",
    title: "Can't Hurt Me",
    description: "Most people only use 40% of their potential. The question is what you're willing to do with the rest.",
    category: "Mindset · Resilience",
    href: "/book-summaries/cant-hurt-me",
    section: "book-summaries",
  },
  {
    id: "crush-it",
    title: "CRUSH IT!",
    description: "Your passion is the one unfair advantage no one else can replicate.",
    category: "Entrepreneurship · Personal Brand",
    href: "/book-summaries/crush-it",
    section: "book-summaries",
  },
  {
    id: "diary-of-a-ceo",
    title: "Diary of a CEO",
    description: "Your story is the most powerful thing you own. Build the brand before you build the empire.",
    category: "Business · Leadership",
    href: "/diary-of-a-ceo-guide.html",
    section: "book-summaries",
  },
  {
    id: "someday-is-today",
    title: "Someday is Today",
    description: "Someday is not a day of the week. The only thing between you and your creative work is time you haven't claimed.",
    category: "Productivity · Creativity",
    href: "/someday-is-today-guide.html",
    section: "book-summaries",
  },
  {
    id: "men-are-from-mars",
    title: "Men Are from Mars, Women Are from Venus",
    description: "Understanding the fundamental differences between men and women is the first step to a fulfilling relationship.",
    category: "Relationships · Psychology",
    href: "/mars-venus-guide.html",
    section: "book-summaries",
  },
  {
    id: "deep-work",
    title: "Deep Work",
    description: "In an economy defined by distraction, the ability to focus without interruption is becoming both rare and enormously valuable.",
    category: "Productivity · Focus",
    href: "/deep-work-guide.html",
    section: "book-summaries",
  },
  {
    id: "psychology-of-money",
    title: "The Psychology of Money",
    description: "Getting wealthy is about earning more. Staying wealthy is about behaviour — and that has nothing to do with intelligence.",
    category: "Finance · Behaviour",
    href: "/psychology-of-money-guide.html",
    section: "book-summaries",
  },
  {
    id: "subtle-art",
    title: "The Subtle Art of Not Giving a F*ck",
    description: "The desire for more positive experience is itself a negative experience. Embrace the struggle.",
    category: "Self-Help · Philosophy",
    href: "/subtle-art-complete.html",
    section: "book-summaries",
  },
  {
    id: "how-to-sell",
    title: "How to Sell Anything to Anybody",
    description: "Every single person you meet is a potential customer — if you treat them like a human being first.",
    category: "Sales · Business",
    href: "/how-to-sell-anything-girard.html",
    section: "book-summaries",
  },
  {
    id: "thinking-in-systems",
    title: "Thinking in Systems",
    description: "You can't understand a system until you see it as a whole — not as a collection of parts.",
    category: "Systems · Strategy",
    href: "/systems.html",
    section: "book-summaries",
  },
  {
    id: "stillness-is-the-key",
    title: "Stillness is the Key",
    description: "In a world that never stops, the ability to be still is the ultimate competitive advantage.",
    category: "Stoicism · Mindfulness",
    href: "/Stillness.html",
    section: "book-summaries",
  },
];

// AI Resources - Stack items
const AI_STACK: SearchResult[] = [
  {
    id: "claude",
    title: "Claude",
    description: "Anthropic's AI assistant known for its strong safety alignment and nuanced reasoning capabilities.",
    category: "AI Model",
    href: "/claude-documentation.html",
    section: "ai-resources",
  },
  {
    id: "gpt-4",
    title: "GPT-4",
    description: "OpenAI's large language model with advanced reasoning and multimodal capabilities.",
    category: "AI Model",
    href: "/ai-resources#stack",
    section: "ai-resources",
  },
  {
    id: "gemini",
    title: "Google Gemini",
    description: "Google's multimodal AI model designed for complex reasoning and content generation.",
    category: "AI Model",
    href: "/gemini.html",
    section: "ai-resources",
  },
  {
    id: "cursor",
    title: "Cursor",
    description: "AI-powered code editor that integrates GPT-4 directly into your development workflow.",
    category: "Coding Tool",
    href: "/ai-resources#stack",
    section: "ai-resources",
  },
  {
    id: "perplexity",
    title: "Perplexity",
    description: "AI-powered search engine that provides direct answers with cited sources.",
    category: "Research Tool",
    href: "/ai-resources#stack",
    section: "ai-resources",
  },
];

// Community content
const COMMUNITY: SearchResult[] = [
  {
    id: "notice-board",
    title: "Notice Board",
    description: "Community announcements, updates, and important information for all members.",
    category: "Community",
    href: "/community#notice-board",
    section: "community",
  },
  {
    id: "question-of-week",
    title: "Question of the Week",
    description: "Weekly discussion prompts to spark thoughtful conversations across the community.",
    category: "Community",
    href: "/community#question",
    section: "community",
  },
  {
    id: "community-chat",
    title: "Community Chat",
    description: "Real-time discussions with fellow thinkers on topics that matter.",
    category: "Community",
    href: "/community#chat",
    section: "community",
  },
];

// The Log blog posts
const THE_LOG: SearchResult[] = [
  {
    id: "week-00",
    title: "Week 00: Fragments",
    description: "That was Week 00 for me. I had all the pieces — the name, the rough architecture of Colloque, the sense of what I wanted to say with The Log.",
    category: "The Log",
    href: "/the-log#week-00",
    section: "the-log",
  },
  {
    id: "week-01",
    title: "Week 01: The Reading Intelligence Framework",
    description: "Two ideas came out of this reading. First: Colloque isn't competing with Twitter or Substack — it's a different kind of thing entirely.",
    category: "The Log",
    href: "/the-log#week-01",
    section: "the-log",
  },
];

// Combined search index
export const SEARCH_INDEX: SearchResult[] = [
  ...IDEAS,
  ...BOOKS,
  ...AI_STACK,
  ...COMMUNITY,
  ...THE_LOG,
  ...HTML_SEARCH_INDEX,
];

// Search function with full content search
export function search(query: string): SearchResult[] {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  const results: SearchResult[] = [];
  
  SEARCH_INDEX.forEach((item) => {
    let matchType: "title" | "heading" | "content" | undefined;
    const textMatch: string[] = [];
    
    // Check title match
    if (item.title.toLowerCase().includes(lowerQuery)) {
      matchType = "title";
      textMatch.push(item.title);
    }
    
    // Check description match
    if (item.description.toLowerCase().includes(lowerQuery)) {
      if (!matchType) matchType = "content";
      textMatch.push(item.description);
    }
    
    // Check category match
    if (item.category.toLowerCase().includes(lowerQuery)) {
      if (!matchType) matchType = "content";
      textMatch.push(item.category);
    }
    
    // Check full content for HTML files
    const htmlContent = HTML_CONTENT_MAP[item.id];
    if (htmlContent) {
      // Check headings
      const headingMatch = htmlContent.headings.find(h => 
        h.text.toLowerCase().includes(lowerQuery)
      );
      if (headingMatch) {
        matchType = "heading";
        textMatch.push(headingMatch.text);
      }
      
      // Check full content
      if (htmlContent.fullContent.toLowerCase().includes(lowerQuery)) {
        if (!matchType) matchType = "content";
        // Extract snippet around match
        const contentLower = htmlContent.fullContent.toLowerCase();
        const matchIndex = contentLower.indexOf(lowerQuery);
        if (matchIndex !== -1) {
          const start = Math.max(0, matchIndex - 50);
          const end = Math.min(htmlContent.fullContent.length, matchIndex + lowerQuery.length + 50);
          const snippet = htmlContent.fullContent.substring(start, end).trim();
          textMatch.push(snippet);
        }
      }
    }
    
    if (matchType) {
      results.push({
        ...item,
        matchType,
        textMatch: textMatch.slice(0, 3), // Limit to 3 matches
      });
    }
  });
  
  // Sort by match type priority: title > heading > content
  const matchTypePriority = { title: 0, heading: 1, content: 2 };
  results.sort((a, b) => {
    const priorityA = matchTypePriority[a.matchType || 'content'];
    const priorityB = matchTypePriority[b.matchType || 'content'];
    return priorityA - priorityB;
  });
  
  return results;
}
