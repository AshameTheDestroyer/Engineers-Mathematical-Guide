import { MainContext } from "@/index";
import { FC, useContext } from "react";
import { Button } from "@components/Button/Button";

import light_theme_icon from "@icons/sun.svg";
import dark_theme_icon from "@icons/moon.svg";

export const ThemeToggle: FC = () => {
    const { isDarkThemed, ToggleDarkTheme } = useContext(MainContext);

    return (
        <Button
            className="[&>div[data-thickness]]:h-full [&>div]:rounded-full"
            icon={{
                placement: "left",
                width: 24,
                height: 24,
                source: isDarkThemed ? light_theme_icon : dark_theme_icon,
            }}
            onClick={(_e) => ToggleDarkTheme()}
        />
    );
};
