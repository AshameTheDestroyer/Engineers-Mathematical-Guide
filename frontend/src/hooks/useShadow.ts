import { useThemeMode } from "@/components/ThemeModeProvider/ThemeModeProvider";

export const useShadow = (colour?: string) => {
    const { isDarkThemed } = useThemeMode();

    return isDarkThemed
        ? colour == null
            ? ""
            : `0 0 25px 5px ${colour}`
        : "0 15px 25px -3px #0000004c";
};
