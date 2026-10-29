import type { GeneratedReport } from "@/types";

// Copies the report as rich HTML (pasted as a table in Outlook) with a plain-text fallback.
export const copyReport = async ({ html, text }: GeneratedReport): Promise<void> => {
  if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([text], { type: "text/plain" }),
      }),
    ]);

    return;
  }

  await navigator.clipboard.writeText(text);
};
