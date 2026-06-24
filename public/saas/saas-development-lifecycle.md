# The Complete SaaS Development Lifecycle
### Built for the 1–2 person team that uses AI as their entire department.

---

> Billion-dollar SaaS products are being built by 2 people. Not because those 2 people are superhuman — because they've figured out how to use AI as a designer, marketer, QA engineer, support agent, data analyst, and copywriter simultaneously. This documentation is about that. Every phase includes the actual AI workflows, real prompt templates, and operational systems that make a tiny team move at enterprise speed.

---

## Table of Contents

0. [The AI-Native Founder Operating System](#0-the-ai-native-founder-operating-system)
1. [Problem Discovery Phase](#1-problem-discovery-phase)
2. [Solution Validation Phase](#2-solution-validation-phase)
3. [Product Strategy & Planning Phase](#3-product-strategy--planning-phase)
4. [UI/UX Design Phase](#4-uiux-design-phase)
5. [MVP Development Phase](#5-mvp-development-phase)
6. [Testing & QA Phase](#6-testing--qa-phase)
7. [Beta Launch Phase](#7-beta-launch-phase)
8. [Product-Market Fit Phase](#8-product-market-fit-phase)
9. [Scaling Phase](#9-scaling-phase)
10. [Automation & Intelligence Phase](#10-automation--intelligence-phase)
11. [Launch Strategy](#11-launch-strategy)
12. [Tech Stack Selection — The Master Guide](#12-tech-stack-selection--the-master-guide)
13. [Monetization — End-to-End Strategy](#13-monetization--end-to-end-strategy)
14. [Legal Foundations](#14-legal-foundations)

---

## 0. The AI-Native Founder Operating System

### The Paradigm Shift

Traditional SaaS required: 1 founder + 1 designer + 2 engineers + 1 marketer + 1 support person = minimum viable team. That math is dead.

The new math: 1–2 founders + the right AI workflows = a company that moves at 10x the speed of that 6-person team, with lower overhead, faster iteration, and compressing what used to be months of work into days.

This isn't about using ChatGPT to write emails. It's about building an AI operating system for your company — where AI handles defined roles with defined outputs, and you are the executive making decisions, not the worker executing tasks.

### The AI Role Map

Before you build, know which roles AI is filling for you. Then build workflows for each one.

| Human Role | What AI Does In That Role | Primary Tool |
|-----------|--------------------------|--------------|
| **Designer** | Generate UI from descriptions, create component variants, write microcopy, produce design assets | v0, Midjourney, Claude |
| **Marketing Manager** | Write landing pages, email sequences, blog posts, social content, ad copy | Claude, Perplexity |
| **QA Engineer** | Write test suites, generate edge cases, review code for bugs, audit security | Claude, Cursor |
| **Support Agent** | Answer tier-1 tickets, draft responses, build knowledge base, detect patterns | Claude + RAG, Intercom AI |
| **Data Analyst** | Synthesize user feedback, interpret metrics, find retention patterns, produce reports | Claude, PostHog AI |
| **Technical Writer** | Write documentation, changelogs, API docs, onboarding guides | Claude, Mintlify AI |
| **SEO Strategist** | Keyword research, content briefs, article structure, internal linking map | Claude, Perplexity |
| **Copywriter** | Landing page copy, email subject lines, in-app messaging, onboarding text | Claude |
| **Research Analyst** | Competitor analysis, market research, review synthesis, trend detection | Perplexity, Claude |
| **Project Manager** | Sprint planning, task breakdown, progress documentation, dependency mapping | Claude, Linear AI |

### Prompt Engineering Fundamentals for SaaS Builders

Using AI at a professional level is not about asking better questions. It's about building **prompt infrastructure** — reusable, versioned, structured prompts that produce consistent, high-quality output every time.

**The ROLE-CONTEXT-TASK-FORMAT (RCTF) framework:**

Every high-performance prompt has four components:

- **ROLE:** Tell the model who it is. Not just "you are an expert" — be specific. "You are a B2B SaaS product manager with 10 years of experience at companies like Stripe, Linear, and Notion."
- **CONTEXT:** Provide the situational information the model needs. Your product, your ICP, your current stage, relevant constraints.
- **TASK:** The specific thing you need done. Be precise. Not "write landing page copy" but "write a hero section headline, subheadline, and three supporting bullet points for a B2B SaaS tool that..."
- **FORMAT:** Define the output structure explicitly. "Return your response as a JSON object with keys: headline (max 8 words), subheadline (max 20 words), bullets (array of 3 strings, each max 12 words)."

**Example of a weak prompt vs. a professional prompt:**

Weak: "Write a landing page for my email tool."

Professional:
```
ROLE: You are a direct-response copywriter who has written landing pages for B2B SaaS
products. You specialize in problem-aware audiences who are actively comparing tools.

CONTEXT: My product is called MailSift. It helps growth marketers at 10–50 person
startups automatically categorize and prioritize their inboxes by deal stage. The
primary alternative they currently use is Gmail labels set up manually. Our core
differentiator is that categorization happens in real-time using AI, with zero
manual configuration.

ICP: Growth marketers at Series A startups, 28–38 years old, high email volume
(100–200 emails/day), frustrated with inbox noise killing their deep work time.

TASK: Write the hero section of the landing page. Include:
1. A headline (the problem or transformation, max 10 words)
2. A subheadline that names the ICP and the mechanism (max 25 words)
3. A CTA button label (max 5 words)
4. One trust line below the CTA (social proof format, max 15 words)

FORMAT: Return as a JSON object with keys: headline, subheadline, cta, trust_line.
Do not include markdown. Do not explain your choices. Return JSON only.
```

**Building Your Prompt Library:**

Your prompt library is a company asset. Store it in Notion or a dedicated file in your repo. Every time you build a prompt that produces great output, save it. Categorize by use case. Iterate and improve. After 6 months, your prompt library is a proprietary system that compounds your productivity.

Minimum prompt library categories for a SaaS founder:
- Research & Discovery
- Product Documentation (PRDs, specs, user stories)
- Copywriting (landing pages, emails, in-app)
- Development (architecture, code review, debugging)
- Design (briefs for v0, component descriptions)
- Support (response drafts, knowledge base articles)
- Marketing (blog posts, social content, SEO briefs)
- Analysis (feedback synthesis, metrics interpretation)

### The Daily AI Workflow for a Solo SaaS Founder

**Morning (30 minutes — Daily Intelligence Report):**
1. Pull last 24h of Sentry errors, PostHog events, and support tickets.
2. Feed into Claude with this prompt:
```
Here is my daily product data:

ERRORS (Sentry): [paste]
SUPPORT TICKETS (last 24h): [paste]
KEY METRICS (PostHog): [paste]

You are my head of product. Produce a daily briefing with:
1. Critical issues requiring immediate action (ranked by user impact)
2. Patterns in support tickets I should address in docs or product
3. One metric that moved significantly and your hypothesis for why
4. My top 3 priorities for today based on this data

Be direct. No filler. Max 300 words total.
```

**Development sessions — The AI Pair Programming Rhythm:**
- Open Cursor or Windsurf. Keep Claude in a separate tab for architecture questions.
- Every feature starts with an AI-generated spec before touching code.
- Every PR gets an AI code review before merging.
- Every bug gets an AI debugging session before manual investigation.

**End of day (15 minutes — Decision Log + Async Communication):**
- Use Claude to draft your weekly update email to users (if it's Friday).
- Log decisions made today with context.
- Queue content ideas for marketing.

### Context Management — The Skill That Separates Advanced Users

AI has no memory between sessions. Context management is the discipline of feeding the right information at the right time.

**Persistent context document:** Maintain a `PRODUCT_CONTEXT.md` in your repo (never committed, in `.gitignore`) with:
- Product name, one-line description, ICP, current stage
- Tech stack
- Current sprint goals
- Known constraints and decisions already made

Paste this at the start of every Claude conversation that needs product context. This eliminates 80% of re-explaining.

**Progressive context for long tasks:** For complex tasks (writing a full PRD, designing a database schema), build context incrementally:
1. First message: product context + problem description
2. Get initial output
3. Second message: refine specific sections, not the whole thing
4. Never ask AI to regenerate everything — ask it to fix the specific thing that's wrong

---

## 1. Problem Discovery Phase

### What This Phase Actually Is

Problem discovery is forensic investigation. You're looking for *real pain* — not inconvenience, not "it would be nice if," but the kind of problem someone is already paying to solve badly. The best SaaS ideas don't come from invention. They come from noticing that people are using spreadsheets, Zapier hacks, and manual workflows to solve something that deserves a real product.

Most founders skip this phase or do it superficially. The cost: building something nobody wanted. The benefit of doing it right: you know your market before writing a line of code, you know your copy before you have a product, and you know your competition better than they know themselves.

### The Four Sources of Real Problems

**1. Your Own Friction**
The most defensible position: you personally experience the problem. You understand its depth, edge cases, and emotional cost. Build a tool you would pay for. This isn't motivational advice — it's the reason most successful indie SaaS products exist. The founder-problem fit is as important as product-market fit.

**2. Community Surface Area**
Reddit, Twitter/X, Hacker News, niche Discord servers, and Facebook Groups are live complaint feeds. The signal is in specific phrasing. Search these patterns:
- "Is there a tool that..."
- "I hate how [tool] doesn't..."
- "Anyone know a better way to..."
- "We just use Google Sheets for this but..."
- "I've been meaning to build something that..."

The gold is in threads with 50+ comments and no definitive solution in the answers. That gap is your market.

**3. Job-to-Be-Done Gaps in Existing SaaS**
Look at 1-star and 2-star reviews on G2, Capterra, and Trustpilot for established tools in a category. You're not looking for "bad customer support" complaints. You're looking for feature gaps, use-case mismatches, and pricing complaints that recur across multiple reviewers. A complaint that appears in 15 different reviews is a validated problem brief.

**4. Adjacent Market Observation**
If you're a developer with access to enterprise software, notice what people do *outside* the tool to compensate for what it can't do. The spreadsheet someone built to track what the SaaS should track is your product spec.

### Problem Sizing — Before You Go Further

Before touching Figma or a repo, validate that the problem is in a market large enough to build a business on.

- **Who has this problem exactly?** Name the job title, industry, and company size. Not "everyone."
- **How often do they face it?** Daily pain beats monthly pain every time. Recurring pain = recurring revenue.
- **What are they currently doing about it?** If nothing — the market may not exist. If a broken workaround — you have a buyer.
- **Would they pay to fix it?** This answer must come from them, not your assumption.

**TAM → SAM → SOM — Done honestly:**
- **TAM:** All people who theoretically have this problem globally.
- **SAM:** The subset you can realistically reach with your channels.
- **SOM:** What you can capture in 12–18 months with your current resources.

A $50M SAM with a realistic 2% capture in 18 months = $1M ARR opportunity. That's a fundable, sustainable business for a 2-person team.

### AI Workflow: Problem Discovery

**Step 1 — Reddit & Forum Signal Extraction**

Collect 20–30 forum posts or threads from communities where your target audience exists. Then use this prompt:

```
I'm researching a potential SaaS product idea in the [category] space.
Below are [N] Reddit/forum posts I've collected from [subreddit/community].

[PASTE ALL POSTS]

You are a product researcher conducting a systematic qualitative analysis.
Extract and structure the following:

1. RECURRING PROBLEMS: Problems mentioned 3+ times across posts (exact quote + frequency count)
2. CURRENT WORKAROUNDS: What people are doing now to cope (tools, manual processes, hacks)
3. TOOLS MENTIONED NEGATIVELY: Any existing tools criticized and the specific complaint
4. LANGUAGE PATTERNS: Exact phrases, words, and metaphors people use to describe the pain
   (these become your copy)
5. UNMET DESIRE STATEMENTS: Direct quotes where someone expresses wanting something that
   doesn't exist yet
6. INTENSITY SIGNALS: Which problems seem most emotionally charged based on language used

Return this as a structured report. For each section, include direct quotes from
the posts to support your findings. Do not paraphrase quotes — use exact wording.
```

**Step 2 — Competitor Review Synthesis**

Copy the text of 30–50 G2/Capterra reviews for your main competitor. Then:

```
You are a product strategist analyzing competitor reviews to find market gaps.
Below are [N] reviews of [Competitor Name].

[PASTE REVIEWS]

Produce a structured analysis:

1. TOP COMPLAINTS (ranked by frequency): What do reviewers hate or find missing?
2. PRAISED FEATURES: What do they actually love? (Don't build against these — beat them elsewhere)
3. USE CASE MISMATCHES: Segments of users the product wasn't designed for but tries to serve
4. PRICING SENSITIVITY: Any complaints about cost, plans, or value perception
5. MIGRATION SIGNALS: Reviews from people who switched from or to this product and why
6. THE OPPORTUNITY STATEMENT: Based on this data, write a one-paragraph description of the
   product gap in this market that a new entrant could exploit.

Use exact quotes from reviews as evidence for each point.
```

**Step 3 — ICP Generation**

```
Based on the following problem research summary:

[PASTE YOUR RESEARCH SUMMARY]

You are a go-to-market strategist. Define the Ideal Customer Profile for a SaaS product
solving this problem. Produce:

1. PRIMARY ICP CARD:
   - Job title(s)
   - Industry / Vertical
   - Company size (employees and/or revenue)
   - Technical sophistication (1–5 scale with description)
   - Budget range (monthly SaaS spend they're comfortable with)
   - Where they discover new tools (communities, newsletters, search, social)
   - What they've already tried and why it failed them

2. SECONDARY ICP (if applicable): Same fields, different segment

3. ANTI-ICP: Who would sign up but never pay or churn immediately — describe them so
   we can filter them out in marketing

4. THE JOB TO BE DONE: One sentence in the format: "When [situation], I want to [motivation],
   so I can [expected outcome]."
```

### Problem Discovery Deliverables

You must produce — not just think about — the following before moving to validation:

1. **Problem Statement (one paragraph):** Who, what, when, how often, current workaround, emotional cost.
2. **5–10 verbatim quotes** from real people describing the problem in their own language. These become your homepage copy.
3. **Competitive landscape map:** Existing solutions, their positioning, their pricing, and their documented gaps.
4. **First-pass ICP Card:** As generated above, but verified against real people you can identify by name.

---

## 2. Solution Validation Phase

### The Core Question

Validation exists to answer one question with evidence, not assumption: **Will people pay for this?** Not "do they think it's a good idea." Not "do they like the concept." Will they pay — with real money, now.

### The Validation Ladder

Run these in sequence. Move to the next level only when the current level returns a positive signal.

**Level 1 — Smoke Test (Zero Code, 1 Day)**

Build a landing page describing the product with a specific CTA — email waitlist, "Request Early Access," or a Stripe payment link for founding member access. Drive traffic via a genuine Reddit post, a Twitter thread, or an HN comment. If you cannot get 200 sign-ups organically within 2 weeks, something is wrong with the problem definition or the positioning — not the product, which doesn't exist yet.

Tools: Framer (fast, beautiful), Carrd (simple, cheap), or Webflow. Add Typeform or ConvertKit for email capture.

**Level 2 — Mom Test Interviews (5–10 People)**

These are not "what do you think of my idea" conversations. That question produces compliments, not data. Use Rob Fitzpatrick's Mom Test framework:
- Talk about their life and past behavior, not your idea.
- Ask how they currently deal with the problem, not if they would use your solution.
- Listen for money and time already being spent, not hypothetical willingness to pay.

Questions that produce signal:
- "Walk me through the last time you dealt with [problem]."
- "What did you do? How long did it take? What did it cost?"
- "What tools do you use for this? What do you hate about them?"
- "Have you ever paid for a solution to this? What happened?"

**Level 3 — Prototype Validation**

Build a clickable prototype in Figma or Framer — not code. Put it in front of 5 ICP people. Watch them use it without guiding them. Where they pause, click the wrong thing, or ask a question is your UX problem. What they ask for that you haven't shown is your backlog priority.

**Level 4 — Pre-Sell (True Validation)**

Offer founding member access at a discounted price before writing production code. Stripe Payment Links makes this a 10-minute setup. Money exchanged before product exists = real product-market signal. This is the only validation that cannot be faked by politeness.

### Competitor Analysis — Done Right

Most people make a table and move on. Go deeper:

- **Sign up for every competitor's free tier.** Use it. Find where it breaks. Note what you feel when it breaks.
- **Read their changelogs.** What they build next reveals what their customers demanded.
- **Check their job postings.** Hiring 3 backend engineers = infrastructure scaling. Hiring salespeople = moving upmarket. This tells you where their revenue pressure is.
- **Read their Twitter/X mentions.** That's real user feedback, public and unfiltered, no moderation.
- **Check their pricing page history.** Wayback Machine shows you how their pricing evolved — which plans they killed, which they added, when they raised prices.

### The Positioning Hypothesis

Write this sentence before building anything:

> **[Product] helps [ICP] who struggle with [specific problem] to [desired outcome] — unlike [main alternative] which [key gap].**

Example: *"Logify helps solo developers who struggle with setting up observability in side projects to get Datadog-level logging in 10 minutes — unlike Datadog which is priced for enterprises and takes days to configure."*

This sentence governs: landing page headline, pricing logic, feature prioritization, and every piece of marketing you produce. If a feature doesn't serve this sentence, it doesn't belong in your MVP.

### AI Workflow: Validation

**Landing Page Copy from Raw Research:**

```
ROLE: You are a direct-response copywriter who specializes in B2B SaaS landing pages.
Your copy is problem-first, specific, and written for people who are already aware of
the pain and actively looking for solutions.

CONTEXT:
- Product: [Name]
- ICP: [From your ICP card]
- Core problem: [From your problem statement]
- Current alternative they use: [Main competitor or workaround]
- Our key differentiator: [Your positioning hypothesis]
- Tone: [Direct / Conversational / Technical / etc.]

Real quotes from target users (use their exact language as inspiration):
[PASTE YOUR 5-10 QUOTES]

TASK: Write a complete landing page copy structure including:
1. Hero: Headline (max 8 words) + Subheadline (max 25 words) + CTA button (max 5 words)
2. Problem section: 3 bullets describing the pain in the user's own language
3. Solution section: 3 bullets describing what your product does differently
4. Social proof placeholder: One testimonial format (write a template)
5. FAQ: 5 questions a skeptical buyer would ask, with honest answers
6. Final CTA section: Urgency-based headline + CTA

Use the exact language from the user quotes where appropriate.
Do not use buzzwords: "seamless," "powerful," "robust," "game-changing," "revolutionary."
Write like a human talking to a human.
```

**Interview Transcript Analysis:**

After your 5–10 interviews, record and transcribe them (Otter.ai or Riverside). Then:

```
Below are transcripts from [N] user interviews about [problem domain].

[PASTE TRANSCRIPTS]

You are a UX researcher performing qualitative analysis. Extract:

1. VALIDATED PAIN POINTS: Problems mentioned across multiple interviews unprompted
2. LANGUAGE MAP: How do they describe the problem? What metaphors and phrases recur?
3. CURRENT SOLUTION FAILURES: Specific complaints about existing tools or methods
4. UNMET NEEDS: Things they wish existed but couldn't find
5. BUYING SIGNALS: Any indication of willingness to pay, urgency, or active search for solutions
6. RED FLAGS: Any signals that the problem is less painful than assumed, or that our assumed
   solution doesn't match what they actually need
7. JOBS TO BE DONE: One sentence per interviewee describing their core job in the problem space
8. RECOMMENDATION: Based on all evidence, does this validate or challenge our hypothesis?
   What should we change?

Be honest. If the data contradicts the hypothesis, say so clearly.
```

---

## 3. Product Strategy & Planning Phase

### From Validated Idea to Executable Plan

This phase converts validation signal into a buildable roadmap. The output is not a pitch deck. It is a set of living documents that govern every decision in the build phase.

### The Core Value Loop

Every SaaS product has one action that delivers the primary value. Everything else supports or leads to that action. Find it and protect it from feature creep.

The discipline of this phase is identifying your core loop and ruthlessly cutting everything that isn't on the critical path to delivering it.

Example — an email analytics tool:
- **Core loop:** Connect email account → View categorized inbox → Take action on prioritized messages
- **Everything else** (integrations, team features, dashboards, API) is scaffolding that comes after the loop works

Your MVP must deliver the core loop without bugs and without confusion. Nothing else is required to launch.

### Feature Prioritization — RICE Framework

Stop using gut feel. Use RICE:

- **Reach:** How many users does this feature affect per month?
- **Impact:** How much does it move the north star metric? (3=massive, 2=significant, 1=low, 0.5=minimal)
- **Confidence:** How sure are you of reach and impact? (100%=high evidence, 80%=some, 50%=gut)
- **Effort:** Person-weeks to build and ship

**RICE Score = (Reach × Impact × Confidence) / Effort**

Rank features by score. Build in order. This removes ego from product decisions. When someone argues for a feature, ask: "What's its RICE score?" That conversation becomes productive.

### MVP Scope with MoSCoW

- **Must Have:** Without this, the product doesn't function. (Core loop features only.)
- **Should Have:** Important but not launch-blocking.
- **Could Have:** Nice to have, documented and parked.
- **Won't Have:** Explicitly excluded. Write it down. Prevents scope creep by making the exclusion a decision.

Write this list. Review it every week during development. Every week, ask: "Are we building anything in the Could Have list?" If yes, stop and re-scope.

### Defining Metrics Before Building

Decide now what success means numerically. You cannot optimize what you haven't measured.

**North Star Metric:** The single number that best captures value delivered to users. Not revenue. Not signups. The behavior that signals they got the value:
- Email tool: Emails actioned per week
- Analytics SaaS: Reports generated per week
- PM tool: Tasks completed per sprint

**Activation Metric:** % of sign-ups who complete the core action within Day 7. This is your first filter for product quality and onboarding effectiveness.

**Retention Metric:** % of users active at Day 7, Day 30, Day 60. A product with flat retention past Day 30 has PMF in a segment. A product whose retention curve approaches zero doesn't, regardless of revenue.

**Vanity Metrics to Ignore:**
- Total registered users (without activation)
- Total page views
- Social media followers
- App Store downloads without DAU data

### AI Workflow: Strategy & Planning

**PRD Generation:**

```
ROLE: You are a product manager at a successful B2B SaaS company. You write clear,
technical, opinionated product requirement documents.

CONTEXT:
Product: [Name]
Stage: Pre-MVP
ICP: [Your ICP]
Core problem: [Problem statement]
Core value loop: [Your core loop]
Tech stack: [Your stack]
Team size: [1-2 people]
Timeline: [X weeks to MVP]

Validated features (from user research):
[List features you've validated]

TASK: Write a complete PRD for the MVP with these sections:

1. PRODUCT OVERVIEW (2 paragraphs)
2. USER STORIES: For each feature, write user stories in the format:
   "As a [ICP], I want to [action], so that [outcome]."
   Include acceptance criteria for each.
3. NON-FUNCTIONAL REQUIREMENTS: Performance, security, accessibility baselines
4. OUT OF SCOPE: Explicit list of what is not being built in V1
5. SUCCESS METRICS: How will we know MVP is successful? Define targets for:
   - Activation rate (target: X%)
   - Day-7 retention (target: X%)
   - NPS from beta users (target: X)
6. OPEN QUESTIONS: Things that need answers before or during development

Be specific. Avoid vague language like "intuitive" or "easy to use." Define what
"easy" means with measurable criteria.
```

**User Story + Ticket Generation:**

```
Convert the following PRD section into a set of development tickets for Linear.

PRD section: [PASTE]

For each ticket, produce:
- Title (imperative verb + clear noun: "Add rate limiting to auth endpoints")
- Description (what and why, not how)
- Acceptance criteria (bullet list of testable conditions)
- Estimated complexity: S / M / L / XL
- Dependencies (other tickets that must complete first)

Format as a JSON array of ticket objects.
```

---

## 4. UI/UX Design Phase

### Design Principles That Matter for SaaS

Forget "beautiful UI." The metric for SaaS design is **time-to-value** — how quickly does a new user reach the moment where they say "this is exactly what I needed." Design's job is to eliminate every second of friction between sign-up and that moment.

A user should reach the product's core value within 3 minutes of first sign-up. Everything in your design system should be evaluated against that constraint.

### Information Architecture First

Before opening Figma, define:
- What are the primary entities in your product? (For a CRM: Contacts, Deals, Activities)
- What are the core user actions on each entity?
- What is the navigation hierarchy?
- What does the empty state look like before a user has any data?

Draw this on paper or in Whimsical. The empty state is the most important screen you'll design — it's what every new user sees first, and it needs to drive them toward action, not confusion.

### The Designerless UI Pipeline

This is the workflow that lets a solo developer ship production-quality UI without a dedicated designer:

```
Problem → Text description → v0 (generate) → Evaluate & pick best variant
→ Copy component code → Integrate into Next.js → Refine in code → Tailwind polish
→ shadcn/ui for complex components → Figma for final system documentation (optional)
```

**v0 prompt structure for professional output:**

```
Build a [component type] for a [product type] SaaS application.

Design language: [minimal / editorial / dense-utility / clean-professional]
Color palette: Primary [hex], Background [hex], Text [hex], Accent [hex]
Font: [Font name] for headings, [Font name] for body

Component requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

States to handle: [empty, loading, error, populated]
Use Tailwind CSS and shadcn/ui components.
Do not use any external icon libraries — use Lucide icons (already in shadcn).
The component should be production-ready, not a mockup.
```

### Component System — Build Once, Scale Forever

From day one, build on a design system. Never design individual screens in isolation.

Establish these design tokens in your Tailwind config and stick to them:
- **Colors:** `primary`, `primary-foreground`, `secondary`, `muted`, `muted-foreground`, `destructive`, `border`, `input`, `ring` — the shadcn/ui token system
- **Typography scale:** 4 sizes only at first: `text-sm` (14px), `text-base` (16px), `text-lg` (18px), `text-2xl` (24px)
- **Spacing:** 4px base unit. Use only: 4, 8, 12, 16, 24, 32, 48, 64px
- **Border radius:** Pick one value. Use it everywhere. `rounded-md` is safe.
- **Shadows:** Maximum 3 levels. `shadow-sm` for cards, `shadow-md` for modals, `shadow-lg` for dropdowns.

### Onboarding Design — The Retention Multiplier

Onboarding is the highest-leverage screen in your product. Users who reach their "aha moment" in session 1 are 3–4x more likely to return in Week 2.

**The three onboarding patterns:**

**1. Interactive Setup (best for complex tools):** A step-by-step wizard that configures the product. Progress bar visible. Each step delivers incremental value. Skip option always available.

**2. Sample Data (best for analytics/content tools):** Pre-populate the product with realistic dummy data so users see the value before adding their own. The moment they see what a "full" version looks like, they want to fill it themselves.

**3. Empty + Guidance (best for simple tools):** Clean empty state with a clear primary action. One big button. One sentence of guidance. No distractions. The entire screen points at one thing to do next.

**Empty state rules:**
- Never show just a blank area with "No items yet."
- The empty state is a CTA, not a placeholder.
- It should show an illustration or icon, a sentence explaining what belongs here, and a primary action button.
- The copy should be in the user's language: "You haven't connected a data source yet. Connect your first source in 2 minutes."

### Accessibility Baseline

These are non-negotiable. Enterprise buyers check compliance. Screen reader users are real customers.
- All interactive elements keyboard-navigable (Tab, Enter, Escape)
- Color contrast ratio minimum 4.5:1 (WCAG AA)
- Focus states visible on all interactive elements
- Form inputs with explicit `<label>` elements — never rely on placeholder text as the label
- Error messages that tell the user what went wrong and how to fix it — not just "Error"

### AI Workflow: Design

**Component Description for v0:**

When you know what you need to build but not how to design it, describe the job it needs to do:

```
I need a SaaS dashboard sidebar component.

Context: B2B analytics tool for marketing managers. The sidebar is the primary
navigation. The user's organization logo appears at the top. Below it: navigation
links. At the bottom: user avatar + settings link.

Navigation items: Overview, Campaigns, Audiences, Reports, Integrations, Settings
Each item has an icon (Lucide) + label.

Active state: solid background on active item
Hover state: subtle background
The sidebar should collapse to icons-only on smaller screens.

Design language: Clean, professional, minimal. Not flashy. This is a tool people
use for 4 hours a day — it should disappear into the background.
Colors: Background #0F172A (dark navy), Text #94A3B8, Active text #FFFFFF,
Active background #1E293B, Accent #6366F1

Use Tailwind CSS + shadcn/ui. Return production-ready React component code.
```

**Microcopy at Scale:**

```
I need microcopy for the following UI moments in my [product type] SaaS.

For each, write:
- The copy (max character count given)
- One alternative version
- Tone notes

MOMENTS:
1. Empty state — no campaigns created yet [headline: 40 chars, body: 100 chars]
2. Confirmation dialog — deleting a campaign (irreversible) [headline: 50 chars, button: 20 chars]
3. Success toast — campaign published [25 chars]
4. Error toast — CSV upload failed due to wrong format [60 chars]
5. Upgrade prompt — user hits free plan limit [headline: 50 chars, body: 80 chars, CTA: 25 chars]
6. Onboarding checklist item — connect first integration [40 chars]

Tone: Direct, human, never corporate. Never say "successfully." Assume the user is
competent and busy.
```

---

## 5. MVP Development Phase

### The MVP Mindset

MVP does not mean "buggy product." It means **minimum scope with full production quality**. Everything you ship must work correctly. You are cutting features, not cutting quality. The quality bar for what you do ship must be high — a user's first session is their permanent impression.

The discipline of MVP development is saying no 40 times a day. Every "wouldn't it be nice if" idea goes into a parking lot, not the sprint.

### What Never to Build From Scratch

At MVP, your job is to build the unique value — the thing that only your product does. Everything that exists as a commodity service gets delegated:

| Function | Use This Instead |
|---------|-----------------|
| Authentication | Clerk, Supabase Auth, or Auth.js |
| Payments & billing | Stripe (never build payment processing) |
| Email delivery | Resend, Postmark |
| File storage | Cloudflare R2 or Supabase Storage |
| Search | Typesense or Algolia |
| Background jobs | Trigger.dev or Inngest |
| Rate limiting | Upstash Ratelimit |
| Feature flags | PostHog feature flags or Statsig |

Every hour spent building authentication is an hour not spent on your actual product. Use services.

### The AI-First Development Workflow

This is not "use Copilot for autocomplete." It's a complete workflow where AI handles the mechanics of implementation while you handle architecture, judgment, and product decisions.

**The Feature-to-Code Pipeline:**

```
1. Write a feature spec with Claude (what it does, not how)
2. Paste spec into Cursor — ask it to implement the feature
3. Review the output: does it match the spec? does it handle edge cases?
4. Ask Claude to review the code for security and performance issues
5. Ask Claude to write tests for the implementation
6. Ask Claude to write documentation for the feature
7. Merge
```

A feature that used to take 2 days (spec + design + code + test + docs) now takes 3–4 hours for a skilled developer using this workflow.

**Setting Up Your Cursor/Windsurf Rules:**

Create a `.cursorrules` file at the root of your project. This file tells the AI about your codebase conventions so every code generation is consistent:

```markdown
# Project: [Your Product Name]
# Tech stack: Next.js 14 (App Router), TypeScript, Drizzle ORM, PostgreSQL,
#             Tailwind CSS, shadcn/ui, Clerk auth, Stripe billing

## Code conventions
- Use TypeScript strictly. No `any` types.
- All database queries through Drizzle ORM. Never raw SQL except for migrations.
- Server actions for form submissions. API routes for external webhooks only.
- Use Zod for all input validation at API/action boundaries.
- Components: functional only, no class components.
- State: Zustand for global UI state, TanStack Query for server state.
- Use `@/` path alias for all imports from src/.

## File structure
- /app — Next.js App Router pages and layouts
- /components/ui — shadcn/ui components (do not modify)
- /components — shared custom components
- /lib — utilities and shared functions
- /lib/db — Drizzle schema and migrations
- /lib/validations — Zod schemas
- /server/actions — Next.js server actions

## Database patterns
- Every table has: id (uuid, primary key), created_at, updated_at
- Every user-facing table has: organization_id (for multi-tenancy)
- Soft deletes via deleted_at column, never hard delete user data
- All queries filter by organization_id from auth session — never trust client input

## Auth pattern
- Get current user: `const { userId, orgId } = auth()` from Clerk
- Always verify orgId matches the resource being accessed
- Unauthenticated redirect happens in middleware, not in components

## Error handling
- Server actions return `{ success: boolean, data?: T, error?: string }`
- Never throw unhandled errors in server actions — catch and return error shape
- Use Sentry for unexpected errors in try/catch blocks

## Component patterns
- Loading states: use Suspense boundaries with skeleton components
- Empty states: always include an icon, description, and primary action CTA
- Error states: always include the error message and a retry action
```

**Feature Implementation Prompt (paste into Cursor):**

```
Implement the following feature in our Next.js 14 codebase.

FEATURE: [Feature name]
DESCRIPTION: [What it does from user perspective]

USER STORY:
As a [ICP], when I [trigger], I want to [action], so that [outcome].

ACCEPTANCE CRITERIA:
- [Criterion 1 — testable]
- [Criterion 2 — testable]
- [Criterion 3 — testable]

DATA MODEL (if new tables needed): [Describe what data is stored]
UI LOCATION: [Where in the app this appears]
EDGE CASES TO HANDLE: [List known edge cases]

Follow all conventions in .cursorrules. Include:
1. Database migration (if schema changes needed)
2. Server action or API route
3. React component(s)
4. Zod validation schema
5. Loading, error, and empty states in the UI

Implement one file at a time and ask me to confirm before moving to the next.
```

**AI Debugging Workflow:**

When something breaks, don't start by Googling the error. Use this prompt:

```
I'm getting the following error in my Next.js 14 application:

ERROR: [paste full error message and stack trace]

CONTEXT:
- What I was doing when the error occurred: [description]
- Relevant code:

[PASTE the function/component/route where the error occurs]

[PASTE any related code — the database schema, the component that calls this, etc.]

You are a senior Next.js developer. Do the following:
1. Explain what the error means in plain language
2. Identify the root cause (not just the symptoms)
3. Provide the fix with explanation
4. Flag any related issues you notice in the surrounding code
5. Tell me what test I should write to prevent this regression
```

### Development Workflow & Git Discipline

**Repository Structure (Monorepo):**
```
/apps
  /web          # Next.js frontend + API routes
/packages
  /db           # Drizzle schema, migrations, db client
  /ui           # Shared component library
  /config       # Shared TypeScript, ESLint, Tailwind config
  /lib          # Shared utilities and types
turbo.json      # Turborepo pipeline config
```

**Git Branching:**
- `main` — production. Deploy from here. Never commit directly.
- `develop` — integration branch. Features merge here first.
- `feature/[name]` — individual features. One PR per feature.
- Tag every production release: `v0.1.0`, `v0.2.0` etc. Your changelog maps to these tags.

**Commit message convention:**
```
feat: add campaign analytics dashboard
fix: resolve infinite loop in subscription sync
docs: update API authentication guide
chore: upgrade Next.js to 14.2.3
```

### Environment & Security Setup

**Three environments from day one:**
- **Local:** `.env.local` — development database, local services
- **Staging:** Mirror of production. All PRs are deployed here for review before merge.
- **Production:** Live users. Deployments require deliberate action, never automatic.

**Security non-negotiables for MVP:**
- HTTPS enforced on all routes, no HTTP fallback
- Authentication middleware on every protected route — not per-handler
- Authorization checks: verify the authenticated user owns the resource they're accessing (not just authenticated)
- Input validation with Zod on all API and server action inputs — never trust client data
- Rate limiting on auth endpoints (sign-up, sign-in, password reset, magic link)
- SQL injection prevention: Drizzle uses parameterized queries — do not concatenate strings into queries
- CORS: whitelist specific origins in production, never `*`
- Environment variables: never commit secrets. Use Doppler or Vercel env for all environments
- Dependency auditing: run `pnpm audit` in CI pipeline

### Database Design for SaaS

**Universal schema rules:**
- Every table: `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`, `created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()`, `updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()`
- User-facing data: `deleted_at TIMESTAMP WITH TIME ZONE NULL` for soft deletes — never hard delete rows users created
- Multi-tenancy: `organization_id UUID NOT NULL REFERENCES organizations(id)` on every user-facing table

**Multi-tenancy enforcement pattern:**

```typescript
// In your database query layer — filter by organization at the query level
// NEVER trust organization_id from client request body

const campaign = await db.query.campaigns.findFirst({
  where: and(
    eq(campaigns.id, campaignId),
    eq(campaigns.organizationId, session.orgId) // Always filter by authenticated org
  )
})

if (!campaign) {
  // Either not found OR belongs to different org — return same error
  // Never reveal whether a resource exists if user can't access it
  return { error: "Campaign not found" }
}
```

---

## 6. Testing & QA Phase

### The Testing Philosophy for a 2-Person Team

You don't have time for 100% test coverage. You do have time to ensure the critical paths never break. Prioritize test coverage in this order:

1. **Authentication and authorization** — a breach kills the product
2. **Payment and billing flows** — broken checkout kills revenue
3. **Core business logic** — the algorithm that delivers your unique value
4. **Data mutation operations** — create, update, delete on user data

Everything else is secondary until the business is de-risked.

### The Testing Pyramid

```
          /\
         /  \
        / E2E \          — Critical user paths (5–10 tests)
       /--------\
      /Integration\      — API contracts, DB operations, auth
     /--------------\
    /   Unit Tests   \   — Business logic, validations, utilities
   /------------------\
```

### Unit Testing

**Stack:** Vitest (faster than Jest, ESM-native, same API)

What to unit test: pure functions, business logic isolated from I/O, validation schemas, data transformations.

**AAA pattern — every test:**
```typescript
describe('calculateProration', () => {
  it('should return correct prorated amount for mid-cycle upgrade', () => {
    // ARRANGE
    const currentPlan = { price: 29, billingCycleStart: new Date('2024-01-01') }
    const newPlan = { price: 99 }
    const upgradeDate = new Date('2024-01-15')

    // ACT
    const result = calculateProration(currentPlan, newPlan, upgradeDate)

    // ASSERT
    expect(result.creditAmount).toBeCloseTo(14.5, 2)
    expect(result.chargeAmount).toBeCloseTo(49.5, 2)
  })
})
```

### Integration Testing

Test your API routes and server actions against a real test database — not mocked. Use a transaction-based isolation pattern: each test runs in a transaction that rolls back after, leaving the database clean.

**Minimum integration test coverage per endpoint:**
- Happy path (valid input, authenticated user with permission)
- Unauthenticated request
- Unauthorized request (authenticated but accessing another org's resource)
- Invalid input (malformed data, missing required fields)
- Resource not found

### End-to-End Testing

**Stack:** Playwright — more reliable than Cypress, better multi-tab support, faster in CI.

**E2E tests to write before any public launch:**
1. Sign-up → email verification → onboarding → dashboard
2. Core product action (the primary thing users do)
3. Subscription upgrade (free → paid via Stripe)
4. Password reset flow
5. User invites a team member (if applicable)

### Pre-Release Manual QA Checklist

Before every production deployment, verify manually:

**Core functionality:**
- [ ] All nav links work. No 404s.
- [ ] Core user flow completes end-to-end without errors
- [ ] Forms submit correctly. Error states show for invalid input.
- [ ] Mobile layout usable (test on real device — not devtools simulation)
- [ ] Email notifications send and render correctly (test inbox)
- [ ] Stripe webhook processing verified in Stripe dashboard

**Performance:**
- [ ] First Contentful Paint < 1.5s on a standard connection
- [ ] No obvious N+1 queries (check ORM query log)
- [ ] Images optimized: WebP format, lazy loading below fold

**Security:**
- [ ] Unauthenticated users cannot access protected routes
- [ ] User A cannot read or modify User B's data (test with two accounts)
- [ ] API responses don't expose sensitive fields (passwords, tokens, other users' data)

**Cross-browser:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari mobile — this is where most layout and Safari-specific bugs hide

### AI Workflow: Testing

**Test Suite Generation:**

```
Generate a complete test suite for the following function using Vitest.

FUNCTION:
[paste the function code]

Cover:
1. All happy path scenarios
2. Edge cases: empty input, null values, boundary values, very large inputs
3. Error scenarios: invalid types, missing required fields
4. Any business logic constraints mentioned in the function's JSDoc or comments

For each test:
- Use AAA structure (Arrange, Act, Assert)
- Write descriptive test names that read as documentation
- One assertion concept per test (multiple related assertions are fine,
  but each test should test one behavior)

Return the complete test file, ready to run.
```

**Playwright E2E Test Generation:**

```
Write a Playwright E2E test for the following user flow:

FLOW: [Describe the complete user journey step by step]

Application URL: [your local dev URL]
Test user credentials: email=[test@example.com], password=[testpassword]

Requirements:
- Use page object model pattern (define a class for each page)
- Include explicit waits (waitForURL, waitForSelector) — no arbitrary timeouts
- Assert on visible text and UI state, not implementation details
- Handle potential loading states
- The test should be deterministic — same result every run

Include: the page object classes and the test spec file.
```

**Security Audit Prompt:**

```
You are a security engineer reviewing this code for vulnerabilities.

[PASTE CODE — API route, server action, or database query]

Check for and report:
1. Injection vulnerabilities (SQL, command, LDAP)
2. Authorization bypass: can a user access resources they shouldn't?
3. Sensitive data exposure in responses or logs
4. Missing input validation
5. Rate limiting gaps
6. Insecure direct object references
7. Any other OWASP Top 10 concerns

For each finding: severity (Critical/High/Medium/Low), description, and the fix.
```

---

## 7. Beta Launch Phase

### What Beta Actually Is

Beta is not a public launch with a disclaimer. Beta is a controlled environment with a specific cohort of users whose feedback shapes the product before you open it. Beta users are collaborators. Treat them that way — communicate more than feels necessary, respond within hours, and implement their critical feedback visibly.

### Beta Cohort Recruitment

Target 50–200 beta users. Under 50 gives you insufficient signal. Over 200 is unmanageable for genuine personal engagement.

**Where to find them:**
- Your waitlist from the smoke test
- Relevant subreddits — a genuine "I built this, looking for beta testers" post, not spam
- Niche Discord and Slack communities in your category
- Direct outreach to people who publicly complained about the problem you're solving
- Twitter/X threads where you documented building in public

**The personal welcome email:**
Every beta user gets a personal email from you — not from "The Team." One email, your name in the signature, asking one specific question about their problem. This sets the tone for the relationship.

### Feedback Infrastructure

**Four channels, not more:**
1. **In-app feedback widget** — single question: "What's one thing that frustrated you today?" + text field. Low friction.
2. **Weekly email survey** — 3 questions max via Typeform. Sent every Friday.
3. **Shared community** — a private Slack or Discord channel where beta users talk to each other and to you.
4. **Session recordings** — PostHog or FullStory running from day one. When someone reports confusion, watch their session before responding.

### Feedback Triage Framework

Not all feedback is equal. Use this classification:

**Act immediately:**
- Multiple users independently reporting the same bug
- Users unable to complete the core flow
- Security or data integrity issues

**Act within the week:**
- UX confusion at a specific step confirmed by session recordings
- Feature gaps affecting 30%+ of your user base

**Park for later:**
- Feature requests from individual power users (vocal minority)
- Edge cases affecting <5% of users
- Aesthetic preferences

**Never act on:**
- Requests for features that don't align with your core positioning
- Feedback from users who don't fit your ICP (they found you anyway but you shouldn't serve them)

### Beta Metrics to Monitor

- **Activation rate:** % completing the core action within Day 7. Below 40%? Your onboarding is broken. Fix it before expanding.
- **Return rate:** % of beta users who return for a second session. Below 50%? Your core value isn't landing.
- **Support volume per user:** If you're getting more than 0.5 support messages per user per week, the product is too confusing.
- **Qualitative NPS:** "1–10, how likely to recommend once it's public? Why?" Anything below 7 means you're not ready to open up.

### AI Workflow: Beta Management

**Weekly Feedback Synthesis:**

```
Below are this week's beta user feedback submissions from three channels:
in-app widget responses, weekly survey responses, and Slack messages.

[PASTE ALL FEEDBACK]

You are my head of product. Produce a weekly feedback analysis:

1. CRITICAL ISSUES (must fix before expanding beta):
   [List with evidence and user quotes]

2. PATTERN THEMES (mentioned by 3+ users):
   [List with frequency and representative quotes]

3. ACTIVATION BLOCKERS (anything that stops new users from completing setup):
   [List with specific steps where confusion occurs]

4. FEATURE REQUESTS (ranked by frequency, not importance):
   [List — we will evaluate against our roadmap separately]

5. POSITIVE SIGNALS (what's landing — important to know what not to break):
   [List with quotes]

6. THIS WEEK'S TOP PRIORITY: One specific change that would most improve
   the product for the most users.

Use direct quotes as evidence. Be specific about which users said what.
```

**Beta Update Email Generation:**

```
Write the weekly beta user update email.

TONE: Founder writing directly to collaborators. Personal, honest, not corporate.
No filler phrases. No "we're excited to announce." Just direct communication.

THIS WEEK:
- Fixes shipped: [list what you fixed]
- What you're building next: [next week's work]
- One open question for users: [the specific thing you need their input on]
- Honest acknowledgment: [something that's still broken or missing, with timeline]

Format: Plain text email. Short paragraphs. No bullet points in the email body —
write in prose. Max 300 words. Sign with your first name.
```

---

## 8. Product-Market Fit Phase

### What PMF Actually Is (and Isn't)

PMF is not a feeling. It is a measurable state where a specific market segment finds your product so valuable that retention is organic, word-of-mouth happens without effort, and you're struggling to keep up with demand rather than struggling to create it.

**The Sean Ellis Test:**
Survey active users: "How would you feel if you could no longer use [Product]?"
- Very disappointed
- Somewhat disappointed
- Not disappointed

40%+ "Very disappointed" = PMF in that segment. Below 40% = you're not there yet, regardless of what revenue says.

**The Retention Curve Test:**
Plot the % of users still active at Day 1, 7, 14, 30, 60, 90. In a product with PMF, the curve flattens after initial drop — meaning a stable core of users finds the product indispensable. In a product without PMF, the curve approaches zero. Any non-zero flat line is signal.

**The Expansion Revenue Test:**
Expansion MRR (existing customers spending more) only happens with PMF. If your MRR growth is entirely new customers with zero expansion, you haven't solved retention.

### The PMF Discovery Cycle

PMF is found through disciplined iteration — not random product changes. The cycle:

**Step 1 — Identify your most retained users.**
Who are the users who would be "Very disappointed"? What do they have in common — job title, use case, company size, entry point? This is your real ICP. It may differ from what you assumed.

**Step 2 — Interview retained users.**
"What would you replace us with if we disappeared tomorrow?" (Forces concrete comparison.) "Why do you keep coming back every week?" (Reveals the core value you might be underselling.) The language they use is your new marketing copy.

**Step 3 — Optimize acquisition for users who look like your retained cohort.**
Rewrite your landing page for them. Change your ad targeting. Update your SEO content. Stop marketing to the segment that signs up but doesn't activate.

**Step 4 — Cut or deprioritize everything that doesn't serve the retained cohort.**
A product that does one thing extraordinarily well for a specific segment beats a product that does many things adequately for everyone.

### When You Don't Have PMF Yet

Signs you're pre-PMF and must iterate:
- Monthly churn above 5% for B2B, above 10% for B2C
- Users rarely returning after their first 3 sessions
- Heavy reliance on discounts to convert or retain
- Support volume dominated by the same confusion repeatedly
- You cannot describe your best customer with specificity

Options:
1. **Reposition:** Same product, different ICP or use case
2. **Pivot core feature:** Keep infrastructure, change what the product actually does for users
3. **Niche down:** Smaller, more specific segment — own it completely
4. **Change the model:** Sometimes the product is right but the pricing model doesn't fit how customers buy

### AI Workflow: PMF Analysis

**Sean Ellis Survey Analysis:**

```
Below are [N] responses to our PMF survey from active users.
Each response includes: their answer to the disappointment question,
their written explanation, and their usage tier.

[PASTE SURVEY DATA]

Analyze this data as a product strategist:

1. PMF SCORE: What % answered "Very disappointed"? Break down by:
   - User segment (if you have segmentation data)
   - Usage tier or frequency
   - Acquisition channel (if available)

2. LANGUAGE ANALYSIS: For users who answered "Very disappointed," what specific
   value are they articulating? What exact words do they use? These become our copy.

3. SEGMENT HYPOTHESIS: Based on patterns in the "Very disappointed" cohort,
   describe the user profile most likely to find us indispensable.

4. CHURN RISK: For users who answered "Somewhat disappointed" or "Not disappointed,"
   what are their concerns? Can any be converted with product changes?

5. RECOMMENDATION: Are we at PMF? In which specific segment? What is the one
   most important thing to do next based on this data?
```

---

## 9. Scaling Phase

### What Scaling Means for a Small SaaS Team

Scaling is making every part of your business — product, infrastructure, support, marketing — work at 10x the load it was designed for, without 10x the team. For a 2-person SaaS company, scaling is mostly about systematic leverage: better processes, better automation, and delegating predictable work to systems before you hire.

### Infrastructure Scaling Path

**Database scaling path:**
```
Phase 1 (0–1K users):    Single Postgres instance (Supabase or Neon)
Phase 2 (1K–10K users):  Connection pooling (PgBouncer — built into Supabase)
                          + read replica for analytics queries
Phase 3 (10K–50K users): Vertical scaling + strategic indexing + query optimization
                          + Redis caching for hot data
Phase 4 (50K+ users):    Horizontal partitioning, CDN for reads, potential
                          service extraction for specific workloads
```

Never add complexity before you have the performance data that demands it. Premature optimization is a real cost.

**Caching strategy (in order of implementation):**
1. **CDN caching** — static assets, public API responses that don't need freshness
2. **Redis (Upstash)** — session data, rate limiting state, frequently-read config
3. **Application-level caching** — expensive computations with React `cache()` or `unstable_cache()` in Next.js
4. **Database query results** — only for queries that are hot (run >100x/minute) and whose data changes infrequently

**Background job patterns:**
Anything taking more than 200ms synchronously and not requiring immediate response should be a background job.

Use **Trigger.dev** for:
- Email sending (never block a response waiting for email delivery)
- Report generation
- Data processing after uploads
- Scheduled jobs (daily digests, weekly summaries, subscription renewals)
- AI processing (never block on LLM API calls)
- Webhook processing (receive → acknowledge → process async)

Pattern:
```
User triggers action → API enqueues job → returns 200 immediately →
Job processes in background → WebSocket or polling updates UI with result
```

### Support Scaling — Before You Hire

Support volume grows linearly with users. Build deflection systems before you need a support hire:

**Tier 1: Self-service (deflects 60–70% of tickets)**
- Knowledge base in Mintlify — article for every question asked more than twice
- In-app contextual tooltips at every point of friction
- Loom video walkthroughs embedded in docs
- In-app onboarding checklist

**Tier 2: AI-assisted support (deflects 20–30% of remaining)**
- Deploy a RAG-based support chatbot trained on your knowledge base
- Auto-draft responses to new tickets using Claude + your docs as context
- Auto-categorize and route tickets by type

**Tier 3: Human response**
- Only tickets that passed AI and still aren't resolved
- Every ticket is a product research signal — log the category, fix the root cause

### Marketing at Scale — The Content Flywheel

**The SEO content flywheel:**
Blog posts → SEO traffic → Sign-ups → Users who share → More traffic

This compounds over 6–12 months. Start it during PMF phase so it's generating results during scaling.

**Content that works for SaaS SEO:**
- "How to [achieve outcome your ICP wants]" — captures high-intent informational search
- "[Your product] vs [Competitor]" — captures high-intent comparison search (these convert best)
- "[Your product] + [Popular tool]" integration pages — captures adjacent audience search
- "[Job Title] guide to [problem you solve]" — resonates with specific ICP and ranks well

**Paid acquisition:**
Run paid ads only after your funnel converts organically. Paid acquisition amplifies what's already working — it never fixes a broken funnel.

Start with:
- **Google Search Ads** on your highest-intent keywords (problem + solution search terms)
- **LinkedIn Ads** for B2B ICP targeting by job title and company size

Track **CAC** and **LTV** before scaling spend. LTV:CAC ratio must be at least 3:1 to be a sustainable growth loop.

### When to Leave Vercel + Railway

The managed platform era ends when:
- Monthly hosting costs exceed $500 and growing faster than revenue
- You have specific compliance requirements (SOC2, HIPAA) that require infrastructure control
- Your workload has patterns that managed platforms price poorly (high compute, low egress, or vice versa)

**The migration path:** Vercel + Railway → AWS (EC2, RDS, ECS) or GCP. Use Terraform to manage infrastructure as code. This migration should be planned and executed carefully — it is not a weekend project.

### AI Workflow: Scaling Operations

**Documentation Generation at Scale:**

```
Generate a knowledge base article for our support documentation.

PRODUCT: [Name]
ARTICLE TOPIC: [Specific feature or workflow]

BASED ON: These are the 5 most recent support tickets related to this topic:
[PASTE TICKETS]

Write the article in the following structure:
1. TITLE: Specific and searchable (user's question, not feature name)
2. ONE-LINE SUMMARY: The answer in one sentence, for users who skim
3. STEP-BY-STEP GUIDE: Numbered steps with clear action verbs
4. COMMON MISTAKES: What people do wrong and how to fix it
5. RELATED ARTICLES: [Leave as placeholder — we'll link manually]

Tone: Direct, friendly, assumes the user is intelligent but unfamiliar with this feature.
Never say "simply" or "just." Every step should be explicit.
Audience: [Your ICP description]
```

**Support Ticket Auto-Draft:**

```
You are the customer support agent for [Product Name], a [one-line description].

Here is a support ticket from a user:

SUBJECT: [ticket subject]
MESSAGE: [ticket body]
USER PLAN: [free/pro/enterprise]
ACCOUNT AGE: [days since sign-up]
LAST ACTIVE: [date]

Based on our documentation:
[PASTE RELEVANT KB ARTICLES]

Draft a support response that:
1. Acknowledges their specific issue (don't use a template opener)
2. Provides the solution in clear steps
3. Anticipates the next question they'll probably ask and answers it
4. Ends with a specific question to confirm the issue is resolved

Tone: Helpful and human. Not corporate. First name in sign-off.
Max length: 150 words.
```

---

## 10. Automation & Intelligence Phase

### The Sequencing Matters

This phase comes after you have users, retention, and revenue — not before. AI built onto a product with proven value multiplies that value. AI built onto an unvalidated product is a distraction and an expensive one. The sequencing is intentional.

### The Three Layers of Product AI

**Layer 1 — AI-Assisted Workflows (easiest to ship, immediate value)**
AI accelerates actions users already take. Examples:
- Auto-fill form fields from existing data
- Suggest next steps based on context
- Generate first drafts for user review
- Summarize activity since last login

Users stay in control. AI saves time. Zero risk of wrong AI output destroying user data.

**Layer 2 — AI-Automated Workflows (moderate complexity, high leverage)**
AI completes tasks end-to-end with minimal human input. Examples:
- Auto-categorize incoming data
- Send personalized follow-ups based on behavior triggers
- Generate weekly reports automatically
- Classify and route support tickets

Users define the rules. AI executes. Human review for high-stakes outputs.

**Layer 3 — AI-Native Features (hardest, highest moat)**
Capabilities that only exist because of AI — not automation of existing workflows, but entirely new categories of value:
- Semantic search across all user data
- Anomaly detection and proactive alerts
- Predictive recommendations
- Conversational interfaces to structured data

These become your moat because they require deep product integration and large amounts of user data to work well. Competitors can't copy them quickly.

### Building AI Features Into Your Product

**Model selection for production:**

| Task Type | Model | Why |
|-----------|-------|-----|
| Reasoning, document analysis, structured output | Claude 3.5 Sonnet | Best reasoning, reliable format compliance |
| Code generation | Claude 3.5 Sonnet or GPT-4o | Tie — both excellent |
| High-volume, simpler tasks (classification, summarization) | Claude 3 Haiku or GPT-4o-mini | Fast, cheap, sufficient |
| Long documents (100K+ tokens) | Gemini 1.5 Pro | Best long-context |
| Real-time, low-latency | Groq (Llama 3.1 70B) | Fastest inference |
| Image + text | GPT-4o or Claude 3.5 Sonnet | Both support vision |

**Cost management from day one:**
- Cache identical and near-identical responses (use semantic similarity with embeddings to detect near-duplicate inputs)
- Use smaller models for classification/routing — only escalate to large models when needed
- Set hard input token limits per user tier — prevent abuse
- Monitor cost per user per feature in Helicone

**Prompt management in production:**

Do not hardcode prompts as strings scattered across your codebase. Store them as versioned assets:

```typescript
// lib/prompts/index.ts
export const PROMPTS = {
  SUPPORT_DRAFT: {
    version: "v2.1",
    system: `You are a customer support agent for [Product]...`,
    userTemplate: (ticket: SupportTicket) => `
      Ticket: ${ticket.subject}
      Message: ${ticket.body}
      User context: ${ticket.userContext}
    `
  },
  EMAIL_CATEGORIZER: {
    version: "v1.3",
    system: `You are an email classification system...`,
    userTemplate: (email: Email) => `Classify this email: ${email.subject}\n${email.body}`
  }
}
```

When you update a prompt in production, version it. Log which prompt version produced each output. When output quality degrades, you know exactly which version change caused it.

**RAG Implementation for "Chat with Your Data" Features:**

```
User types a question
→ Embed the question (OpenAI text-embedding-3-small)
→ Query pgvector for top-K relevant chunks from user's data
→ Build context window: [system prompt] + [relevant chunks] + [user question]
→ Call Claude/GPT with context
→ Stream response to user
→ Log: question, chunks used, response, user feedback signal
```

**Database setup for RAG with pgvector:**
```sql
-- Enable pgvector extension (available in Supabase and Neon)
CREATE EXTENSION IF NOT EXISTS vector;

-- Documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  content TEXT NOT NULL,
  metadata JSONB,
  embedding VECTOR(1536), -- OpenAI text-embedding-3-small dimension
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vector similarity search index
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

**Retrieval query:**
```sql
SELECT content, metadata,
       1 - (embedding <=> $1::vector) as similarity
FROM documents
WHERE organization_id = $2
  AND 1 - (embedding <=> $1::vector) > 0.7  -- Minimum similarity threshold
ORDER BY embedding <=> $1::vector
LIMIT 5;
```

### Agentic Workflows

Agents are AI systems that complete multi-step tasks autonomously — deciding which tools to use and in what order.

Build agents for:
- **Data enrichment pipelines:** Agent receives company name → searches web → extracts relevant info → enriches your database
- **Content pipelines:** Input keyword → research → outline → draft → format → save to CMS
- **Monitoring + action:** Monitor metric → detect anomaly → investigate cause → notify user or take action

Use **Trigger.dev** with **Vercel AI SDK** `generateText` + tool calling for production-grade agents. They give you retries, logging, concurrency control, and human-in-the-loop checkpoints.

### Operations Automation — The Internal Flywheel

Automate repetitive founder-level tasks before they consume your time:

| Trigger | Action | Tool |
|---------|--------|------|
| New paid signup | Create CRM record + send welcome email + Slack notification | n8n |
| Failed payment | Start dunning email sequence + in-app notification | Stripe + n8n |
| Churned user (subscription cancelled) | Send winback email at Day 7 + Day 30 | n8n |
| Support ticket created | Auto-classify + draft response + route | Claude + n8n |
| Weekly metrics available | Generate digest + email to founder | n8n + Claude |
| New beta signup | Add to Slack channel + personal welcome email | n8n |
| Positive NPS response | Flag for case study outreach | n8n |

### AI Workflow: Building AI Features

**RAG System Prompt Design:**

```
You are building a RAG (retrieval-augmented generation) system for a SaaS product.

PRODUCT: [Description]
USE CASE: Users want to ask questions about [their own data / the product / industry knowledge]
RETRIEVED CHUNKS FORMAT: [Describe how chunks are structured]

Write the system prompt for the AI that will answer user questions.
The system prompt should:

1. Define the AI's role and constraints clearly
2. Instruct the AI on how to handle retrieved context
3. Define behavior when the context doesn't contain the answer
   (never make up information — always say "I don't have information about this")
4. Set tone and format expectations for responses
5. Handle edge cases: irrelevant questions, harmful queries, clarification needed

Also define:
- When should the AI ask a clarifying question vs. attempt an answer?
- How should it cite which context it's drawing from?
- What's the fallback behavior when retrieval fails?
```

---

## 11. Launch Strategy

### The Launch is Not an Event, It's a Channel

Most founders think of launch as a single moment. It isn't. Launch is a repeatable acquisition channel you use multiple times — once for each audience. You launch on Product Hunt, you launch on HN, you launch with a Twitter thread, you launch in each relevant community. Each "launch" reaches a different audience.

### Product Hunt Launch — The Playbook

**Prep (2 weeks before):**
- Scout for a hunter who already has a strong following on PH (search PH for hunters with 500+ followers)
- Request the hunt 2 weeks in advance — hunters are busy
- Prepare all assets: logo (240x240px), gallery images (1270x760px), video demo (optional but recommended — adds 20–30% more votes on average), tagline (60 chars), description (260 chars)
- Build your notification list: everyone in your waitlist, beta users, network — email them the day before

**Launch day (12:00 AM PST — PH resets at midnight Pacific):**
- Share in your personal network immediately after the hunt goes live
- Post in every relevant Slack community and Discord server — not spam, genuine "we just launched" posts
- Post on all your social channels with a direct link to the PH page
- Ask your email list to comment on what problem they'd use it for — comments drive ranking as much as votes
- Respond personally to every single comment within an hour — PH rewards engagement

**What not to do:**
- Don't ask people to "upvote" — PH can detect and penalize coordinated upvoting
- Don't launch on a Monday or Tuesday — these are the most competitive days
- Wednesday or Thursday launches typically get 30–40% more exposure

**Realistic expectations:**
- Top 5 of the day: 500–1,000 genuine sign-ups
- Top product of the week: 2,000–5,000 sign-ups
- #1 of the day with a strong product: 5,000–15,000+ sign-ups

### Hacker News — Show HN

"Show HN: [What you built] — [one sentence hook]"

**The post that works:**
- First paragraph: what it does, who it's for, why you built it
- Second paragraph: one specific technical thing that's interesting to HN readers
- Third paragraph: what stage you're at and what feedback you want
- A working link to the product

**What HN values:** Genuinely interesting technical work, honest founders, novel approaches to real problems. They hate marketing language, VC buzzwords, and anything that feels like a press release.

**What HN hates:** "Disrupting" anything, "AI-powered" as a headline feature, excessive feature lists, anything that sounds like a pitch deck.

A genuine HN "Show HN" in the top 10 of the day can drive 2,000–5,000 signups. But it has to be authentic — HN readers are expert BS detectors.

### Twitter/X Launch Thread

**The thread structure that drives sign-ups:**
1. Hook tweet: the problem statement in one sentence ("Most founders spend 10 hours/week on [pain]. I built something that does it in 10 minutes.")
2. The story: why you built it (personal frustration is the most relatable hook)
3. The demo: GIF or short video showing the core value. No talking. Just the product working.
4. The specifics: 3 key features with before/after comparisons
5. The results: beta numbers, early traction, quotes from users
6. The CTA: direct link, specific offer (founding member pricing if available)

**Thread rules:**
- No first tweet with "Thread 🧵" — that's the laziest opener
- Each tweet must work standalone — some people will see only one tweet
- The GIF or video is the most important asset in the thread — invest time in it
- Tag people who might retweet only if they're genuinely your ICP or in your network

### Community Launches

Launch natively in every community where your ICP exists. Not cross-posted — native. Each community gets a post written for its specific culture and norms.

Research relevant communities in advance. Spend time in them before your launch. Be a contributor, not just a promoter.

### AI Workflow: Launch Content

**Product Hunt Assets:**

```
Write Product Hunt launch copy for:

PRODUCT: [Name]
CORE VALUE PROP: [One sentence]
ICP: [Who it's for]
KEY DIFFERENTIATOR: [What makes it different]
CURRENT TRACTION: [Beta users, sign-ups, early revenue if any]

Write:
1. TAGLINE: 60 characters max. Problem-focused or outcome-focused. No buzzwords.
   Write 5 options.

2. DESCRIPTION: 260 characters max. Expand on the tagline. What it does and who it's for.
   Write 3 options.

3. FIRST COMMENT (founder's comment on PH): 200–300 words.
   Tell the story: why you built it, what problem you faced personally,
   one surprising insight from building it, what you're looking for in feedback.
   This should feel like a real person wrote it, not a press release.

4. MAKER Q&A PREP: Write answers to the 5 most likely questions from PH hunters:
   - What makes this different from [main competitor]?
   - How does the pricing work?
   - What's next on the roadmap?
   - Who should use this?
   - How did you build this?

Tone: Honest, direct, human. Never say "excited to announce," "game-changing,"
or "revolutionary."
```

---

## 12. Tech Stack Selection — The Master Guide

### The Decision Framework

Stack selection is an optimization problem. You're optimizing for: **speed to market × long-term maintainability × team expertise × ecosystem maturity**.

The most expensive tech decision is learning a new technology while simultaneously building a product. Use what you know. Optimize later when you have users and data about where the real constraints are.

The second most expensive tech decision is choosing a technology that's correct but that your AI coding tools don't know well. Claude, Cursor, and GitHub Copilot are heavily trained on Next.js, React, Tailwind, Prisma/Drizzle, and Supabase. Choose from the mainstream — AI assistance is 2–3x better on popular stacks.

### The Modern SaaS Stack (2025)

#### Frontend

| Layer | Recommended | Why |
|-------|-------------|-----|
| Framework | **Next.js 14+** (App Router) | Server Components reduce client JS; API routes colocated; Vercel deployment native; dominant ecosystem for AI tooling |
| Styling | **Tailwind CSS** | Utility-first; enforces design consistency; AI tools write excellent Tailwind |
| Components | **shadcn/ui** | Copy-paste, fully customizable, accessible, built on Radix UI; not a dependency |
| State (client) | **Zustand** | Simple, small, no boilerplate |
| State (server) | **TanStack Query** | Powerful async data fetching with caching, invalidation, and optimistic updates |
| Forms | **React Hook Form + Zod** | Performance-first with runtime validation; share Zod schemas with backend |
| Animation | **Framer Motion** | Production-grade React animations; accessible |
| Tables | **TanStack Table** | Headless, composable, handles sorting/filtering/pagination |
| Charts | **Recharts** or **Tremor** | Recharts for custom charts; Tremor for pre-built analytics components |
| Dates | **date-fns** | Tree-shakeable, no side effects, no class API |
| Rich text | **Tiptap** | ProseMirror-based, React-native, extensible |

#### Backend

| Layer | Recommended | Why |
|-------|-------------|-----|
| Runtime | **Node.js** (via Next.js or standalone Fastify) | Same language as frontend; massive ecosystem |
| ORM | **Drizzle ORM** | Type-safe SQL; lightweight; migrations built-in; faster than Prisma |
| Alternative ORM | **Prisma** | More features, more magic, larger ecosystem — pick one and commit |
| Validation | **Zod** | TypeScript-first; share schemas between frontend and backend |
| Auth | **Clerk** (managed) | Handles MFA, social login, org management, session management; worth the cost at early stage |
| Auth alternative | **Supabase Auth** | Free, PostgreSQL-integrated, good for simpler auth needs |
| Email delivery | **Resend** | Developer-first, excellent DX, React Email templates |
| Email templates | **React Email** | Build email templates in React; preview in browser |
| Background jobs | **Trigger.dev** | Code-first; TypeScript native; reliable; built-in retry and concurrency |
| Webhooks (inbound) | **Svix** | Webhook infrastructure for receiving and routing webhooks reliably |
| File storage | **Cloudflare R2** | S3-compatible; zero egress fees; significantly cheaper than AWS S3 |
| Search | **Typesense** (self-host) or **Algolia** (managed) | Typesense is open-source and cost-effective at scale |
| Caching | **Upstash Redis** | Serverless Redis; pay-per-request; no cluster to manage |

#### Database

| Use Case | Recommended | Why |
|----------|-------------|-----|
| Primary database | **PostgreSQL** | Battle-tested; rich feature set; pgvector for AI; full-text search built-in; best AI tool support |
| Managed Postgres | **Supabase** | Auth + storage + realtime + Postgres in one platform; excellent free tier |
| Serverless Postgres | **Neon** | Branch-per-PR for isolated testing; scales to zero; better for serverless patterns |
| Vector storage (start) | **pgvector** | Same database, no extra service, sufficient for first 100K embeddings |
| Vector storage (scale) | **Pinecone** | Managed, fast, optimized purely for vector search |
| Time-series data | **TimescaleDB** | Postgres extension; use if you have high-volume event/metrics data |

#### Infrastructure & DevOps

| Layer | Recommended | Why |
|-------|-------------|-----|
| Deployment (frontend) | **Vercel** | Zero-config Next.js; preview URLs per PR; global edge network |
| Deployment (backend services) | **Railway** | Managed containers; simpler than AWS; reasonable pricing |
| CI/CD | **GitHub Actions** | Native GitHub integration; YAML-based; massive action marketplace |
| Containers | **Docker** | Containerize from day one for environment consistency |
| Monitoring | **Sentry** | Error tracking + performance; essential |
| Logging | **Axiom** | Structured log management; SQL-like queries over logs |
| Uptime | **Betterstack** | Uptime monitoring + incident management |
| Secrets | **Doppler** | Centralized secrets management; syncs to all environments |
| CDN | **Cloudflare** | Free tier covers most SaaS needs; DDoS protection; DNS |

#### Payments & Billing

| Use Case | Recommended |
|----------|-------------|
| Payment processing | **Stripe** — industry standard; webhooks, subscriptions, invoicing, tax |
| Usage-based billing | **Stripe Billing** with metered usage, or **Orb** for complex metering |
| International VAT/GST | **Paddle** — acts as Merchant of Record; handles all tax compliance globally |
| Revenue analytics | **Baremetrics** or **ChartMogul** — MRR, churn, LTV from Stripe data |

#### Analytics & Product Intelligence

| Use Case | Recommended |
|----------|-------------|
| Product analytics | **PostHog** — open-source; session recording + funnels + feature flags + A/B tests in one |
| Web analytics | **Plausible** — privacy-first; no cookie banner needed |
| Error tracking | **Sentry** |
| Log management | **Axiom** |
| Business metrics | **Baremetrics** — MRR dashboard pulled from Stripe automatically |
| Customer data | **Segment** — if you need to route events to multiple analytics tools |

### Stack Decision by Stage

| Stage | Stack |
|-------|-------|
| Pre-validation (landing page) | Framer + Typeform + ConvertKit — no code |
| MVP | Next.js + Supabase + Clerk + Drizzle + Stripe + Vercel |
| Post-PMF | Add Redis (Upstash), background jobs (Trigger.dev), separate Postgres (Neon) |
| Scaling | Add Railway for backend services, Sentry + Axiom for observability, Cloudflare R2 |
| Enterprise | SOC2, SSO (SAML via Clerk), audit logging, custom SLAs, potentially AWS migration |

### What Not to Build and Why

| Don't Build | Because |
|-------------|---------|
| Custom auth system | Security-critical; Clerk exists and is excellent |
| Custom payment processing | PCI compliance alone will take months; Stripe solves this |
| Microservices at MVP | Distributed system debugging is 10x harder; monolith first |
| GraphQL at MVP | Overhead without benefit until you have multiple clients with different data needs |
| Kubernetes before $100K MRR | Operational cost is enormous; use managed platforms |
| Custom email infrastructure | Deliverability is a solved problem; Resend solves it |
| Custom search at MVP | Typesense or Algolia exist |

### Runtime Considerations: Bun vs Node

**Bun** is faster than Node in benchmarks, but:
- Vercel and Railway support Bun in 2025, but debugging is less mature
- Node has 10x the production incident documentation online
- AI tools generate better Node.js code (trained on more data)

**Recommendation:** Use Node.js for production. Evaluate Bun when it's your specific bottleneck and you have the monitoring to prove it.

---

## 13. Monetization — End-to-End Strategy

### Pricing Is Product

Pricing is not a business decision made after the product is built. It is a product decision that affects who your users are, how they use the product, and how you grow. Wrong pricing kills products that would have otherwise succeeded.

### Pricing Models — Full Reference

#### Flat-Rate Subscription
One price, all features, all users. Simple to understand and sell. Undercharges power users; overcharges casual users; no expansion revenue path. Good for very simple products.

#### Tiered Subscription (Default for most SaaS)
Multiple plans with different feature sets and usage limits. Serves different buyer segments. The classic structure:

- **Free:** Core features, strict usage limits. This is your acquisition engine. Make it genuinely useful, not crippled.
- **Pro/Starter ($19–$49/month):** Removes limits, adds productivity features. The conversion target.
- **Team/Business ($79–$299/month):** Adds collaboration, user management, advanced integrations. Higher ARPU.
- **Enterprise (custom):** SSO, audit logs, SLAs, dedicated support, contract. Sales-assisted.

**Tier design rules:**
- Each tier's value upgrade must be obvious and meaningful. Not "5 more projects." Meaningful capability change.
- Upgrade trigger should be natural: when users hit a limit, the upgrade path is immediately clear and frictionless.
- Never put a feature critical to the core use case in a paid tier. Gate collaboration and management features — not core functionality.

#### Usage-Based Pricing
Charge on consumption: API calls, messages sent, documents processed, storage. Aligns cost with value. Revenue is unpredictable.

**Hybrid (best of both):** Monthly minimum (predictable floor) + usage-based overage above the limit. You get predictability; customers get flexibility.

#### Per-Seat Pricing
Price per team member. Revenue scales with customer growth. Creates incentive for license sharing — mitigate with features that only work when each user has their own account.

### Freemium vs. Free Trial vs. Reverse Trial

| Model | Mechanics | Best For |
|-------|-----------|---------|
| **Freemium** | Free tier exists indefinitely | Products with viral loops or where free users generate value |
| **Free Trial** | Full product free for 14 days, then paywall | Products where value is clear after use; higher intent |
| **Reverse Trial** | Start on paid tier, downgrade after 14 days if no payment | Highest conversion — users experience full value before deciding |

**The freemium trap:** Freemium only works if free users convert or create value through referrals or network effects. Free users with no conversion path and no network contribution are pure cost. Calculate your freemium conversion rate. If it's below 2%, your freemium is a charity program.

### Pricing Psychology

- **Rule of Three:** Three tiers. Users compare the middle option against extremes — middle converts best.
- **Anchoring:** List the most expensive tier first. Everything else looks reasonable by comparison.
- **Annual discount:** Offer 15–20% off for annual billing. Improves cash flow, reduces monthly churn, locks commitment.
- **Charm pricing:** $49 outperforms $50. $99 outperforms $100. The left-digit effect is real and documented.
- **Price in local currency:** International users convert at lower rates when seeing USD. Stripe handles currency localization.

### Pricing for Different Segments

**B2C:** $7–$29/month. Annual plans critical — monthly churn in B2C is high. Payment must be frictionless (Apple Pay, Google Pay).

**SMB:** $29–$299/month. Team and collaboration features as upgrade triggers. ROI framing in all copy ("saves 5 hours/week per marketer").

**Enterprise:** Custom pricing, $1K–$100K+ ARR per customer. Sales-assisted. Must have: SSO, audit logs, SLA, security documentation, NET-30 invoicing. Contract length: annual minimum.

### Revenue Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| **MRR** | Sum of all monthly recurring revenue | 10–15% MoM growth at early stage |
| **ARR** | MRR × 12 | $1M ARR = meaningful business milestone |
| **Monthly Churn Rate** | Churned MRR / Beginning MRR | <2% B2B; <5% B2C |
| **Net Revenue Retention** | (Beginning MRR + Expansion - Churn) / Beginning MRR | >100% = negative net churn (ideal) |
| **CAC** | Total sales + marketing spend / new customers | Recover within 12 months |
| **LTV** | ARPU / Churn Rate | LTV:CAC ratio >3:1 |
| **Payback Period** | CAC / (ARPU × Gross Margin) | <12 months |

### Expansion Revenue — The Real Growth Engine

Expansion MRR is more valuable than new MRR because it has zero CAC. A healthy SaaS has expansion MRR covering churn MRR — called "negative net churn." This means the business grows even without adding any new customers.

**Expansion vectors:**
- Seat-based expansion: team grows, they add seats automatically
- Usage-based expansion: they use more → they spend more
- Feature upsell: new feature launch targeting existing customers
- Plan upgrade: usage limits crossed, natural upgrade path
- Add-ons: optional extras sold separately (API access, advanced analytics, extra storage)

Design expansion paths into the product at architecture level. Users should feel the product getting more valuable as their usage grows — not hitting arbitrary walls.

### Dunning — Recovering Silent Churn

20–30% of SaaS churn is involuntary — the product wasn't rejected, the payment failed. Recover it:

- **Smart retries:** Stripe Billing retries at intelligent intervals (not daily)
- **Email dunning sequence:** 3–5 emails over 14 days — urgent, not threatening
- **In-app notification:** Banner when payment fails — visible on every page
- **Grace period:** 14 days to update payment before access is restricted
- **Easy update flow:** One-click from the email directly to payment update

Properly implemented dunning recovers 30–50% of failed payments. This alone can represent 10–15% of your gross revenue saved.

### Monetization Sequencing

| Stage | Action |
|-------|--------|
| Pre-PMF ($0 → $1K MRR) | Charge from day one via Stripe Payment Links. No free tier yet — find people who pay. |
| Early PMF ($1K → $10K MRR) | Formalize pricing tiers. Add annual billing. Track MRR in Baremetrics. |
| Growth ($10K → $50K MRR) | Introduce expansion paths. Add enterprise tier. Implement dunning. |
| Scale ($50K+ MRR) | Segment pricing by use case. Add usage-based elements. Consider Paddle for international. |

---

## 14. Legal Foundations

### What You Actually Need Before Launch

Legal is not optional. But it doesn't require a lawyer for most early-stage SaaS. Here's what you need, in priority order.

**1. Privacy Policy (Required by law in most jurisdictions)**
If you collect any personal data (email, name, usage data, cookies) — you need a Privacy Policy. GDPR (Europe), CCPA (California), and other regulations require it.

Get one from: **Termly**, **GetTerms.io**, or use an AI-generated template reviewed by a lawyer. At minimum it must cover: what data you collect, how you use it, who you share it with, user rights (access, deletion), and how to contact you.

**2. Terms of Service**
Governs the relationship between you and your users. Covers: acceptable use, subscription terms, refund policy, limitation of liability, intellectual property, termination conditions.

Same sources as privacy policy. Don't copy a competitor's ToS — it won't reflect your specific policies and may create contradictions.

**3. GDPR Compliance (If Any EU Users)**
Even if you're not in Europe — if EU residents can sign up, GDPR applies to you.
- Privacy Policy must be GDPR-compliant (lawful basis for processing, data subject rights)
- Cookie consent banner if you use non-essential cookies
- Data Processing Agreement (DPA) if you process data on behalf of customers (B2B)
- Right to erasure: users can request deletion of their data — build a mechanism for this

**4. Cookie Banner**
Required if you use non-essential cookies (Google Analytics, most tracking tools). **Plausible Analytics** doesn't require a cookie banner — another reason to use it over GA.

Use **Cookieyes** or **Osano** for compliant cookie consent — both have free tiers.

**5. Stripe and Financial Compliance**
Stripe handles PCI DSS compliance for payment processing. You are responsible for not storing card data yourself (never log or store card numbers, CVVs, or full PANs — Stripe tokenizes these).

**6. When to Actually Get a Lawyer**
- Raising venture funding
- Enterprise customer requesting custom contract terms
- International expansion into regulated markets (healthcare, fintech, edtech in certain regions)
- HIPAA compliance (US healthcare data — this requires a lawyer and specific technical controls)
- SOC 2 certification (required by many enterprise buyers)

### Enterprise Readiness Checklist

When you start selling to enterprise buyers ($10K+ ARR deals), they will ask for:

- [ ] SOC 2 Type II report (or a plan to get one)
- [ ] GDPR Data Processing Agreement (DPA)
- [ ] Security questionnaire responses (build a standard one you can fill quickly)
- [ ] Penetration testing report (third-party)
- [ ] SSO (SAML 2.0) — available in Clerk's enterprise plan
- [ ] Audit logs (every user action logged with timestamp and actor)
- [ ] Data residency options (EU data stays in EU) — relevant for some sectors
- [ ] SLA with defined uptime guarantee and remediation terms
- [ ] Business insurance (typically E&O and cyber liability)

---

## Cross-Cutting: The AI Solo Founder Weekly Operating Rhythm

### Monday — Product & Planning
- Morning: AI daily intelligence report (errors + tickets + metrics prompt from Section 0)
- Afternoon: Sprint planning with Claude — break down this week's features into tickets
- Output: Linear sprint board populated, PRD snippets for each ticket

### Tuesday–Thursday — Build Days
- Morning: 2-hour deep build session (Cursor + .cursorrules)
- Midday: AI code review on morning's work (security, edge cases, tests)
- Afternoon: UI work using v0 + refine in Tailwind
- End of day: Commit, push to staging, visual review

### Friday — Users & Systems
- Morning: Respond to all week's support tickets (with AI-drafted responses reviewed)
- Midday: Synthesize week's beta feedback (feedback synthesis prompt)
- Afternoon: Write and send weekly user update email
- End of day: Deploy to production if staging is clean, update changelog

### Saturday — Content & Marketing
- Write one SEO blog post using Claude (keyword → outline → draft → edit)
- Schedule a week's worth of social content using Claude
- Review analytics from the week (PostHog + Plausible + Baremetrics)

### Sunday — Strategic Thinking
- No implementation. Read, think, plan.
- Review decision log, update roadmap
- One "What should I be doing instead of what I'm doing?" reflection prompt:

```
Here is my current sprint focus: [paste current tasks]
Here is my key business metric right now: [metric + current value + target]
Here is what's actually moving the metric: [paste retention/activation data]

As a startup advisor who has seen 100+ SaaS companies, am I working on the
right things? What am I ignoring that I shouldn't be? What am I doing that
I could stop or delegate to a system?

Be direct. Don't soften your assessment.
```

---

## Appendix: Complete Tools Reference

| Category | Tool | Tier | Cost |
|----------|------|------|------|
| Code editor | Cursor / Windsurf | Primary | $20/mo |
| AI assistant | Claude (Anthropic) | Primary | $20/mo |
| UI generation | v0 (Vercel) | Primary | $20/mo |
| Version control | GitHub | Primary | Free |
| CI/CD | GitHub Actions | Primary | Free (2,000 min/mo) |
| Frontend framework | Next.js | Primary | Free |
| Styling | Tailwind CSS + shadcn/ui | Primary | Free |
| ORM | Drizzle ORM | Primary | Free |
| Auth | Clerk | Managed | Free → $25/mo |
| Email delivery | Resend | Primary | Free → $20/mo |
| Email templates | React Email | Primary | Free |
| Payments | Stripe | Primary | 2.9% + 30¢/transaction |
| Database | Supabase / Neon | Primary | Free → $25/mo |
| Caching | Upstash Redis | Managed | Free → pay-per-use |
| File storage | Cloudflare R2 | Primary | Free → $0.015/GB |
| Background jobs | Trigger.dev | Primary | Free → $50/mo |
| Deployment | Vercel + Railway | Primary | Free → $20/mo each |
| Error tracking | Sentry | Primary | Free → $26/mo |
| Product analytics | PostHog | Primary | Free (1M events) |
| Business metrics | Baremetrics | Secondary | $58/mo |
| Web analytics | Plausible | Primary | $9/mo |
| Logging | Axiom | Primary | Free → $25/mo |
| Uptime | Betterstack | Primary | Free → $25/mo |
| Secrets | Doppler | Primary | Free → $10/mo |
| Design | Figma | Primary | Free → $12/mo |
| Docs | Mintlify | Primary | Free → $150/mo |
| Customer support | Crisp | Primary | Free → $25/mo |
| Automation | n8n (cloud) | Primary | $20/mo |
| Vector DB | pgvector → Pinecone | Progressive | Free → $70/mo |
| LLM APIs | Anthropic + OpenAI | Primary | Pay per token |
| LLM monitoring | Helicone | Primary | Free → $20/mo |
| Privacy policy | Termly | Legal | Free → $10/mo |
| Cookie consent | Cookieyes | Legal | Free |

**Estimated monthly infrastructure cost for a functioning SaaS MVP:**
- Early stage (pre-revenue): $0–$50/month (mostly free tiers)
- Early revenue ($1K–$5K MRR): $150–$300/month
- Growth ($10K+ MRR): $500–$1,500/month

---

*This documentation is a living system. Every section should be revisited as the product grows. What's correct at $0 MRR is different from what's correct at $10K MRR. Build with that evolution in mind.*

*The biggest competitive advantage in 2025 isn't the stack, the idea, or the funding. It's the operational discipline to use AI as a force multiplier at every layer of the business — from the first research prompt to the last support ticket auto-draft. That discipline is what this documentation is about.*

---

**Author:** Gourang Sharma  
**Version:** 2.0 — Full AI Workflows Edition  
**Scope:** Complete SaaS Development Lifecycle for AI-Native Founders  
**Audience:** Software developers and technical founders building their first or next SaaS — who want to move at 10x speed with a team of 1–2
