import React from "react";
import {
    Spacer,
    Button,
    Input,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/react";

interface Opinion {
    opinionResult: "bad" | "average" | "good";
    opinionContext: string;
    opinionComment: string;
}

interface OpinionListProps {
    opinions: Opinion[];
    setOpinions: React.Dispatch<React.SetStateAction<Opinion[]>>;
}

const OpinionList: React.FC<OpinionListProps> = ({ opinions, setOpinions }) => {
    const handleAddOpinion = () => {
        setOpinions((prev) => [
            ...prev,
            { opinionResult: "bad", opinionContext: "", opinionComment: "" },
        ]);
    };

    const handleChange = (index: number, field: keyof Opinion, value: string) => {
        setOpinions((prev) => {
            const updated = [...prev];

            if (field === "opinionResult") {
                updated[index].opinionResult = value as "bad" | "average" | "good";
            } else if (field === "opinionContext") {
                updated[index].opinionContext = value;
            } else if (field === "opinionComment") {
                updated[index].opinionComment = value;
            }

            return updated;
        });
    };


    return (
        <>
            <h4>Avis</h4>
            {opinions.map((opinion, index) => (
                <div key={index}>
                    <Dropdown>
                        <DropdownTrigger>
                            {/* On utilise un bouton "bordered" par exemple, ou "solid" si tu préfères */}
                            <Button variant="bordered">
                                {opinion.opinionResult === "bad"
                                    ? "Mauvaise"
                                    : opinion.opinionResult === "average"
                                        ? "À améliorer"
                                        : "Bonne"}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Choisir un avis"
                            onAction={(key) =>
                                handleChange(index, "opinionResult", key as "bad" | "average" | "good")
                            }
                        >
                            {/* Exemples de couleurs : "danger", "warning", "success" */}
                            <DropdownItem key="bad" color="danger">
                                Mauvaise
                            </DropdownItem>
                            <DropdownItem key="average" color="warning">
                                À améliorer
                            </DropdownItem>
                            <DropdownItem key="good" color="success">
                                Bonne
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <Spacer y={0.5} />

                    <Input
                        placeholder="Contexte"
                        value={opinion.opinionContext}
                        onChange={(e) => handleChange(index, "opinionContext", e.target.value)}
                        fullWidth
                        variant="bordered"
                    />
                    <Spacer y={0.5} />
                    <Input
                        placeholder="Commentaire"
                        value={opinion.opinionComment}
                        onChange={(e) => handleChange(index, "opinionComment", e.target.value)}
                        fullWidth
                        variant="bordered"
                    />
                    <Spacer y={1} />
                </div>
            ))}
            {/* Bouton pour ajouter un nouvel avis */}
            <Button color="secondary" onClick={handleAddOpinion}>
                + Ajouter un avis
            </Button>
            <Spacer y={1} />
        </>
    );
};

export default OpinionList;
