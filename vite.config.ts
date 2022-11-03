import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: true,
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: "" },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "./src/utils"),
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "./src/assets"),
      },
      {
        find: "@types",
        replacement: path.resolve(__dirname, "./src/types"),
      },
      {
        find: "@icons",
        replacement: path.resolve(__dirname, "./src/icons"),
      },
      {
        find: "@constants",
        replacement: path.resolve(__dirname, "./src/constants"),
      },
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "./src/pages"),
      },
      {
        find: "@layout",
        replacement: path.resolve(__dirname, "./src/layout"),
      },
    ],
  },
});
