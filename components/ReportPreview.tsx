"use client";

import { ArrowRotateLeft, Check, Copy } from "@gravity-ui/icons";
import { Button, Card, toast } from "@heroui/react";
import { useEffect, useState } from "react";

import { copyReport } from "@/lib/clipboard";
import type { GeneratedReport } from "@/types";

interface ReportPreviewProps {
  report: GeneratedReport;
  isEmpty: boolean;
  emptyMessage?: string;
  onReset: () => void;
}

export const ReportPreview = ({
  report,
  isEmpty,
  emptyMessage = "Remplissez le formulaire pour voir l'aperçu.",
  onReset,
}: ReportPreviewProps) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timeout = setTimeout(() => setIsCopied(false), 2000);

    return () => clearTimeout(timeout);
  }, [isCopied]);

  const handleCopy = async () => {
    try {
      await copyReport(report);
      setIsCopied(true);
      toast.success("Rapport copié", {
        description: "Collez-le directement dans votre email (Ctrl/Cmd + V).",
      });
    } catch {
      toast.danger("Impossible de copier le rapport", {
        description: "Vérifiez les permissions du presse-papiers de votre navigateur.",
      });
    }
  };

  return (
    <Card className="gap-4">
      <Card.Header>
        <Card.Title>Aperçu de l&apos;email</Card.Title>
        <Card.Description>Mis à jour en direct, tel qu&apos;il sera collé.</Card.Description>
      </Card.Header>

      <Card.Content>
        {/* Always light: this is what recipients will see in their mail client. */}
        <div className="max-h-[60vh] overflow-auto rounded-xl border border-separator bg-white p-4 text-[#1f2937] shadow-inner">
          {isEmpty ? (
            <p className="py-8 text-center text-sm text-gray-500">{emptyMessage}</p>
          ) : (
            // Every user input is escaped by the generator (lib/htmlGenerator.ts).
            <div dangerouslySetInnerHTML={{ __html: report.html }} />
          )}
        </div>
      </Card.Content>

      <Card.Footer className="flex flex-wrap gap-2">
        <Button className="flex-1" isDisabled={isEmpty} onPress={handleCopy}>
          {isCopied ? <Check /> : <Copy />}
          {isCopied ? "Copié !" : "Copier pour Outlook"}
        </Button>
        <Button variant="tertiary" onPress={onReset}>
          <ArrowRotateLeft />
          Réinitialiser
        </Button>
      </Card.Footer>
    </Card>
  );
};
