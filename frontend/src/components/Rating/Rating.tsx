import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Icon, IconProps } from "../Icon/Icon";
import { ChildlessComponentProps } from "@/types/ComponentProps";

import star_icon from "@icons/star.svg";
import star_half_icon from "@icons/star_half.svg";
import star_outlined_icon from "@icons/star_outlined.svg";

export type RatingProps = ChildlessComponentProps<HTMLDivElement> & {
    value: number;
    maximumValue?: number;
    iconProps?: Omit<IconProps, "source">;
};

export const Rating: FC<RatingProps> = ({
    id,
    ref,
    className,
    iconProps,
    value: _value,
    maximumValue = 5,
}) => {
    if (_value < 0 || _value > maximumValue) {
        throw new Error(`Value should be between 0 and ${maximumValue}.`);
    }

    const value = Math.round(_value * 2) / 2;

    return (
        <div id={id} ref={ref} className={twMerge("flex", className)}>
            {new Array(maximumValue).fill(null).map((_, i) => (
                <Icon
                    key={i}
                    {...iconProps}
                    className={twMerge(
                        "text-vibrant-yellow [&>svg]:scale-125",
                        iconProps?.className
                    )}
                    source={
                        i + 1 == Math.ceil(value) && i + 1 != value
                            ? star_half_icon
                            : i < value
                              ? star_icon
                              : star_outlined_icon
                    }
                    {...iconProps}
                />
            ))}
        </div>
    );
};
