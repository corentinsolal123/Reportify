"use client";

import clsx from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { GithubIcon, Logo } from "@/components/Icons";
import { ThemeSwitch } from "@/components/ThemeSwitch";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-separator bg-background/80 backdrop-blur-md">
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:gap-6 sm:px-6"
      >
        <NextLink
          className="flex items-center gap-1 rounded-lg font-bold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-focus"
          href="/"
        >
          <Logo className="text-accent" />
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </NextLink>

        <ul className="flex items-center gap-1">
          {siteConfig.navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <NextLink
                  aria-current={isActive ? "page" : undefined}
                  className={clsx(
                    "rounded-full px-3 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-focus",
                    isActive
                      ? "bg-accent-soft text-accent-soft-foreground"
                      : "text-muted hover:bg-default hover:text-foreground",
                  )}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-1">
          <a
            aria-label="Code source sur GitHub"
            className="flex size-9 items-center justify-center rounded-full text-muted outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-focus"
            href={siteConfig.links.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            <GithubIcon size={20} />
          </a>
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
};
