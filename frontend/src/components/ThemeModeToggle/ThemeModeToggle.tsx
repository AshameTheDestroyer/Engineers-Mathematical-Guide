import { FC } from "react";
import { useThemeMode } from "../ThemeModeProvider/ThemeModeProvider";
import { IconButton, IconButtonProps } from "../IconButton/IconButton";

import light_theme_icon from "@icons/sun.svg";
import dark_theme_icon from "@icons/moon.svg";

export type ThemeToggleProps = Omit<IconButtonProps, "icon">;

export const ThemeToggle: FC<ThemeToggleProps> = ({
    id,
    onClick,
    className,
    ...props
}) => {
    const { isDarkThemed, ToggleThemeMode } = useThemeMode();

    return (
        <IconButton
            id={id}
            className={className}
            variant="secondary"
            icon={{
                source: isDarkThemed ? light_theme_icon : dark_theme_icon,
            }}
            onClick={(e) => (ToggleThemeMode(), onClick?.(e))}
            {...props}
        />
    );
};
