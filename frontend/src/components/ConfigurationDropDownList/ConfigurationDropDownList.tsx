import { FC } from "react";
import { Locale } from "../Locale/Locale";
import { Button } from "@/components/Button/Button";
import { PALETTE_ICONS } from "@/constants/PaletteIcons";
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

import supported_languages from "@json/supported_languages.json";
import locales from "@localization/configuration_drop_down_list.json";

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
                icon={nestedDropDownIcon}
                position={nestedDropDownPosition}
                text={
                    <Locale variant="p" className="text-end">
                        {locales["theme-mode"].title}
                    </Locale>
                }
            >
                <Button
                    doesTextGrow
                    icon={{
                        source: sun_icon,
                        placement: direction == "ltr" ? "left" : "right",
                    }}
                    variant={themeMode == "light" ? "primary" : "default"}
                    onClick={(_e) => SetThemeMode("light")}
                >
                    <Locale>{locales["theme-mode"].values.light}</Locale>
                </Button>
                <Button
                    doesTextGrow
                    icon={{
                        source: moon_icon,
                        placement: direction == "ltr" ? "left" : "right",
                    }}
                    variant={themeMode == "dark" ? "primary" : "default"}
                    onClick={(_e) => SetThemeMode("dark")}
                >
                    <Locale>{locales["theme-mode"].values.dark}</Locale>
                </Button>
                <Button
                    doesTextGrow
                    icon={{
                        source: monitor_icon,
                        placement: direction == "ltr" ? "left" : "right",
                    }}
                    variant={themeMode == "system" ? "primary" : "default"}
                    onClick={(_e) => SetThemeMode("system")}
                >
                    <Locale>{locales["theme-mode"].values.system}</Locale>
                </Button>
            </DropDown>
            <DropDown
                doesTextGrow
                icon={nestedDropDownIcon}
                position={nestedDropDownPosition}
                text={
                    <Locale variant="p" className="text-end">
                        {locales["theme-palette"].title}
                    </Locale>
                }
            >
                {themePalettes.map((_themePalette, i) => (
                    <Button
                        key={i}
                        doesTextGrow
                        icon={{
                            source: PALETTE_ICONS[_themePalette],
                            placement: direction == "ltr" ? "left" : "right",
                        }}
                        variant={
                            _themePalette == themePalette
                                ? "primary"
                                : "default"
                        }
                        onClick={(_e) => SetThemePalette(_themePalette)}
                    >
                        <Locale>
                            {
                                locales["theme-palette"].values[
                                    _themePalette as keyof (typeof locales)["theme-palette"]["values"]
                                ]
                            }
                        </Locale>
                    </Button>
                ))}
            </DropDown>
            <DropDown
                doesTextGrow
                icon={nestedDropDownIcon}
                position={nestedDropDownPosition}
                text={
                    <Locale variant="p" className="text-end">
                        {locales["writing-direction"].title}
                    </Locale>
                }
            >
                <Button
                    doesTextGrow
                    icon={{
                        className: "rotate-90",
                        source: arrow_icon,
                        placement: direction == "ltr" ? "left" : "right",
                    }}
                    variant={direction == "ltr" ? "primary" : "default"}
                    onClick={(_e) => SetDirection("ltr")}
                >
                    <Locale>
                        {locales["writing-direction"].values["left-to-right"]}
                    </Locale>
                </Button>
                <Button
                    doesTextGrow
                    icon={{
                        className: "-rotate-90",
                        source: arrow_icon,
                        placement: direction == "ltr" ? "left" : "right",
                    }}
                    variant={direction == "rtl" ? "primary" : "default"}
                    onClick={(_e) => SetDirection("rtl")}
                >
                    <Locale>
                        {locales["writing-direction"].values["right-to-left"]}
                    </Locale>
                </Button>
            </DropDown>
            <DropDown
                doesTextGrow
                icon={nestedDropDownIcon}
                position={nestedDropDownPosition}
                text={
                    <Locale variant="p" className="text-end">
                        {locales["language"].title}
                    </Locale>
                }
            >
                {supported_languages.map((language_) => (
                    <Button
                        doesTextGrow
                        variant={
                            language == language_.code ? "primary" : "default"
                        }
                        icon={{
                            className: "drop-shadow-[3px_3px_1px_#0000004c]",
                            width: 32,
                            height: 32,
                            source: `/flags/${language_["flag-code"]}.svg`,
                            placement: direction == "ltr" ? "left" : "right",
                        }}
                        onClick={(_e) => SetLanguage(language_.code)}
                    >
                        {language_.name}
                    </Button>
                ))}
            </DropDown>
        </DropDownList>
    );
};
