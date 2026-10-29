import type { ReactNode } from "react";

import { Spinner } from "@heroui/react";

interface ReportLayoutProps {
  header: ReactNode;
  form: ReactNode;
  preview: ReactNode;
  isReady: boolean;
}

// Form on the left, sticky preview on the right (stacked on small screens).
export const ReportLayout = ({ header, form, preview, isReady }: ReportLayoutProps) => (
  <div className="flex flex-col gap-8">
    {header}
    {isReady ? (
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">{form}</div>
        <div className="lg:sticky lg:top-24">{preview}</div>
      </div>
    ) : (
      <div className="flex justify-center py-24">
        <Spinner aria-label="Chargement du brouillon" />
      </div>
    )}
  </div>
);
