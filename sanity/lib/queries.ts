import { groq } from "next-sanity";

// ─── Articles (Intellect) ────────────────────────────────────────────────────

export const articlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    coverImage,
    publishedAt,
    excerpt,
    author,
    readTime,
    categories,
    isPremium
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    coverImage,
    publishedAt,
    excerpt,
    author,
    readTime,
    body,
    categories,
    isPremium
  }
`;

export const articleSlugsQuery = groq`
  *[_type == "article"] { "slug": slug.current }
`;

// ─── Book Summaries ──────────────────────────────────────────────────────────

export const bookSummariesQuery = groq`
  *[_type == "bookSummary"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    coverImage,
    publishedAt,
    excerpt,
    rating,
    readTime,
    categories,
    isPremium,
    featured
  }
`;

export const bookSummaryBySlugQuery = groq`
  *[_type == "bookSummary" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author,
    coverImage,
    publishedAt,
    excerpt,
    rating,
    readTime,
    body,
    categories,
    isPremium,
    featured
  }
`;

export const bookSummarySlugsQuery = groq`
  *[_type == "bookSummary"] { "slug": slug.current }
`;

// ─── Log Entries ─────────────────────────────────────────────────────────────

export const logEntriesQuery = groq`
  *[_type == "logEntry"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    coverImage,
    publishedAt,
    excerpt,
    categories,
    isPremium,
    likesCount
  }
`;

export const logEntryBySlugQuery = groq`
  *[_type == "logEntry" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    coverImage,
    publishedAt,
    excerpt,
    body,
    categories,
    isPremium,
    likesCount
  }
`;

export const logEntrySlugsQuery = groq`
  *[_type == "logEntry"] { "slug": slug.current }
`;

// ─── AI Dispatch ─────────────────────────────────────────────────────────────

export const aiDispatchesQuery = groq`
  *[_type == "aiDispatch"] | order(weekNumber desc) {
    _id,
    title,
    slug,
    weekNumber,
    coverImage,
    publishedAt,
    summary,
    tools,
    categories,
    isPremium
  }
`;

export const aiDispatchBySlugQuery = groq`
  *[_type == "aiDispatch" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    weekNumber,
    coverImage,
    publishedAt,
    summary,
    body,
    tools,
    categories,
    isPremium
  }
`;

// ─── AI Models ─────────────────────────────────────────────────────────────

export const aiModelsQuery = groq`
  *[_type == "aiModel"] | order(order asc) {
    _id,
    name,
    bestAt,
    weakness,
    idealFor,
    order
  }
`;

// ─── AI Tools ──────────────────────────────────────────────────────────────

export const aiToolsQuery = groq`
  *[_type == "aiTool"] | order(order asc) {
    _id,
    name,
    description,
    category,
    pricing,
    url,
    order
  }
`;

// ─── Task Rules ────────────────────────────────────────────────────────────

export const taskRulesQuery = groq`
  *[_type == "taskRule"] | order(order asc) {
    _id,
    keywords,
    model,
    modelReason,
    tool,
    toolReason,
    order
  }
`;

// ─── Quiz Questions ────────────────────────────────────────────────────────

export const quizQuestionsQuery = groq`
  *[_type == "quizQuestion"] | order(order asc) {
    _id,
    question,
    options,
    correct,
    explanation,
    topic,
    order
  }
`;

// ─── AI Prompts ────────────────────────────────────────────────────────────

export const aiPromptsQuery = groq`
  *[_type == "aiPrompt"] | order(order asc) {
    _id,
    id,
    category,
    prompt,
    produces,
    order
  }
`;

// ─── Learning Levels ────────────────────────────────────────────────────────

export const learningLevelsQuery = groq`
  *[_type == "learningLevel"] | order(num asc) {
    _id,
    num,
    title,
    concept,
    resourceTitle,
    resourceUrl,
    resourceType,
    exercise
  }
`;

// ─── Stack Items ───────────────────────────────────────────────────────────────

export const stackItemsQuery = groq`
  *[_type == "stackItem"] | order(order asc) {
    _id,
    name,
    description,
    useCase,
    whyThis,
    category,
    pricing,
    documentation,
    pipeline,
    cheatsheet,
    image,
    downloadLink
  }
`;
