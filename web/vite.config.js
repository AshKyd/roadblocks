import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    root: path.resolve(import.meta.dirname, "./"),
    base: "./",
    build: {
        outDir: path.resolve(import.meta.dirname, "../dist"),
        emptyOutDir: false,
        rollupOptions: {
            input: {
                main: path.resolve(import.meta.dirname, "index.html"),
            },
        },
    },
});
