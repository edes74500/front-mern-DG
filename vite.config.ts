import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173, // Utilise le même port si nécessaire// Permet d'écouter sur toutes les interfaces réseau
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
