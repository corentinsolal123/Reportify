"use client";

import { ArrowRotateLeft } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Une erreur est survenue</h1>
      <p className="max-w-md text-muted">
        Votre brouillon est conservé. Vous pouvez réessayer sans perdre vos saisies.
      </p>
      <Button onPress={reset}>
        <ArrowRotateLeft />
        Réessayer
      </Button>
    </div>
  );
}
