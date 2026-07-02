import { Suspense } from "react";
import ReadPageClient from "./ReadPageClient";

export default function ReadPage({
  searchParams,
}: {
  searchParams: { file?: string };
}) {
  return (
    <Suspense fallback={null}>
      <ReadPageClient file={searchParams.file} />
    </Suspense>
  );
}
