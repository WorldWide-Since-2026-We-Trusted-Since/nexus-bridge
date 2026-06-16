import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // React plugin
    react(),
    // TanStack Router - file-based routing
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
    }),
    // Tailwind CSS v4
    tailwindcss(),
    // TypeScript path aliases (@/components, etc.)
    tsConfigPaths(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/data": path.resolve(__dirname, "./src/data"),
      "@/types": path.resolve(__dirname, "./src/types"),
    },
  },
  server: {
    fs: {
      strict: false,
    },
    port: 3001,
    host: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["@tanstack/react-router", "@tanstack/react-query"],
        },
      },
    },
  },
  preview: {
    port: 3001,
  },
});
