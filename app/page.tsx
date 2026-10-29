import { ArrowRight, Calendar, Copy, FloppyDisk, ListCheck } from "@gravity-ui/icons";
import { buttonVariants, Card } from "@heroui/react";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";

const REPORT_ICONS = {
  "/daily": <Calendar />,
  "/weekly": <ListCheck />,
} as const;

const FEATURES = [
  { icon: <FloppyDisk />, label: "Brouillon sauvegardé automatiquement" },
  { icon: <Copy />, label: "Copie en un clic, prête pour Outlook" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-14 py-6 sm:py-12">
      <section className="flex max-w-2xl flex-col items-center gap-5 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Des comptes-rendus{" "}
          <span className="bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent">
            soignés
          </span>
          , sans effort.
        </h1>
        <p className="text-lg text-pretty text-muted">{siteConfig.description}</p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
          {FEATURES.map((feature) => (
            <li key={feature.label} className="flex items-center gap-2 [&>svg]:text-accent">
              {feature.icon}
              {feature.label}
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-label="Types de rapports"
        className="grid w-full max-w-3xl gap-4 sm:grid-cols-2"
      >
        {siteConfig.navItems.map((item) => (
          <Card key={item.href} className="gap-5">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent-soft-foreground [&>svg]:size-5">
              {REPORT_ICONS[item.href as keyof typeof REPORT_ICONS]}
            </div>
            <Card.Header>
              <Card.Title className="text-lg">{item.label}</Card.Title>
              <Card.Description>{item.description}</Card.Description>
            </Card.Header>
            <Card.Footer className="mt-auto">
              <NextLink className={buttonVariants({ fullWidth: true })} href={item.href}>
                Nouveau {item.label}
                <ArrowRight />
              </NextLink>
            </Card.Footer>
          </Card>
        ))}
      </section>
    </div>
  );
}
