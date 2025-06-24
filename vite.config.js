import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), flowbiteReact()],
    server: {
        host: '0.0.0.0',
        port: 3000
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@api": path.resolve(__dirname, "./src/api"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
        },
    },
});