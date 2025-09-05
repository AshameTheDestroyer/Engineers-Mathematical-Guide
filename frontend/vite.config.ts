import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    base: "/Engineers-Mathematical-Guide/",
    plugins: [react(), tailwindcss()],
    optimizeDeps: {
        exclude: ["react-syntax-highlighter/dist/esm/styles/prism"],
    },
    resolve: {
        alias: {
            "@json": "/public/json",
            "@data": "/public/data",
            "@icons": "/public/icons",
            "@audios": "/public/audios",
            "@images": "/public/images",
            "@videos": "/public/videos",
            "@": path.resolve(__dirname, "src"),
            "@localization": "/public/localization",
            "@hooks": path.resolve(__dirname, "src/hooks"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@types_": path.resolve(__dirname, "src/types"),
            "@schemas": path.resolve(__dirname, "src/schemas"),
            "@services": path.resolve(__dirname, "src/services"),
            "@managers": path.resolve(__dirname, "src/managers"),
            "@constants": path.resolve(__dirname, "src/constants"),
            "@functions": path.resolve(__dirname, "src/functions"),
            "@components": path.resolve(__dirname, "src/components"),
            "@extensions": path.resolve(__dirname, "src/extensions"),
        },
    },
});
