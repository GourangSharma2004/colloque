# Documentation Bookmark Feature

This bookmark system allows users to manually bookmark documentation pages and tracks the most recently read documentation.

## Overview

- **Storage**: `localStorage` with key `colloque_bookmarks`
- **Data Structure**: Each bookmark has `id`, `label`, `href`, and `lastRead` timestamp
- **Display**: Navbar shows only the most recently read documentation with "Last read: X time ago"
- **Auto-tracking**: When a bookmarked page is visited, its `lastRead` timestamp is automatically updated

## Adding Bookmark to New Documentation Pages

### Option 1: Using the Reusable Component (Recommended)

Import and use the `DocumentationBookmarkButton` component:

```tsx
"use client";

import DocumentationBookmarkButton from "@/components/DocumentationBookmarkButton";

export default function YourDocumentationPage() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <iframe
        src="/your-documentation.html"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="Your Documentation Title"
      />
      <DocumentationBookmarkButton
        bookmarkId="doc-your-page"
        docTitle="Your Documentation Title"
        docHref="/your-page-path"
      />
    </div>
  );
}
```

### Option 2: Using the Custom Hook

For more control, use the `useDocumentationBookmark` hook:

```tsx
"use client";

import { useDocumentationBookmark } from "@/lib/useDocumentationBookmark";
import { Bookmark } from "lucide-react";

export default function YourDocumentationPage() {
  const { isBookmarked, handleBookmarkToggle } = useDocumentationBookmark({
    bookmarkId: "doc-your-page",
    docTitle: "Your Documentation Title",
    docHref: "/your-page-path",
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <iframe
        src="/your-documentation.html"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="Your Documentation Title"
      />
      <button
        onClick={handleBookmarkToggle}
        style={{
          position: "fixed",
          top: "80px",
          right: "2rem",
          zIndex: 1000,
          background: "rgba(20, 20, 20, 0.9)",
          border: "1px solid rgba(201, 168, 76, 0.3)",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
          backdropFilter: "blur(10px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(201, 168, 76, 0.2)";
          e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(20, 20, 20, 0.9)";
          e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.3)";
        }}
        title={isBookmarked ? "Remove bookmark" : "Bookmark this page"}
      >
        <Bookmark 
          size={20} 
          strokeWidth={1.5} 
          fill={isBookmarked ? "#C9A84C" : "none"}
          color={isBookmarked ? "#C9A84C" : "rgba(245, 239, 230, 0.7)"}
        />
      </button>
    </div>
  );
}
```

## Bookmark ID Convention

Use the following convention for bookmark IDs:
- Book summaries: `doc-{book-name}` (e.g., `doc-ikigai`, `doc-zero-to-one`)
- Intellect articles: `doc-{article-slug}` (e.g., `doc-case-against-sugar`, `doc-problem-of-mindfulness`)
- AI Resources: `doc-ai-resources`
- Other documentation: `doc-{descriptive-name}`

## Custom Button Positioning

If you need to position the button differently, pass a `style` prop:

```tsx
<DocumentationBookmarkButton
  bookmarkId="doc-your-page"
  docTitle="Your Documentation Title"
  docHref="/your-page-path"
  style={{ top: "100px", right: "3rem" }}
/>
```

## Files

- **Component**: `/components/DocumentationBookmarkButton.tsx` - Reusable bookmark button component
- **Hook**: `/lib/useDocumentationBookmark.ts` - Custom hook for bookmark logic
- **Navbar**: `/components/Navbar.tsx` - Contains bookmark panel and storage logic
