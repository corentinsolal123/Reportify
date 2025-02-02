import { render, screen } from '@testing-library/react';
import React from "react";
import { Footer } from '../components/Footer';
import { test, expect } from "vitest";


test('affiche le footer "Powered by CSLEnterprise"', () => {
    render(<Footer />);

    // Vérifie si le texte est bien présent dans le footer
    expect(screen.getByText(/powered by/i)).toBeInTheDocument();
    expect(screen.getByText(/CSLEnterprise/i)).toBeInTheDocument();
});
