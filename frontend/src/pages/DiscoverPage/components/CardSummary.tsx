import { FC } from "react";
import { Icon } from "@/components/Icon/Icon";
import { twJoin, twMerge } from "tailwind-merge";
import { Rating } from "@/components/Rating/Rating";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Typography } from "@/components/Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import user_icon from "@icons/user.svg";

export type CardSummaryProps = {
    title: string;
    rating: number;
    ratingCount: number;
    registerCount: number;
    reviewsParagraph: string;
    registerParagraph: string;
} & ChildlessComponentProps<HTMLDivElement>;

export const CardSummary: FC<CardSummaryProps> = ({
    id,
    ref,
    title,
    rating,
    className,
    ratingCount,
    registerCount,
    reviewsParagraph,
    registerParagraph,
}) => {
    const { language, direction } = useLocalization();

    return (
        <Flexbox
            id={id}
            ref={ref}
            className={twMerge(
                "absolute inset-8 top-auto z-[1] overflow-hidden",
                className
            )}
            gap="2"
            direction="column"
        >
            <Flexbox placeItems="center" gap="2">
                <Icon width={20} height={20} source={user_icon} />
                <Typography
                    className="overflow-hidden text-ellipsis whitespace-nowrap text-nowrap"
                    variant="p"
                >
                    {Intl.NumberFormat(language == "ar" ? "ar-UA" : "en-US", {
                        notation: "compact",
                        compactDisplay: "short",
                        maximumFractionDigits: 1,
                    }).format(registerCount)}{" "}
                    {registerParagraph}
                </Typography>
            </Flexbox>
            <Flexbox placeItems="center" gap="2">
                <Rating
                    value={rating}
                    iconProps={{
                        width: 20,
                        height: 20,
                        stroke: "black",
                    }}
                />
                <Typography
                    className="overflow-hidden text-ellipsis whitespace-nowrap text-nowrap"
                    variant="p"
                >
                    {Intl.NumberFormat(language == "ar" ? "ar-UA" : "en-US", {
                        notation: "compact",
                        compactDisplay: "short",
                        maximumFractionDigits: 1,
                    }).format(ratingCount)}{" "}
                    {reviewsParagraph}
                </Typography>
            </Flexbox>
            <Typography
                className={twJoin(
                    direction == "rtl" && "text-end",
                    "w-full overflow-hidden text-ellipsis whitespace-nowrap text-nowrap text-xl font-bold"
                )}
                dir="ltr"
                variant="figcaption"
            >
                {title}
            </Typography>
        </Flexbox>
    );
};
