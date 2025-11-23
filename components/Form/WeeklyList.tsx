"use client";

import React, { useState, FC, useCallback } from "react";
import { Card, CardBody, Input, Button, Divider } from "@heroui/react";
import WeeklyTaskList from "@/components/Form/WeeklyTaskList";
import WeeklyOpinionList from "@/components/Form/WeeklyOpinionList";
import { Opinion, Task, WeeklyRowData } from "@/types";
import { generateWeeklyReportHtml } from "@/lib/htmlGenerator";
import { showError } from "@/lib/toast";

const WeeklyList: FC = () => {
    const defaultOpinions: Opinion[] = [
        { opinionResult: "", opinionContext: "Rendu de la semaine", opinionComment: "" },
        { opinionResult: "", opinionContext: "Organisation et communication", opinionComment: "" },
        { opinionResult: "", opinionContext: "Compréhension du travail demandé", opinionComment: "" },
        { opinionResult: "", opinionContext: "Motivation", opinionComment: "" }
    ];
    const [rows, setRows] = useState<WeeklyRowData[]>([
        { name: "", tasks: [{ taskName: "", taskObservation: "" }], opinions: defaultOpinions }
    ]);
    const [crHtml, setCrHtml] = useState<string>("");
    const [showTable, setShowTable] = useState(false);

    const generateCR = useCallback(() => {
        return generateWeeklyReportHtml(rows);
    }, [rows]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1>Weekly Reporting</h1>
                <Button onPress={() => {
                    if (!rows[0]?.name.trim()) {
                        showError("Veuillez remplir le champ Nom avant de générer le tableau.");
                        return;
                    }
                    if (!showTable) setCrHtml(generateCR());
                    setShowTable(!showTable);
                }}>
                    {showTable ? "Cacher le tableau" : "Générer le tableau"}
                </Button>
            </div>
            <Divider className="my-4" />

            {rows.map((row, index) => (
                <Card key={index}>
                    <CardBody className="flex flex-wrap md:flex-nowrap items-start gap-4 w-full">
                        {/* Nom */}
                        <Input
                            label="Name"
                            isClearable
                            className="w-full md:max-w-sm"
                            value={row.name}
                            onChange={(e) => {
                                const updatedRows = [...rows];
                                updatedRows[index].name = e.target.value;
                                setRows(updatedRows);
                            }}
                        />

                        {/* Liste des tâches */}
                        <WeeklyTaskList tasks={row.tasks} setTasks={(tasks) => {
                            const updatedRows = [...rows];
                            updatedRows[index].tasks = tasks;
                            setRows(updatedRows);
                        }} />

                        {/* Liste des opinions */}
                        <WeeklyOpinionList opinions={row.opinions} setOpinions={(opinions) => {
                            const updatedRows = [...rows];
                            updatedRows[index].opinions = opinions;
                            setRows(updatedRows);
                        }} />
                    </CardBody>
                </Card>
            ))}

            {showTable && (
                <div className="mt-4 p-4 border rounded-md shadow bg-black">
                    <div dangerouslySetInnerHTML={{ __html: crHtml }} />
                </div>
            )}
        </div>
    );
};

export default WeeklyList;
