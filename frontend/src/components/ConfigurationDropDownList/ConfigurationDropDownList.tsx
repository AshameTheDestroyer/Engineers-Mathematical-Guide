import { FC } from "react";
import { Locale } from "../Locale/Locale";
import { PALETTE_ICONS } from "@/constants/PaletteIcons";
import { Button, ButtonProps } from "@/components/Button/Button";
import { useThemeMode } from "../ThemeModeProvider/ThemeModeProvider";
import { DropDown, DropDownProps } from "@/components/DropDown/DropDown";
import { WritingDirectionModeEnum } from "@/managers/LocalStorageManager";
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
import arrow_double_icon from "@icons/arrow_double.svg";

import supported_languages from "@json/supported_languages.json";
import locales from "@localization/configuration_drop_down_list.json";

export type ConfigurationDropDownListProps = WithPartial<
    Omit<DropDownListProps, "children" | "icon">,
    "position"
> & {
    icon?: Omit<ButtonProps["icon"] & {}, "source" | "placement">;
};

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
    const {
        language,
        direction,
        SetLanguage,
        SetDirectionMode,
        "direction-mode": directionMode,
    } = useLocalization();

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
            icon={{ source: cog_icon, ...icon }}
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
                    variant={themeMode == "light" ? "primary" : "default"}
                    icon={{
                        source: sun_icon,
                        placement: direction == "ltr" ? "left" : "right",
                    }}
                    onClick={(_e) => SetThemeMode("light")}
                >
                    <Locale>{locales["theme-mode"].values.light}</Locale>
                </Button>
                <Button
                    doesTextGrow
                    variant={themeMode == "dark" ? "primary" : "default"}
                    icon={{
                        source: moon_icon,
                        placement: direction == "ltr" ? "left" : "right",
                    }}
                    onClick={(_e) => SetThemeMode("dark")}
                >
                    <Locale>{locales["theme-mode"].values.dark}</Locale>
                </Button>
                <Button
                    doesTextGrow
                    variant={themeMode == "system" ? "primary" : "default"}
                    icon={{
                        source: monitor_icon,
                        placement: direction == "ltr" ? "left" : "right",
                    }}
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
                {Object.getEnumValues(WritingDirectionModeEnum)
                    .map((writingDirection) => ({
                        value: writingDirection,
                        className: {
                            ltr: "rotate-90",
                            rtl: "-rotate-90",
                            auto: "rotate-90",
                        }[writingDirection],
                        iconSource: {
                            ltr: arrow_icon,
                            rtl: arrow_icon,
                            auto: arrow_double_icon,
                        }[writingDirection],
                        thickness: { ltr: 1, rtl: 1, auto: 4 }[
                            writingDirection
                        ],
                        locale: {
                            ltr: locales["writing-direction"].values[
                                "left-to-right"
                            ],
                            rtl: locales["writing-direction"].values[
                                "right-to-left"
                            ],
                            auto: locales["writing-direction"].values[
                                "automatic"
                            ],
                        }[writingDirection],
                    }))
                    .map((writingDirection, i) => (
                        <Button
                            key={i}
                            doesTextGrow
                            onClick={(_e) =>
                                SetDirectionMode(writingDirection.value)
                            }
                            icon={{
                                className: writingDirection.className,
                                thickness: 4,
                                source: writingDirection.iconSource,
                                placement:
                                    direction == "ltr" ? "left" : "right",
                            }}
                            variant={
                                directionMode == writingDirection.value
                                    ? "primary"
                                    : "default"
                            }
                        >
                            <Locale>{writingDirection.locale}</Locale>
                        </Button>
                    ))}
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
                {supported_languages.map((language_, i) => (
                    <Button
                        key={i}
                        doesTextGrow
                        variant={
                            language == language_.code ? "primary" : "default"
                        }
                        icon={{
                            className: "drop-shadow-[3px_3px_1px_#0000004c]",
                            width: 32,
                            height: 32,
                            source: `flags/${language_["flag-code"]}.svg`,
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
