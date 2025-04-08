import { FC } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/Button/Button";
import { DropDown } from "@/components/DropDown/DropDown";
import { DropDownList } from "@/components/DropDownList/DropDownList";

import cog_icon from "@icons/cog.svg";
import sun_icon from "@icons/sun.svg";
import moon_icon from "@icons/moon.svg";
import monitor_icon from "@icons/monitor.svg";

export const ConfigurationDropDownList: FC = () => {
    const { themeMode, SetThemeMode } = useTheme();

    return (
        <DropDownList
            variant="secondary"
            position="bottom-end"
            icon={{ source: cog_icon }}
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
                <Button>Default</Button>
                <Button>Sakura</Button>
                <Button>Moss</Button>
            </DropDown>
        </DropDownList>
    );
};
