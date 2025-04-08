import { FC, useMemo } from "react";
import { useThemeMode } from "@/hooks/useThemeMode";
import { twJoin, twMerge } from "tailwind-merge";
import { ChildlessComponentProps } from "@/types/ComponentProps";

export type TypographyDisplayProps = ChildlessComponentProps & {
    text: string;
};

export const TypographyDisplay: FC<TypographyDisplayProps> = ({
    id,
    text,
    className,
}) => {
    const { isDarkThemed } = useThemeMode();

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
        <div id={id} className={twMerge("flex gap-4", className)}>
            <span
                className={twJoin(
                    !isDarkThemed && "shadow-lg shadow-[#0000004c]",
                    "bg-tertiary-normal min-w-20 place-self-center rounded-2xl py-2 text-center text-lg uppercase"
                )}
            >
                {sizeName}
            </span>
            <p className="place-content-center overflow-hidden text-ellipsis whitespace-nowrap [line-height:1.3]">
                {text}
            </p>
        </div>
    );
};
