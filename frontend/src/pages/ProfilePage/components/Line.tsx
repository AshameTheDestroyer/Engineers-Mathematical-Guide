import { FC } from "react";
import { twMerge } from "tailwind-merge";

type Orientation = "horizontal" | "vertical";
type Radius = "none" | "sm" | "md" | "lg" | "full";
type LineStyle = "solid" | "dashed" | "dotted" | "double";

type LineProps = {
    width?: string;
    color?: string;
    height?: string;
    radius?: Radius;
    className?: string;
    styleType?: LineStyle;
    orientation?: Orientation;
};

const radiusClasses: Record<Radius, string> = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
};

const borderStyleClasses: Record<LineStyle, string> = {
    solid: "border-solid",
    dashed: "border-dashed",
    dotted: "border-dotted",
    double: "border-double",
};

export const Line: FC<LineProps> = ({
    className,
    width = "full",
    radius = "none",
    height = "h-0.5",
    styleType = "solid",
    color = "bg-gray-300",
    orientation = "horizontal",
}) => {
    const isHorizontal = orientation == "horizontal";
    const isThinHorizontal = isHorizontal && height == "h-1";
    const isThinVertical = !isHorizontal && width == "w-1";
    const isThinLine = isThinHorizontal || isThinVertical;

    const baseColor = color.replace(/(bg-|border-)/g, "");

    const bgColor = isThinLine
        ? ""
        : color.startsWith("bg-")
          ? color
          : `bg-${baseColor}`;
    const borderColor = color.startsWith("border-")
        ? color
        : `border-${baseColor}`;

    return (
        <div
            className={twMerge(
                ` ${isHorizontal ? `w-${width}` : `h-${height}`} ${isHorizontal ? height : `w-${width}`} ${bgColor} border ${borderColor} ${borderStyleClasses[styleType]} ${radiusClasses[radius]} `,
                className
            )}
            style={{
                minHeight: isHorizontal ? height : undefined,
                minWidth: isHorizontal ? undefined : width,
            }}
        />
    );
};
