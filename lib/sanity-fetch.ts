import { client } from "@/sanity/lib/client";
import {
  articlesQuery,
  articleBySlugQuery,
  articleSlugsQuery,
  bookSummariesQuery,
  bookSummaryBySlugQuery,
  bookSummarySlugsQuery,
  logEntriesQuery,
  logEntryBySlugQuery,
  logEntrySlugsQuery,
  aiDispatchesQuery,
  aiDispatchBySlugQuery,
  aiModelsQuery,
  aiToolsQuery,
  taskRulesQuery,
  quizQuestionsQuery,
  aiPromptsQuery,
  learningLevelsQuery,
  stackItemsQuery,
} from "@/sanity/lib/queries";

// ─── Shared Types ────────────────────────────────────────────────────────────

export interface SanitySlug {
  current: string;
}

export interface SanityImage {
  asset: { _ref: string };
  hotspot?: { x: number; y: number };
}

export interface SanityBlock {
  _type: string;
  _key: string;
  children: { text: string }[];
}

// ─── Article (Intellect) ─────────────────────────────────────────────────────

export interface Article {
  _id: string;
  title: string;
  slug: SanitySlug;
  coverImage?: SanityImage;
  publishedAt?: string;
  excerpt?: string;
  author?: string;
  readTime?: number;
  body?: SanityBlock[];
  categories?: string[];
  isPremium: boolean;
}

export async function getArticles(): Promise<Article[]> {
  if (!client) return [];
  return client.fetch(articlesQuery, {}, { next: { revalidate: 60 } });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!client) return null;
  return client.fetch(articleBySlugQuery, { slug }, { next: { revalidate: 60 } });
}

export async function getArticleSlugs(): Promise<{ slug: string }[]> {
  if (!client) return [];
  const slugs = await client.fetch(articleSlugsQuery);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

// ─── Book Summary ─────────────────────────────────────────────────────────────

export interface BookSummary {
  _id: string;
  title: string;
  slug: SanitySlug;
  author: string;
  coverImage?: SanityImage;
  publishedAt?: string;
  excerpt?: string;
  rating?: number;
  readTime?: number;
  body?: SanityBlock[];
  categories?: string[];
  isPremium: boolean;
  featured: boolean;
}

export async function getBookSummaries(): Promise<BookSummary[]> {
  if (!client) return [];
  return client.fetch(bookSummariesQuery, {}, { next: { revalidate: 60 } });
}

export async function getBookSummaryBySlug(slug: string): Promise<BookSummary | null> {
  if (!client) return null;
  return client.fetch(bookSummaryBySlugQuery, { slug }, { next: { revalidate: 60 } });
}

export async function getBookSummarySlugs(): Promise<{ slug: string }[]> {
  if (!client) return [];
  const slugs = await client.fetch(bookSummarySlugsQuery);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

// ─── Log Entry ────────────────────────────────────────────────────────────────

export interface LogEntry {
  _id: string;
  title: string;
  slug: SanitySlug;
  coverImage?: SanityImage;
  publishedAt?: string;
  excerpt?: string;
  body?: SanityBlock[];
  categories?: string[];
  isPremium: boolean;
  likesCount: number;
}

export async function getLogEntries(): Promise<LogEntry[]> {
  if (!client) return [];
  return client.fetch(logEntriesQuery, {}, { next: { revalidate: 60 } });
}

export async function getLogEntryBySlug(slug: string): Promise<LogEntry | null> {
  if (!client) return null;
  return client.fetch(logEntryBySlugQuery, { slug }, { next: { revalidate: 60 } });
}

export async function getLogEntrySlugs(): Promise<{ slug: string }[]> {
  if (!client) return [];
  const slugs = await client.fetch(logEntrySlugsQuery);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

// ─── AI Dispatch ─────────────────────────────────────────────────────────────

export interface AiDispatch {
  _id: string;
  title: string;
  slug: SanitySlug;
  weekNumber?: number;
  coverImage?: SanityImage;
  publishedAt?: string;
  summary?: string;
  body?: SanityBlock[];
  tools?: { name: string; url: string; description: string }[];
  categories?: string[];
  isPremium: boolean;
}

export async function getAiDispatches(): Promise<AiDispatch[]> {
  if (!client) return [];
  return client.fetch(aiDispatchesQuery, {}, { next: { revalidate: 60 } });
}

export async function getAiDispatchBySlug(slug: string): Promise<AiDispatch | null> {
  if (!client) return null;
  return client.fetch(aiDispatchBySlugQuery, { slug }, { next: { revalidate: 60 } });
}

// ─── AI Model ───────────────────────────────────────────────────────────────

export interface AiModel {
  _id: string;
  name: string;
  bestAt: string;
  weakness: string;
  idealFor: string;
  order: number;
}

export async function getAiModels(): Promise<AiModel[]> {
  if (!client) return [];
  return client.fetch(aiModelsQuery, {}, { next: { revalidate: 60 } });
}

// ─── AI Tool ────────────────────────────────────────────────────────────────

export interface AiTool {
  _id: string;
  name: string;
  description: string;
  category: "Writing" | "Coding" | "Image" | "Video" | "Research" | "Productivity";
  pricing: "Free" | "Paid" | "Freemium";
  url: string;
  order: number;
}

export async function getAiTools(): Promise<AiTool[]> {
  if (!client) return [];
  return client.fetch(aiToolsQuery, {}, { next: { revalidate: 60 } });
}

// ─── Task Rule ───────────────────────────────────────────────────────────────

export interface TaskRule {
  _id: string;
  keywords: string[];
  model: string;
  modelReason: string;
  tool: string;
  toolReason: string;
  order: number;
}

export async function getTaskRules(): Promise<TaskRule[]> {
  if (!client) return [];
  return client.fetch(taskRulesQuery, {}, { next: { revalidate: 60 } });
}

// ─── Quiz Question ───────────────────────────────────────────────────────────

export interface QuizQuestion {
  _id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: string;
  order: number;
}

export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  if (!client) return [];
  return client.fetch(quizQuestionsQuery, {}, { next: { revalidate: 60 } });
}

// ─── AI Prompt ──────────────────────────────────────────────────────────────

export interface AiPrompt {
  _id: string;
  id: string;
  category: "Image Editing" | "Image Generation" | "Video" | "Web/UI" | "Writing & Thinking";
  prompt: string;
  produces: string;
  order: number;
}

export async function getAiPrompts(): Promise<AiPrompt[]> {
  if (!client) return [];
  return client.fetch(aiPromptsQuery, {}, { next: { revalidate: 60 } });
}

// ─── Learning Level ─────────────────────────────────────────────────────────

export interface LearningLevel {
  _id: string;
  num: number;
  title: string;
  concept: string;
  resourceTitle: string;
  resourceUrl: string;
  resourceType: "Paper" | "Video" | "Article";
  exercise: string;
}

export async function getLearningLevels(): Promise<LearningLevel[]> {
  if (!client) return [];
  return client.fetch(learningLevelsQuery, {}, { next: { revalidate: 60 } });
}

// ─── Stack Item ───────────────────────────────────────────────────────────────

export interface StackItem {
  _id: string;
  name: string;
  description: string;
  useCase: string;
  whyThis?: string;
  category: string;
  pricing: "Free" | "Paid" | "Freemium";
  documentation?: string;
  pipeline?: string;
  cheatsheet?: string;
  image?: string;
  downloadLink?: string;
}

export async function getStackItems(): Promise<StackItem[]> {
  if (!client) return [];
  return client.fetch(stackItemsQuery, {}, { next: { revalidate: 60 } });
}
