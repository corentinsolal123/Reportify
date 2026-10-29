import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export const PageHeader = ({ title, description, icon }: PageHeaderProps) => (
  <div className="flex items-start gap-4">
    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-soft-foreground [&>svg]:size-6">
      {icon}
    </div>
    <div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
      <p className="mt-1 text-muted">{description}</p>
    </div>
  </div>
);
