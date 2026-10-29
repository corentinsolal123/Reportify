import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // TypeScript 7 (natif) n'expose plus l'API JS : Next passe par le CLI `tsc`.
    useTypeScriptCli: true,
  },
  async redirects() {
    // Anciennes URLs conservées pour ne pas casser les favoris.
    return [
      { source: "/Form/Daily", destination: "/daily", permanent: true },
      { source: "/Form/Weekly", destination: "/weekly", permanent: true },
    ];
  },
};

export default nextConfig;
