import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.relaton.org",
  integrations: [vue(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
