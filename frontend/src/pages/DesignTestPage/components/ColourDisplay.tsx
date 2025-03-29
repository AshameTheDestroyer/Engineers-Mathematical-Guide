import { MainContext } from "@/index";
import { twMerge } from "tailwind-merge";
import { RGBToHex } from "@/functions/RGBToHex";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { IsDarkColour } from "@/functions/CalculateColourLuminance";
import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";

export type ColourDisplayProps = ChildlessComponentProps;

export const ColourDisplay: FC<ColourDisplayProps> = ({ id, className }) => {
    const { isDarkThemed } = useContext(MainContext);
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

    return (
        <button
            id={id}
            ref={divReference}
            className={twMerge(
                "not-active:[:is(:hover,:focus-within)]:scale-110 flex cursor-pointer flex-col gap-2 rounded-2xl px-6 py-4 text-center font-bold transition-[scale] duration-200",
                colourRGB != null && IsDarkColour(colourRGB)
                    ? "text-white"
                    : "text-black",
                className
            )}
        >
            <h3 className="grow place-content-center">{colourName}</h3>
            <p className="text-xl">{colourHex != null && colourHex}</p>
            <p>{colourRGB != null && colourRGB}</p>
        </button>
    );
};
