import type { Metadata } from "next";
import { 
  getAiDispatches, 
  getAiModels, 
  getAiTools, 
  getTaskRules, 
  getQuizQuestions, 
  getAiPrompts, 
  getLearningLevels,
  getStackItems
} from "@/lib/sanity-fetch";
import { urlFor } from "@/sanity/lib/image";
import { isSanityConfigured } from "@/sanity/env";
import AIResourcesClient from "./AIResourcesClient";
import { 
  MODELS as MODELS_STATIC, 
  TOOLS as TOOLS_STATIC, 
  TASK_RULES as TASK_RULES_STATIC, 
  QUIZ_QUESTIONS as QUIZ_QUESTIONS_STATIC, 
  PROMPTS as PROMPTS_STATIC, 
  LEARNING_LEVELS as LEARNING_LEVELS_STATIC,
  STACK_ITEMS as STACK_ITEMS_STATIC
} from "./data";

export const metadata: Metadata = {
  title: "AI Resources",
  description: "Weekly AI dispatches, model comparisons, tool guides, and a prompt library — everything you need to work smarter with AI.",
  openGraph: {
    title: "AI Resources | Colloque",
    description: "Weekly AI dispatches, model comparisons, tool guides, and a prompt library.",
    url: "https://colloque.in/ai-resources",
    images: [{ url: "/api/og?title=AI+Resources", width: 1200, height: 630 }],
  },
};

export const revalidate = 60;

export default async function AIResourcesPage({
  searchParams,
}: {
  searchParams: { q?: string; section?: string };
}) {
  const query = searchParams.q?.toLowerCase().trim() ?? "";
  const targetId = searchParams.section ?? "";

  let aiDispatches: any[] = [];
  let models = MODELS_STATIC;
  let tools = TOOLS_STATIC;
  let taskRules = TASK_RULES_STATIC;
  let quizQuestions = QUIZ_QUESTIONS_STATIC;
  let prompts = PROMPTS_STATIC;
  let learningLevels = LEARNING_LEVELS_STATIC;
  let stackItems = STACK_ITEMS_STATIC;

  if (isSanityConfigured) {
    const sanityDispatches = await getAiDispatches();
    if (sanityDispatches.length > 0) {
      aiDispatches = sanityDispatches.map((dispatch) => ({
        _id: dispatch._id,
        title: dispatch.title,
        slug: dispatch.slug.current,
        weekNumber: dispatch.weekNumber,
        coverImage: dispatch.coverImage ? urlFor(dispatch.coverImage).width(1200).url() : "",
        publishedAt: dispatch.publishedAt,
        summary: dispatch.summary ?? "",
        tools: dispatch.tools ?? [],
        categories: dispatch.categories ?? [],
        isPremium: dispatch.isPremium,
      }));
    }

    const sanityModels = await getAiModels();
    if (sanityModels.length > 0) {
      models = sanityModels.map((m) => ({
        name: m.name,
        bestAt: m.bestAt,
        weakness: m.weakness,
        idealFor: m.idealFor,
      }));
    }

    const sanityTools = await getAiTools();
    if (sanityTools.length > 0) {
      tools = sanityTools.map((t) => ({
        name: t.name,
        description: t.description,
        category: t.category,
        pricing: t.pricing,
        url: t.url,
      }));
    }

    const sanityTaskRules = await getTaskRules();
    if (sanityTaskRules.length > 0) {
      taskRules = sanityTaskRules.map((r) => ({
        keywords: r.keywords,
        model: r.model,
        modelReason: r.modelReason,
        tool: r.tool,
        toolReason: r.toolReason,
      }));
    }

    const sanityQuizQuestions = await getQuizQuestions();
    if (sanityQuizQuestions.length > 0) {
      quizQuestions = sanityQuizQuestions.map((q) => ({
        q: q.question,
        options: q.options,
        correct: q.correct,
        explanation: q.explanation,
        topic: q.topic,
      }));
    }

    const sanityPrompts = await getAiPrompts();
    if (sanityPrompts.length > 0) {
      prompts = sanityPrompts.map((p) => ({
        id: p.id,
        category: p.category,
        prompt: p.prompt,
        produces: p.produces,
      }));
    }

    const sanityLearningLevels = await getLearningLevels();
    if (sanityLearningLevels.length > 0) {
      learningLevels = sanityLearningLevels.map((l) => ({
        num: l.num,
        title: l.title,
        concept: l.concept,
        resource: {
          title: l.resourceTitle,
          url: l.resourceUrl,
          type: l.resourceType,
        },
        exercise: l.exercise,
      }));
    }

    const sanityStackItems = await getStackItems();
    if (sanityStackItems.length > 0) {
      stackItems = sanityStackItems;
    }
  }

  return (
    <AIResourcesClient
      aiDispatches={aiDispatches}
      models={models}
      tools={tools}
      taskRules={taskRules}
      quizQuestions={quizQuestions}
      prompts={prompts}
      learningLevels={learningLevels}
      stackItems={stackItems}
      query={query}
      targetId={targetId}
    />
  );
}
