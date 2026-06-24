import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

type IndexedContent = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  section: 'intellect' | 'book-summaries' | 'ai-resources' | 'community' | 'the-log' | 'documentation';
  fullContent: string;
  headings: Array<{ level: number; text: string; id: string }>;
};

// Infer section from file path
function inferSection(filePath: string): IndexedContent['section'] {
  const lowerPath = filePath.toLowerCase();
  
  if (lowerPath.includes('intellect') || lowerPath.includes('case_against_sugar') || lowerPath.includes('mindfulness') || 
      lowerPath.includes('work') || lowerPath.includes('innovation') || lowerPath.includes('coders') ||
      lowerPath.includes('power') || lowerPath.includes('orgasm') || lowerPath.includes('teeth') ||
      lowerPath.includes('presence') || lowerPath.includes('english')) {
    return 'intellect';
  }
  
  if (lowerPath.includes('book') || lowerPath.includes('ikigai') || lowerPath.includes('zero') ||
      lowerPath.includes('dopamine') || lowerPath.includes('cant') || lowerPath.includes('crush') ||
      lowerPath.includes('diary') || lowerPath.includes('someday') || lowerPath.includes('mars') ||
      lowerPath.includes('deep') || lowerPath.includes('money') || lowerPath.includes('subtle') ||
      lowerPath.includes('sell') || lowerPath.includes('systems') || lowerPath.includes('stillness')) {
    return 'book-summaries';
  }
  
  if (lowerPath.includes('claude') || lowerPath.includes('gemini') || lowerPath.includes('perplexity') ||
      lowerPath.includes('dispatch') || lowerPath.includes('saas') || lowerPath.includes('windsurf')) {
    return 'ai-resources';
  }
  
  if (lowerPath.includes('community')) {
    return 'community';
  }
  
  if (lowerPath.includes('time') || lowerPath.includes('self-harm')) {
    return 'the-log';
  }
  
  return 'documentation';
}

// Infer category from file path or content
function inferCategory(filePath: string, title: string): string {
  const lowerPath = filePath.toLowerCase();
  const lowerTitle = title.toLowerCase();
  
  if (lowerPath.includes('claude') || lowerTitle.includes('claude')) return 'AI Model';
  if (lowerPath.includes('gemini') || lowerTitle.includes('gemini')) return 'AI Model';
  if (lowerPath.includes('perplexity') || lowerTitle.includes('perplexity')) return 'Research Tool';
  if (lowerPath.includes('dispatch')) return 'Weekly Dispatch';
  if (lowerPath.includes('saas')) return 'SaaS';
  if (lowerPath.includes('windsurf')) return 'AI Tool';
  
  // Default categories based on section
  const section = inferSection(filePath);
  const sectionCategories: Record<IndexedContent['section'], string> = {
    'intellect': 'Idea',
    'book-summaries': 'Book Summary',
    'ai-resources': 'AI Resource',
    'community': 'Community',
    'the-log': 'Blog Post',
    'documentation': 'Documentation',
  };
  
  return sectionCategories[section];
}

// Generate unique ID for sections
function generateId(filePath: string, headingText: string, index: number): string {
  const fileName = path.basename(filePath, '.html');
  const slug = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${fileName}-${slug}-${index}`;
}

// Main indexing function
function indexHtmlContent(): IndexedContent[] {
  const publicDir = path.join(process.cwd(), 'public');
  const indexedContent: IndexedContent[] = [];
  
  // Recursively find all HTML files
  function findHtmlFiles(dir: string, fileList: string[] = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findHtmlFiles(filePath, fileList);
      } else if (file.endsWith('.html')) {
        fileList.push(filePath);
      }
    });
    
    return fileList;
  }
  
  const htmlFiles = findHtmlFiles(publicDir);
  
  htmlFiles.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const $ = cheerio.load(content);
      
      // Extract title
      const title = $('title').text() || path.basename(filePath, '.html');
      
      // Extract headings
      const headings: Array<{ level: number; text: string; id: string }> = [];
      $('h1, h2, h3').each((index, element) => {
        const $el = $(element);
        const level = parseInt(element.tagName.charAt(1));
        const text = $el.text().trim();
        const id = generateId(filePath, text, index);
        headings.push({ level, text, id });
      });
      
      // Extract body text
      const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
      const description = bodyText.substring(0, 200) + (bodyText.length > 200 ? '...' : '');
      
      // Get relative path from public
      const relativePath = path.relative(publicDir, filePath);
      const href = `/${relativePath}`;
      
      const section = inferSection(filePath);
      const category = inferCategory(filePath, title);
      
      indexedContent.push({
        id: path.basename(filePath, '.html'),
        title,
        description,
        category,
        href,
        section,
        fullContent: bodyText,
        headings,
      });
    } catch (error) {
      console.error(`Error indexing ${filePath}:`, error);
    }
  });
  
  return indexedContent;
}

// Generate TypeScript file
function generateIndexFile(content: IndexedContent[]): void {
  const outputDir = path.join(process.cwd(), 'lib');
  const outputFile = path.join(outputDir, 'generated-search-index.ts');
  
  const fileContent = `// Auto-generated by scripts/index-html-content.ts
// DO NOT EDIT MANUALLY

import type { SearchResult } from './search-index';

export const HTML_SEARCH_INDEX: SearchResult[] = ${JSON.stringify(content, null, 2)};

export const HTML_CONTENT_MAP: Record<string, {
  fullContent: string;
  headings: Array<{ level: number; text: string; id: string }>;
}> = ${JSON.stringify(
  content.reduce((acc, item) => {
    acc[item.id] = {
      fullContent: item.fullContent,
      headings: item.headings,
    };
    return acc;
  }, {} as Record<string, any>),
  null,
  2
)};
`;
  
  fs.writeFileSync(outputFile, fileContent, 'utf-8');
  console.log(`Generated search index at ${outputFile}`);
  console.log(`Indexed ${content.length} HTML files`);
}

// Run the indexer
console.log('Starting HTML content indexing...');
const indexedContent = indexHtmlContent();
generateIndexFile(indexedContent);
console.log('Indexing complete!');
