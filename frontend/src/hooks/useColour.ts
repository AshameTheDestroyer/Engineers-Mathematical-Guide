import { RGBToHex } from "@/functions/RGBToHex";
import { RefObject, useEffect, useMemo, useState } from "react";
import { IsDarkColour } from "@/functions/CalculateColourLuminance";
import { useThemeMode } from "@/components/ThemeModeProvider/ThemeModeProvider";

export type UseColourProps<T extends HTMLElement> = {
    updateDelay?: number;
    className: string | undefined;
    reference: RefObject<T | null>;
};

export const useColour = <T extends HTMLElement>({
    className,
    reference,
    updateDelay = 0,
}: UseColourProps<T>) => {
    const { isDarkThemed } = useThemeMode();

    const [colourRGB, setColourRGB] = useState<RGB>();
    const [colourHex, setColourHex] = useState<Hex>();

    const colourName = useMemo(
        () =>
            className
                ?.trimAll()
                .split(" ")
                .find((token) => token.startsWith("bg-"))
                ?.replace("bg-", "")
                .replaceAll("-", " ")
                .toTitleCase(),
        [className]
    );

    useEffect(() => {
        setTimeout(() => {
            if (reference.current == null) {
                return;
            }

            const colourRGB = reference.current
                .computedStyleMap()
                .get("background-color")!
                .toString() as RGB;

            setColourRGB(colourRGB);
            setColourHex(RGBToHex(colourRGB));
        }, updateDelay);
    }, [isDarkThemed]);

    return {
        colourRGB,
        colourHex,
        colourName,
        isDarkColour: colourRGB == null ? undefined : IsDarkColour(colourRGB),
    };
};
