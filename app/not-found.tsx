import { buttonVariants } from "@heroui/react";
import NextLink from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 className="text-2xl font-semibold">Page introuvable</h1>
      <p className="max-w-md text-muted">Cette page n&apos;existe pas ou a été déplacée.</p>
      <NextLink className={buttonVariants({ variant: "secondary" })} href="/">
        Retour à l&apos;accueil
      </NextLink>
    </div>
  );
}
