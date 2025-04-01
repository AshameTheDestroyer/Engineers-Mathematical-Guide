import { useContext } from "react";
import { ThemeContext } from "@/components/ThemeContextProvider/ThemeContextProvider";

export const useTheme = () => {
    return useContext(ThemeContext);
};
