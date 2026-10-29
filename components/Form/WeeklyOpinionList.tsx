"use client";

import { Label, ListBox, Select, TextArea, TextField } from "@heroui/react";

import { OPINION_LABELS, type Opinion, type OpinionResult } from "@/types";

interface WeeklyOpinionListProps {
  opinions: Opinion[];
  onChange: (opinions: Opinion[]) => void;
}

const OPINION_ICONS: Record<Exclude<OpinionResult, "">, string> = {
  mauvais: "❌",
  "a ameliorer": "⚠️",
  bon: "✅",
};

const OPTIONS = Object.entries(OPINION_LABELS) as [Exclude<OpinionResult, "">, string][];

export const WeeklyOpinionList = ({ opinions, onChange }: WeeklyOpinionListProps) => {
  const updateOpinion = (index: number, patch: Partial<Opinion>) => {
    onChange(opinions.map((opinion, i) => (i === index ? { ...opinion, ...patch } : opinion)));
  };

  return (
    <div className="flex flex-col gap-4">
      {opinions.map((opinion, index) => (
        <div
          key={opinion.opinionContext}
          className="grid gap-3 rounded-2xl border border-separator p-4 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]"
        >
          <Select
            fullWidth
            placeholder="Évaluer…"
            value={opinion.opinionResult || null}
            variant="secondary"
            onChange={(value) =>
              updateOpinion(index, { opinionResult: (value as OpinionResult | null) ?? "" })
            }
          >
            <Label>{opinion.opinionContext}</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {OPTIONS.map(([id, label]) => (
                  <ListBox.Item key={id} id={id} textValue={label}>
                    {OPINION_ICONS[id]} {label}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          <TextField
            fullWidth
            value={opinion.opinionComment}
            variant="secondary"
            onChange={(value) => updateOpinion(index, { opinionComment: value })}
          >
            <Label>Commentaire</Label>
            <TextArea placeholder="Précisez votre avis…" rows={2} />
          </TextField>
        </div>
      ))}
    </div>
  );
};
