"use client";

import { Plus, TrashBin } from "@gravity-ui/icons";
import { Button, Input, Label, TextArea, TextField } from "@heroui/react";

import type { Task } from "@/types";

interface WeeklyTaskListProps {
  tasks: Task[];
  onChange: (tasks: Task[]) => void;
  createTask: () => Task;
}

export const WeeklyTaskList = ({ tasks, onChange, createTask }: WeeklyTaskListProps) => {
  const updateTask = (id: string, field: keyof Omit<Task, "id">, value: string) => {
    onChange(tasks.map((task) => (task.id === id ? { ...task, [field]: value } : task)));
  };

  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task, index) => (
        <div key={task.id} className="flex flex-col gap-3 rounded-2xl border border-separator p-4">
          <div className="flex items-end gap-2">
            <TextField
              fullWidth
              autoFocus={index === tasks.length - 1 && index > 0}
              value={task.taskName}
              variant="secondary"
              onChange={(value) => updateTask(task.id, "taskName", value)}
            >
              <Label>Tâche {index + 1}</Label>
              <Input placeholder="Intitulé de la tâche" />
            </TextField>
            <Button
              isIconOnly
              aria-label={`Supprimer la tâche ${index + 1}`}
              isDisabled={tasks.length === 1}
              variant="ghost"
              onPress={() => onChange(tasks.filter((t) => t.id !== task.id))}
            >
              <TrashBin />
            </Button>
          </div>
          <TextField
            fullWidth
            aria-label={`Observation sur la tâche ${index + 1}`}
            value={task.taskObservation}
            variant="secondary"
            onChange={(value) => updateTask(task.id, "taskObservation", value)}
          >
            <TextArea placeholder="Observation…" rows={2} />
          </TextField>
        </div>
      ))}
      <Button
        className="self-start"
        size="sm"
        variant="secondary"
        onPress={() => onChange([...tasks, createTask()])}
      >
        <Plus />
        Ajouter une tâche
      </Button>
    </div>
  );
};
