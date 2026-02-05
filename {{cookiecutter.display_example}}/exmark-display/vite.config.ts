import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    hmr: {
      overlay: true,
    },
    host: "0.0.0.0",
  },
  build: {
    // Ensure proper module resolution
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./shared-display-components"),
      "@shared/*": path.resolve(__dirname, "./shared-display-components/*"),
      "@shared/lib": path.resolve(__dirname, "./shared-display-components/lib"),
    },
    // Ensure React is resolved consistently
    dedupe: ["react", "react-dom"],
  },
  // Fix Radix UI useId compatibility with React 19
  define: {
    global: "globalThis",
    // Ensure React is available for Radix UI components
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development",
    ),
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@radix-ui/react-dialog"],
    exclude: [],
  },
});
