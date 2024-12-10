import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5173, // Utilise le même port si nécessaire// Permet d'écouter sur toutes les interfaces réseau
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
