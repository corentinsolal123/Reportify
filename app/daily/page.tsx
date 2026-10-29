import type { Metadata } from "next";

import { DailyForm } from "@/components/Form/DailyForm";

export const metadata: Metadata = { title: "Daily" };

export default function DailyPage() {
  return <DailyForm />;
}
