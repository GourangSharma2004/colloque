import { notFound } from "next/navigation";
import { getBookSummaryBySlug, getBookSummarySlugs } from "@/lib/sanity-fetch";
import { urlFor } from "@/sanity/lib/image";
import { isSanityConfigured } from "@/sanity/env";
import BookReader from "./BookReader";

export const revalidate = 60;

export async function generateStaticParams() {
  if (!isSanityConfigured) return [];
  const slugs = await getBookSummarySlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export default async function BookSummaryPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!isSanityConfigured) notFound();

  const book = await getBookSummaryBySlug(params.slug);
  if (!book) notFound();

  return (
    <BookReader
      title={book.title}
      author={book.author}
      publishedAt={book.publishedAt}
      coverImageUrl={
        book.coverImage ? urlFor(book.coverImage).width(1200).url() : undefined
      }
      body={book.body ?? []}
      categories={book.categories ?? []}
      isPremium={book.isPremium}
      rating={book.rating}
      readTime={book.readTime}
      slug={params.slug}
    />
  );
}
