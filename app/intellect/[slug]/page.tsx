import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug, getArticleSlugs } from "@/lib/sanity-fetch";
import { urlFor } from "@/sanity/lib/image";
import { isSanityConfigured } from "@/sanity/env";
import ArticleReader from "./ArticleReader";

export const revalidate = 60;

const INTELLECT_HTML_FALLBACK: Record<string, string> = {
  "case-against-sugar": "/case_against_sugar.html",
  "problem-of-mindfulness": "/mindfulness.html",
  "end-of-work-crisis-of-meaning": "/work.html",
  "golden-quarter": "/innovation.html",
  "are-coders-worth-it": "/are-coders-worth-it.html",
  "the-power-thinker": "/foucault-power-thinker.html",
  "the-orgasm-cure": "/orgasm_cure_rif.html",
  "poor-teeth": "/poor-teeth.html",
  "the-presence-of-power": "/presence-of-power.html",
  "time-is-an-object": "/time-is-an-object.html",
  "why-self-harm": "/why-self-harm-doc.html",
  "why-english-is-weird": "",
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  if (!isSanityConfigured) return {};
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};
  const coverUrl = article.coverImage
    ? urlFor(article.coverImage).width(1200).url()
    : undefined;
  const ogImage = coverUrl
    ? `/api/og?title=${encodeURIComponent(article.title)}&cover=${encodeURIComponent(coverUrl)}`
    : `/api/og?title=${encodeURIComponent(article.title)}`;
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      type: "article",
      url: `https://colloque.in/intellect/${params.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      publishedTime: article.publishedAt ?? undefined,
      authors: article.author ? [article.author] : undefined,
    },
  };
}

export async function generateStaticParams() {
  if (!isSanityConfigured) return [];
  const slugs = await getArticleSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export default async function IntellectArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  let article = null;
  if (isSanityConfigured) {
    article = await getArticleBySlug(params.slug);
  }

  if (!article || !article.body || article.body.length === 0) {
    const htmlPath = INTELLECT_HTML_FALLBACK[params.slug];
    if (htmlPath) redirect(htmlPath);
    notFound();
  }

  const coverImageUrl = article.coverImage
    ? urlFor(article.coverImage).width(1200).url()
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt ?? "",
    image: coverImageUrl ?? "",
    author: {
      "@type": "Person",
      name: article.author ?? "Colloque",
    },
    publisher: {
      "@type": "Organization",
      name: "Colloque",
      url: "https://colloque.in",
    },
    datePublished: article.publishedAt ?? "",
    url: `https://colloque.in/intellect/${params.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleReader
        title={article.title}
        author={article.author}
        publishedAt={article.publishedAt}
        coverImageUrl={coverImageUrl}
        body={article.body ?? []}
        categories={article.categories ?? []}
        isPremium={article.isPremium}
        slug={params.slug}
      />
    </>
  );
}
