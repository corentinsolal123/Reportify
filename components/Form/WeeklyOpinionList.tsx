import React, { FC } from "react";
import { Accordion, AccordionItem, Select, SelectItem, Textarea } from "@heroui/react";

interface Opinion {
    opinionResult: "" | "mauvais" | "a ameliorer" | "bon";
    opinionContext: string;
    opinionComment: string;
}

interface WeeklyOpinionListProps {
    opinions: Opinion[];
    setOpinions: (opinions: Opinion[]) => void;
}

const WeeklyOpinionList: FC<WeeklyOpinionListProps> = ({ opinions, setOpinions }) => {
    const handleOpinionChange = (index: number, field: keyof Opinion, value: string) => {
        const updatedOpinions = [...opinions];
        updatedOpinions[index] = {
            ...updatedOpinions[index],
            [field]: value
        };
        setOpinions(updatedOpinions);
    };

    const getColorForOpinion = (opinion: "" | "mauvais" | "a ameliorer" | "bon"): "default" | "success" | "warning" | "danger" => {
        // @ts-ignore
        return {
            "mauvais": "danger",
            "a ameliorer": "warning",
            "bon": "success",
            "": "default"
        }[opinion];
    };

    return (
        <Accordion variant="splitted">
            {opinions.map((opinion, index) => (
                <AccordionItem key={`opinion-${index}`} title={opinion.opinionContext}>
                    <div className="flex flex-col gap-4">
                        <Select
                            label="Évaluation"
                            className="w-full"
                            color={getColorForOpinion(opinion.opinionResult)}
                            value={opinion.opinionResult}
                            onChange={(e) =>
                                handleOpinionChange(index, "opinionResult", e.target.value as "mauvais" | "a ameliorer" | "bon")
                            }
                        >
                            <SelectItem key="mauvais" value="mauvais">❌ Mauvais</SelectItem>
                            <SelectItem key="a ameliorer" value="a ameliorer">⚠️ À améliorer</SelectItem>
                            <SelectItem key="bon" value="bon">✅ Bon</SelectItem>
                        </Select>

                        <Textarea
                            label="Commentaire"
                            className="w-full"
                            value={opinion.opinionComment}
                            onChange={(e) => handleOpinionChange(index, "opinionComment", e.target.value)}
                        />
                    </div>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default WeeklyOpinionList;
