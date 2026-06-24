import { notFound } from "next/navigation";
import { getLogEntryBySlug, getLogEntrySlugs } from "@/lib/sanity-fetch";
import { urlFor } from "@/sanity/lib/image";
import { isSanityConfigured } from "@/sanity/env";
import type { PortableTextBlock } from "sanity";
import LogReader from "./LogReader";

export const revalidate = 60;

export async function generateStaticParams() {
  if (!isSanityConfigured) return [];
  const slugs = await getLogEntrySlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export default async function LogEntryPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!isSanityConfigured) notFound();

  const entry = await getLogEntryBySlug(params.slug);
  if (!entry) notFound();

  return (
    <LogReader
      title={entry.title}
      publishedAt={entry.publishedAt}
      coverImageUrl={
        entry.coverImage ? urlFor(entry.coverImage).width(1200).url() : undefined
      }
      body={(entry.body ?? []) as PortableTextBlock[]}
      categories={entry.categories ?? []}
      isPremium={entry.isPremium}
      likesCount={entry.likesCount}
      slug={params.slug}
    />
  );
}
