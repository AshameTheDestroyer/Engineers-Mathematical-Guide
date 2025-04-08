import { FC, useContext } from "react";
import { useThemeMode } from "@/hooks/useThemeMode";
import { Button } from "@/components/Button/Button";
import { DropDown } from "@/components/DropDown/DropDown";
import { ThemePaletteContext } from "@/components/ThemePaletteProvider/ThemePaletteProvider";
import {
    DropDownList,
    DropDownListProps,
} from "@/components/DropDownList/DropDownList";

import cog_icon from "@icons/cog.svg";
import sun_icon from "@icons/sun.svg";
import moon_icon from "@icons/moon.svg";
import monitor_icon from "@icons/monitor.svg";

export type ConfigurationDropDownListProps = Omit<
    DropDownListProps,
    "children"
>;

export const ConfigurationDropDownList: FC<ConfigurationDropDownListProps> = ({
    id,
    ref,
    icon,
    className,
    ...props
}) => {
    const { themeMode, SetThemeMode } = useThemeMode();
    const { themePalette, themePalettes, SetThemePalette } =
        useContext(ThemePaletteContext);

    return (
        <DropDownList
            id={id}
            ref={ref}
            className={className}
            icon={icon ?? { source: cog_icon }}
            {...props}
        >
            <DropDown
                doesTextGrow
                text="Theme Mode"
                position="left-start"
                icon={{ placement: "left", className: "-rotate-90" }}
            >
                <Button
                    doesTextGrow
                    icon={{ placement: "left", source: sun_icon }}
                    variant={themeMode == "light" ? "primary" : "default"}
                    onClick={(_e) => SetThemeMode("light")}
                >
                    Light
                </Button>
                <Button
                    doesTextGrow
                    icon={{ placement: "left", source: moon_icon }}
                    variant={themeMode == "dark" ? "primary" : "default"}
                    onClick={(_e) => SetThemeMode("dark")}
                >
                    Dark
                </Button>
                <Button
                    doesTextGrow
                    icon={{ placement: "left", source: monitor_icon }}
                    variant={themeMode == "system" ? "primary" : "default"}
                    onClick={(_e) => SetThemeMode("system")}
                >
                    System
                </Button>
            </DropDown>
            <DropDown
                doesTextGrow
                text="Theme Palette"
                position="left-start"
                icon={{ placement: "left", className: "-rotate-90" }}
            >
                {themePalettes.map((_themePalette, i) => (
                    <Button
                        key={i}
                        variant={
                            _themePalette == themePalette
                                ? "primary"
                                : "default"
                        }
                        onClick={(_e) => SetThemePalette(_themePalette)}
                    >
                        {_themePalette.toTitleCase()}
                    </Button>
                ))}
            </DropDown>
        </DropDownList>
    );
};
