export type ModelInfo = {
  name: string;
  bestAt: string;
  weakness: string;
  idealFor: string;
};

export type Tool = {
  name: string;
  description: string;
  category: "Writing" | "Coding" | "Image" | "Video" | "Research" | "Productivity";
  pricing: "Free" | "Paid" | "Freemium";
  url: string;
};

export type Question = {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: string;
};

export type Prompt = {
  id: string;
  category: "Image Editing" | "Image Generation" | "Video" | "Web/UI" | "Writing & Thinking";
  prompt: string;
  produces: string;
};

export type Level = {
  num: number;
  title: string;
  concept: string;
  resource: { title: string; url: string; type: "Paper" | "Video" | "Article" };
  exercise: string;
};

export type DispatchWeek = {
  week: string;
  dropped: { headline: string; detail: string };
  matters: { headline: string; detail: string };
  overhyped: { headline: string; detail: string };
};

export const DISPATCH_WEEKS: DispatchWeek[] = [
  {
    week: "Week of Apr 21, 2025",
    dropped: {
      headline: "GPT-4.5 preview expanded to all Plus users",
      detail: "OpenAI rolled out GPT-4.5 broadly — improved emotional nuance and better steerability via system prompts. Noticeably less robotic on open-ended tasks.",
    },
    matters: {
      headline: "Anthropic updated its Constitutional AI guidance",
      detail: "Revised documentation on how Claude's value alignment works in practice. If you use Claude for high-stakes output, this is worth 20 minutes. It changes how you should structure system prompts.",
    },
    overhyped: {
      headline: "'AI is disrupting Hollywood' (again)",
      detail: "Runway Gen-3 and Sora produce impressive clips. Professional production pipelines haven't moved. The gap between demo reel and deployment remains large — and mostly unspoken in coverage.",
    },
  },
  {
    week: "Week of Apr 14, 2025",
    dropped: {
      headline: "Gemini 2.0 Flash Lite went stable",
      detail: "Google's most cost-efficient model hit stable status. Relevant if you're building on the API and prioritising throughput over frontier capability.",
    },
    matters: {
      headline: "Meta released Llama 3.1 405B weights",
      detail: "Largest open-weights model to date. Performance competitive with GPT-4 on several benchmarks. Self-hosting AI just became materially more viable for serious teams.",
    },
    overhyped: {
      headline: "AI agents replacing knowledge workers in 2025",
      detail: "Agentic demos are impressive. Reliable, unsupervised production deployment is not there. The bottleneck is error compounding across tool calls — not raw capability.",
    },
  },
  {
    week: "Week of Apr 7, 2025",
    dropped: {
      headline: "Perplexity launched Pro Search with inline citations",
      detail: "Upgraded search surfaces inline source citations per claim. Useful if you use Perplexity for research verification rather than just answer retrieval.",
    },
    matters: {
      headline: "Stanford's 2025 AI Index Report released",
      detail: "Key finding: AI capabilities are improving faster than our ability to evaluate them. Benchmark saturation is a real, documented problem — not a talking point.",
    },
    overhyped: {
      headline: "'Reasoning models' as a general-purpose upgrade",
      detail: "o1-class models genuinely improve on structured multi-step problems. The marketing overstates gains on open-ended tasks vs. standard GPT-4-class models.",
    },
  },
  {
    week: "Week of Mar 31, 2025",
    dropped: {
      headline: "Claude 3.5 Haiku now supports extended thinking",
      detail: "Anthropic brought chain-of-thought reasoning to their fastest model. Cost-efficiency + reasoning in one API call — worth re-evaluating if you dismissed Haiku.",
    },
    matters: {
      headline: "Google DeepMind published AlphaFold 3 full weights",
      detail: "The full model is now open for non-commercial use. Foundational for anyone working at the intersection of AI and biology or drug discovery.",
    },
    overhyped: {
      headline: "Autonomous AI startups 'months away from AGI'",
      detail: "Several well-funded labs made bold timeline claims this week. The technical delta between impressive agentic demos and robust general intelligence remains enormous.",
    },
  },
];

export const MODELS: ModelInfo[] = [
  {
    name: "GPT-4o",
    bestAt: "Multimodal tasks, broad instruction-following, general reasoning, image analysis",
    weakness: "Can be verbose; expensive at scale; sometimes overconfident on uncertain facts",
    idealFor: "General use, vision + text tasks, API-first products, most default workloads",
  },
  {
    name: "Claude 3.5 Sonnet",
    bestAt: "Long-context analysis, nuanced writing, complex multi-step instruction adherence",
    weakness: "More cautious refusals on edge cases; slightly slower on simple tasks",
    idealFor: "Long documents, creative writing, research synthesis, high-stakes output",
  },
  {
    name: "Gemini 1.5 Pro",
    bestAt: "Extremely long context (1M tokens), Google Workspace integration, video understanding",
    weakness: "Inconsistent on creative tasks; less fine-tuned for distinct writing style",
    idealFor: "Document-heavy enterprise workflows, Google ecosystem users",
  },
  {
    name: "Perplexity",
    bestAt: "Real-time web search with cited sources; current events and fact verification",
    weakness: "Not a general LLM — poor at creative or analytical tasks without a search hook",
    idealFor: "Research verification, finding current information, competitive analysis",
  },
  {
    name: "Mistral Large",
    bestAt: "Fast inference, cost-efficient at scale, strong multilingual support",
    weakness: "Less capable than top-tier models on complex multi-step reasoning",
    idealFor: "High-volume API workloads, European data residency requirements",
  },
  {
    name: "Llama 3.1 405B",
    bestAt: "Open weights, self-hostable, competitive benchmark performance",
    weakness: "Requires significant compute infrastructure; no official support or SLA",
    idealFor: "Teams needing full data privacy, open-source or regulated deployments",
  },
];

export const TOOLS: Tool[] = [
  { name: "GitHub Copilot", description: "AI pair programmer integrated directly into your editor", category: "Coding", pricing: "Paid", url: "https://github.com/features/copilot" },
  { name: "Cursor", description: "VS Code fork with GPT-4 and Claude natively embedded", category: "Coding", pricing: "Freemium", url: "https://cursor.sh" },
  { name: "Codeium", description: "Free AI code completion supporting 70+ languages", category: "Coding", pricing: "Free", url: "https://codeium.com" },
  { name: "Notion AI", description: "Writing assistance, summarisation, and Q&A inside Notion", category: "Writing", pricing: "Paid", url: "https://notion.so/product/ai" },
  { name: "Jasper", description: "Marketing copy and brand-voice writing assistant", category: "Writing", pricing: "Paid", url: "https://jasper.ai" },
  { name: "Hemingway App", description: "Readability editor that identifies and cuts excess from prose", category: "Writing", pricing: "Freemium", url: "https://hemingwayapp.com" },
  { name: "Midjourney", description: "Best-in-class aesthetic image generation via web or Discord", category: "Image", pricing: "Paid", url: "https://midjourney.com" },
  { name: "Adobe Firefly", description: "Commercial-safe generative image tools inside Creative Cloud", category: "Image", pricing: "Freemium", url: "https://firefly.adobe.com" },
  { name: "DALL-E 3", description: "OpenAI's image generator, accessible natively via ChatGPT", category: "Image", pricing: "Paid", url: "https://openai.com/dall-e-3" },
  { name: "RunwayML", description: "Professional AI video editing and generation platform", category: "Video", pricing: "Freemium", url: "https://runwayml.com" },
  { name: "Pika Labs", description: "Text-to-video and image-to-video generation with motion controls", category: "Video", pricing: "Freemium", url: "https://pika.art" },
  { name: "Perplexity", description: "AI search engine with real-time web access and inline citations", category: "Research", pricing: "Freemium", url: "https://perplexity.ai" },
  { name: "Consensus", description: "AI search over 200M+ scientific papers with evidence ratings", category: "Research", pricing: "Freemium", url: "https://consensus.app" },
  { name: "Elicit", description: "Literature review automation for researchers and analysts", category: "Research", pricing: "Freemium", url: "https://elicit.com" },
  { name: "Mem.ai", description: "AI-powered note-taking that connects ideas across your vault", category: "Productivity", pricing: "Paid", url: "https://mem.ai" },
  { name: "Reclaim AI", description: "Smart calendar scheduling that defends focus time automatically", category: "Productivity", pricing: "Freemium", url: "https://reclaim.ai" },
];

export const TASK_RULES: {
  keywords: string[];
  model: string;
  modelReason: string;
  tool: string;
  toolReason: string;
}[] = [
  {
    keywords: ["code", "coding", "bug", "debug", "program", "script", "function", "api", "refactor", "build", "develop", "software"],
    model: "Claude 3.5 Sonnet",
    modelReason: "Best-in-class for code generation, debugging, and multi-file reasoning tasks.",
    tool: "Cursor",
    toolReason: "Claude and GPT-4 embedded in your editor — fastest code iteration loop available.",
  },
  {
    keywords: ["write", "writing", "essay", "blog", "content", "copy", "email", "article", "draft", "edit", "prose", "post"],
    model: "GPT-4o",
    modelReason: "Excellent instruction-following and stylistic range across all writing formats.",
    tool: "Notion AI",
    toolReason: "Tight integration with your writing environment — outline, draft, edit without switching context.",
  },
  {
    keywords: ["research", "find", "search", "news", "current", "latest", "facts", "sources", "citation", "verify", "today"],
    model: "Perplexity",
    modelReason: "Real-time web access with cited sources — no training cutoff.",
    tool: "Perplexity",
    toolReason: "The tool is the model here: best-in-class AI search with claim-level citations.",
  },
  {
    keywords: ["image", "photo", "visual", "picture", "generate", "draw", "illustration", "design", "mockup", "art"],
    model: "GPT-4o",
    modelReason: "Strong multimodal understanding; pairs with DALL-E 3 natively for image tasks.",
    tool: "Midjourney",
    toolReason: "Highest aesthetic quality in image generation across all major tools.",
  },
  {
    keywords: ["video", "animation", "film", "motion", "clip", "footage", "cinematic", "reel"],
    model: "GPT-4o",
    modelReason: "Best for scripting, storyboarding, and prompt engineering for video generation.",
    tool: "RunwayML",
    toolReason: "Most capable professional video AI platform — motion controls, inpainting, style transfer.",
  },
  {
    keywords: ["analyze", "analysis", "data", "spreadsheet", "chart", "statistics", "math", "numbers", "calculate"],
    model: "GPT-4o",
    modelReason: "Code Interpreter mode handles data analysis, charting, and calculation natively.",
    tool: "Claude 3.5 Sonnet",
    toolReason: "Superior for long analytical documents and structured output extraction at scale.",
  },
  {
    keywords: ["summarize", "summary", "long", "document", "pdf", "report", "paper", "transcript"],
    model: "Claude 3.5 Sonnet",
    modelReason: "200k context window handles very long documents without chunking overhead.",
    tool: "Notion AI",
    toolReason: "Summarise documents inline — paste in, summarise, and iterate without leaving your workspace.",
  },
  {
    keywords: ["translate", "translation", "language", "multilingual", "spanish", "french", "german", "arabic"],
    model: "Mistral Large",
    modelReason: "Strongest multilingual model with excellent European and Arabic language support.",
    tool: "Perplexity",
    toolReason: "Handles translation queries with real-time context when terminology precision matters.",
  },
];

export const QUIZ_QUESTIONS: Question[] = [
  {
    q: "What does 'temperature' control in a language model?",
    options: ["Processing speed", "Randomness and diversity of output", "Context window size", "Training data recency"],
    correct: 1,
    explanation: "Temperature scales the probability distribution over tokens. Higher = more varied and creative output. Lower = more deterministic and predictable.",
    topic: "Model Configuration",
  },
  {
    q: "You need to summarise a 300-page report. Which model capability matters most?",
    options: ["Model speed", "Context window size", "Number of parameters", "Multimodal support"],
    correct: 1,
    explanation: "Long documents require a large context window. Gemini 1.5 Pro (1M tokens) or Claude 3.5 (200k) handle this; standard GPT-4 fits ~128k tokens.",
    topic: "Model Selection",
  },
  {
    q: "What is a 'hallucination' in LLM output?",
    options: ["A model refusing to answer", "Confident, fluent output that is factually false", "A model repeating the same text", "Garbled or incoherent token output"],
    correct: 1,
    explanation: "Hallucinations are structurally generated — confident-sounding falsehoods produced by next-token prediction. They're not a bug to patch; they're inherent to the architecture.",
    topic: "Output Evaluation",
  },
  {
    q: "RAG (Retrieval-Augmented Generation) is used primarily to:",
    options: ["Speed up model inference", "Ground model output in external verified documents", "Reduce the cost of API calls", "Enable multimodal capabilities"],
    correct: 1,
    explanation: "RAG retrieves relevant documents at inference time and injects them into the prompt — reducing hallucinations and extending knowledge beyond the training cutoff.",
    topic: "Architecture",
  },
  {
    q: "Chain-of-thought prompting improves performance by:",
    options: ["Asking the model to cite sources", "Instructing the model to reason step-by-step before answering", "Using multiple models in sequence", "Limiting output to structured formats"],
    correct: 1,
    explanation: "CoT instructs the model to surface intermediate reasoning steps before giving a final answer. This significantly improves arithmetic, logic, and multi-step tasks.",
    topic: "Prompt Engineering",
  },
  {
    q: "A 'system prompt' is best described as:",
    options: ["The first message a user types", "Instructions that define model behaviour before any user turn", "A special token that activates reasoning mode", "The model's primary training objective"],
    correct: 1,
    explanation: "System prompts define role, constraints, tone, and persona before conversation starts. They're invisible to end users in most deployed products.",
    topic: "Prompt Engineering",
  },
  {
    q: "For real-time information (today's news, current prices), the most appropriate tool is:",
    options: ["GPT-4o", "Claude 3.5 Sonnet", "Perplexity", "Mistral Large"],
    correct: 2,
    explanation: "Perplexity searches the live web and cites sources inline. Standard LLMs have a hard training cutoff and cannot access current events without a retrieval layer.",
    topic: "Tool Selection",
  },
  {
    q: "The most effective way to reduce hallucinations in high-stakes output is:",
    options: ["Use a lower temperature setting", "Ask the model to 'be confident and accurate'", "Ground the model in verified sources using RAG", "Choose a larger parameter model"],
    correct: 2,
    explanation: "Grounding via RAG forces the model to answer from real context. Temperature tweaking and model size alone don't address the structural cause of hallucinations.",
    topic: "Output Evaluation",
  },
  {
    q: "Fine-tuning a model primarily teaches it to:",
    options: ["Learn new factual knowledge it never saw in training", "Adopt specific formats, styles, and response patterns", "Improve general benchmark performance across tasks", "Use retrieval from external databases"],
    correct: 1,
    explanation: "Fine-tuning shapes output format and style. It doesn't reliably inject new factual knowledge — that still requires RAG or retraining on updated data.",
    topic: "Model Configuration",
  },
  {
    q: "When evaluating two model outputs, the most reliable quality criterion is:",
    options: ["Length — more thorough means longer", "Fluency — it reads naturally", "Accuracy and relevance to the specific task requirement", "Which model produced it"],
    correct: 2,
    explanation: "Fluency and length are surface signals. Real quality = does it accurately address the specific task? Models can be fluently, confidently wrong.",
    topic: "Output Evaluation",
  },
];

export const PROMPTS: Prompt[] = [
  { id: "ie1", category: "Image Editing", prompt: "Remove the background from this image, preserve all hair strands and fine edges, output on transparent PNG. No colour cast on the subject edges.", produces: "Clean cutout with preserved fine details" },
  { id: "ie2", category: "Image Editing", prompt: "Relight this portrait: add a soft rim light from the upper left at 30% intensity, preserve accurate skin tones, no colour cast on neutrals.", produces: "Editorial-quality portrait relight" },
  { id: "ie3", category: "Image Editing", prompt: "Apply a film grain texture equivalent to ISO 800, add a subtle vignette (15% opacity), desaturate 12%, push shadows slightly toward teal.", produces: "Cinematic analog film grade" },
  { id: "ig1", category: "Image Generation", prompt: "Photorealistic portrait of a 35-year-old architect, natural north-facing window light, shallow depth of field, Hasselblad medium format look, editorial magazine style, no obvious AI artefacts.", produces: "High-fidelity editorial portrait" },
  { id: "ig2", category: "Image Generation", prompt: "Concept art: abandoned brutalist library overgrown with bioluminescent vines, moonlight through a cracked skylight, volumetric fog at floor level, 8K matte painting, cinematic aspect ratio.", produces: "Cinematic environment concept art" },
  { id: "ig3", category: "Image Generation", prompt: "Minimal product mockup: matte black ceramic coffee mug on white Carrara marble, top-down flat lay, single soft shadow, clean studio lighting, commercial photography style.", produces: "E-commerce ready product shot" },
  { id: "ig4", category: "Image Generation", prompt: "Isometric illustration of a cozy home office at night: warm desk lamp, packed bookshelves, rain against a dark window, flat design with subtle paper grain texture.", produces: "Polished editorial illustration" },
  { id: "v1", category: "Video", prompt: "5-second cinematic intro: camera slowly pulls back from extreme close-up on an aged book cover to reveal a candlelit library. Warm grade. No text. No music. Smooth motion.", produces: "Atmospheric cinematic title sequence" },
  { id: "v2", category: "Video", prompt: "Product reveal: a glass perfume bottle rises from water in slow motion, droplets suspended mid-frame, gold and deep black palette, 2-second seamless loop, no camera shake.", produces: "Luxury product reveal loop" },
  { id: "wu1", category: "Web/UI", prompt: "Landing page hero for a fintech app: strong headline, one-line subheadline, primary CTA, abstract data visualisation as background, dark mode, 4-item trust signal row at bottom. No stock photos.", produces: "Conversion-optimised hero layout" },
  { id: "wu2", category: "Web/UI", prompt: "Analytics dashboard: sidebar nav, 4 KPI stat cards in a row, weekly line chart, top-content performance table. Minimal design system — cream background, single accent colour.", produces: "Analytics dashboard wireframe" },
  { id: "wu3", category: "Web/UI", prompt: "Mobile checkout: 3 screens — cart review, shipping details, order confirmation. High contrast, thumb-accessible tap targets, no unnecessary fields, progress indicator visible at all times.", produces: "Mobile-first checkout UX flow" },
  { id: "wu4", category: "Web/UI", prompt: "Build an accessible FAQ accordion component: smooth CSS height animation, keyboard navigable, ARIA attributes correct, zero JavaScript frameworks, semantic HTML.", produces: "Accessible zero-dependency accordion" },
  { id: "wt1", category: "Writing & Thinking", prompt: "Act as a rigorous editor. Read this essay draft and return: (1) the core argument in one sentence, (2) the 3 weakest claims with reasons, (3) one structural improvement. Be direct, not encouraging.", produces: "Structured editorial critique" },
  { id: "wt2", category: "Writing & Thinking", prompt: "Generate a Socratic dialogue: one character argues AI enhances human creativity, the other argues it erodes it. Neither wins. Surface the strongest version of both positions. No resolution.", produces: "Balanced philosophical dialogue" },
  { id: "wt3", category: "Writing & Thinking", prompt: "Summarise this text in 5 layers: (1) one sentence, (2) one paragraph, (3) key argument map as bullet points, (4) three strongest counterarguments, (5) what the author underestimates.", produces: "Multi-depth layered summary" },
  { id: "wt4", category: "Writing & Thinking", prompt: "You are a sceptical venture capitalist with 20 years of experience. Give me the 5 hardest questions you would ask about this business idea: [idea]. No softening. No encouragement.", produces: "High-pressure investment stress test" },
];

export const LEARNING_LEVELS: Level[] = [
  {
    num: 1,
    title: "LLMs & How They Work",
    concept: "Large language models are neural networks trained to predict the next token in a sequence. They don't 'know' things — they model statistical patterns in text. Understanding this single fact explains why they hallucinate, why prompt structure matters, and why their failures are often confident. The transformer architecture (2017) is the foundational breakthrough. Everything in modern AI builds on it.",
    resource: { title: "Attention Is All You Need — Vaswani et al., 2017", url: "https://arxiv.org/abs/1706.03762", type: "Paper" },
    exercise: "Take any LLM output on a topic you know deeply. Find one claim that is confident but slightly wrong. Write one paragraph explaining why pattern-matching — not knowledge — would produce exactly that error.",
  },
  {
    num: 2,
    title: "NLP Foundations",
    concept: "Before transformers, NLP relied on recurrent networks and bag-of-words representations. The shift to dense vector embeddings made semantic similarity computable at scale. Understanding tokenisation, embedding spaces, and the attention mechanism gives you real leverage when designing prompts and diagnosing output failures. Most good prompt engineering intuition derives directly from this layer.",
    resource: { title: "The Illustrated Transformer — Jay Alammar", url: "https://jalammar.github.io/illustrated-transformer/", type: "Article" },
    exercise: "Use the TensorFlow Embedding Projector (projector.tensorflow.org) to explore how semantically similar words cluster in vector space. Notice what cultural assumptions are encoded in the geometry.",
  },
  {
    num: 3,
    title: "The Memory Problem",
    concept: "LLMs have no persistent memory. Every conversation is stateless beyond the active context window. This single constraint drives nearly every architectural decision in applied AI: RAG systems, vector databases, summarisation pipelines, and multi-agent frameworks are all workarounds for the same problem. Understanding it clearly lets you evaluate AI product claims with significantly more precision.",
    resource: { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks — Lewis et al.", url: "https://arxiv.org/abs/2005.11401", type: "Paper" },
    exercise: "Build a minimal RAG pipeline without a framework: chunk a PDF, embed the chunks using any embedding API, and retrieve the most relevant passage for a query using cosine similarity. Just numpy and one API call.",
  },
  {
    num: 4,
    title: "Applied AI",
    concept: "Deploying AI in production introduces challenges that benchmarks never measure: latency, cost per token, output consistency across distributions, evaluation at scale, and graceful failure handling. The gap between impressive demo and reliable product is where most teams get stuck. The core applied skill is designing prompts for robustness — not for the best-case output — and building evaluation rubrics before you build features.",
    resource: { title: "Building LLM Applications for Production — Chip Huyen", url: "https://huyenchip.com/2023/04/11/llm-engineering.html", type: "Article" },
    exercise: "Design an evaluation rubric for one specific LLM task you use regularly. Define 5 measurable criteria. Run 20 prompts through two different models and score them manually. Document where they diverge.",
  },
  {
    num: 5,
    title: "The Future Layer",
    concept: "The next wave is agentic AI: systems that take actions, use tools, and operate over longer horizons with reduced supervision. Multi-agent frameworks, function calling, and o1-class reasoning models are early signals. The unsolved problems — reliable long-horizon planning, error compounding in tool chains, and interpretability at scale — will define the next five years of the field. Understanding these constraints is what separates signal from hype.",
    resource: { title: "ReAct: Synergizing Reasoning and Acting in Language Models — Yao et al.", url: "https://arxiv.org/abs/2210.03629", type: "Paper" },
    exercise: "Design a multi-agent system on paper for a task you know well. Map agents, tools, handoffs, and failure points. Identify every step where human oversight is still required — and be honest about why.",
  },
];
