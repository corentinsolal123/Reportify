"use client";

import React, { useState } from "react";
import {Input, Button, Spacer, Card, Divider} from "@heroui/react";
import TaskList from "@/components/Form/TaskList";
import OpinionList from "@/components/Form/OpinionList";

interface Opinion {
    opinionResult: "bad" | "average" | "good";
    opinionContext: string;
    opinionComment: string;
}

export const Weekly = () => {
    const [tasks, setTasks] = useState([{ taskName: "", taskObservation: "" }]);

    const [opinions, setOpinions] = useState<Opinion[]>([
        { opinionResult: "bad", opinionContext: "", opinionComment: "" },
    ]);

    const [summary, setSummary] = useState("");

    return (
        <div className="mt-8">
            <div>
                <h1>Daily reporting</h1>
                <Divider className="my-4"/>
            </div>

            <Input
                id="nameInput"
                isClearable
                variant="bordered"
                placeholder="Prénom et Nom"
                fullWidth
                color="primary"
                required
            />

            <Spacer y={1}/>

            <TaskList tasks={tasks} setTasks={setTasks}/>
            <Spacer y={1}/>
            <OpinionList opinions={opinions} setOpinions={setOpinions}/>

            <Spacer y={1}/>

            <Button color="success" onPress={() => {/* ... */
            }}>
                Générer le récapitulatif
            </Button>

            <Spacer y={1.5}/>

            {summary && (
                <Card>
                    <h4>Récapitulatif :</h4>
                    <div dangerouslySetInnerHTML={{__html: summary}}></div>
                    <Spacer y={0.5}/>
                    <Button onPress={() => {/* ... */
                    }}>Ouvrir dans Outlook</Button>
                </Card>
            )}
        </div>
    );
};

export default Weekly;
