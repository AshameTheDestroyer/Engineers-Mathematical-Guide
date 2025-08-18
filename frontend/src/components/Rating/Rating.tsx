import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Flexbox } from "../Flexbox/Flexbox";
import { Icon, IconProps } from "../Icon/Icon";
import { Typography } from "../Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { GenerateTextShadow } from "@/functions/GenerateTextShadow";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";

import star_icon from "@icons/star.svg";
import star_half_icon from "@icons/star_half.svg";
import star_outlined_icon from "@icons/star_outlined.svg";

export type RatingProps = ChildlessComponentProps<HTMLDivElement> & {
    value: number;
    maximumValue?: number;
    withoutNumber?: boolean;
    iconProps?: Omit<IconProps, "source">;
};

export const Rating: FC<RatingProps> = ({
    id,
    ref,
    className,
    iconProps,
    withoutNumber,
    value: _value,
    maximumValue = 5,
}) => {
    const { direction } = useLocalization();

    if (_value < 0 || _value > maximumValue) {
        throw new Error(`Value should be between 0 and ${maximumValue}.`);
    }

    const value = Math.round(_value * 2) / 2;

    return (
        <Flexbox
            id={id}
            ref={ref}
            className={className}
            gap="2"
            placeContent="center"
        >
            {!withoutNumber && (
                <Typography
                    className="rating text-vibrant-yellow-normal min-w-[3ch] text-center font-bold"
                    variant="p"
                    style={{ textShadow: GenerateTextShadow() }}
                >
                    {_value}
                </Typography>
            )}
            <Flexbox>
                {new Array(maximumValue).fill(null).map((_, i) => (
                    <Icon
                        key={i}
                        {...iconProps}
                        className={twMerge(
                            "text-vibrant-yellow-normal [&>svg]:scale-125",
                            direction == "rtl" &&
                                i + 1 == Math.ceil(value) &&
                                i + 1 != value
                                ? "rotate-y-180"
                                : "",
                            iconProps?.className
                        )}
                        source={
                            i + 1 == Math.ceil(value) && i + 1 != value
                                ? star_half_icon
                                : i < value
                                  ? star_icon
                                  : star_outlined_icon
                        }
                    />
                ))}
            </Flexbox>
        </Flexbox>
    );
};
