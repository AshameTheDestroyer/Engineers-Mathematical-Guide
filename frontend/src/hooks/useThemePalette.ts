import { useContext } from "react";
import { ThemePaletteContext } from "@/components/ThemePaletteProvider/ThemePaletteProvider";

export const useThemePalette = () => {
    return useContext(ThemePaletteContext);
};
