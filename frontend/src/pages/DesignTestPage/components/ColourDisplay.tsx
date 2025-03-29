import { MainContext } from "@/index";
import { twMerge } from "tailwind-merge";
import { RGBToHex } from "@/functions/RGBToHex";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";

export type ColourDisplayProps = ChildlessComponentProps;

export const ColourDisplay: FC<ColourDisplayProps> = ({ id, className }) => {
    const { isDarkThemed } = useContext(MainContext);

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
                    .toString() as RGB
            )
        );
    }, [isDarkThemed]);

    return (
        <button
            id={id}
            ref={divReference}
            className={twMerge(
                "not-active:[:is(:hover,:focus-within)]:scale-110 flex cursor-pointer flex-col gap-2 rounded-2xl px-6 py-4 text-center font-bold transition-[scale] duration-200",
                className
            )}
        >
            <h3 className="grow">{colourName}</h3>
            <p className="text-xl">{colourValue}</p>
        </button>
    );
};
