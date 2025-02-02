"use client";

import React, { useState, FC, useCallback } from "react";
import { Card, CardBody, Input, Button, Divider } from "@heroui/react";
import WeeklyTaskList from "@/components/Form/WeeklyTaskList";
import WeeklyOpinionList from "@/components/Form/WeeklyOpinionList";

interface Opinion {
    opinionResult: "" | "mauvais" | "a ameliorer" | "bon";
    opinionContext: string;
    opinionComment: string;
}

interface Task {
    taskName: string;
    taskObservation: string;
}

interface WeeklyRowData {
    name: string;
    tasks: Task[];
    opinions: Opinion[];
}

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

    const colorMapping = {
        danger: "red",
        warning: "orange",
        success: "green",
        default: "white"
    };

    const getColorForOpinion = (opinion: "" | "mauvais" | "a ameliorer" | "bon"): keyof typeof colorMapping => {
        // @ts-ignore
        return {
            mauvais: "danger",
            "a ameliorer": "warning",
            bon: "success",
            "": "default"
        }[opinion];
    };

    const generateCR = useCallback(() => {
        if (rows.length === 0) return "<p>Aucune donnée disponible.</p>";

        const name = rows[0]?.name.trim() || "Nom non renseigné";

        // Introduction
        let crHtml = `
            <p>Bonjour,</p>
            <p>
                Vous trouverez ci-dessous les observations de la semaine concernant le travail de <strong>${name}</strong> :
            </p>
        `;

        // Tableau des tâches
        crHtml += `
            <table style="
                width: 100%;
                border-collapse: collapse;
                background-color: #2e2e2e;
                color: white;
                font-family: Arial, sans-serif;
                margin-bottom: 20px;
            ">
                <thead>
                    <tr style="background-color: #1e1e1e;">
                        <th style="border: 1px solid #444; padding: 10px; text-align: left; width: 40%;">Tâches à mener</th>
                        <th style="border: 1px solid #444; padding: 10px; text-align: left; width: 60%;">Observations</th>
                    </tr>
                </thead>
                <tbody>
        `;

        rows.forEach((row) => {
            row.tasks.forEach((task) => {
                crHtml += `
                    <tr>
                        <td style="border: 1px solid #444; padding: 10px; font-weight: bold;">${task.taskName}</td>
                        <td style="border: 1px solid #444; padding: 10px;">${task.taskObservation || "Pas d'observation"}</td>
                    </tr>
                `;
            });
        });

        crHtml += "</tbody></table>";

        // Tableau des opinions
        crHtml += `
            <h3 style="color: white; margin-top: 20px;">Mon avis :</h3>
            <table style="
                width: 100%;
                border-collapse: collapse;
                background-color: #2e2e2e;
                color: white;
                font-family: Arial, sans-serif;
            ">
                <thead>
                    <tr style="background-color: #1e1e1e;">
                        <th style="border: 1px solid #444; padding: 10px; text-align: left; width: 40%;">Objet</th>
                        <th style="border: 1px solid #444; padding: 10px; text-align: left; width: 60%;">Commentaire</th>
                    </tr>
                </thead>
                <tbody>
        `;

        rows.forEach((row) => {
            row.opinions.forEach((opinion) => {
                const color = colorMapping[getColorForOpinion(opinion.opinionResult)];

                crHtml += `
                    <tr>
                        <td style="border: 1px solid #444; padding: 10px;">
                            ${opinion.opinionContext}: <span style="color: ${color}; font-weight: bold;">${opinion.opinionResult || "Non renseigné"}</span>
                        </td>
                        <td style="border: 1px solid #444; padding: 10px;">${opinion.opinionComment || "Pas de commentaire"}</td>
                    </tr>
                `;
            });
        });

        crHtml += "</tbody></table>";

        // Conclusion
        crHtml += `
            <p style="margin-top: 20px; color: white; font-size: 1.1rem;">Cordialement,</p>
            <p style="color: white; font-weight: bold;">L'équipe de gestion</p>
        `;

        return crHtml;
    }, [rows]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1>Weekly Reporting</h1>
                <Button onPress={() => {
                    if (!rows[0]?.name.trim()) {
                        alert("Veuillez remplir le champ Nom avant de générer le tableau.");
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
