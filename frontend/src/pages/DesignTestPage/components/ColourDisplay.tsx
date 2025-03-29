import { twMerge } from "tailwind-merge";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { FC, useEffect, useMemo, useRef, useState } from "react";

export type ColourDisplayProps = ChildlessComponentProps;

export const ColourDisplay: FC<ColourDisplayProps> = ({ id, className }) => {
    const divReference = useRef<HTMLButtonElement>(null);
    const [colourValue, setColourValue] = useState("");

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
        if (divReference.current == null) {
            return;
        }

        setColourValue(
            RGBToHex(
                divReference.current
                    .computedStyleMap()
                    .get("background-color")!
                    .toString()
            )
        );
    }, []);

    function RGBToHex(text: string) {
        return (
            "#" +
            text
                .replace("rgb(", "")
                .replace(")", "")
                .split(", ")
                .map((c) => Number(c).toString(16).padStart(2, "0"))
                .join("")
                .toUpperCase()
        );
    }

    return (
        <button
            id={id}
            ref={divReference}
            className={twMerge(
                "not-active:[:is(:hover,:focus-within)]:scale-110 cursor-pointer rounded-2xl px-6 py-4 text-center font-bold transition-[scale] duration-200",
                className
            )}
        >
            <h3>{colourName}</h3>
            <p className="text-xl">{colourValue}</p>
        </button>
    );
};
