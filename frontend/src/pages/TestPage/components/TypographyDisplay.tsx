import { FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { useShadow } from "@/hooks/useShadow";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { ChildlessComponentProps } from "@/types/ComponentProps";

export type TypographyDisplayProps = ChildlessComponentProps<HTMLDivElement> & {
    text: string;
};

export const TypographyDisplay: FC<TypographyDisplayProps> = ({
    id,
    ref,
    text,
    className,
}) => {
    const shadow = useShadow();

    const sizeName = useMemo(
        () =>
            className
                ?.trimAll()
                .split(" ")
                .find((token) => token.match(/text-(\d*xl|lg|md|sm|xs)/))
                ?.replace("text-", ""),
        [className]
    );

    return (
        <Flexbox
            id={id}
            ref={ref}
            className={twMerge("max-w-full", className)}
            gap="4"
            wrap="nowrap"
        >
            <span
                className="bg-tertiary-normal min-w-20 place-self-center rounded-2xl py-2 text-center text-lg uppercase"
                style={{
                    boxShadow: shadow,
                }}
            >
                {sizeName}
            </span>
            <p className="place-content-center overflow-hidden text-ellipsis whitespace-nowrap [line-height:1.3]">
                {text}
            </p>
        </Flexbox>
    );
};
