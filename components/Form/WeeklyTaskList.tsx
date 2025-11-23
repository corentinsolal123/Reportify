import React, { FC } from "react";
import { Card, CardBody, Input, Textarea, Button } from "@heroui/react";
import { PlusIcon, MinusIcon } from "@/components/Icons";
import { Task } from "@/types";

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
        <div className="space-y-2 w-full">
            <h2>Tasks</h2>
            {tasks.map((task, index) => (
                <div key={index} className="flex flex-row items-center gap-4 w-full">
                    <Input
                        label="Task Name"
                        className="w-full md:max-w-sm"
                        value={task.taskName}
                        onChange={(e) => handleTaskChange(index, "taskName", e.target.value)}
                    />
                    <Textarea
                        label="Observation"
                        className="w-full"
                        value={task.taskObservation}
                        onChange={(e) => handleTaskChange(index, "taskObservation", e.target.value)}
                    />
                    <div className="flex flex-col gap-4">
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
            ))}
        </div>
    );
};

export default WeeklyTaskList;
