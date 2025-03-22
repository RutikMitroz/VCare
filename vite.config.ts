// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/",
  esbuild: {
    supported: {
      "top-level-await": true,
    },
  },
  build: { outDir: "build" },
  plugins: [react(), viteTsconfigPaths()],
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
    entries: ["./index.html"],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.0.74:4000",
        changeOrigin: true,
      },
    },
  },
});
