import React, { FC } from "react";
import { Select, SelectItem, Textarea } from "@heroui/react";
import { Opinion, OpinionColor, OPINION_COLOR_MAP } from "@/types";

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

    const getColorForOpinion = (opinion: Opinion["opinionResult"]): OpinionColor => {
        return OPINION_COLOR_MAP[opinion];
    };

    return (
        <div className="space-y-2 w-full">
            <h2>Opinions</h2>
            {opinions.map((opinion, index) => (
                <div key={opinion.opinionContext} className="flex flex-row items-center gap-4 w-full">
                    <Select
                        label={opinion.opinionContext}
                        className="w-full md:max-w-xs"
                        color={getColorForOpinion(opinion.opinionResult)} // ✅ Applique la bonne couleur
                        value={opinion.opinionResult}
                        onChange={(e) =>
                            handleOpinionChange(index, "opinionResult", e.target.value as "mauvais" | "a ameliorer" | "bon")
                        }
                    >
                        <SelectItem key="mauvais" value="mauvais">❌ Mauvais</SelectItem>
                        <SelectItem key="a ameliorer" value="a ameliorer">⚠️ A ameliorer</SelectItem>
                        <SelectItem key="bon" value="bon">✅ Bon</SelectItem>
                    </Select>

                    <Textarea
                        label="Comment"
                        className="w-full"
                        value={opinion.opinionComment}
                        onChange={(e) => handleOpinionChange(index, "opinionComment", e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
};

export default WeeklyOpinionList;
