import { FC, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useShadow } from "@/hooks/useShadow";
import { useColour } from "@/hooks/useColour";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { useToast } from "@/components/ToastProvider/ToastProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

export type ColourDisplayProps = ChildlessComponentProps;

export const ColourDisplay: FC<ColourDisplayProps> = ({ id, className }) => {
    const { Alert } = useToast();
    const { language } = useLocalization();
    const divReference = useRef<HTMLButtonElement>(null);

    const { colourRGB, colourHex, colourName, isDarkColour } = useColour({
        className,
        reference: divReference,
    });

    const shadow = useShadow(
        `var(--color-${colourName?.replaceAll(" ", "-").toLocaleLowerCase()})`
    );

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
                isDarkColour ? "text-white" : "text-black",
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
