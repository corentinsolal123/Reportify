import type { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Opinion types
export type OpinionResult = "" | "mauvais" | "a ameliorer" | "bon";
export type OpinionColor = "default" | "danger" | "warning" | "success";

export interface Opinion {
  opinionResult: OpinionResult;
  opinionContext: string;
  opinionComment: string;
}

// Task types
export interface Task {
  id: string;
  taskName: string;
  taskObservation: string;
}

// Daily report types
export interface DailyRowData {
  id: string;
  name: string;
  yesterday: string;
  today: string;
}

// Weekly report types
export interface WeeklyReportData {
  name: string;
  tasks: Task[];
  opinions: Opinion[];
  signature: string;
}

// Generated report, in both formats placed in the clipboard
export interface GeneratedReport {
  html: string;
  text: string;
}

export const OPINION_LABELS: Record<Exclude<OpinionResult, "">, string> = {
  mauvais: "Mauvais",
  "a ameliorer": "À améliorer",
  bon: "Bon",
};

// Color mapping for opinions
export const OPINION_COLOR_MAP: Record<OpinionResult, OpinionColor> = {
  mauvais: "danger",
  "a ameliorer": "warning",
  bon: "success",
  "": "default",
};

// Email-safe colors (inline styles, readable on a white background)
export const HTML_COLOR_MAP: Record<OpinionColor, string> = {
  danger: "#c62828",
  warning: "#e65100",
  success: "#2e7d32",
  default: "#6b7280",
};
