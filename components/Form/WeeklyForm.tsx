"use client";

import { ListCheck } from "@gravity-ui/icons";
import { Card, Input, Label, TextField } from "@heroui/react";
import { useMemo } from "react";

import { PageHeader } from "@/components/PageHeader";
import { ReportPreview } from "@/components/ReportPreview";
import { ReportLayout } from "@/components/Form/ReportLayout";
import { WeeklyOpinionList } from "@/components/Form/WeeklyOpinionList";
import { WeeklyTaskList } from "@/components/Form/WeeklyTaskList";
import { usePersistentState } from "@/hooks/usePersistentState";
import { generateWeeklyReport } from "@/lib/htmlGenerator";
import { createId } from "@/lib/id";
import { resetWithUndo } from "@/lib/resetWithUndo";
import type { Task, WeeklyReportData } from "@/types";

const OPINION_CONTEXTS = [
  "Rendu de la semaine",
  "Organisation et communication",
  "Compréhension du travail demandé",
  "Motivation",
];

const createTask = (): Task => ({ id: createId(), taskName: "", taskObservation: "" });

const createReport = (): WeeklyReportData => ({
  name: "",
  tasks: [createTask()],
  opinions: OPINION_CONTEXTS.map((opinionContext) => ({
    opinionContext,
    opinionResult: "",
    opinionComment: "",
  })),
  signature: "L'équipe de gestion",
});

export const WeeklyForm = () => {
  const [data, setData, { isHydrated, reset }] = usePersistentState(
    "reportify:weekly:v1",
    createReport,
  );

  const report = useMemo(() => generateWeeklyReport(data), [data]);

  const update = (patch: Partial<WeeklyReportData>) => setData((prev) => ({ ...prev, ...patch }));

  return (
    <ReportLayout
      form={
        <>
          <Card>
            <Card.Header>
              <Card.Title>Collaborateur</Card.Title>
            </Card.Header>
            <Card.Content className="grid gap-4 sm:grid-cols-2">
              <TextField
                fullWidth
                isRequired
                value={data.name}
                variant="secondary"
                onChange={(name) => update({ name })}
              >
                <Label>Nom</Label>
                <Input placeholder="Jane Doe" />
              </TextField>
              <TextField
                fullWidth
                value={data.signature}
                variant="secondary"
                onChange={(signature) => update({ signature })}
              >
                <Label>Signature</Label>
                <Input placeholder="L'équipe de gestion" />
              </TextField>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Tâches de la semaine</Card.Title>
              <Card.Description>Ce qui a été mené, avec vos observations.</Card.Description>
            </Card.Header>
            <Card.Content>
              <WeeklyTaskList
                createTask={createTask}
                tasks={data.tasks}
                onChange={(tasks) => update({ tasks })}
              />
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Mon avis</Card.Title>
              <Card.Description>Évaluez chaque critère et commentez si besoin.</Card.Description>
            </Card.Header>
            <Card.Content>
              <WeeklyOpinionList
                opinions={data.opinions}
                onChange={(opinions) => update({ opinions })}
              />
            </Card.Content>
          </Card>
        </>
      }
      header={
        <PageHeader
          description="Le bilan hebdomadaire d'une personne. Le brouillon est sauvegardé automatiquement."
          icon={<ListCheck />}
          title="Weekly reporting"
        />
      }
      isReady={isHydrated}
      preview={
        <ReportPreview
          emptyMessage="Renseignez le nom du collaborateur pour voir l'aperçu."
          isEmpty={!data.name.trim()}
          report={report}
          onReset={() => resetWithUndo(data, reset, setData)}
        />
      }
    />
  );
};
