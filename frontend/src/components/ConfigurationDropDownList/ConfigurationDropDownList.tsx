import { FC } from "react";
import { Button } from "@/components/Button/Button";
import { useThemeMode } from "../ThemeModeProvider/ThemeModeProvider";
import { DropDown, DropDownProps } from "@/components/DropDown/DropDown";
import { useThemePalette } from "../ThemePaletteProvider/ThemePaletteProvider";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";
import {
    DropDownList,
    DropDownListProps,
} from "@/components/DropDownList/DropDownList";

import cog_icon from "@icons/cog.svg";
import sun_icon from "@icons/sun.svg";
import moon_icon from "@icons/moon.svg";
import arrow_icon from "@icons/arrow.svg";
import monitor_icon from "@icons/monitor.svg";
import { PALETTE_ICONS } from "@/constants/PaletteIcons";

export type ConfigurationDropDownListProps = WithPartial<
    Omit<DropDownListProps, "children">,
    "position"
>;

export const ConfigurationDropDownList: FC<ConfigurationDropDownListProps> = ({
    id,
    ref,
    icon,
    className,
    position: _position,
    ...props
}) => {
    const { themeMode, SetThemeMode } = useThemeMode();
    const { themePalette, themePalettes, SetThemePalette } = useThemePalette();
    const { language, direction, SetLanguage, SetDirection } =
        useLocalization();

    const position: Position =
        _position ?? (direction == "ltr" ? "bottom-end" : "bottom-start");

    const nestedDropDownPosition: Position =
        direction == "ltr" ? "left-start" : "right-end";

    const nestedDropDownIcon: DropDownProps["icon"] = {
        placement: "left",
        className: direction == "ltr" ? "-rotate-90" : "rotate-90",
    };

    return (
        <DropDownList
            id={id}
            ref={ref}
            className={className}
            position={position}
            icon={icon ?? { source: cog_icon }}
            {...props}
        >
            <DropDown
                doesTextGrow
                text="Theme Mode"
                icon={nestedDropDownIcon}
                position={nestedDropDownPosition}
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
                icon={nestedDropDownIcon}
                position={nestedDropDownPosition}
            >
                {themePalettes.map((_themePalette, i) => (
                    <Button
                        key={i}
                        doesTextGrow
                        icon={{
                            placement: "left",
                            source: PALETTE_ICONS[_themePalette],
                        }}
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
            <DropDown
                doesTextGrow
                text="Writing Direction"
                position={nestedDropDownPosition}
                icon={nestedDropDownIcon}
            >
                <Button
                    doesTextGrow
                    icon={{
                        placement: "left",
                        source: arrow_icon,
                        className: "rotate-90",
                    }}
                    variant={direction == "ltr" ? "primary" : "default"}
                    onClick={(_e) => SetDirection("ltr")}
                >
                    Left to Right
                </Button>
                <Button
                    doesTextGrow
                    icon={{
                        placement: "left",
                        source: arrow_icon,
                        className: "-rotate-90",
                    }}
                    variant={direction == "rtl" ? "primary" : "default"}
                    onClick={(_e) => SetDirection("rtl")}
                >
                    Right to Left
                </Button>
            </DropDown>
            <DropDown
                doesTextGrow
                text="Language"
                icon={nestedDropDownIcon}
                position={nestedDropDownPosition}
            >
                <Button
                    variant={language == "en" ? "primary" : "default"}
                    onClick={(_e) => SetLanguage("en")}
                >
                    English
                </Button>
                <Button
                    variant={language == "ar" ? "primary" : "default"}
                    onClick={(_e) => SetLanguage("ar")}
                >
                    عَربيٌّ
                </Button>
            </DropDown>
        </DropDownList>
    );
};
