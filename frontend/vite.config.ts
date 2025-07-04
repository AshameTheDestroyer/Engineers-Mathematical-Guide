import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": "/src",
            "@icons": "/src/assets/icons",
            "@audios": "/src/assets/audios",
            "@images": "/src/assets/images",
            "@videos": "/src/assets/videos",
            "@components": "/src/components",
            "@constants": "/src/constants",
            "@extensions": "/src/extensions",
            "@functions": "/src/functions",
            "@hooks": "/src/hooks",
            "@pages": "/src/pages",
            "@types_": "/src/types",
            "@schemas": "/src/schemas",
            "@services": "/src/services",
            "@managers": "/src/managers",
            "@localization": "/public/localization",
            "@json": "/public/json",
            "@data": "/public/data",
        },
    },
});
