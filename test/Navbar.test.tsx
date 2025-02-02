import { render, screen } from "@testing-library/react";
import { Navbar } from "../components/Navbar";
import { siteConfig } from "../config/site";
import { test, expect, vi } from "vitest";
import React from "react";

vi.mock("next/link", () => ({
    default: ({ children }: { children: React.ReactNode }) => children
}));

test("affiche le logo et le nom du site", () => {
    render(<Navbar />);

    expect(screen.getByText(/CR_Maker/i)).toBeInTheDocument();
});

test("affiche les liens de navigation", () => {
    render(<Navbar />);

    siteConfig.navItems.forEach((item) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
    });
});

test("affiche le champ de recherche", () => {
    render(<Navbar />);

    expect(
        screen.getByPlaceholderText(/Rechercher un compte-rendu/i)
    ).toBeInTheDocument();
});

test("affiche le lien vers Github", () => {
    render(<Navbar />);

    const githubLinks = screen.getAllByRole("link", { name: /github/i });

    // Vérifier que le lien correct existe
    const correctLink = githubLinks.find((link) =>
        link.getAttribute("href") === siteConfig.links.github
    );

    expect(correctLink).toBeDefined();
});

