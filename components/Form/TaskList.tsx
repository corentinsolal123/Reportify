import React from "react";
import { Input, Button, Spacer } from "@heroui/react";

interface Task {
    taskName: string;
    taskObservation: string;
}

interface TaskListProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
    const handleAddTask = () => {
        setTasks([...tasks, { taskName: "", taskObservation: "" }]);
    };

    const handleChange = (index: number, field: keyof Task, value: string) => {
        const updated = [...tasks];
        updated[index][field] = value;
        setTasks(updated);
    };

    return (
        <>
            <h4>Tâches</h4>
            {tasks.map((task, index) => (
                <div key={index}>
                    <Input
                        placeholder="Tâche à mener"
                        value={task.taskName}
                        onChange={(e) => handleChange(index, "taskName", e.target.value)}
                        fullWidth
                        variant="bordered"
                        color="primary"
                    />
                    <Spacer y={0.5} />
                    <Input
                        placeholder="Observations"
                        value={task.taskObservation}
                        onChange={(e) => handleChange(index, "taskObservation", e.target.value)}
                        fullWidth
                        variant="bordered"
                        color="primary"
                    />
                    <Spacer y={1} />
                </div>
            ))}
            <Button color="secondary" onPress={handleAddTask}>
                + Ajouter une tâche
            </Button>
            <Spacer y={1} />
        </>
    );
};

export default TaskList;
