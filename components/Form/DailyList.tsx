import React, { useState, FC, ChangeEvent } from "react";
import { Card, CardBody, Input, Textarea, Button, Divider } from "@heroui/react";
import { MinusIcon, PlusIcon } from "@/components/Icons";

interface DailyRowData {
    name: string;
    yesterday: string;
    today: string;
}

const DailyList: FC = () => {
    const [rows, setRows] = useState<DailyRowData[]>([
        { name: "", yesterday: "", today: "" }
    ]);
    const [showTable, setShowTable] = useState(false);

    const handleAddRow = () => {
        setRows((prevRows) => [
            ...prevRows,
            { name: "", yesterday: "", today: "" }
        ]);
    };

    const handleRemoveRow = (index: number) => {
        if (rows.length > 1) {
            setRows((prevRows) => prevRows.filter((_, i) => i !== index));
        }
    };

    const handleChange = (
        index: number,
        field: keyof DailyRowData,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value } = event.target;
        setRows((prevRows) => {
            const updatedRows = [...prevRows];
            updatedRows[index][field] = value;
            return updatedRows;
        });
    };

    // Fonction pour copier le tableau HTML dans le presse-papiers
    const handleCopyToClipboard = async () => {
        // On récupère le code HTML du tableau
        const tableElement = document.getElementById("generatedTable");
        if (!tableElement) {
            alert("Tableau introuvable !");
            return;
        }
        const htmlContent = tableElement.outerHTML;

        try {
            // Création d'un Blob contenant le HTML et définition du type MIME
            const blob = new Blob([htmlContent], { type: "text/html" });
            // Création d'un ClipboardItem pour le contenu HTML
            const clipboardItem = new ClipboardItem({ "text/html": blob });
            await navigator.clipboard.write([clipboardItem]);
            alert("Le tableau a été copié dans le presse-papiers !");
        } catch (error) {
            console.error("Erreur lors de la copie : ", error);
            alert("Impossible de copier le tableau.");
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1>Daily reporting</h1>
                <Button onPress={() => setShowTable(!showTable)}>
                    {showTable ? "Cacher le tableau" : "Générer le tableau"}
                </Button>
            </div>
            <Divider className="my-4" />

            {rows.map((row, index) => (
                <Card key={index}>
                    <CardBody>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input
                                label="Name"
                                labelPlacement="outside"
                                isClearable
                                type="text"
                                value={row.name}
                                onChange={(e) => handleChange(index, "name", e)}
                            />

                            <Textarea
                                className="max-w-sm"
                                label="Yesterday"
                                placeholder="Que s'est-il passé hier ?"
                                isClearable
                                maxRows={4}
                                value={row.yesterday}
                                onChange={(e) => handleChange(index, "yesterday", e)}
                            />

                            <Textarea
                                className="max-w-sm"
                                label="Today"
                                placeholder="Que va-t-il se passer aujourd'hui ?"
                                isClearable
                                maxRows={4}
                                value={row.today}
                                onChange={(e) => handleChange(index, "today", e)}
                            />

                            <div className="flex flex-col justify-between">
                                <Button
                                    isIconOnly
                                    aria-label="Add Row"
                                    color="success"
                                    fullWidth={true}
                                    onPress={handleAddRow}
                                >
                                    <PlusIcon />
                                </Button>

                                <Button
                                    isIconOnly
                                    aria-label="Remove Row"
                                    color={rows.length === 1 ? "secondary" : "danger"}
                                    fullWidth={true}
                                    disabled={rows.length === 1}
                                    onPress={() => handleRemoveRow(index)}
                                >
                                    <MinusIcon />
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ))}

            {/* Affichage conditionnel du tableau généré */}
            {showTable && (
                <div className="mt-8">
                    <h2>Tableau des informations</h2>
                    {/* On ajoute un identifiant pour pouvoir récupérer le code HTML */}
                    <table id="generatedTable" className="min-w-full border-collapse border border-gray-300">
                        <thead>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Yesterday</th>
                            <th className="border px-4 py-2">Today</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{row.name}</td>
                                <td className="border px-4 py-2">{row.yesterday}</td>
                                <td className="border px-4 py-2">{row.today}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="mt-4">
                        <Button onPress={handleCopyToClipboard}>
                            Transférer dans Outlook
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DailyList;
