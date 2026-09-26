import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/checkout.ts"],
    outDir: "dist",
    format: ["iife"],
    platform: "browser",
    minify: false,
    clean: true,
    globalName: "Checkout"
});
