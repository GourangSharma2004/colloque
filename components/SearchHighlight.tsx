"use client";

import { useEffect, useRef } from "react";

type SearchHighlightProps = {
  query: string;
  targetId?: string;
  children: React.ReactNode;
};

export default function SearchHighlight({ query, targetId, children }: SearchHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query || !containerRef.current) return;

    const highlightText = () => {
      const container = containerRef.current;
      if (!container) return;

      // Remove existing highlights
      const existingHighlights = container.querySelectorAll('.search-highlight');
      existingHighlights.forEach(el => {
        const parent = el.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(el.textContent || ''), el);
          parent.normalize();
        }
      });

      if (!query.trim()) return;

      // Get all text nodes
      const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            if (node.parentElement?.tagName === 'SCRIPT' || 
                node.parentElement?.tagName === 'STYLE' ||
                node.parentElement?.classList.contains('search-highlight')) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      const textNodes: Text[] = [];
      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (node.nodeType === Node.TEXT_NODE) {
          textNodes.push(node as Text);
        }
      }

      // Highlight matching text
      const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
      
      textNodes.forEach(textNode => {
        const text = textNode.textContent || '';
        if (!regex.test(text)) return;

        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        regex.lastIndex = 0;
        while ((match = regex.exec(text)) !== null) {
          // Add text before match
          if (match.index > lastIndex) {
            fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
          }
          
          // Add highlighted match
          const highlight = document.createElement('span');
          highlight.className = 'search-highlight';
          highlight.style.backgroundColor = 'rgba(196, 151, 58, 0.3)';
          highlight.style.padding = '2px 4px';
          highlight.style.borderRadius = '2px';
          highlight.textContent = match[0];
          fragment.appendChild(highlight);
          
          lastIndex = regex.lastIndex;
        }
        
        // Add remaining text
        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
        }
        
        textNode.parentNode?.replaceChild(fragment, textNode);
      });

      // Scroll to target section if specified
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add temporary border to highlight the section
          targetElement.style.transition = 'outline 0.3s';
          targetElement.style.outline = '2px solid #C4973A';
          targetElement.style.outlineOffset = '4px';
          
          setTimeout(() => {
            targetElement.style.outline = 'none';
          }, 3000);
        }
      }
    };

    // Delay to ensure DOM is ready
    const timeoutId = setTimeout(highlightText, 100);

    // Clear highlights after 5 seconds
    const clearTimeoutId = setTimeout(() => {
      const existingHighlights = containerRef.current?.querySelectorAll('.search-highlight');
      existingHighlights?.forEach((el: Element) => {
        const parent = el.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(el.textContent || ''), el);
          parent.normalize();
        }
      });
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(clearTimeoutId);
    };
  }, [query, targetId]);

  return <div ref={containerRef} style={{ minHeight: '100%' }}>{children}</div>;
}

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
