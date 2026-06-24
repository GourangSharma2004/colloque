# Colloque - Comprehensive Technical Documentation

This document provides an in-depth technical overview of the Colloque web application, covering its architecture, features, design system, and implementation details from end to end.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Philosophy and Vision](#philosophy-and-vision)
3. [Technical Architecture](#technical-architecture)
4. [Design System](#design-system)
5. [Project Structure](#project-structure)
6. [Core Features by Section](#core-features-by-section)
7. [Shared Components](#shared-components)
8. [Authentication System](#authentication-system)
9. [Search Functionality](#search-functionality)
10. [Bookmark System](#bookmark-system)
11. [AI Chatbot](#ai-chatbot)
12. [Animation System](#animation-system)
13. [Content Management](#content-management)
14. [Development Workflow](#development-workflow)
15. [Deployment](#deployment)

---

## Project Overview

**Colloque** is a Next.js 14 web application built as a digital intellectual hub designed for deep reading, critical thinking, and community discourse. The application serves as a curated platform for book summaries, intellectual essays, AI resources, and community engagement.

### Key Characteristics

- **Framework**: Next.js 14.2.35 with App Router architecture
- **Language**: TypeScript 5 with strict mode enabled
- **Styling**: Tailwind CSS 3.4.1 with custom design tokens
- **Animations**: GSAP 3.15.0 + @gsap/react 2.1.2, Framer Motion 12.38.0
- **Authentication**: Supabase with mock fallback for development
- **Database**: Supabase (optional) with localStorage fallback
- **Icons**: Lucide React 1.8.0

### Application Purpose

Colloque is built around the philosophy that content should be "carried" rather than consumed. It provides:

- **Intellectual Depth**: Long-form essays and book summaries that demand engagement
- **AI Literacy**: Comprehensive resources for understanding AI systems deeply
- **Community**: Space for thoughtful discourse among readers
- **Personal Growth**: Tools for tracking reading progress and building knowledge

---

## Philosophy and Vision

### Core Mission

"Read well. Think sharp. Speak with weight."

Colloque positions itself against the tide of consumable content. The application is designed for:

1. **Deep Reading**: Content that requires and rewards sustained attention
2. **Critical Thinking**: Resources that build analytical frameworks
3. **Meaningful Discourse**: Community features that prioritize substance over engagement metrics

### Design Philosophy

The application embodies several key design principles:

- **Minimalist Aesthetics**: Cream (#F5EFE6) and charcoal (#2C2C2C) palette creates a calm, focused reading environment
- **Typography-First Design**: Cormorant Garamond for headings (serif, intellectual weight) and DM Sans for body (clean, modern readability)
- **Animation with Purpose**: GSAP animations serve to guide attention and create narrative flow, not decoration
- **Progressive Disclosure**: Information is revealed through interaction, respecting the user's pace

### The Four Pillars

The application is organized around four content pillars:

1. **Intellect**: Deep-dive essays on complex concepts and phenomena
2. **Book Summaries**: Condensed wisdom from essential reading
3. **AI Resources**: Tools and frameworks for AI literacy
4. **Community**: Space for discourse and collective thinking

---

## Technical Architecture

### Next.js App Router

Colloque uses Next.js 14's App Router, which provides:

- **File-based Routing**: Routes are defined by the file structure in `/app`
- **Server Components**: Default for better performance and SEO
- **Client Components**: Marked with `"use client"` directive for interactivity
- **Streaming**: Progressive rendering for better perceived performance
- **Route Groups**: Organized by feature without affecting URL structure

### Component Architecture

The application follows a clear component hierarchy:

```
Root Layout (app/layout.tsx)
├── Navbar (Global)
├── Page Components (Route-specific)
│   ├── Server Component Wrappers
│   └── Client Component Children
└── ColloqueBot (Global Floating Widget)
```

### State Management

State is managed through:

- **React Hooks**: useState, useEffect, useRef for component-level state
- **Context API**: useUser hook for authentication state
- **Custom Events**: For cross-component communication (e.g., auth state changes)
- **LocalStorage**: For bookmarks, mock auth, and membership status

### Data Flow

```
Static Data (data.ts files)
    ↓
Server Components (Initial Render)
    ↓
Client Components (Interactivity)
    ↓
LocalStorage (Persistence)
```

### Performance Optimizations

- **Font Optimization**: next/font for automatic font optimization
- **Image Optimization**: next/image for responsive images
- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Unused code eliminated in production builds
- **Static Generation**: Where possible for faster initial loads

---

## Design System

### Color Palette

The design system uses a carefully curated palette:

#### Primary Colors
- **Background**: `#F5EFE6` (cream) - Warm, paper-like reading surface
- **Foreground**: `#2C2C2C` (charcoal) - High-contrast text color
- **Accent**: `#C9A84C` (gold) - Highlights, active states, CTAs
- **Dark**: `#1C1914` - Deep backgrounds, modals

#### Extended Palette
- **Amber**: `#E8A830` - Secondary highlights
- **Walnut**: `#8B5E3C` - Earthy accents
- **Taupe**: `#C4A882` - Neutral warmth
- **Blue-Colloque**: `#2D7DD2` - Informational elements
- **Coral**: `#E05C3A` - Alerts, warnings
- **Emerald-Colloque**: `#3DAA5C` - Success states
- **Purple-Colloque**: `#7B4FBE` - Special highlights
- **Teal-Colloque**: `#1FA8C7` - Alternative accent

### Typography

#### Font Families

**Cormorant Garamond** (Headings)
- Weights: 300, 400, 600, 700
- Styles: Normal, italic
- Usage: All headings (h1-h6), emphasis text
- Variable: `--font-cormorant`

**DM Sans** (Body)
- Weights: 300, 400, 500
- Usage: Body text, UI elements, labels
- Variable: `--font-dm-sans`

**Gloria Hallelujah** (Accent)
- Weight: 400
- Usage: Handwritten accents (rare)
- Variable: `--font-gloria`

#### Typography Scale

Responsive typography using `clamp()`:

```css
/* Example from VideoHero */
font-size: clamp(42px, 6vw, 64px); /* Fluid heading */
font-size: clamp(0.9rem, 1.5vw, 1.05rem); /* Fluid body */
```

### Spacing System

Spacing uses rem-based values with visual hierarchy:

- **Micro**: 0.25rem, 0.5rem (tight spacing)
- **Small**: 0.75rem, 1rem (default spacing)
- **Medium**: 1.5rem, 2rem (section spacing)
- **Large**: 3rem, 4rem (major sections)
- **XL**: 6rem+ (hero sections)

### Styling Conventions

**Critical**: Colloque uses **inline styles exclusively** for component styling.

```tsx
const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#9A8E7A",
};
```

**Rationale**:
- Consistent with project's design philosophy
- Easier to maintain design tokens as constants
- No CSS module overhead
- Clear style locality

### Interactive States

All interactive states use mouse event handlers:

```tsx
onMouseEnter={(e) => {
  e.currentTarget.style.backgroundColor = "rgba(201, 168, 76, 0.2)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.backgroundColor = "rgba(20, 20, 20, 0.9)";
}}
```

### Responsive Design

Responsive breakpoints handled through:

- **clamp()**: Fluid typography
- **CSS Grid**: Responsive grid layouts
- **Conditional Rendering**: Component-level adaptations
- **Media Queries**: In globals.css for global styles

---

## Project Structure

```
colloque/
├── app/                          # Next.js App Router
│   ├── ai-resources/            # AI tools/resources page
│   │   ├── page.tsx             # Client component wrapper
│   │   ├── data.ts              # All static content
│   │   └── components/          # Page-specific components
│   │       ├── SectionNav.tsx  # Sticky navigation
│   │       ├── WeeklyDispatch.tsx
│   │       ├── TheStack.tsx
│   │       ├── LiteracyAndPath.tsx
│   │       ├── RoadmapTimeline.tsx
│   │       ├── LearningSequence.tsx
│   │       ├── LiteracyQuiz.tsx
│   │       ├── PromptLibrary.tsx
│   │       └── LearningPath.tsx
│   ├── book-summaries/          # Book summaries
│   │   ├── page.tsx             # Listing page
│   │   └── [slug]/              # Individual book pages
│   ├── intellect/               # Ideas/articles
│   │   ├── page.tsx             # Listing page
│   │   └── [slug]/              # Individual article pages
│   ├── community/               # Community page
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── SectionNav.tsx
│   │       ├── NoticeBoard.tsx
│   │       ├── QuestionOfWeek.tsx
│   │       ├── CommunityChat.tsx
│   │       └── MeetingBoard.tsx
│   ├── the-log/                 # Blog/log page
│   │   └── page.tsx
│   ├── auth/                    # Authentication callbacks
│   │   ├── callback/
│   │   └── verify/
│   ├── api/                     # API routes
│   │   └── chat/
│   ├── fonts/                   # Font files
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/                   # Shared components
│   ├── Navbar.tsx               # Navigation with bookmarks, search
│   ├── VideoHero.tsx            # Scroll-based video hero
│   ├── ColloqueBot.tsx          # AI chatbot widget
│   ├── SearchHighlight.tsx      # Search result highlighting
│   ├── DocumentationBookmarkButton.tsx
│   └── SectionWrapper.tsx
├── lib/                         # Utilities and hooks
│   ├── auth.ts                  # Authentication hook
│   ├── supabase.ts              # Supabase client
│   ├── search-index.ts          # Search functionality
│   ├── generated-search-index.ts # Auto-generated HTML index
│   └── useDocumentationBookmark.ts
├── public/                      # Static assets
│   ├── frames/                  # Video frame sequence
│   ├── video/                   # Video files
│   ├── *.html                   # Legacy content
│   ├── *.jpg, *.png, *.webp     # Images
│   └── *.pdf                    # PDFs
├── scripts/                     # Build scripts
│   └── index-html-content.ts    # HTML content indexer
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── postcss.config.mjs
├── .eslintrc.json
├── .windsurfrules              # Project-specific rules
└── .env.local                  # Environment variables
```

---

## Core Features by Section

### 1. Home Page (/)

**Component**: VideoHero

**Purpose**: Immersive scroll-based introduction to Colloque's four pillars

**Technical Implementation**:

- **Frame Sequence Animation**: 192 pre-rendered frames (frame_0001.jpg to frame_0192.jpg)
- **Canvas Rendering**: Frames drawn to HTML5 canvas for performance
- **ScrollTrigger Integration**: GSAP ScrollTrigger syncs scroll position to frame index
- **Scene System**: 6 scenes with opacity transitions based on scroll progress
- **GSAP Timelines**: One-shot animations fire when scene becomes active

**Scene Breakdown**:

1. **Scene 0 (0-14%)**: Brand identity with logo and tagline
2. **Scene 1 (14-30%)**: Manifesto - "Most content is made to be consumed"
3. **Scene 2 (30-46%)**: Intellect pillar
4. **Scene 3 (46-60%)**: Book Summaries pillar
5. **Scene 4 (60-72%)**: AI Resources pillar
6. **Scene 5 (72-84%)**: Community pillar
7. **Scene 6 (84-100%)**: The Log

**Key Features**:

- **Progressive Opacity**: Scenes fade in/out using power2 easing
- **Text Animations**: Clip-path reveals, slide-ups, scale effects
- **Pointer Events**: Only active scene is clickable
- **Progress Tracking**: Visual progress indicator (internal)

**Technical Details**:

```tsx
// Frame calculation
const frameIndex = Math.min(
  FRAME_COUNT - 1,
  Math.floor(progress * FRAME_COUNT)
);

// Scene opacity with fade zones
function sceneOpacity(progress, start, end) {
  const fade = 0.25; // 25% fade zones
  // Power2 easing for smooth transitions
}
```

### 2. AI Resources (/ai-resources)

**Purpose**: Comprehensive AI literacy hub with tools, guides, and learning paths

**Components**:

#### SectionNav
- Sticky navigation below Navbar (top: 56px)
- IntersectionObserver for active section tracking
- Smooth scroll to sections

#### WeeklyDispatch
- **Current Week**: Hero section with "What Dropped", "What Matters", "What's Overhyped"
- **Archive**: Expandable historical dispatches
- **Email Subscription**: Newsletter signup
- **Split View**: Toggle between summary and full HTML content
- **Zoom Controls**: For detailed reading

**Data Structure**:

```tsx
type DispatchWeek = {
  week: string;
  dropped: { headline: string; detail: string };
  matters: { headline: string; detail: string };
  overhyped: { headline: string; detail: string };
  htmlFile?: string;
};
```

#### TheStack
- **Tool Cards**: AI models and tools with descriptions
- **Categories**: AI Models, Coding Tools, Research Tools, etc.
- **Pricing Indicators**: Free, Paid, Freemium
- **Documentation Links**: External resources
- **GSAP Stagger**: Card animations on scroll

**Data Structure**:

```tsx
type StackItem = {
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
```

#### LiteracyAndPath
Combines two major features:

**Literacy Quiz**:
- 10 randomized questions from larger pool
- Fisher-Yates shuffle algorithm
- One-at-a-time question flow
- Confirm + explain pattern
- 4 score tiers with feedback
- Topic-based recommendations
- Share functionality

**Learning Path**:
- RoadmapTimeline: Visual timeline of 11 learning phases
- LearningSequence: Interactive level progression
- Phase-based curriculum (24-30 month timeline)
- Resource stacks with direct links
- Progress tracking

**Quiz Data Structure**:

```tsx
type Question = {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: string;
};
```

**Level Data Structure**:

```tsx
type Level = {
  num: number;
  title: string;
  concept: string;
  resource: { title: string; url: string; type: "Paper" | "Video" | "Article" };
  exercise: string;
};
```

#### Background Video
- Full-screen video background (AIR BG.mp4)
- Vignette overlay for UI legibility
- Subtle gradient for depth

### 3. Book Summaries (/book-summaries)

**Purpose**: Condensed wisdom from essential reading

**Listing Page Features**:

- **Featured Books Grid**: 10+ featured books with covers
- **Search Functionality**: Filter by title, author, tags
- **Framer Motion Animations**: Smooth card transitions
- **Responsive Grid**: Adapts to screen size
- **Book Metadata**: Author, tags, quotes, cover images

**Book Data Structure**:

```tsx
{
  title: string;
  author: string;
  tags: string;
  quote: string;
  cover: string;
  href: string;
  coverBg: string;
}
```

**Individual Book Pages**:

- **Iframe Pattern**: Legacy HTML content rendered in iframe
- **Full-Screen Reading**: Immersive reading experience
- **Bookmark Integration**: DocumentationBookmarkButton component
- **Navigation**: Back to listing

**Available Books**:

1. Ikigai - Héctor García & Francesc Miralles
2. Zero to One - Peter Thiel & Blake Masters
3. Dopamine Nation - Dr. Anna Lembke
4. Can't Hurt Me - David Goggins
5. CRUSH IT! - Gary Vaynerchuk
6. Diary of a CEO - Steven Bartlett
7. Someday is Today - Matthew Dicks
8. Men Are from Mars, Women Are from Venus - John Gray
9. Deep Work - Cal Newport
10. The Psychology of Money - Morgan Housel
11. The Subtle Art of Not Giving a F*ck
12. How to Sell Anything to Anybody
13. Thinking in Systems
14. Stillness is the Key

### 4. Intellect (/intellect)

**Purpose**: Deep-dive essays on complex concepts and phenomena

**Listing Page Features**:

- **Ideas Grid**: 12+ intellectual essays
- **Domain Categorization**: Metabolic Biology, Linguistic History, Philosophy, etc.
- **Origin Attribution**: "via [Author]" or "Original"
- **Search Functionality**: Filter by title, domain, origin
- **Visual Cards**: Domain-specific imagery

**Idea Data Structure**:

```tsx
{
  slug: string;
  title: string;
  hook: string;
  opening: string;
  domain: string;
  origin: string;
  image: string;
}
```

**Available Essays**:

1. The Case Against Sugar - Metabolic Biology
2. Why English Is Genuinely Weird - Linguistic History
3. The Problem of Mindfulness - Philosophy & Ethics
4. The End of Work and the Crisis of Meaning - Labour & Political Economy
5. The Golden Quarter - History of Science
6. Are Coders Worth It? - Labour Economics
7. The Power Thinker - Political Philosophy
8. The Orgasm Cure - Psychology & Physiology
9. Poor Teeth - Social Inequality
10. The Presence of Power - Political Theory
11. Time Is an Object - Philosophy
12. Why Self-Harm - Psychology

**Individual Essay Pages**:

- **Iframe Pattern**: Full-screen HTML content
- **Bookmark Integration**: DocumentationBookmarkButton
- **Immersive Reading**: Distraction-free environment

### 5. Community (/community)

**Purpose**: Space for thoughtful discourse and collective thinking

**Hero Section**:

- **Background GIF**: Animated community imagery
- **Pulse Animation**: Subtle overlay animation
- **Join Button**: Membership CTA with state management
- **Member Status**: "You're a Member" vs "Join the Community"

**Components**:

#### SectionNav
- Sticky navigation for community sections
- Notice Board, Question of Week, Chat sections

#### NoticeBoard
- Community announcements
- Updates and important information
- Timestamped entries
- Category indicators

#### QuestionOfWeek
- Weekly discussion prompts
- Thoughtful conversation starters
- Response system
- Voting mechanism

#### CommunityChat
- Real-time chat interface
- Message threading
- User identification
- Timestamp formatting

#### MeetingBoard
- Scheduled community events
- Meeting links and details
- RSVP functionality
- Calendar integration

**Authentication Integration**:

- **Login Required**: For posting and full participation
- **Membership System**: localStorage-based membership tracking
- **Custom Events**: Cross-component state sync

### 6. The Log (/the-log)

**Purpose**: Weekly record of reading, questioning, and reconsideration

**Features**:

- **Weekly Entries**: Chronological blog posts
- **Reading Intelligence Framework**: Documented methodology
- **Fragments**: Partial thoughts and observations
- **Markdown Support**: Rich text formatting
- **Search Integration**: Full-text search

**Entry Structure**:

```tsx
{
  week: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
}
```

---

## Shared Components

### Navbar

**Purpose**: Global navigation with advanced features

**Features**:

1. **Navigation Links**:
   - Intellect, Book Summaries, AI Resources, Community, The Log
   - Active state indicators (gold dot)
   - Hover effects
   - Separator styling for "The Log"

2. **Bookmark System**:
   - Floating bookmark panel
   - Most recently read documentation
   - "Last read: X time ago" timestamps
   - Remove bookmark functionality
   - Badge indicator for bookmarked items

3. **Search Functionality**:
   - Global search dropdown
   - Real-time search as you type
   - Section match counts (badges on nav links)
   - Search result highlighting
   - Category and match type indicators
   - Text snippet previews

4. **Authentication**:
   - User avatar with initials
   - Login modal with Google OAuth
   - Email/password authentication
   - Sign up / Sign in toggle
   - Error handling
   - Sign out functionality

**Technical Implementation**:

```tsx
// Bookmark storage
const STORAGE_KEY = "colloque_bookmarks";

// Search integration
const { search } = from "@/lib/search-index");
const results = search(query);

// Section match counting
const counts: Record<string, number> = {};
results.forEach(result => {
  counts[result.section] = (counts[result.section] || 0) + 1;
});
```

**State Management**:

- LocalStorage for bookmarks
- Custom events for auth state sync
- URL search params for search queries
- React state for UI toggles

### VideoHero

**Purpose**: Immersive scroll-based introduction

**Technical Details**:

- **Frame Preloading**: All 192 frames loaded on mount
- **Canvas Rendering**: High-performance frame display
- **ScrollTrigger**: GSAP plugin for scroll synchronization
- **Scene Management**: 6 scenes with opacity transitions
- **Animation Cleanup**: Proper GSAP context cleanup

**Key Patterns**:

```tsx
// Frame drawing
const drawFrame = (index: number) => {
  const ctx2d = canvas.getContext("2d");
  const img = images.current[index];
  ctx2d.drawImage(img, 0, 0, canvas.width, canvas.height);
};

// ScrollTrigger setup
ScrollTrigger.create({
  trigger: section,
  start: "top top",
  end: "+=600%",
  pin: true,
  scrub: 1,
  onUpdate: (self) => {
    const frameIndex = Math.floor(self.progress * FRAME_COUNT);
    drawFrame(frameIndex);
  },
});
```

### ColloqueBot

**Purpose**: AI-powered reading assistant

**Features**:

1. **Two Modes**:
   - Define: Word definitions
   - Summarize: Text summarization

2. **Chat Interface**:
   - Message history
   - User/bot message distinction
   - Loading states
   - Auto-scroll to latest message

3. **Framer Motion Animations**:
   - Floating button scale effects
   - Panel slide-in/fade-in
   - Smooth transitions

**API Integration**:

```tsx
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ mode, content: input }),
});
```

**Technical Details**:

- Floating action button (bottom-right)
- Fixed positioning panel
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- Error handling with fallback messages

### SearchHighlight

**Purpose**: Highlight search results on pages

**Features**:

- URL param parsing (q=query, section=targetId)
- Text highlighting
- Scroll to target section
- Case-insensitive matching

**Implementation**:

```tsx
const query = searchParams.get("q")?.toLowerCase().trim() ?? "";
const targetId = searchParams.get("section") ?? "";
```

### DocumentationBookmarkButton

**Purpose**: Reusable bookmark button for documentation pages

**Features**:

- Bookmark toggle functionality
- Visual state indication (filled/outline)
- Hover effects
- Custom positioning support
- Auto-updates lastRead timestamp

**Usage**:

```tsx
<DocumentationBookmarkButton
  bookmarkId="doc-ikigai"
  docTitle="Ikigai"
  docHref="/book-summaries/ikigai"
  style={{ top: "100px", right: "3rem" }}
/>
```

### SectionWrapper

**Purpose**: Empty placeholder component for consistent section structure

**Usage**: Used as a wrapper for sections that need consistent padding/margin

---

## Authentication System

### Architecture

Colloque uses a dual authentication system:

1. **Supabase Authentication** (Production)
2. **Mock Authentication** (Development/Analysis)

### useUser Hook

**Purpose**: Centralized authentication state management

**Features**:

- User session management
- Auth state listeners
- Mock user fallback
- Membership tracking
- Cross-component state sync

**API**:

```tsx
const {
  user,
  session,
  loading,
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  signOut,
  getDisplayName,
  isMember,
  joinCommunity,
  isConfigured,
} = useUser();
```

### Authentication Methods

#### Google OAuth

```tsx
const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback?next=/community`,
    },
  });
};
```

#### Email/Password

```tsx
const signInWithEmail = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

const signUpWithEmail = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });
};
```

### Mock Authentication

For development and analysis without Supabase:

```tsx
const mock = { 
  id: "mock-123", 
  email: "visitor@example.com", 
  user_metadata: { full_name: "Visitor" } 
};
localStorage.setItem("colloque_mock_user", JSON.stringify(mock));
```

### Membership System

**Purpose**: Track community membership status

**Implementation**:

```tsx
const joinCommunity = async () => {
  if (!user) {
    window.dispatchEvent(new CustomEvent("colloque-open-login"));
    return;
  }
  
  const memberKey = isMock ? "colloque_community_member" : `colloque_member_${user.id}`;
  localStorage.setItem(memberKey, "true");
  setIsMember(true);
  
  window.dispatchEvent(new CustomEvent("colloque-membership-update", { detail: true }));
};
```

### Cross-Component State Sync

Custom events for state synchronization:

```tsx
// Auth state
window.dispatchEvent(new CustomEvent("colloque-mock-auth", { detail: mock }));

// Membership state
window.dispatchEvent(new CustomEvent("colloque-membership-update", { detail: true }));

// Login modal trigger
window.dispatchEvent(new CustomEvent("colloque-open-login"));
```

### Supabase Configuration

**File**: `lib/supabase.ts`

```tsx
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = !!supabase;
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Search Functionality

### Architecture

Centralized search system with multiple data sources:

1. **Manual Index**: Curated content (ideas, books, AI tools)
2. **Auto-Generated Index**: HTML content parsed from public directory
3. **Full-Text Search**: Content body text matching

### Search Index Structure

**File**: `lib/search-index.ts`

**Data Sources**:

```tsx
// Manual indices
const IDEAS: SearchResult[] = [...];
const BOOKS: SearchResult[] = [...];
const AI_STACK: SearchResult[] = [...];
const COMMUNITY: SearchResult[] = [...];
const THE_LOG: SearchResult[] = [...];

// Auto-generated
const HTML_SEARCH_INDEX: SearchResult[] = [...]; // Generated by script
```

### SearchResult Type

```tsx
type SearchResult = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  section: "intellect" | "book-summaries" | "ai-resources" | "community" | "the-log" | "documentation";
  textMatch?: string[];
  sectionId?: string;
  matchType?: "title" | "heading" | "content";
};
```

### Search Algorithm

```tsx
export function search(query: string): SearchResult[] {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  const results: SearchResult[] = [];
  
  SEARCH_INDEX.forEach((item) => {
    let matchType: "title" | "heading" | "content" | undefined;
    let textMatch: string[] = [];
    
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
        const matchIndex = htmlContent.fullContent.toLowerCase().indexOf(lowerQuery);
        const start = Math.max(0, matchIndex - 50);
        const end = Math.min(htmlContent.fullContent.length, matchIndex + lowerQuery.length + 50);
        const snippet = htmlContent.fullContent.substring(start, end).trim();
        textMatch.push(snippet);
      }
    }
    
    if (matchType) {
      results.push({
        ...item,
        matchType,
        textMatch: textMatch.slice(0, 3),
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
```

### HTML Content Indexing

**Script**: `scripts/index-html-content.ts`

**Purpose**: Automatically index all HTML files in public directory

**Process**:

1. **Scan Directory**: Recursively find all .html files
2. **Parse Content**: Use Cheerio to extract:
   - Title (from <title> tag)
   - Headings (h1, h2, h3)
   - Body text
   - Description (first 200 chars)
3. **Infer Metadata**:
   - Section (from file path)
   - Category (from file path or content)
4. **Generate TypeScript**: Output to `lib/generated-search-index.ts`

**Section Inference**:

```tsx
function inferSection(filePath: string): IndexedContent['section'] {
  const lowerPath = filePath.toLowerCase();
  
  if (lowerPath.includes('intellect') || lowerPath.includes('case_against_sugar') || ...) {
    return 'intellect';
  }
  
  if (lowerPath.includes('book') || lowerPath.includes('ikigai') || ...) {
    return 'book-summaries';
  }
  
  if (lowerPath.includes('claude') || lowerPath.includes('gemini') || ...) {
    return 'ai-resources';
  }
  
  // ... more rules
  
  return 'documentation';
}
```

**Build Integration**:

```json
{
  "scripts": {
    "dev": "tsx scripts/index-html-content.ts && next dev",
    "build": "tsx scripts/index-html-content.ts && next build",
    "index:content": "tsx scripts/index-html-content.ts"
  }
}
```

### Search UI Integration

**Navbar Integration**:

```tsx
// Search dropdown with real-time results
const [searchQuery, setSearchQuery] = useState("");
const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
const [sectionMatchCounts, setSectionMatchCounts] = useState<Record<string, number>>({});

// Update on input change
onChange={(e) => {
  const query = e.target.value;
  setSearchQuery(query);
  const results = search(query);
  setSearchResults(results);
  
  // Calculate match counts per section
  const counts: Record<string, number> = {};
  results.forEach(result => {
    counts[result.section] = (counts[result.section] || 0) + 1;
  });
  setSectionMatchCounts(counts);
}}
```

**Section Badges**:

```tsx
{hasMatch && (
  <span style={{
    position: "absolute",
    top: "-6px",
    right: "-12px",
    backgroundColor: "#C4973A",
    // ... badge styling
  }}>
    {matchCount > 9 ? "9+" : matchCount}
  </span>
)}
```

---

## Bookmark System

### Architecture

LocalStorage-based bookmark system with:

- Manual bookmarking of documentation pages
- Automatic lastRead timestamp updates
- Most recently read tracking
- Cross-page persistence

### Data Structure

```tsx
type BookmarkItem = {
  id: string;
  label: string;
  href: string;
  lastRead: number;
};

const STORAGE_KEY = "colloque_bookmarks";
```

### Storage Functions

```tsx
function loadBookmarks(): BookmarkItem[] {
  if (typeof window === "undefined") return [];
  try { 
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); 
  } catch { 
    return []; 
  }
}

function saveBookmarks(bm: BookmarkItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bm));
}
```

### Time Formatting

```tsx
function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
```

### useDocumentationBookmark Hook

**Purpose**: Reusable bookmark logic for documentation pages

**API**:

```tsx
const { isBookmarked, handleBookmarkToggle } = useDocumentationBookmark({
  bookmarkId: "doc-ikigai",
  docTitle: "Ikigai",
  docHref: "/book-summaries/ikigai",
});
```

**Implementation**:

```tsx
export function useDocumentationBookmark({ bookmarkId, docTitle, docHref }: Props) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("colloque_bookmarks") || "[]");
    setIsBookmarked(bookmarks.some((b: any) => b.id === bookmarkId));
  }, [bookmarkId]);

  // Auto-update lastRead on page visit
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("colloque_bookmarks") || "[]");
    const existing = bookmarks.find((b: any) => b.id === bookmarkId);
    if (existing) {
      const updated = bookmarks.map((b: any) => 
        b.id === bookmarkId ? { ...b, lastRead: Date.now() } : b
      );
      localStorage.setItem("colloque_bookmarks", JSON.stringify(updated));
    }
  }, [bookmarkId]);

  const handleBookmarkToggle = () => {
    const bookmarks = JSON.parse(localStorage.getItem("colloque_bookmarks") || "[]");
    let updated;
    if (isBookmarked) {
      updated = bookmarks.filter((b: any) => b.id !== bookmarkId);
    } else {
      updated = [
        { id: bookmarkId, label: docTitle, href: docHref, lastRead: Date.now() },
        ...bookmarks,
      ];
    }
    localStorage.setItem("colloque_bookmarks", JSON.stringify(updated));
    setIsBookmarked(!isBookmarked);
  };

  return { isBookmarked, handleBookmarkToggle };
}
```

### Bookmark ID Convention

- Book summaries: `doc-{book-name}` (e.g., `doc-ikigai`, `doc-zero-to-one`)
- Intellect articles: `doc-{article-slug}` (e.g., `doc-case-against-sugar`)
- AI Resources: `doc-ai-resources`
- Other documentation: `doc-{descriptive-name}`

### Navbar Bookmark Panel

**Features**:

- Shows only most recently read (sorted by lastRead)
- "Last read: X time ago" timestamps
- Remove bookmark button
- Empty state message
- Auto-closes on bookmark click

**Implementation**:

```tsx
{bookmarks.length === 0 ? (
  <div>No bookmarked documentation</div>
) : (
  <ul>
    {bookmarks
      .sort((a, b) => b.lastRead - a.lastRead)
      .slice(0, 1) // Only show most recent
      .map((bm) => (
        <li key={bm.id}>
          <Link href={bm.href}>{bm.label}</Link>
          <span>Last read: {getTimeAgo(bm.lastRead)}</span>
          <button onClick={() => removeBookmark(bm.id)}>Remove</button>
        </li>
      ))}
  </ul>
)}
```

---

## AI Chatbot

### Purpose

AI-powered reading assistant for definitions and summaries

### Features

1. **Two Modes**:
   - **Define**: Get word definitions in plain English
   - **Summarize**: Get text summaries

2. **Chat Interface**:
   - Message history
   - User/bot message distinction
   - Loading states with spinner
   - Auto-scroll to latest message
   - Empty state prompts

3. **UI/UX**:
   - Floating action button (bottom-right)
   - Framer Motion animations
   - Mode toggle buttons
   - Textarea with auto-resize
   - Keyboard shortcuts (Enter to send)

### Technical Implementation

**Component**: `components/ColloqueBot.tsx`

**State Management**:

```tsx
const [isOpen, setIsOpen] = useState(false);
const [mode, setMode] = useState<Mode>('define');
const [input, setInput] = useState('');
const [messages, setMessages] = useState<Message[]>([]);
const [isLoading, setIsLoading] = useState(false);
```

**API Integration**:

```tsx
const handleSend = async () => {
  if (!input.trim() || isLoading) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    role: 'user',
    content: input,
  };

  setMessages((prev) => [...prev, userMessage]);
  setInput('');
  setIsLoading(true);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode, content: input }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'bot',
      content: data.reply,
    };

    setMessages((prev) => [...prev, botMessage]);
  } catch (error) {
    const errorMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'bot',
      content: 'Sorry, something went wrong. Please try again.',
    };
    setMessages((prev) => [...prev, errorMessage]);
  } finally {
    setIsLoading(false);
  }
};
```

**Framer Motion Animations**:

```tsx
// Floating button
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>

// Chat panel
<motion.div
  initial={{ opacity: 0, y: 20, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 20, scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
```

### API Route

**File**: `app/api/chat/route.ts` (inferred)

**Expected Response**:

```tsx
{
  reply: string; // The AI response
}
```

**Error Handling**:

```tsx
if (data.error) {
  throw new Error(data.error);
}
```

### Keyboard Shortcuts

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
};
```

---

## Animation System

### GSAP Integration

Colloque uses GSAP (GreenSock Animation Platform) for scroll-based animations.

### Core Plugins

- **GSAP Core**: Base animation library
- **ScrollTrigger**: Scroll-based animation triggering
- **@gsap/react**: React hook for GSAP integration

### useGSAP Hook Pattern

**Purpose**: React-friendly GSAP integration with automatic cleanup

**Basic Pattern**:

```tsx
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function Component() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(elementRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 88%",
        },
      });
    },
    { scope: sectionRef } // Cleanup scope
  );

  return (
    <section ref={sectionRef}>
      <div ref={elementRef}>Animated content</div>
    </section>
  );
}
```

### Common Animation Patterns

#### Fade-Up Animation

```tsx
gsap.from(ref.current, {
  y: 30,
  opacity: 0,
  duration: 0.75,
  ease: "power2.out",
  scrollTrigger: { trigger: ref.current, start: "top 88%" },
});
```

#### Stagger Animation

```tsx
gsap.from(".card", {
  y: 40,
  opacity: 0,
  duration: 0.85,
  ease: "power2.out",
  stagger: 0.15,
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top 88%",
  },
});
```

#### Clip-Path Reveal

```tsx
gsap.fromTo(
  headingRef.current,
  { clipPath: "inset(0 100% 0 0)" },
  { 
    clipPath: "inset(0 0% 0 0)", 
    duration: 1, 
    ease: "power4.out" 
  }
);
```

#### Scale Animation

```tsx
gsap.fromTo(
  scaleRef.current,
  { opacity: 0, scale: 0.92 },
  { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" }
);
```

### ScrollTrigger Configuration

**Common Options**:

```tsx
scrollTrigger: {
  trigger: element,           // Element that triggers animation
  start: "top 88%",           // When top of element hits 88% of viewport
  end: "bottom 20%",          // When to end animation
  scrub: 1,                   // Smooth scrubbing (seconds)
  pin: true,                  // Pin element during animation
  anticipatePin: 1,           // Anticipate pin for smoothness
  toggleActions: "play none none reverse", // Control playback
}
```

### VideoHero Animation System

**Complex Scene Management**:

```tsx
// Scene opacity calculation
function sceneOpacity(progress, start, end) {
  if (progress < start || progress > end) return 0;
  const local = (progress - start) / (end - start);
  const fade = 0.25; // 25% fade zones
  
  if (start > 0 && local < fade) {
    const t = local / fade;
    return 1 - Math.pow(1 - t, 2); // power2.out
  }
  if (end < 1.0 && local > 1 - fade) {
    const t = (local - (1 - fade)) / fade;
    return 1 - t * t; // power2.in
  }
  return 1;
}

// One-shot timeline firing
if (progress >= scene.start && !animatedScenes.current.has(sceneIndex)) {
  animatedScenes.current.add(sceneIndex);
  const tl = gsap.timeline();
  tl.fromTo(element, { ... }, { ... }, 0);
}
```

### Framer Motion Integration

Used for UI micro-interactions:

```tsx
import { motion } from "framer-motion";

// Button hover
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>

// Panel transitions
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
```

### Animation Best Practices

1. **Cleanup**: Always use `useGSAP` with scope for automatic cleanup
2. **Performance**: Use `transform` and `opacity` for GPU-accelerated animations
3. **Easing**: Use appropriate easing functions (power2, power3, power4)
4. **ScrollTrigger**: Use `start: "top 88%"` for consistent trigger points
5. **Stagger**: Use stagger for list animations
6. **One-Shot**: Track fired animations to prevent re-firing

---

## Content Management

### Static Content Pattern

Colloque uses a centralized static content pattern:

**Location**: Feature-specific `data.ts` files

**Example**: `app/ai-resources/data.ts`

**Structure**:

```tsx
// Type definitions
export type ModelInfo = { ... };
export type Tool = { ... };
export type Question = { ... };

// Data exports
export const DISPATCH_WEEKS: DispatchWeek[] = [...];
export const STACK_ITEMS: StackItem[] = [...];
export const QUIZ_QUESTIONS: Question[] = [...];
export const LEARNING_LEVELS: Level[] = [...];
```

### HTML Content Pattern

Legacy HTML content served through iframe pattern:

**Individual Page Pattern**:

```tsx
"use client";

import DocumentationBookmarkButton from "@/components/DocumentationBookmarkButton";

export default function BookPage() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <iframe
        src="/ikigai-summary.html"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="Ikigai Summary"
      />
      <DocumentationBookmarkButton
        bookmarkId="doc-ikigai"
        docTitle="Ikigai"
        docHref="/book-summaries/ikigai"
      />
    </div>
  );
}
```

### Content Indexing

**Script**: `scripts/index-html-content.ts`

**Purpose**: Automatically index HTML content for search

**Build Integration**:

```json
{
  "scripts": {
    "dev": "tsx scripts/index-html-content.ts && next dev",
    "build": "tsx scripts/index-html-content.ts && next build"
  }
}
```

**Output**: `lib/generated-search-index.ts`

### Content Categories

**Intellect**:
- Domain: Metabolic Biology, Linguistic History, Philosophy, etc.
- Origin: Author attribution or "Original"
- Format: Long-form essays

**Book Summaries**:
- Tags: Philosophy, Entrepreneurship, Neuroscience, etc.
- Format: Condensed book wisdom
- Structure: Quote-driven summaries

**AI Resources**:
- Categories: AI Models, Coding Tools, Research Tools
- Pricing: Free, Paid, Freemium
- Format: Tool descriptions and guides

**Community**:
- Types: Announcements, Questions, Chat
- Format: Interactive content

**The Log**:
- Structure: Weekly entries
- Format: Personal reflections and reading notes

---

## Development Workflow

### Getting Started

**Prerequisites**:
- Node.js 18+
- npm or yarn

**Installation**:

```bash
cd colloque
npm install
```

**Development Server**:

```bash
npm run dev
```

This runs:
1. HTML content indexing script
2. Next.js development server

**Build**:

```bash
npm run build
```

This runs:
1. HTML content indexing script
2. Next.js production build

### Project Rules

**File**: `.windsurfrules`

**Key Rules**:

1. **Inline Styles Only**: No CSS modules, no styled-components
2. **Font Usage**: Cormorant Garamond (headings) + DM Sans (body) only
3. **Animation Libraries**: GSAP and Framer Motion only
4. **TypeScript**: Strict mode, no `any` types
5. **Component Organization**: Page-specific in `/app/[page]/components/`, shared in `/components/`

### Adding New Features

**New Page**:

1. Create directory in `/app/`
2. Add `page.tsx`
3. Add components in `/app/[page]/components/`
4. Update Navbar with nav link
5. Update search index if needed

**New Component**:

1. Place in `/components/` (shared) or `/app/[page]/components/` (page-specific)
2. Use `"use client"` if interactive
3. Follow inline style pattern
4. Add GSAP animations if needed

**New Data**:

1. Extend existing `data.ts` or create new one
2. Define TypeScript interfaces
3. Export constants
4. Update search index if needed

### Code Style

**Component Structure**:

```tsx
"use client";

// 1. Imports
import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// 2. Type definitions
type Props = { ... };

// 3. Constants
const STYLE: React.CSSProperties = { ... };

// 4. Component function
export default function Component({ ... }: Props) {
  // 5. Refs
  const ref = useRef<HTMLDivElement>(null);

  // 6. State
  const [state, setState] = useState(...);

  // 7. Effects
  useEffect(() => { ... }, []);

  // 8. GSAP animations
  useGSAP(() => { ... }, { scope: ref });

  // 9. Helper functions
  const helper = () => { ... };

  // 10. Return
  return (
    <div ref={ref} style={STYLE}>
      ...
    </div>
  );
}
```

### Testing

**Manual Testing**:
- Test animations by scrolling
- Test responsive behavior with viewport resizing
- Test search functionality
- Test authentication flow
- Test bookmark functionality

**No Automated Testing**: Currently no testing framework configured

### Git Workflow

**Branch Strategy**:
- `main`: Production
- Feature branches for new features

**Commit Convention**:
- Conventional commits recommended
- Example: `feat: add new AI resource card`

---

## Deployment

### Vercel Deployment (Recommended)

**Prerequisites**:
- GitHub repository
- Vercel account
- Supabase project (for auth)

**Steps**:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete application"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Import repository in Vercel
   - Configure build settings (auto-detected)
   - Set environment variables

3. **Environment Variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Deploy**:
   - Vercel automatically builds and deploys
   - Preview URLs for pull requests
   - Production deployment on main branch merge

### Alternative Deployment

**Netlify**:
- Similar to Vercel
- Configure build command: `npm run build`
- Set publish directory: `.next`

**Self-Hosted**:
- Build: `npm run build`
- Start: `npm start`
- Use PM2 for process management
- Configure nginx as reverse proxy

### Performance Optimization

**Build Optimizations**:
- Automatic code splitting
- Tree shaking
- Image optimization
- Font optimization

**Runtime Optimizations**:
- GSAP context cleanup
- Lazy loading where appropriate
- Efficient scroll triggers
- Canvas rendering for video

### Monitoring

**Recommended Tools**:
- Vercel Analytics (if using Vercel)
- Sentry for error tracking
- Google Analytics for user analytics

---

## Technical Knowledge for Readers

### Next.js App Router

**Key Concepts**:

- **Server Components**: Default, render on server, no interactivity
- **Client Components**: Marked with `"use client"`, render on client
- **File-based Routing**: Routes defined by file structure
- **Layouts**: Shared UI across routes
- **Streaming**: Progressive rendering for better performance

**App Router vs Pages Router**:
- App Router is newer, recommended
- Server Components by default
- Better performance
- Nested layouts

### TypeScript

**Strict Mode**:
- All types must be defined
- No implicit any
- Strict null checks

**Type Definitions**:
```tsx
interface User {
  id: string;
  email: string;
  metadata?: Record<string, any>;
}

type Role = "admin" | "user" | "guest";
```

### GSAP Animation

**Core Concepts**:
- **Timeline**: Sequenced animations
- **Tween**: Single animation
- **ScrollTrigger**: Scroll-based triggering
- **Easing**: Animation speed curves

**Common Easing**:
- `power2.out`: Standard smooth deceleration
- `power3.out`: Slower deceleration
- `power4.out`: Very slow deceleration
- `elastic.out`: Bouncy effect

### React Hooks

**Common Hooks**:
- `useState`: Component state
- `useEffect`: Side effects
- `useRef`: DOM references
- `useCallback`: Memoized callbacks
- `useMemo`: Memoized values

**Custom Hooks**:
- `useUser`: Authentication state
- `useDocumentationBookmark`: Bookmark logic

### Supabase Authentication

**Key Features**:
- OAuth providers (Google, GitHub, etc.)
- Email/password authentication
- Session management
- Row-level security

**Client Setup**:
```tsx
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

### LocalStorage

**Usage**:
```tsx
// Set
localStorage.setItem("key", JSON.stringify(data));

// Get
const data = JSON.parse(localStorage.getItem("key") || "[]");

// Remove
localStorage.removeItem("key");
```

**Limitations**:
- 5-10MB storage limit
- String-only storage
- Synchronous API
- Same-origin policy

### Custom Events

**Purpose**: Cross-component communication

**Dispatch**:
```tsx
window.dispatchEvent(new CustomEvent("event-name", { detail: data }));
```

**Listen**:
```tsx
useEffect(() => {
  const handler = (e: CustomEvent) => {
    console.log(e.detail);
  };
  window.addEventListener("event-name", handler as EventListener);
  return () => window.removeEventListener("event-name", handler as EventListener);
}, []);
```

### Canvas API

**Usage in VideoHero**:
```tsx
const canvas = canvasRef.current;
const ctx2d = canvas.getContext("2d");
const img = images.current[index];
ctx2d.drawImage(img, 0, 0, canvas.width, canvas.height);
```

**Benefits**:
- High performance
- Pixel-level control
- Good for frame sequences

### Intersection Observer

**Usage in SectionNav**:
```tsx
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id);
      }
    });
  },
  { threshold: 0.5 }
);
```

**Benefits**:
- Efficient scroll detection
- Better performance than scroll events
- Built-in browser API

### Cheerio

**Purpose**: Server-side HTML parsing

**Usage in indexing script**:
```tsx
import * as cheerio from 'cheerio';

const $ = cheerio.load(htmlContent);
const title = $('title').text();
const headings = [];
$('h1, h2, h3').each((index, element) => {
  headings.push($(element).text());
});
```

**Benefits**:
- jQuery-like syntax
- Server-side parsing
- Fast and efficient

---

## Conclusion

Colloque is a sophisticated Next.js application that combines modern web technologies with thoughtful design to create an intellectual hub for deep reading and critical thinking. The application demonstrates:

- **Technical Excellence**: Clean architecture, proper TypeScript usage, efficient animations
- **Design Consistency**: Cohesive design system with inline styling
- **User Experience**: Smooth animations, intuitive navigation, powerful search
- **Scalability**: Modular component structure, centralized data management
- **Performance**: Optimized rendering, efficient animations, proper cleanup

The application serves as both a functional platform for intellectual engagement and a reference implementation of modern Next.js development practices.

---

## Appendix

### Key Files Reference

- **`app/layout.tsx`**: Root layout with font configuration
- **`app/globals.css`**: Global styles and CSS variables
- **`tailwind.config.ts`**: Custom color palette
- **`components/Navbar.tsx`**: Navigation, search, auth
- **`components/VideoHero.tsx`**: Scroll-based video hero
- **`components/ColloqueBot.tsx`**: AI chatbot widget
- **`lib/auth.ts`**: Authentication system
- **`lib/search-index.ts`**: Search functionality
- **`scripts/index-html-content.ts`**: HTML content indexer
- **`.windsurfrules`**: Project-specific development rules

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Dependencies

**Core**:
- next: 14.2.35
- react: ^18
- react-dom: ^18
- typescript: ^5

**Styling**:
- tailwindcss: 3.4.1
- postcss: ^8

**Animation**:
- gsap: 3.15.0
- @gsap/react: 2.1.2
- framer-motion: 12.38.0

**Authentication**:
- @supabase/supabase-js: ^2.106.1

**Utilities**:
- lucide-react: 1.8.0
- cheerio: ^1.0.0-rc.12
- tsx: ^4.7.0

### Scripts

```json
{
  "dev": "tsx scripts/index-html-content.ts && next dev",
  "build": "tsx scripts/index-html-content.ts && next build",
  "start": "next start",
  "lint": "next lint",
  "index:content": "tsx scripts/index-html-content.ts"
}
```

---

*Documentation generated for Colloque web application*
*Last updated: June 2026*
