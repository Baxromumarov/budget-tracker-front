import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  envPrefix: ["VITE_", "BACKEN_"],
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 4173,
    allowedHosts: ["budget-tracker-front-production.up.railway.app"],
  },
});
