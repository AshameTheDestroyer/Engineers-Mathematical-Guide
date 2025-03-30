import { FC, useContext } from "react";
import { IconButton, IconButtonProps } from "../IconButton/IconButton";
import { ThemeContext } from "../ThemeContextProvider/ThemeContextProvider";

import light_theme_icon from "@icons/sun.svg";
import dark_theme_icon from "@icons/moon.svg";

export type ThemeToggleProps = Omit<IconButtonProps, "icon">;

export const ThemeToggle: FC<ThemeToggleProps> = ({
    id,
    onClick,
    className,
    ...props
}) => {
    const { isDarkThemed, ToggleIsDarkThemed } = useContext(ThemeContext);

    return (
        <IconButton
            id={id}
            className={className}
            variant="secondary"
            icon={{
                source: isDarkThemed ? light_theme_icon : dark_theme_icon,
            }}
            onClick={(e) => (ToggleIsDarkThemed(), onClick?.(e))}
            {...props}
        />
    );
};
