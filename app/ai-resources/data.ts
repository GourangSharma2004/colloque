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
  htmlFile?: string;
};

export type StackItem = {
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
};

export const DISPATCH_WEEKS: DispatchWeek[] = [
  {
    week: "Week of June 29, 2026",
    dropped: {
      headline: "New dispatch available — click to read",
      detail: "New dispatch available — click to read",
    },
    matters: {
      headline: "New dispatch available — click to read",
      detail: "New dispatch available — click to read",
    },
    overhyped: {
      headline: "New dispatch available — click to read",
      detail: "New dispatch available — click to read",
    },
    htmlFile: "/week 2/week-1-dispatch.html",
  },
  {
    week: "Week of June 22, 2026",
    dropped: {
      headline: "New dispatch available — click to read",
      detail: "New dispatch available — click to read",
    },
    matters: {
      headline: "New dispatch available — click to read",
      detail: "New dispatch available — click to read",
    },
    overhyped: {
      headline: "New dispatch available — click to read",
      detail: "New dispatch available — click to read",
    },
    htmlFile: "/week 1/Weekly_AI_Dispatch_Issue_014.html",
  },
  {
    week: "Week of May 11, 2026",
    dropped: {
      headline: "The week AI's valuation ceiling got shattered",
      detail: "Anthropic is reportedly closing in on a $30B raise that would peg its valuation near $900B — while simultaneously landing a compute deal with SpaceX and shipping product for small business.",
    },
    matters: {
      headline: "The $900B Number Changes Every Negotiation in AI",
      detail: "Anthropic's reported $900B implied valuation is a negotiating anchor that will echo through every enterprise contract, partnership term, and regulatory conversation.",
    },
    overhyped: {
      headline: "The OpenAI 'AI-First Device' Narrative",
      detail: "Multiple outlets treated OpenAI device rumors as a confirmed strategic pivot — with headlines implying imminent hardware, but there is no confirmed form factor or launch timeline.",
    },
    htmlFile: "/week-2-dispatch.html",
  },
  {
    week: "Week of May 4, 2026",
    dropped: {
      headline: "The AI that finds zero-days you can't use it",
      detail: "Claude Mythos discovered thousands of critical vulnerabilities autonomously. Anthropic's response: hand it to Apple, Google, Microsoft — not the public.",
    },
    matters: {
      headline: "Mythos Is Not a Security Product. It's a Capability Threshold.",
      detail: "Project Glasswing is the first example of a lab building access architecture before public deployment — not after an incident.",
    },
    overhyped: {
      headline: "The Benchmark Parade — 93.9% SWE, AIME Scores, MMMU-Pro",
      detail: "Every lab dropped numbers. Every outlet ran them. Nobody asked who picked the baselines or which runs were cherry-picked.",
    },
    htmlFile: "/week-1-dispatch.html",
  },
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

export const STACK_ITEMS: StackItem[] = [
  {
    name: "Thinking in Systems",
    description: "Before knowing the tech stack, tools I use, I want you to know the ideology of my working.",
    useCase: "Strategic planning, problem-solving, understanding complex systems, making better long-term decisions.",
    whyThis: "Systems thinking reveals root causes instead of symptoms. Essential for navigating complexity in AI, business, and life.",
    category: "Thinking",
    pricing: "Free",
    image: "/systemthinking.jpg",
    documentation: "/systems-thinking-ai-age.html",
  },
  {
    name: "Top 1% AI Prompter",
    description: "In today's world, more than any technical skill, communication is what creates the biggest difference. Having knowledge is not enough — you must be able to articulate it clearly.",
    useCase: "• Modern communication is no longer limited to humans; it now also includes communicating with AI through prompting.\n• The better you explain your thoughts and instructions to AI, the better results you get. So before discussing the tools I use, it's important to understand how I communicate my ideas and requirements effectively.",
    category: "Learning",
    pricing: "Free",
    image: "/prompting.jpg",
    pipeline: "https://www.notion.so/The-Complete-Prompting-Mastery-Guide-2026-April-Edition-d819350088524250a1bd382a2913879d?source=copy_link",
    cheatsheet: "/CheatSheet.pdf",
  },
  {
    name: "Windsurf AI",
    description: "AI-powered coding assistant with deep context awareness and multi-file understanding.",
    useCase: "\n• Mailcrux (email summarization powered by NLP)\n• pharmaCommute (inventory management for pharmaceutical industry)\n• Converse (this platform) and many more applications",
    category: "Coding",
    pricing: "Freemium",
    documentation: "/windsurf-model-guide.html",
    image: "/Windsurf.png",
  },
  {
    name: "ChatGPT Images",
    description: "DALL-E 3 integrated directly into ChatGPT — conversational image generation with natural language refinement.",
    useCase: "Quick visual concepts, iterating on designs, generating images through dialogue rather than perfect prompts.",
    whyThis: "Conversation-based iteration is more intuitive than prompt engineering. Faster feedback loop than standalone image tools.",
    category: "Image",
    pricing: "Paid",
    image: "/chatgpt.webp",
  },
  {
    name: "The Claude Insider",
    description: "A practical guide to what actually works when using Claude day-to-day. Six things most people don't know until it's too late.",
    useCase: "Understand Claude's reasoning style, learn how to prompt for depth, navigate its unique quirks, and get consistently better output.",
    category: "Documentation",
    pricing: "Free",
    image: "/claude.jpg",
    documentation: "/claude-documentation.html",
  },
  {
    name: "Gemini Mastery Guide",
    description: "A complete walkthrough of the Gemini ecosystem, from free-tier basics to Pro-tier power use and prompting at the top 1%.",
    useCase: "Free vs Pro comparison, model capabilities, Google ecosystem integration, and prompting strategies that unlock Gemini's full potential.",
    category: "Documentation",
    pricing: "Free",
    image: "/gemini.jpg",
    documentation: "/gemini.html",
  },
  {
    name: "The Perplexity AI Research Masterclass",
    description: "A mental model shift that turns Perplexity from a search tool into a six-phase research pipeline.",
    useCase: "Query architecture, Focus Modes, output-first thinking, and how to use Perplexity as a primary research instrument rather than a Google replacement.",
    category: "Documentation",
    pricing: "Freemium",
    image: "/Perplexity.avif",
    documentation: "/perplexity.html",
  },
  {
    name: "The Complete SaaS Development Lifecycle",
    description: "A structured guide through every phase of building a SaaS product, from ideation to scaling.",
    useCase: "Product architecture, development phases, launch strategy, and the operational decisions that separate SaaS products that scale from ones that don't.",
    category: "Documentation",
    pricing: "Free",
    image: "/saas.png",
    documentation: "/saas/saas-documentation.html",
  },
];

// ── Roadmap Types ────────────────────────────────────────────────────────────────

export type ResourceItem = {
  title: string;
  url?: string;
  description?: string;
};

export type CoreTopic = {
  title: string;
  description: string;
  subtopics?: string[];
};

export type ResourceStack = {
  courses?: ResourceItem[];
  books?: ResourceItem[];
  papers?: ResourceItem[];
  youtube?: ResourceItem[];
  blogs?: ResourceItem[];
  documentation?: ResourceItem[];
  newsletters?: ResourceItem[];
  institutions?: ResourceItem[];
};

export type RoadmapPhase = {
  num: number;
  title: string;
  goal: string;
  coreTopics: CoreTopic[];
  resourceStack: ResourceStack;
  estimatedTime?: string;
};

export type ParallelTrackItem = {
  title: string;
  description: string;
};

// ── Roadmap Phases ────────────────────────────────────────────────────────────────

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    num: 0,
    title: "Orientation: What You're Actually Walking Into",
    goal: "Understand the intellectual history and conceptual structure of AI before writing a single line of code. Most people skip this. That is why most people remain confused about the difference between AI, ML, GenAI, and agents for years.",
    coreTopics: [
      {
        title: "The History of Artificial Intelligence",
        description: "AI is not a new field. It is a 70-year-old field that has had two brutal winters and one extraordinary spring. Understanding this history tells you why the field is built the way it is — its biases, its debates, its open wounds.",
        subtopics: [
          "1950: Alan Turing's 'Computing Machinery and Intelligence' — the question that started everything",
          "1956: Dartmouth Conference — the birth of AI as a discipline; the original dream of symbolic reasoning",
          "1960s–70s: Expert Systems and GOFAI (Good Old-Fashioned AI) — rule-based systems that worked until they didn't",
          "1974–1980 and 1987–1993: The AI Winters — why funding collapsed and what that taught the field",
          "1980s: Backpropagation rediscovered; neural networks return quietly",
          "1997: Deep Blue defeats Kasparov — narrow AI's first cultural moment",
          "2006: Hinton's breakthrough on deep belief networks — the spark that lit the deep learning era",
          "2012: AlexNet wins ImageNet by a margin that shocked the field — the beginning of everything modern",
          "2017: 'Attention is All You Need' — the transformer paper that remade the entire stack",
          "2020: GPT-3 — emergent capabilities at scale; the world notices",
          "2022: ChatGPT — the moment AI became a general public conversation",
          "2023–present: The agentic turn, multimodality, reasoning models, the race to AGI",
        ],
      },
      {
        title: "The Vocabulary Problem",
        description: "The terms AI, Machine Learning, Deep Learning, Generative AI, and Foundation Models are not interchangeable. Understand the nesting:",
        subtopics: [
          "Artificial Intelligence is the broad field — any system that mimics intelligent behavior",
          "Machine Learning is a subset — systems that learn from data rather than following explicit rules",
          "Deep Learning is a subset of ML — ML using multi-layer neural networks",
          "Generative AI describes models that generate content (text, image, audio, video)",
          "Foundation Models are large, pre-trained models adapted for many downstream tasks",
          "Large Language Models (LLMs) are a specific type of foundation model trained on text",
        ],
      },
      {
        title: "Types of AI by Capability",
        description: "",
        subtopics: [
          "ANI — Artificial Narrow Intelligence: Does one thing very well (Chess engines, spam filters, recommendation systems). This is all AI that exists today.",
          "AGI — Artificial General Intelligence: Can reason and learn across any domain at human level. Does not exist yet; timeline is the biggest debate in the field.",
          "ASI — Artificial Super Intelligence: Surpasses human cognition across all domains. Theoretical.",
        ],
      },
      {
        title: "How to Think About AI",
        description: "AI is simultaneously a scientific field (studying intelligence computationally), an engineering discipline (building systems that solve real problems), and a philosophical project (forcing us to confront what thinking actually is). You need all three lenses.",
      },
    ],
    resourceStack: {
      books: [
        { title: "Artificial Intelligence: A Modern Approach — Stuart Russell & Peter Norvig", description: "The canonical textbook; read the introduction and Part I for history and foundations" },
        { title: "The Dream Machine — M. Mitchell Waldrop", description: "The intellectual biography of J.C.R. Licklider; best narrative history of computing and early AI" },
        { title: "Genius Makers — Cade Metz", description: "The journalistic history of the deep learning era; fast, well-sourced" },
      ],
      papers: [
        { title: "Computing Machinery and Intelligence — Alan Turing (1950)", description: "15 pages; read it fully", url: "https://academic.oup.com/mind/article/LIX/236/433/986238" },
        { title: "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence — McCarthy et al. (1955)", description: "" },
      ],
      youtube: [
        { title: "The Turing Lectures — The Royal Institution", description: "Free on YouTube; rigorous, historical" },
        { title: "History of AI — Lex Fridman, MIT 6.S099", description: "First two lectures; free on YouTube" },
      ],
    },
    estimatedTime: "1-2 months",
  },
  {
    num: 1,
    title: "Mathematical Spine",
    goal: "Build the mathematical intuition required to understand why neural networks work — not just that they do. You do not need a PhD in mathematics. You need honest fluency in four areas.",
    coreTopics: [
      {
        title: "Linear Algebra",
        description: "The language of data in AI. Vectors represent data points. Matrices represent transformations. Neural networks are, at their core, a sequence of matrix multiplications and non-linear functions.",
        subtopics: [
          "Vectors, vector spaces, dot products, norms",
          "Matrices: multiplication, transpose, inverse, rank",
          "Eigenvalues and eigenvectors (critical for understanding PCA and attention)",
          "Singular Value Decomposition (SVD)",
        ],
      },
      {
        title: "Calculus and Optimization",
        description: "Neural networks learn by computing gradients and descending them. If you do not understand derivatives, you do not understand learning.",
        subtopics: [
          "Derivatives and partial derivatives",
          "Chain rule (backpropagation is the chain rule applied systematically)",
          "Gradient: the direction of steepest ascent",
          "Gradient Descent: moving opposite to the gradient to minimize loss",
          "Multivariable calculus intuition; Jacobians",
        ],
      },
      {
        title: "Probability and Statistics",
        description: "AI is fundamentally about uncertainty. Every model is a probability distribution over possible outputs.",
        subtopics: [
          "Random variables, probability distributions (Gaussian, Bernoulli, Categorical)",
          "Conditional probability and Bayes' theorem",
          "Expectation, variance, covariance",
          "Maximum Likelihood Estimation (MLE) — how models are trained",
          "KL Divergence (how we measure the difference between two distributions)",
          "The Central Limit Theorem",
        ],
      },
      {
        title: "Information Theory (Brief but Essential)",
        description: "",
        subtopics: [
          "Entropy: a measure of uncertainty or information content",
          "Cross-entropy loss: the most common loss function in deep learning — and why it connects to probability",
          "Mutual information",
        ],
      },
    ],
    resourceStack: {
      courses: [
        { title: "Mathematics for Machine Learning Specialization — Imperial College London on Coursera", description: "3 courses: Linear Algebra, Multivariate Calculus, PCA" },
        { title: "Gilbert Strang's Linear Algebra — MIT OpenCourseWare", description: "Free; the definitive course" },
        { title: "18.650 Statistics for Applications — MIT OpenCourseWare", description: "Free; rigorous probability and statistics" },
      ],
      youtube: [
        { title: "Essence of Linear Algebra — 3Blue1Brown", description: "YouTube; 15 videos; visual, irreplaceable intuition builder" },
        { title: "Essence of Calculus — 3Blue1Brown", description: "YouTube; equally essential" },
        { title: "StatQuest with Josh Starmer", description: "Statistics and probability explained with clarity that few match" },
      ],
      books: [
        { title: "Mathematics for Machine Learning — Deisenroth, Faisal, Ong", description: "Free PDF at mml-book.github.io; concise, well-structured" },
        { title: "The Elements of Statistical Learning — Hastie, Tibshirani, Friedman", description: "Free PDF; graduate-level but essential reference" },
      ],
    },
    estimatedTime: "2-3 months",
  },
  {
    num: 2,
    title: "Classical Machine Learning",
    goal: "Understand the learning paradigm — how a system extracts patterns from data — before entering the complexity of deep learning. These methods are still used in production daily. Understanding them makes you better at understanding deep learning.",
    coreTopics: [
      {
        title: "The Learning Paradigm",
        description: "",
        subtopics: [
          "Supervised Learning: Learn a mapping from inputs to labeled outputs (classification, regression)",
          "Unsupervised Learning: Find structure in unlabeled data (clustering, dimensionality reduction)",
          "Semi-supervised Learning: A mix of labeled and unlabeled data",
          "Self-supervised Learning: The model creates its own labels from the structure of data — the paradigm behind LLM pre-training",
          "Reinforcement Learning: An agent learns by taking actions in an environment and receiving rewards — the paradigm behind AlphaGo, robotics, and RLHF for LLMs",
        ],
      },
      {
        title: "Core Algorithms",
        description: "",
        subtopics: [
          "Regression: Linear Regression, Ridge/Lasso Regularization, Logistic Regression",
          "Tree-based: Decision Trees, Random Forests, Gradient Boosting (XGBoost, LightGBM)",
          "Kernel Methods: Support Vector Machines (SVM) — the dominant paradigm before deep learning",
          "Nearest Neighbors: K-Nearest Neighbors (KNN)",
          "Clustering: K-Means, DBSCAN, Hierarchical Clustering",
          "Dimensionality Reduction: PCA (Principal Component Analysis), t-SNE, UMAP",
        ],
      },
      {
        title: "The Fundamental Tradeoffs",
        description: "",
        subtopics: [
          "Bias-Variance Tradeoff: Underfitting vs. overfitting — the central tension in all of ML",
          "No Free Lunch Theorem: No single algorithm is best for every problem",
          "Regularization: L1 (Lasso), L2 (Ridge) — methods to prevent overfitting",
        ],
      },
      {
        title: "Model Evaluation",
        description: "",
        subtopics: [
          "Train/Validation/Test splits",
          "Cross-validation (k-fold)",
          "Metrics: Accuracy, Precision, Recall, F1-Score, ROC-AUC, RMSE, MAE",
          "Confusion matrices",
        ],
      },
      {
        title: "Feature Engineering",
        description: "",
        subtopics: [
          "Normalization and standardization",
          "Handling missing data",
          "Encoding categorical variables",
          "Feature importance and selection",
        ],
      },
      {
        title: "Programming Foundation (if not already there)",
        description: "",
        subtopics: [
          "Python: NumPy, Pandas, Matplotlib, Scikit-learn",
          "Jupyter Notebooks as a development environment",
        ],
      },
    ],
    resourceStack: {
      courses: [
        { title: "Machine Learning Specialization — Andrew Ng on Coursera/DeepLearning.AI", description: "3-course series; the clearest conceptual foundation available; start here" },
        { title: "fast.ai Part 1 — Practical Deep Learning for Coders — fast.ai", description: "Counterintuitively, start with this alongside Ng; top-down approach builds intuition fast" },
        { title: "CS229: Machine Learning — Stanford", description: "Free on YouTube; the rigorous version of Ng's course with full mathematical treatment" },
      ],
      books: [
        { title: "Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow — Aurélien Géron", description: "O'Reilly; the best practical book in the field; read Part I" },
        { title: "The Hundred-Page Machine Learning Book — Andriy Burkov", description: "Dense, excellent; the fastest serious read on classical ML" },
      ],
      youtube: [
        { title: "StatQuest with Josh Starmer", description: "Every ML algorithm explained visually" },
        { title: "Sentdex", description: "Hands-on Python/ML tutorial channel" },
      ],
      documentation: [
        { title: "Scikit-learn User Guide", description: "scikit-learn.org (the gold standard for ML documentation; read alongside practice)" },
      ],
    },
    estimatedTime: "2-3 months",
  },
  {
    num: 3,
    title: "Deep Learning",
    goal: "Understand how multi-layer neural networks learn representations from data — and why they work at all. This phase covers the fundamental building blocks of everything that comes after.",
    coreTopics: [
      {
        title: "The Neuron and the Network",
        description: "",
        subtopics: [
          "The perceptron: inputs, weights, bias, activation",
          "Why a single layer fails (the XOR problem — what caused the first AI winter for neural nets)",
          "Multi-layer perceptron (MLP): the universal approximation theorem",
          "Activation functions and why they matter: ReLU, sigmoid, tanh, GELU, SiLU",
        ],
      },
      {
        title: "Backpropagation — The Most Important Algorithm in Modern AI",
        description: "",
        subtopics: [
          "Forward pass: computing predictions",
          "Loss function: measuring error",
          "Backward pass: computing gradients using the chain rule",
          "Weight update: gradient descent step",
          "Why this algorithm, when applied at scale, produces intelligence that surprises even its creators",
        ],
      },
      {
        title: "Training Mechanics",
        description: "",
        subtopics: [
          "Loss functions: MSE (regression), Cross-Entropy (classification)",
          "Optimizers: SGD, Momentum, Adam, AdamW (and why AdamW is the default for LLMs)",
          "Learning rate schedules: warmup, cosine annealing",
          "Batch size and its interaction with learning rate",
          "Gradient clipping",
        ],
      },
      {
        title: "Regularization and Stability",
        description: "",
        subtopics: [
          "Dropout: randomly zeroing activations during training",
          "Batch Normalization: normalizing activations across a mini-batch",
          "Layer Normalization (used in transformers instead of batch norm)",
          "Weight initialization (Xavier, He initialization)",
          "The vanishing and exploding gradient problems",
        ],
      },
      {
        title: "Convolutional Neural Networks (CNNs)",
        description: "",
        subtopics: [
          "Convolution operation: spatial filtering over images",
          "Pooling layers: spatial downsampling",
          "Key architectures: LeNet → AlexNet → VGG → ResNet (residual connections) → EfficientNet",
          "Why residual connections (skip connections) solved the deep network degradation problem",
          "Transfer learning: using a pre-trained CNN as a feature extractor",
        ],
      },
      {
        title: "Recurrent Neural Networks (RNNs) and Sequence Modeling",
        description: "",
        subtopics: [
          "The recurrence equation: hidden state as memory",
          "Vanishing gradient in long sequences — why RNNs forget",
          "Long Short-Term Memory (LSTM): gates as selective memory",
          "Gated Recurrent Units (GRU): a simpler LSTM variant",
          "Seq2Seq models with attention: the precursor to transformers",
        ],
      },
      {
        title: "Embeddings",
        description: "",
        subtopics: [
          "Word2Vec and GloVe: dense vector representations of words",
          "Why geometric relationships in embedding space encode semantic meaning",
          "The distributional hypothesis: 'a word is known by the company it keeps'",
        ],
      },
      {
        title: "Frameworks",
        description: "",
        subtopics: [
          "PyTorch: the dominant research framework; dynamic computation graph; industry and academia standard",
          "TensorFlow/Keras: still used in production; understand the ecosystem",
          "JAX: increasingly important for research; NumPy-compatible with GPU/TPU acceleration",
        ],
      },
    ],
    resourceStack: {
      courses: [
        { title: "Deep Learning Specialization — Andrew Ng on Coursera/DeepLearning.AI", description: "5 courses; most complete structured path; covers CNNs, RNNs, optimization" },
        { title: "Neural Networks: Zero to Hero — Andrej Karpathy", description: "Free on YouTube; builds a neural network from scratch in raw Python/NumPy; no better implementation-level education exists" },
        { title: "MIT 6.S191: Introduction to Deep Learning — MIT OpenCourseWare", description: "Free; sharp, annually updated lectures" },
        { title: "CS231N: Convolutional Neural Networks for Visual Recognition — Stanford", description: "Free on YouTube; the definitive CNN course" },
      ],
      books: [
        { title: "Deep Learning — Goodfellow, Bengio, Courville", description: "Free at deeplearningbook.org; the graduate-level text; read chapters 6–9 for this phase" },
        { title: "Dive into Deep Learning", description: "Free at d2l.ai; interactive notebooks, PyTorch/MXNet; excellent companion to theory" },
      ],
      youtube: [
        { title: "Andrej Karpathy", description: "The clearest deep learning educator working today" },
        { title: "3Blue1Brown — Neural Networks series", description: "4 videos; the visual intuition on backprop is unmatched" },
        { title: "Yannic Kilcher", description: "Paper walkthroughs; rigorous and direct" },
      ],
      documentation: [
        { title: "PyTorch Tutorials", description: "pytorch.org/tutorials (start with 60-minute blitz; stay for the rest)" },
      ],
    },
    estimatedTime: "3-4 months",
  },
  {
    num: 4,
    title: "The Transformer Revolution",
    goal: "Understand the architecture that powers every major AI system of the modern era. The transformer is not a trend. It is the current fundamental unit of intelligence in AI systems.",
    coreTopics: [
      {
        title: "The Attention Mechanism",
        description: "The key insight: instead of processing a sequence step-by-step (like RNNs), process the entire sequence at once and learn which elements should attend to which other elements.",
        subtopics: [
          "Query, Key, Value: the three learned projections that define attention",
          "Scaled dot-product attention: Q·K^T / √d_k, then softmax, then weighted sum of V",
          "Why the √d_k scaling prevents gradient saturation",
          "Attention as soft information retrieval",
        ],
      },
      {
        title: "Multi-Head Attention",
        description: "",
        subtopics: [
          "Why multiple attention heads: each head can specialize in a different type of relationship",
          "Different heads learn syntactic vs semantic vs positional patterns",
          "Concatenation and projection back to model dimension",
        ],
      },
      {
        title: "The Full Transformer Architecture",
        description: "",
        subtopics: [
          "Encoder: processes input sequence; produces contextual representations; used in models like BERT",
          "Decoder: generates output sequence autoregressively; used in models like GPT",
          "Encoder-Decoder: the original architecture; used in translation, summarization (T5, BART)",
          "Positional encodings: sine/cosine (original) and rotary positional embeddings (RoPE, used in modern LLMs)",
          "Feed-Forward Network (FFN) within each transformer block",
          "Residual connections and layer normalization",
          "The role of each component in the block: attention → add & norm → FFN → add & norm",
        ],
      },
      {
        title: "The Paradigm Shift: BERT vs GPT",
        description: "",
        subtopics: [
          "BERT (2018): Bidirectional encoder; masked language modeling (predict masked tokens); best for understanding tasks (classification, NER, QA)",
          "GPT (2018–present): Unidirectional decoder; causal language modeling (predict next token); best for generation; the paradigm that scaled to LLMs",
          "Why the causal (GPT) approach won for scaling",
        ],
      },
      {
        title: "Tokenization",
        description: "",
        subtopics: [
          "Byte-Pair Encoding (BPE): the dominant tokenization strategy",
          "How words decompose into subword tokens",
          "Why tokenization choices affect model behavior (and failure modes)",
          "Vocabulary size tradeoffs",
        ],
      },
      {
        title: "Scaling Laws",
        description: "",
        subtopics: [
          "Kaplan et al. (2020): model performance scales predictably with model size, dataset size, and compute — as power laws",
          "The Chinchilla scaling laws (Hoffmann et al., 2022): optimal data-to-parameter ratio — larger models were being undertrained",
          "Emergent capabilities: abilities that appear abruptly as scale increases (few-shot learning, arithmetic, reasoning)",
        ],
      },
    ],
    resourceStack: {
      papers: [
        { title: "Attention Is All You Need — Vaswani et al. (2017)", description: "The transformer paper; read it fully; 11 pages", url: "https://arxiv.org/abs/1706.03762" },
        { title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding — Devlin et al. (2018)", url: "https://arxiv.org/abs/1810.04805" },
        { title: "Language Models are Few-Shot Learners — Brown et al. (2020)", description: "The GPT-3 paper; introduces in-context learning", url: "https://arxiv.org/abs/2005.14165" },
        { title: "Scaling Laws for Neural Language Models — Kaplan et al. (2020)", url: "https://arxiv.org/abs/2001.08361" },
        { title: "Training Compute-Optimal Large Language Models — Hoffmann et al. (2022)", description: "The Chinchilla paper", url: "https://arxiv.org/abs/2203.15556" },
      ],
      courses: [
        { title: "CS224N: Natural Language Processing with Deep Learning — Stanford", description: "Free on YouTube; the definitive NLP course; covers attention and transformers in depth" },
        { title: "Hugging Face NLP Course", description: "Free at huggingface.co/learn/nlp-course (hands-on; teaches BERT, GPT, and the transformers library)" },
      ],
      blogs: [
        { title: "The Illustrated Transformer — Jay Alammar", description: "jalammar.github.io — the best visual explainer of the transformer; read this before the paper" },
        { title: "The Illustrated BERT, ELMo, and co. — Jay Alammar", description: "Essential follow-on" },
        { title: "Let's build GPT: from scratch, in code, spelled out — Andrej Karpathy", description: "YouTube; 2 hours; builds a GPT from scratch" },
        { title: "Yannic Kilcher — 'Attention is All You Need' walkthrough", description: "YouTube" },
      ],
      documentation: [
        { title: "Hugging Face Documentation", description: "huggingface.co/docs (the practical toolkit for working with transformers)" },
      ],
    },
    estimatedTime: "2-3 months",
  },
  {
    num: 5,
    title: "Foundation Models and the LLM World",
    goal: "Understand how LLMs are built, trained, aligned, and deployed. Move from understanding the architecture to understanding the ecosystem — prompt engineering, fine-tuning, multimodality, and the full stack of modern AI applications.",
    coreTopics: [
      {
        title: "Pre-training at Scale",
        description: "",
        subtopics: [
          "The data problem: Common Crawl, The Pile, FineWeb — what LLMs are actually trained on",
          "Data curation and quality: why data quality matters more than quantity at scale",
          "Distributed training: model parallelism, pipeline parallelism, tensor parallelism",
          "Mixed precision training (FP16/BF16)",
          "Checkpoint strategies and training stability",
        ],
      },
      {
        title: "Instruction Fine-Tuning (IFT)",
        description: "",
        subtopics: [
          "The gap between next-token prediction and following instructions",
          "Supervised Fine-Tuning (SFT) on instruction-response pairs",
          "How FLAN, Alpaca, and similar datasets are constructed",
          "The role of IFT in making raw language models into assistants",
        ],
      },
      {
        title: "Alignment: RLHF and Constitutional AI",
        description: "",
        subtopics: [
          "RLHF (Reinforcement Learning from Human Feedback): Collect human preference data (which response is better?), Train a reward model on those preferences, Fine-tune the LLM using PPO (Proximal Policy Optimization) to maximize reward, InstructGPT (2022) — the paper that made GPT-3 into a useful assistant",
          "DPO (Direct Preference Optimization): A simpler, more stable alternative to RLHF that skips the explicit reward model",
          "Constitutional AI (Anthropic): Using a set of principles and AI-generated feedback to align the model; the basis for Claude",
          "Why alignment is hard: reward hacking, Goodhart's Law, specification gaming",
        ],
      },
      {
        title: "Prompt Engineering",
        description: "This is where most people stop. It is only the beginning.",
        subtopics: [
          "Zero-shot prompting: asking without examples",
          "Few-shot prompting: providing examples in the prompt to demonstrate the pattern",
          "Chain-of-Thought (CoT): asking the model to think step-by-step before answering ('Let's think step by step')",
          "Zero-shot CoT: CoT works even without examples",
          "Self-consistency: sample multiple reasoning paths, take the majority answer",
          "ReAct: interleaving reasoning and acting (for tool use and agents)",
          "Prompt structure: system prompts, role assignment, output formatting, negative examples",
          "Context utilization: how models use information placed in different positions (recency bias, lost-in-the-middle problem)",
          "Prompt injection and adversarial prompting",
        ],
      },
      {
        title: "Parameter-Efficient Fine-Tuning (PEFT)",
        description: "",
        subtopics: [
          "Why full fine-tuning is expensive and often unnecessary",
          "LoRA (Low-Rank Adaptation): freeze original weights; add small trainable low-rank matrices to attention layers; the dominant PEFT method",
          "QLoRA: combine LoRA with 4-bit quantization; fine-tune large models on consumer hardware",
          "Adapter layers, prefix tuning, prompt tuning",
        ],
      },
      {
        title: "Retrieval-Augmented Generation (RAG)",
        description: "",
        subtopics: [
          "The problem: LLMs have a knowledge cutoff and hallucinate on specific facts",
          "The solution: retrieve relevant documents from an external knowledge base at inference time; provide them in context",
          "Embedding models: encode text as dense vectors; similar texts have similar vectors",
          "Vector databases: Pinecone, Weaviate, Chroma, pgvector — storing and querying embeddings",
          "Chunking strategies: how you split documents matters enormously for retrieval quality",
          "Retrieval methods: dense retrieval (semantic), sparse retrieval (BM25/keyword), hybrid",
          "Advanced RAG patterns: reranking, query rewriting, HyDE (Hypothetical Document Embeddings), contextual chunking",
        ],
      },
      {
        title: "Quantization and Efficiency",
        description: "",
        subtopics: [
          "Why 16B parameters in FP32 requires 64GB RAM",
          "Quantization: reducing precision (FP16, INT8, INT4) to reduce memory and speed up inference",
          "GGUF format and llama.cpp: running LLMs locally",
          "Knowledge Distillation: training a smaller 'student' model to mimic a larger 'teacher' model",
          "Speculative decoding: using a small draft model to propose tokens; verify with the large model in parallel",
        ],
      },
      {
        title: "Multimodal Models",
        description: "",
        subtopics: [
          "Vision-Language Models (VLMs): CLIP, LLaVA, GPT-4V, Gemini — processing image and text together",
          "How images are tokenized (patch embeddings, ViT — Vision Transformer)",
          "Audio models: Whisper (ASR), speech-to-speech systems",
          "Text-to-image: DALL-E, Stable Diffusion (diffusion models, not transformers — a separate paradigm worth understanding)",
          "The path to truly multimodal reasoning",
        ],
      },
    ],
    resourceStack: {
      papers: [
        { title: "Training Language Models to Follow Instructions with Human Feedback — Ouyang et al. (2022)", description: "The InstructGPT paper", url: "https://arxiv.org/abs/2203.02155" },
        { title: "Constitutional AI: Harmlessness from AI Feedback — Bai et al., Anthropic (2022)", url: "https://arxiv.org/abs/2212.08073" },
        { title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models — Wei et al. (2022)", url: "https://arxiv.org/abs/2201.11903" },
        { title: "LoRA: Low-Rank Adaptation of Large Language Models — Hu et al. (2021)", url: "https://arxiv.org/abs/2106.09685" },
        { title: "RLHF: Learning to summarize from human feedback — Stiennon et al. (2020)", url: "https://arxiv.org/abs/2009.01325" },
        { title: "Direct Preference Optimization — Rafailov et al. (2023)", url: "https://arxiv.org/abs/2305.18290" },
        { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks — Lewis et al. (2020)", url: "https://arxiv.org/abs/2005.11401" },
      ],
      courses: [
        { title: "LLM University — Cohere", description: "Free at docs.cohere.com/docs/llmu; covers embeddings, RAG, fine-tuning" },
        { title: "Building Systems with the ChatGPT API — DeepLearning.AI", description: "Short course series; hands-on" },
        { title: "Prompt Engineering for Developers — DeepLearning.AI / OpenAI", description: "Free; 1 hour; essential basics" },
        { title: "Advanced RAG — DeepLearning.AI", description: "Covers chunking, reranking, evaluation" },
        { title: "Full Stack LLM Bootcamp — UC Berkeley", description: "Free on YouTube; covers the entire production LLM stack" },
      ],
      blogs: [
        { title: "Lilian Weng's Blog", description: "lilianweng.github.io — OpenAI researcher; the most technically dense, reliable blog in AI; essential reading" },
        { title: "Sebastian Raschka's Blog and Newsletter", description: "substack.com/p/ahead-of-ai — LLM research explained for practitioners" },
        { title: "AI Explained", description: "YouTube channel covering current developments in LLMs with accuracy and depth" },
        { title: "Prompt Engineering Guide", description: "promptingguide.ai — comprehensive, community-maintained reference" },
      ],
      documentation: [
        { title: "Anthropic's Prompt Engineering Documentation", description: "docs.anthropic.com (the most detailed, honest prompt engineering guide for Claude-class models)" },
        { title: "OpenAI Cookbook", description: "github.com/openai/openai-cookbook (practical patterns for GPT API use)" },
        { title: "LangChain Documentation", description: "python.langchain.com (for RAG and chaining; read the conceptual guides)" },
      ],
    },
    estimatedTime: "2-3 months",
  },
  {
    num: 6,
    title: "Agentic AI",
    goal: "Understand AI agents — systems that can perceive, reason, plan, and act in the world across multiple steps. This is the current frontier of applied AI and the area evolving fastest.",
    coreTopics: [
      {
        title: "What is an AI Agent?",
        description: "A language model becomes an agent when it can take actions in the world — not just generate text in response to a prompt.",
        subtopics: [
          "The agent loop: Perceive (receive observations from the environment), Reason (plan what to do next), Act (call a tool, write to memory, or produce output), Observe (receive the result of the action), Repeat until the task is complete or the agent decides to stop",
        ],
      },
      {
        title: "Tool Use and Function Calling",
        description: "",
        subtopics: [
          "The mechanism: structured output that the model produces to signal 'I want to call this function with these arguments'",
          "Tool schemas: defining tools in JSON so the model understands how to call them",
          "Tool categories: search, code execution, file I/O, API calls, browser control, database queries",
          "Parallel tool use: calling multiple tools simultaneously when independent",
        ],
      },
      {
        title: "Reasoning Frameworks for Agents",
        description: "",
        subtopics: [
          "ReAct (Reason + Act): at each step, the model produces a 'Thought,' then an 'Action,' then observes the result — interleaving reasoning and acting",
          "Plan-and-Execute: generate a full plan first, then execute step by step; better for complex multi-step tasks",
          "Reflexion: the agent reflects on failures and improves its strategy; uses verbal reinforcement",
          "Chain-of-Thought + Tool Use: extending CoT so each reasoning step can trigger tool calls",
        ],
      },
      {
        title: "Memory Systems in Agents",
        description: "This is one of the hardest open problems in AI. Agents are fundamentally constrained by how much they can remember and over what timescale.",
        subtopics: [
          "In-context memory: the active context window — everything the model can currently 'see.' Fast but limited in size.",
          "External memory (RAG): semantic search over a vector store — the current primary solution for long-term memory",
          "Episodic memory: retrieving records of past interactions ('last week we discussed X')",
          "Semantic memory: structured facts about the world and the user (knowledge graphs, entity stores)",
          "Procedural memory: encoded patterns from fine-tuning; changes how the model behaves",
          "The memory-context boundary problem: what gets brought into context, when, and how much of the context window it consumes — the central architectural challenge for agent design",
        ],
      },
      {
        title: "The Context Window Problem",
        description: "",
        subtopics: [
          "The context window is not infinite. Current frontier: 128K to 1M tokens.",
          "Attention is O(n²) in sequence length — longer context is dramatically more expensive",
          "The 'lost in the middle' problem: models perform worse on information in the middle of long contexts",
          "KV-Cache: storing key-value pairs from previous tokens to avoid recomputation",
          "Current solutions: better position encodings (RoPE with scaling), selective state spaces (Mamba), learned context compression",
          "This is an active, unsolved research area",
        ],
      },
      {
        title: "Planning and Task Decomposition",
        description: "",
        subtopics: [
          "Task decomposition: breaking a complex goal into subgoals",
          "MCTS (Monte Carlo Tree Search) applied to language model reasoning",
          "The challenge of maintaining coherent state across many reasoning steps",
          "Error propagation: mistakes compound in long agent trajectories",
        ],
      },
      {
        title: "Multi-Agent Systems",
        description: "",
        subtopics: [
          "Why multiple agents: specialization, parallelism, redundancy",
          "Orchestrator-subagent pattern: one agent coordinates; specialized agents execute",
          "Debate and critique: multiple agents challenge each other's reasoning",
          "Agent communication protocols",
          "The alignment problem multiplied: misaligned agents in a network",
          "Key frameworks: CrewAI, AutoGen (Microsoft), LangGraph (state-machine-based agent orchestration)",
        ],
      },
      {
        title: "Agent Reliability Problems",
        description: "",
        subtopics: [
          "Hallucination in agentic settings: the model invents tool calls or fabricates results",
          "Error recovery: how agents handle tool failures",
          "Stuck loops: agents that repeat the same action despite repeated failure",
          "Scope creep: agents that take unauthorized or unintended actions",
          "Human-in-the-loop design: when to pause for human confirmation",
        ],
      },
    ],
    resourceStack: {
      papers: [
        { title: "ReAct: Synergizing Reasoning and Acting in Language Models — Yao et al. (2022)", url: "https://arxiv.org/abs/2210.03629" },
        { title: "Toolformer: Language Models Can Teach Themselves to Use Tools — Schick et al. (2023)", url: "https://arxiv.org/abs/2302.04761" },
        { title: "Generative Agents: Interactive Simulacra of Human Behavior — Park et al. (2023)", description: "The simulation paper; foundational for multi-agent understanding", url: "https://arxiv.org/abs/2304.03442" },
        { title: "Reflexion: Language Agents with Verbal Reinforcement Learning — Shinn et al. (2023)", url: "https://arxiv.org/abs/2303.11366" },
        { title: "HuggingGPT / Jarvis: Solving AI Tasks with ChatGPT and its Friends — Shen et al. (2023)", url: "https://arxiv.org/abs/2303.17580" },
      ],
      courses: [
        { title: "AI Agents in LangGraph — DeepLearning.AI", description: "Hands-on; builds state-machine-based agents" },
        { title: "Building and Evaluating Advanced RAG Applications — DeepLearning.AI" },
        { title: "Multi AI Agent Systems with CrewAI — DeepLearning.AI" },
      ],
      blogs: [
        { title: "Lilian Weng — 'LLM Powered Autonomous Agents'", description: "lilianweng.github.io/posts/2023-06-23-agent — the best single overview post on agents; required reading" },
        { title: "AI Jason", description: "YouTube; practical agent-building tutorials" },
        { title: "Building production-grade agents — Anthropic Research Blog", description: "anthropic.com/research" },
      ],
      documentation: [
        { title: "LangGraph Documentation", description: "langchain-ai.github.io/langgraph (the most mature framework for production agents)" },
        { title: "Anthropic MCP Documentation", description: "anthropic.com/mcp (the emerging standard for agent tool integration)" },
        { title: "AutoGen Documentation", description: "microsoft.github.io/autogen" },
      ],
    },
    estimatedTime: "2-3 months",
  },
  {
    num: 7,
    title: "The Hard Problems",
    goal: "Engage seriously with the unsolved problems in AI — the challenges that define the research frontier and that separate people who use AI from people who advance it.",
    coreTopics: [
      {
        title: "The Hallucination Problem",
        description: "LLMs generate text that is statistically plausible but factually wrong — and do so confidently. This is not a bug to be patched. It is a property of how these systems work.",
        subtopics: [
          "Why hallucination happens: the model learns to produce tokens that follow the distribution of training data, not to retrieve ground truth",
          "Faithfulness vs. Factuality: the difference between staying true to context and staying true to the world",
          "Calibration: a well-calibrated model's confidence should match its accuracy",
          "Mitigation strategies: RAG, self-consistency, citation grounding, chain-of-verification, tool-augmented generation",
          "Current research direction: process reward models (training models to evaluate their own reasoning steps)",
        ],
      },
      {
        title: "Reasoning vs. Pattern Matching",
        description: "The deepest ongoing debate in AI: do LLMs actually reason, or do they do sophisticated pattern matching?",
        subtopics: [
          "The ARC-AGI challenge (François Chollet): tasks that require genuine out-of-distribution reasoning",
          "Chain-of-thought as a scaffold for reasoning vs. an elicitation of memorized patterns",
          "The limits of in-context learning",
          "Test-time compute scaling: letting models think longer before answering (the o1/o3 paradigm)",
        ],
      },
      {
        title: "AI Safety and Alignment",
        description: "What happens when AI systems pursue goals that diverge from human intentions? This is not science fiction. It is an engineering problem that gets harder as systems become more capable.",
        subtopics: [
          "Goal misgeneralization: a model that was aligned in training behaves differently in deployment",
          "Reward hacking / Specification gaming: the model optimizes the reward signal in unintended ways",
          "Deceptive alignment: a model that behaves well during training but pursues different goals when deployed",
          "Superalignment: the problem of aligning AI systems that are smarter than humans",
          "Mechanistic Interpretability: understanding what a model is actually doing internally — not what we told it to do. Anthropic's interpretability team is producing the most important work here.",
          "Constitutional AI and RLAIF: current practical approaches to value alignment",
          "Key researchers: Paul Christiano, Jan Leike, Stuart Russell, Yoshua Bengio",
        ],
      },
      {
        title: "Interpretability and Explainability",
        description: "",
        subtopics: [
          "Explainability (XAI): post-hoc methods to explain a model's decision (LIME, SHAP, attention visualization)",
          "Mechanistic Interpretability: understanding the actual circuits and algorithms inside neural networks",
          "Circuits analysis: identifying which model components compute which functions",
          "Superposition: how models store more features than they have dimensions for",
          "Sparse autoencoders (SAEs): a technique for extracting interpretable features from activations",
          "Anthropic's feature visualization work: finding interpretable concepts encoded in model weights",
          "Why interpretability matters for safety, debugging, and trust",
        ],
      },
      {
        title: "Efficiency and Compute Constraints",
        description: "",
        subtopics: [
          "The energy cost of training frontier models: hundreds of megawatt-hours",
          "Inference cost and latency: real-world deployment constraints",
          "Mixture of Experts (MoE): routing tokens to specialized sub-networks; not all parameters activate for every token; how GPT-4 and Mixtral are built",
          "Sparse models, structured pruning, efficient attention (FlashAttention, linear attention variants)",
          "The hardware layer: NVIDIA GPUs, TPUs, custom AI chips (Groq, Cerebras, Trainium); why hardware bottlenecks determine what is possible",
        ],
      },
      {
        title: "Data Quality and Curation",
        description: "",
        subtopics: [
          "'Garbage in, garbage out' — true in classical ML, true in LLMs",
          "Data deduplication, quality filtering, and toxicity filtering at scale",
          "Synthetic data: using models to generate training data for future models — the recursive loop",
          "The data wall: concerns about running out of high-quality human-generated text",
          "The consent and copyright problem: what was the model actually trained on?",
        ],
      },
      {
        title: "Robustness and Distribution Shift",
        description: "",
        subtopics: [
          "Models fail on inputs that differ from their training distribution",
          "Adversarial examples: carefully crafted inputs that fool the model",
          "Out-of-distribution (OOD) generalization: the ability to perform well on novel inputs",
          "Prompt injection: adversarial inputs that hijack an agent's behavior",
        ],
      },
    ],
    resourceStack: {
      papers: [
        { title: "Measuring Massive Multitask Language Understanding — Hendrycks et al. (2020)", description: "The MMLU benchmark", url: "https://arxiv.org/abs/2009.03300" },
        { title: "On the Measure of Intelligence — François Chollet (2019)", description: "The conceptual foundation for ARC-AGI; the best paper on what general intelligence actually means", url: "https://arxiv.org/abs/1911.01547" },
        { title: "Toy Models of Superposition — Elman, Anthropic (2022)", description: "The foundational mechanistic interpretability paper", url: "https://transformer-circuits.pub/2022/toy-models/index.html" },
        { title: "Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet — Templeton et al., Anthropic (2024)", url: "https://transformer-circuits.pub/2024/scaling-monosemantic/index.html" },
        { title: "AI Safety via Debate — Irving et al., OpenAI (2018)", url: "https://arxiv.org/abs/1805.00856" },
        { title: "Concrete Problems in AI Safety — Amodei et al. (2016)", url: "https://arxiv.org/abs/1606.06565" },
        { title: "Risks from Learned Optimization in Advanced Machine Learning Systems — Hubinger et al. (2019)", description: "The deceptive alignment paper", url: "https://arxiv.org/abs/1906.01820" },
      ],
      blogs: [
        { title: "Anthropic Research Blog", description: "anthropic.com/research (the most important source for interpretability and safety)" },
        { title: "Alignment Forum", description: "alignmentforum.org (technical AI safety research community)" },
        { title: "The Bitter Lesson — Richard Sutton (2019)", description: "A 1,000-word essay every serious AI person should read" },
        { title: "Paul Christiano's Blog", description: "ai-alignment.com" },
        { title: "Lilian Weng on Hallucination", description: "lilianweng.github.io/posts/2024-07-07-hallucination" },
      ],
      books: [
        { title: "The Alignment Problem — Brian Christian", description: "Accessible, rigorous narrative of why alignment is hard" },
        { title: "Human Compatible — Stuart Russell", description: "The case for a new approach to AI from a founding figure in the field" },
        { title: "Superintelligence — Nick Bostrom", description: "Controversial but essential for understanding the argument structure around long-term risk" },
      ],
      youtube: [
        { title: "Robert Miles — AI Safety", description: "YouTube; the most accessible channel on alignment concepts" },
        { title: "Lex Fridman — Yoshua Bengio, Stuart Russell, Paul Christiano interviews", description: "YouTube; long-form; primary sources" },
      ],
    },
    estimatedTime: "2-3 months",
  },
  {
    num: 8,
    title: "Building: From User to Creator",
    goal: "Build production-quality AI systems. Move from understanding models to shipping systems. This is where technical fluency meets product thinking.",
    coreTopics: [
      {
        title: "API Integration and Production Patterns",
        description: "",
        subtopics: [
          "Structured outputs: constraining model outputs to valid JSON schemas",
          "Streaming responses: token-by-token delivery for better UX",
          "Rate limiting, retries, and fallback strategies",
          "Cost estimation: token counting, pricing models, optimization",
          "Async patterns for handling concurrent requests",
        ],
      },
      {
        title: "Evaluation — The Most Underrated Skill",
        description: "You cannot improve what you cannot measure. Evaluation is the discipline that separates engineers from tinkerers.",
        subtopics: [
          "Deterministic evaluation: test cases with known correct answers; regression testing",
          "LLM-as-judge: using a strong model to evaluate the outputs of another model; G-Eval framework",
          "RAGAS: a framework for evaluating RAG systems (faithfulness, context precision, context recall, answer relevance)",
          "Human evaluation: when to use it, how to design it, how to aggregate it",
          "Building eval datasets: golden datasets, adversarial sets, domain-specific test suites",
          "A/B testing in production",
        ],
      },
      {
        title: "RAG Systems in Production",
        description: "",
        subtopics: [
          "Chunking strategies: fixed-size, recursive, semantic, late chunking",
          "Embedding model selection: trade-offs between size, speed, and quality",
          "Reranking: using a cross-encoder to re-score retrieved passages",
          "Query rewriting and HyDE",
          "Multi-turn conversation context management",
          "Hybrid search: combining dense and sparse (BM25) retrieval",
          "Monitoring and debugging retrieval quality",
        ],
      },
      {
        title: "MLOps and Deployment",
        description: "",
        subtopics: [
          "Model serving: vLLM (the dominant open-source inference server), TGI (HuggingFace), Ollama (local)",
          "Containerization: Docker for AI services",
          "Latency optimization: batching, caching, speculative decoding",
          "Observability: logging inputs, outputs, latency, token counts (LangSmith, Langfuse, Helicone)",
          "Feature flags for model rollouts",
          "The 'shadow mode' pattern: run new model in parallel before switching",
        ],
      },
      {
        title: "Fine-tuning in Practice",
        description: "",
        subtopics: [
          "When to fine-tune vs. prompt engineer vs. RAG (the answer is almost always: try prompting and RAG first)",
          "Dataset preparation: format, size, quality considerations",
          "LoRA fine-tuning with HuggingFace PEFT",
          "Evaluating fine-tuned models: comparison against base model on held-out set",
          "Catastrophic forgetting: fine-tuning on narrow data degrades general capabilities",
        ],
      },
      {
        title: "Building AI Products (not just AI features)",
        description: "",
        subtopics: [
          "The product thinking layer: what problem does this solve? Why is AI the right approach?",
          "Human-in-the-loop design: when should the system defer to a human?",
          "Failure mode design: what happens when the model is wrong?",
          "Trust and transparency: how do you communicate model uncertainty to users?",
          "Latency vs. quality trade-offs in UX design",
          "The 'AI feature decay' problem: models improve; your product has to evolve with them",
        ],
      },
      {
        title: "Security and Red-teaming",
        description: "",
        subtopics: [
          "Prompt injection: malicious inputs that override system instructions",
          "Data extraction attacks: getting the model to leak its system prompt or training data",
          "Jailbreaking: bypassing safety guardrails",
          "Red-teaming: adversarial testing before deployment",
          "Input/output filtering and content moderation layers",
        ],
      },
    ],
    resourceStack: {
      courses: [
        { title: "LLMOps — DeepLearning.AI", description: "Building production pipelines; evaluation; monitoring" },
        { title: "Automated Testing for LLMOps — DeepLearning.AI" },
        { title: "Building LLM Apps From Scratch — Maxime Labonne", description: "YouTube" },
        { title: "Full Stack Deep Learning", description: "fullstackdeeplearning.com (free; the most complete guide to putting ML in production)" },
      ],
      books: [
        { title: "Building LLMs for Production — Tula Masterman et al.", description: "O'Reilly; the practical engineering reference" },
        { title: "Designing Machine Learning Systems — Chip Huyen", description: "The canonical MLOps book; covers the full production ML lifecycle" },
      ],
      blogs: [
        { title: "Hamel Husain's Blog", description: "hamel.dev (the most honest writing on LLM evaluation in practice)" },
        { title: "Eugene Yan", description: "eugeneyan.com (applied ML and LLM systems at Amazon; clear, practical)" },
        { title: "Simon Willison's Weblog", description: "simonwillison.net (prolific, sharp; security, tools, and practical LLM observations)" },
      ],
      documentation: [
        { title: "Anthropic API Documentation", description: "docs.anthropic.com" },
        { title: "LangSmith Documentation", description: "docs.smith.langchain.com (evaluation and tracing)" },
        { title: "vLLM Documentation", description: "docs.vllm.ai (production inference)" },
        { title: "RAGAS Documentation", description: "docs.ragas.io" },
      ],
    },
    estimatedTime: "3-4 months",
  },
  {
    num: 9,
    title: "The Frontier",
    goal: "Develop the ability to track, understand, and eventually contribute to the research frontier. Not every practitioner becomes a researcher. But understanding what is happening at the frontier changes how you build and what you see as possible.",
    coreTopics: [
      {
        title: "Reasoning Models and Test-Time Compute Scaling",
        description: "The next paradigm shift after transformers at scale: instead of just scaling training compute, scale the compute used at inference time.",
        subtopics: [
          "OpenAI o1, o3: models trained to think for longer before answering; generate long internal chains of thought before producing output",
          "DeepSeek-R1: open-source reasoning model; demonstrated that RL-based training on reasoning can match closed frontier models",
          "Process Reward Models (PRMs): reward models that score intermediate reasoning steps, not just final answers",
          "Monte Carlo Tree Search (MCTS) over reasoning trajectories",
          "The test-time compute vs. training compute trade-off",
        ],
      },
      {
        title: "World Models and Embodied AI",
        description: "",
        subtopics: [
          "World models: the model maintains an internal representation of the state of the world and simulates consequences of actions",
          "Video generation as world modeling (Sora, Genie 2)",
          "Embodied AI: models that perceive and act in physical environments (robotics)",
          "RT-2, π0: vision-language-action models; the intersection of LLMs and robotics",
          "The embodiment hypothesis: that general intelligence requires physical grounding",
        ],
      },
      {
        title: "Neuro-Symbolic AI",
        description: "",
        subtopics: [
          "The old debate: neural (learned, statistical) vs. symbolic (explicit, logical) AI",
          "Current approaches: using LLMs to generate formal programs (Python, SQL, Prolog) and executing them",
          "Differentiable programming",
          "Graph neural networks and knowledge graph integration",
          "Why pure neural approaches may have fundamental limits that hybrid approaches can address",
        ],
      },
      {
        title: "AI in Science",
        description: "",
        subtopics: [
          "AlphaFold 2/3 (DeepMind): solved the 50-year protein structure prediction problem; one of the most significant scientific achievements of the century",
          "AlphaMath, AlphaProof: AI for mathematical proof and reasoning",
          "AI for drug discovery: generative models for molecular design",
          "Climate and materials science applications",
          "The epistemological question: when AI discovers something, do we understand why it works?",
        ],
      },
      {
        title: "What Comes After Transformers?",
        description: "",
        subtopics: [
          "State Space Models (SSMs) — Mamba: linear-time sequence modeling; may handle extremely long sequences more efficiently than attention",
          "Diffusion for discrete sequences: applying diffusion models to text generation",
          "Mixture-of-Experts at scale: not all parameters active; the architecture of frontier closed models",
          "Kolmogorov-Arnold Networks (KANs): an alternative to MLPs; learnable activation functions on edges rather than nodes",
          "Whether the transformer will be the final major architecture or a stepping stone",
        ],
      },
      {
        title: "Multimodal and Unified Models",
        description: "",
        subtopics: [
          "The move toward 'any-to-any' models: input and output in any modality",
          "Unified tokenization across text, image, audio, video",
          "Joint training across modalities and its benefits for representation quality",
        ],
      },
      {
        title: "AGI: The Timeline Debate",
        description: "",
        subtopics: [
          "The definition problem: no consensus on what AGI means or how to test for it",
          "The ARC-AGI benchmark as a proxy for general intelligence",
          "Current frontier model capabilities and their limits",
          "The main camps: imminent AGI (Altman, Hassabis), skeptics (LeCun, Marcus), and nuanced middle positions",
          "What changes about the world if AGI arrives in 5 years vs. 20 years vs. never",
        ],
      },
      {
        title: "AI Governance, Regulation, and Geopolitics",
        description: "",
        subtopics: [
          "The US-China semiconductor export controls and their effect on AI development",
          "EU AI Act: the first major AI-specific regulatory framework",
          "Frontier AI safety commitments (the Bletchley Declaration)",
          "The compute governance approach: regulation at the chip and training run level",
          "Open-source vs. closed frontier models: the policy debate",
          "AI and the future of knowledge work, scientific research, and economic distribution",
        ],
      },
    ],
    resourceStack: {
      papers: [
        { title: "Scaling LLM Test-Time Compute Optimally Can Be More Effective than Scaling Model Parameters — Snell et al. (2024)", url: "https://arxiv.org/abs/2408.03314" },
        { title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning (2025)", url: "https://arxiv.org/abs/2501.19193" },
        { title: "Highly Accurate Protein Structure Prediction with AlphaFold — Jumper et al. (2021)", url: "https://www.nature.com/articles/s41586-021-03819-2" },
        { title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces — Gu & Dao (2023)", url: "https://arxiv.org/abs/2312.00752" },
        { title: "ARC: Abstraction and Reasoning Corpus — Chollet (2019)", url: "https://arxiv.org/abs/1803.03853" },
      ],
      newsletters: [
        { title: "Import AI — Jack Clark", description: "importai.substack.com — weekly; the most signal-dense AI newsletter" },
        { title: "The Gradient", description: "thegradient.pub — longform research journalism" },
        { title: "Interconnects — Nathan Lambert", description: "interconnects.ai — RLHF and frontier model research explained" },
        { title: "Papers with Code", description: "paperswithcode.com — every major paper, with code, benchmarks, and leaderboards" },
        { title: "Arxiv Sanity", description: "Andrej Karpathy's ML paper filter — arxiv-sanity.com" },
        { title: "The Turing Post", description: "turingpost.com — structured frontier AI coverage" },
      ],
      youtube: [
        { title: "Yannic Kilcher", description: "YouTube; paper walkthroughs; weekly; rigorous" },
        { title: "Dwarkesh Patel Podcast", description: "Deep, long-form interviews with AI researchers and founders" },
        { title: "Lex Fridman Podcast", description: "The widest range of primary sources in AI and adjacent fields" },
        { title: "Machine Learning Street Talk", description: "Technical, opinionated, excellent" },
      ],
      institutions: [
        { title: "Anthropic Research", description: "anthropic.com/research" },
        { title: "DeepMind", description: "deepmind.google" },
        { title: "OpenAI Research", description: "openai.com/research" },
        { title: "The AI Safety Institute (UK/US)" },
        { title: "Alignment Research Center", description: "alignment.org" },
        { title: "Redwood Research", description: "redwoodresearch.org" },
        { title: "MIRI (Machine Intelligence Research Institute)", description: "intelligence.org" },
      ],
    },
    estimatedTime: "Ongoing",
  },
];

export const PARALLEL_TRACK: ParallelTrackItem[] = [
  {
    title: "Build in Public",
    description: "Every phase has a project. Do not wait until Phase 8 to build something. Build a toy LLM in Phase 4. Build a RAG system in Phase 5. Build an agent in Phase 6. The act of building reveals what you do not understand.",
  },
  {
    title: "Read Primary Sources",
    description: "The blog post is someone's interpretation of the paper. Read the paper. Papers are not as hard as they look. Start with the abstract, introduction, and conclusion. Then the diagrams. Then the experiment section. The math comes last and matters less than people think initially.",
  },
  {
    title: "Develop a Point of View",
    description: "The goal of learning is not to absorb information. It is to develop the ability to have a real opinion about contested questions: Is scaling sufficient for AGI? Is RLHF enough for alignment? Do LLMs reason or do they pattern match? Your answer will be wrong in interesting ways. That is the point.",
  },
  {
    title: "Write About What You Learn",
    description: "The test of understanding is the ability to explain. Write a post explaining attention to someone who doesn't know linear algebra. Write a critique of RAG as a memory solution. The act of writing exposes the gaps.",
  },
  {
    title: "Track the Frontier Weekly",
    description: "The field moves fast. The people who stay ahead have systems: a set of sources they check every week, a way of noting which papers matter, and a practice of connecting what's new to what they already know. Build yours.",
  },
];

export type LearningSequenceItem = {
  months: string;
  primary: string;
  secondary: string;
};

export const LEARNING_SEQUENCE: LearningSequenceItem[] = [
  {
    months: "1–2",
    primary: "Phase 0 (orientation) + Phase 1 (math)",
    secondary: "Begin Python if needed",
  },
  {
    months: "3–4",
    primary: "Phase 2 (classical ML)",
    secondary: "First Scikit-learn project",
  },
  {
    months: "5–6",
    primary: "Phase 3 (NLP)",
    secondary: "Build a text classifier; implement TF-IDF from scratch",
  },
  {
    months: "7–9",
    primary: "Phase 4 (deep learning)",
    secondary: "Build a CNN; implement backprop from scratch",
  },
  {
    months: "10",
    primary: "Phase 5 (reinforcement learning)",
    secondary: "Implement Q-learning on CartPole",
  },
  {
    months: "11–12",
    primary: "Phase 6 (transformers)",
    secondary: "Build a GPT following Karpathy",
  },
  {
    months: "13–15",
    primary: "Phase 7 (LLMs)",
    secondary: "Build first RAG application; prompt engineering experiments",
  },
  {
    months: "16–17",
    primary: "Phase 8 (generative models)",
    secondary: "Run Stable Diffusion locally; read the DDPM paper",
  },
  {
    months: "18–19",
    primary: "Phase 9 (agents)",
    secondary: "Build a tool-using agent with LangGraph",
  },
  {
    months: "20–21",
    primary: "Phase 10 (hard problems)",
    secondary: "Read papers; write responses; engage Alignment Forum",
  },
  {
    months: "22–24",
    primary: "Phase 11 (building)",
    secondary: "Ship something real with evals, monitoring, and users",
  },
  {
    months: "25+",
    primary: "Phase 12 (frontier) + continuous",
    secondary: "Weekly paper review; track labs; start contributing",
  },
];

export const ROADMAP_NOTE = "This roadmap will evolve. The field does not stay still. The measure of whether you have internalized it is not whether you reach Phase 12 — it is whether, by Phase 9, you are starting to generate your own questions about what comes next.";
