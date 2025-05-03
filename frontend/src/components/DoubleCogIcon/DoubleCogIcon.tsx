import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { CogIcon, CogIconProps } from "../CogIcon/CogIcon";

export type DoubleCogIconProps = CogIconProps;

export const DoubleCogIcon: FC<DoubleCogIconProps> = ({
    id,
    size,
    className,
    ...props
}) => {
    return (
        <div
            id={id}
            className={twMerge("relative h-8 w-8", className)}
            style={{
                width: size,
                height: size,
            }}
        >
            <CogIcon
                className="absolute right-1/4 h-full w-full [&>svg]:h-full [&>svg]:w-full"
                {...props}
            />
            <CogIcon
                className="scale-85 absolute left-[55%] h-full w-full translate-y-[17.5%] rotate-[-5deg] [animation-direction:reverse] [&>svg]:h-full [&>svg]:w-full"
                {...props}
            />
        </div>
    );
};
