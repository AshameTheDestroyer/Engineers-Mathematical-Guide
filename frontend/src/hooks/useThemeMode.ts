import { useContext } from "react";
import { ThemeModeContext } from "@/components/ThemeModeProvider/ThemeModeProvider";

export const useThemeMode = () => {
    return useContext(ThemeModeContext);
};
