import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
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
    ],
  },
});
