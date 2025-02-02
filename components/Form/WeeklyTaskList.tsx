import React, { FC } from "react";
import { Accordion, AccordionItem, Input, Textarea, Button } from "@heroui/react";
import { PlusIcon, MinusIcon } from "@/components/Icons";

interface Task {
    taskName: string;
    taskObservation: string;
}

interface WeeklyTaskListProps {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}

const WeeklyTaskList: FC<WeeklyTaskListProps> = ({ tasks, setTasks }) => {
    const handleTaskChange = (index: number, field: keyof Task, value: string) => {
        const updatedTasks = [...tasks];
        updatedTasks[index][field] = value;
        setTasks(updatedTasks);
    };

    const handleAddTask = () => {
        setTasks([...tasks, { taskName: "", taskObservation: "" }]);
    };

    const handleRemoveTask = (index: number) => {
        if (tasks.length > 1) {
            setTasks(tasks.filter((_, i) => i !== index));
        }
    };

    return (
        <Accordion variant="splitted">
            {tasks.map((task, index) => (
                <AccordionItem key={`task-${index}`} title={`Tâche ${index + 1}`}>
                    <div className="flex flex-col gap-4">
                        <Input
                            label="Nom de la tâche"
                            className="w-full"
                            value={task.taskName}
                            onChange={(e) => handleTaskChange(index, "taskName", e.target.value)}
                        />
                        <Textarea
                            label="Observation"
                            className="w-full"
                            value={task.taskObservation}
                            onChange={(e) => handleTaskChange(index, "taskObservation", e.target.value)}
                        />
                        <div className="flex gap-2">
                            <Button isIconOnly color="success" onPress={handleAddTask}>
                                <PlusIcon />
                            </Button>
                            <Button
                                isIconOnly
                                color={tasks.length === 1 ? "default" : "danger"}
                                disabled={tasks.length === 1}
                                onPress={() => handleRemoveTask(index)}
                            >
                                <MinusIcon />
                            </Button>
                        </div>
                    </div>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default WeeklyTaskList;
