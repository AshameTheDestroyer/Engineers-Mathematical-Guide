import { twMerge } from "tailwind-merge";
import { useShadow } from "@/hooks/useShadow";
import { RGBToHex } from "@/functions/RGBToHex";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { IsDarkColour } from "@/functions/CalculateColourLuminance";
import { useToast } from "@/components/ToastProvider/ToastProvider";
import { useThemeMode } from "@/components/ThemeModeProvider/ThemeModeProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

export type ColourDisplayProps = ChildlessComponentProps;

export const ColourDisplay: FC<ColourDisplayProps> = ({ id, className }) => {
    const { Alert } = useToast();
    const { language } = useLocalization();
    const { isDarkThemed } = useThemeMode();
    const divReference = useRef<HTMLButtonElement>(null);

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

    const shadow = useShadow(
        `var(--color-${colourName?.replaceAll(" ", "-").toLocaleLowerCase()})`
    );

    useEffect(() => {
        setTimeout(() => {
            if (divReference.current == null) {
                return;
            }

            const colourRGB = divReference.current
                .computedStyleMap()
                .get("background-color")!
                .toString() as RGB;

            setColourRGB(colourRGB);
            setColourHex(RGBToHex(colourRGB));
        });
    }, [isDarkThemed]);

    function OnButtonClick(
        _e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        if (colourHex == null) {
            return;
        }

        navigator.clipboard.writeText(colourHex?.toLowerCase());
        Alert(language == "en" ? "Colour copied." : "تَمّ نَسخُ اللّون.", {
            type: "info",
        });
    }

    return (
        <button
            id={id}
            ref={divReference}
            className={twMerge(
                colourRGB != null && IsDarkColour(colourRGB)
                    ? "text-white"
                    : "text-black",
                "not-active:[:is(:hover,:focus-within)]:scale-110 shadow-glow flex cursor-pointer flex-col gap-2 rounded-2xl px-6 py-4 text-center font-bold shadow-red-500 transition-[scale] duration-200",
                className
            )}
            onClick={OnButtonClick}
            title="Click to copy colour."
            style={{ boxShadow: shadow }}
        >
            <h3 className="grow place-content-center">{colourName}</h3>
            <p className="text-xl">{colourHex != null && colourHex}</p>
            <p>{colourRGB != null && colourRGB}</p>
        </button>
    );
};
