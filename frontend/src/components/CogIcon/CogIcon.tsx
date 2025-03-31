import { FC } from "react";
import { Icon, IconProps } from "../Icon/Icon";

import cog_icon from "@icons/cog.svg";
import { twMerge } from "tailwind-merge";

export type CogIconProps = Omit<IconProps, "source" | "width" | "height"> & {
    size?: number;
};

export const CogIcon: FC<CogIconProps> = ({
    id,
    size,
    className,
    ...props
}) => {
    return (
        <Icon
            id={id}
            className={twMerge(
                "animate-spin transition duration-200 [animation-duration:60s]",
                className
            )}
            width={size}
            height={size}
            source={cog_icon}
            {...props}
        />
    );
};
