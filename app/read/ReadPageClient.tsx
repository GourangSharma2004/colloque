"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ReadPageClient({ file }: { file?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);

  useEffect(() => {
    const fileParam = file || searchParams.get("file");
    if (!fileParam) {
      router.push("/");
      return;
    }
    setIframeSrc(fileParam);
  }, [file, searchParams, router]);

  if (!iframeSrc) {
    return null;
  }

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <iframe
        src={iframeSrc}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
        title="Document Reader"
      />
    </div>
  );
}
