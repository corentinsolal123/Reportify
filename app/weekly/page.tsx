import type { Metadata } from "next";

import { WeeklyForm } from "@/components/Form/WeeklyForm";

export const metadata: Metadata = { title: "Weekly" };

export default function WeeklyPage() {
  return <WeeklyForm />;
}
