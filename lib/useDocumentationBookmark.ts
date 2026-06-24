import { useEffect, useState } from "react";

type StoredBookmark = { id: string; label: string; href: string; lastRead: number };

interface UseDocumentationBookmarkProps {
  bookmarkId: string;
  docTitle: string;
  docHref: string;
}

/**
 * Custom hook for adding bookmark functionality to documentation pages.
 * 
 * Usage:
 * ```tsx
 * const { isBookmarked, handleBookmarkToggle } = useDocumentationBookmark({
 *   bookmarkId: "doc-your-page",
 *   docTitle: "Your Documentation Title",
 *   docHref: "/your-page-path",
 * });
 * 
 * // Then use the BookmarkButton component with these props:
 * <BookmarkButton 
 *   isBookmarked={isBookmarked} 
 *   onToggle={handleBookmarkToggle} 
 * />
 * ```
 */
export function useDocumentationBookmark({
  bookmarkId,
  docTitle,
  docHref,
}: UseDocumentationBookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("colloque_bookmarks") || "[]");
    setIsBookmarked(bookmarks.some((b: StoredBookmark) => b.id === bookmarkId));
  }, [bookmarkId]);

  useEffect(() => {
    // Auto-track last read when page loads
    const bookmarks = JSON.parse(localStorage.getItem("colloque_bookmarks") || "[]");
    const existing = bookmarks.find((b: StoredBookmark) => b.id === bookmarkId);
    if (existing) {
      const updated = bookmarks.map((b: StoredBookmark) => 
        b.id === bookmarkId ? { ...b, lastRead: Date.now() } : b
      );
      localStorage.setItem("colloque_bookmarks", JSON.stringify(updated));
    }
  }, [bookmarkId]);

  const handleBookmarkToggle = () => {
    const bookmarks = JSON.parse(localStorage.getItem("colloque_bookmarks") || "[]");
    let updated;
    if (isBookmarked) {
      updated = bookmarks.filter((b: StoredBookmark) => b.id !== bookmarkId);
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
