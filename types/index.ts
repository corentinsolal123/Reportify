import { SVGProps } from "react";

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
  taskName: string;
  taskObservation: string;
}

// Daily report types
export interface DailyRowData {
  name: string;
  yesterday: string;
  today: string;
}

// Weekly report types
export interface WeeklyRowData {
  name: string;
  tasks: Task[];
  opinions: Opinion[];
}

// Color mapping for opinions
export const OPINION_COLOR_MAP: Record<OpinionResult, OpinionColor> = {
  "mauvais": "danger",
  "a ameliorer": "warning",
  "bon": "success",
  "": "default"
};

export const HTML_COLOR_MAP: Record<OpinionColor, string> = {
  danger: "red",
  warning: "orange",
  success: "green",
  default: "white"
};
