import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  // Ensure SEO files (sitemap.xml, robots.txt) are included in the build
  publicDir: "public",
});
