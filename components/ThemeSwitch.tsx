"use client";

import { Moon, Sun } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // The active theme is unknown during SSR: keep the space to avoid a layout shift.
  if (!mounted) return <div aria-hidden className="size-9" />;

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      isIconOnly
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      size="sm"
      variant="ghost"
      onPress={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
};
