"use client";

import { Calendar, Plus, TrashBin } from "@gravity-ui/icons";
import { Button, Card, Input, Label, TextArea, TextField } from "@heroui/react";
import { useMemo } from "react";

import { PageHeader } from "@/components/PageHeader";
import { ReportPreview } from "@/components/ReportPreview";
import { ReportLayout } from "@/components/Form/ReportLayout";
import { usePersistentState } from "@/hooks/usePersistentState";
import { generateDailyReport, isDailyRowFilled } from "@/lib/htmlGenerator";
import { createId } from "@/lib/id";
import { resetWithUndo } from "@/lib/resetWithUndo";
import type { DailyRowData } from "@/types";

const createRow = (): DailyRowData => ({ id: createId(), name: "", yesterday: "", today: "" });

export const DailyForm = () => {
  const [rows, setRows, { isHydrated, reset }] = usePersistentState<DailyRowData[]>(
    "reportify:daily:v1",
    () => [createRow()],
  );

  const report = useMemo(() => generateDailyReport(rows), [rows]);
  const isEmpty = !rows.some(isDailyRowFilled);

  const updateRow = (id: string, field: keyof Omit<DailyRowData, "id">, value: string) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const removeRow = (id: string) => {
    setRows((prev) => (prev.length > 1 ? prev.filter((row) => row.id !== id) : prev));
  };

  return (
    <ReportLayout
      form={
        <>
          {rows.map((row, index) => (
            <Card key={row.id}>
              <Card.Header className="flex-row items-center justify-between">
                <Card.Title className="text-sm text-muted">Personne {index + 1}</Card.Title>
                <Button
                  isIconOnly
                  aria-label={`Supprimer la personne ${index + 1}`}
                  isDisabled={rows.length === 1}
                  size="sm"
                  variant="ghost"
                  onPress={() => removeRow(row.id)}
                >
                  <TrashBin />
                </Button>
              </Card.Header>
              <Card.Content className="flex flex-col gap-4">
                <TextField
                  fullWidth
                  autoFocus={index === rows.length - 1 && index > 0}
                  value={row.name}
                  variant="secondary"
                  onChange={(value) => updateRow(row.id, "name", value)}
                >
                  <Label>Nom</Label>
                  <Input placeholder="Jane Doe" />
                </TextField>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    fullWidth
                    value={row.yesterday}
                    variant="secondary"
                    onChange={(value) => updateRow(row.id, "yesterday", value)}
                  >
                    <Label>Hier</Label>
                    <TextArea placeholder="Ce qui a été fait hier…" rows={3} />
                  </TextField>
                  <TextField
                    fullWidth
                    value={row.today}
                    variant="secondary"
                    onChange={(value) => updateRow(row.id, "today", value)}
                  >
                    <Label>Aujourd&apos;hui</Label>
                    <TextArea placeholder="Ce qui est prévu aujourd'hui…" rows={3} />
                  </TextField>
                </div>
              </Card.Content>
            </Card>
          ))}
          <Button
            className="self-start"
            variant="secondary"
            onPress={() => setRows((prev) => [...prev, createRow()])}
          >
            <Plus />
            Ajouter une personne
          </Button>
        </>
      }
      header={
        <PageHeader
          description="Ce qui a été fait hier et ce qui est prévu aujourd'hui. Le brouillon est sauvegardé automatiquement."
          icon={<Calendar />}
          title="Daily reporting"
        />
      }
      isReady={isHydrated}
      preview={
        <ReportPreview
          isEmpty={isEmpty}
          report={report}
          onReset={() => resetWithUndo(rows, reset, setRows)}
        />
      }
    />
  );
};
