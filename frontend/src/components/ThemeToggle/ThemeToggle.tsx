import { MainContext } from "@/index";
import { FC, useContext } from "react";
import { IconButton } from "../IconButton/IconButton";

import light_theme_icon from "@icons/sun.svg";
import dark_theme_icon from "@icons/moon.svg";

export const ThemeToggle: FC = () => {
    const { isDarkThemed, ToggleDarkTheme } = useContext(MainContext);

    return (
        <IconButton
            variant="secondary"
            icon={{
                width: 24,
                height: 24,
                source: isDarkThemed ? light_theme_icon : dark_theme_icon,
            }}
            onClick={(_e) => ToggleDarkTheme()}
        />
    );
};
