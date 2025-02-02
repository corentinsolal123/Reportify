"use client";

import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
    Button,
    Kbd,
    Link,
    Input,
    link as linkStyles
} from "@heroui/react";

import NextLink from "next/link";
import clsx from "clsx";

import {siteConfig} from "../config/site";
import {ThemeSwitch} from "./Theme-switch";
import {GithubIcon, SearchIcon, Logo} from "../components/Icons";

const BRAND_NAME = "Reportify";

export const Navbar = () => {
    const searchInput = (
        <Input
            aria-label="Rechercher"
            classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
            }}
            endContent={
                <Kbd className="hidden lg:inline-block" keys={["command"]}>
                    K
                </Kbd>
            }
            labelPlacement="outside"
            placeholder="Rechercher un compte-rendu..."
            startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0"/>
            }
            type="search"
        />
    );

    return (
        <HeroUINavbar maxWidth="xl" position="sticky">
            {/* ----- Section de gauche (logo + menu principal desktop) ----- */}
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <Logo/>
                        <p className="font-bold text-inherit">{BRAND_NAME}</p>
                    </NextLink>
                </NavbarBrand>
                {/* Menu principal (desktop) */}
                <ul className="hidden lg:flex gap-4 justify-start ml-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <NextLink
                                className={clsx(
                                    linkStyles({color: "foreground"}),
                                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                                )}
                                color="foreground"
                                href={item.href}
                            >
                                {item.label}
                            </NextLink>
                        </NavbarItem>
                    ))}
                </ul>
            </NavbarContent>

            {/* ----- Section de droite (desktop) ----- */}
            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                {/* Icônes / réglages (ex. switch de thème) */}
                <NavbarItem className="hidden sm:flex gap-2">
                    {/* Gardez uniquement les icônes/links utiles, ici on ne garde que GitHub en exemple */}
                    <Link isExternal aria-label="Github" href={siteConfig.links.github}>
                        <GithubIcon className="text-default-500"/>
                    </Link>
                    <ThemeSwitch/>
                </NavbarItem>

                {/* Champ de recherche (visible en large screen) */}
                {/*<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>*/}

                {/*/!* Exemple : Un bouton d’action. Vous pouvez le renommer "Nouveau CR", "Déconnexion", etc. *!/*/}
                {/*<NavbarItem className="hidden md:flex">*/}
                {/*    <Button*/}
                {/*        className="text-sm font-normal text-default-600 bg-default-100"*/}
                {/*        variant="flat"*/}
                {/*        as={Link}*/}
                {/*        // Exemple : "Nouveau compte-rendu" ou "/logout", etc.*/}
                {/*        href="/"*/}
                {/*    >*/}
                {/*        Nouveau CR*/}
                {/*    </Button>*/}
                {/*</NavbarItem>*/}
            </NavbarContent>

            {/* ----- Section mobile ----- */}
            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                {/* Ici, on simplifie : on ne garde que GitHub + le switch de thème */}
                <Link isExternal aria-label="Github" href={siteConfig.links.github}>
                    <GithubIcon className="text-default-500"/>
                </Link>
                <ThemeSwitch/>
                <NavbarMenuToggle/>
            </NavbarContent>

            {/* ----- Menu pliable (mobile) ----- */}
            <NavbarMenu>
                {/* Champ de recherche en mobile */}
                {searchInput}

                {/* On liste les éléments de menu en mobile */}
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navMenuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item.label}-${index}`}>
                            <Link
                                color={
                                    // Un exemple pour modifier la couleur du dernier item, etc.
                                    index === siteConfig.navMenuItems.length - 1
                                        ? "danger"
                                        : "foreground"
                                }
                                href={item.href}
                                size="lg"
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </HeroUINavbar>
    );
};
