import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { fileURLToPath } from "node:url";
import node from "@astrojs/node";
import cloudflare from "@astrojs/cloudflare";

const deployTarget = process.env.DEPLOY_TARGET;
const adapter =
  deployTarget === "cloudflare"
    ? cloudflare()
    : node({ mode: "standalone" });
const output = deployTarget === "cloudflare" ? "server" : "server";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || "https://www.raina-moon.com",
  output,
  adapter,
  integrations: [react(), tailwind()],
  devToolbar: {
    enabled: false,
  },
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
