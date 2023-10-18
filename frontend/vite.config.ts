// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";


// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) =>
    defineConfig({
        plugins: [react()],
        test: {
            globals: true,
            environment: 'happy-dom',
            setupFiles: './tests/setup.js',
           },
        build: {
            outDir: "./dist",
            emptyOutDir: true,
            sourcemap: mode === "development"
        },
        server: {
            port: 3005,
            host: "0.0.0.0",
            hmr: {
                clientPort: 3005
            },
            proxy: {
                "/api": {
                    target: "http://backend:8000",
                    rewrite: path => path.replace(/^\/api/, "")
                }
            }
        }
    });
