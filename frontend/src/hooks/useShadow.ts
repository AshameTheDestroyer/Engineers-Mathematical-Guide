import { useContext } from "react";
import { ThemeContext } from "@/components/ThemeContextProvider/ThemeContextProvider";

export const useShadow = (colour?: string) => {
    const { isDarkThemed } = useContext(ThemeContext);

    return isDarkThemed
        ? colour == null
            ? ""
            : `0 0 25px 5px ${colour}`
        : "0 15px 25px -3px #0000004c";
};
