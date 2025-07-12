// import React from "react";

// type Orientation = "horizontal" | "vertical" | "diagonal" | "diagonal-reverse";
// type LineStyle = "solid" | "dashed" | "dotted" | "double";
// type RadiusSize = "none" | "sm" | "md" | "lg" | "full";

// interface LineProps {
//     width?: string; // e.g., "full", "1/2", "w-4"
//     height?: string;
//     color?: string; // Tailwind color class, e.g., "bg-red-500"
//     gradient?: boolean;
//     gradientFrom?: string; // e.g., "from-blue-500"
//     gradientTo?: string; // e.g., "to-purple-600"
//     radius?: RadiusSize;
//     orientation?: Orientation;
//     animate?: boolean;

//     // New props
//     lineStyle?: LineStyle;
//     multiLineCount?: number;
//     gapBetweenLines?: string; // Tailwind spacing like "space-y-2"
// }

// const radiusMap: Record<RadiusSize, string> = {
//     none: "",
//     sm: "rounded-sm",
//     md: "rounded-md",
//     lg: "rounded-lg",
//     full: "rounded-full",
// };

// const lineStyleClasses: Record<LineStyle, string> = {
//     solid: "border-solid",
//     dashed: "border-dashed",
//     dotted: "border-dotted",
//     double: "border-double",
// };

// const orientationClass = (orientation: Orientation): string => {
//     switch (orientation) {
//         case "horizontal":
//             return "flex flex-row items-center w-full";
//         case "vertical":
//             return "flex flex-col items-center h-full";
//         case "diagonal":
//             return "transform -rotate-12";
//         case "diagonal-reverse":
//             return "transform rotate-12";
//         default:
//             return "";
//     }
// };

// const Line: React.FC<LineProps> = ({
//     width = "full",
//     height = "h-0.5",
//     color = "bg-gray-300",
//     gradient = false,
//     gradientFrom = "from-blue-500",
//     gradientTo = "to-purple-600",
//     radius = "none",
//     orientation = "horizontal",
//     animate = false,

//     lineStyle = "solid",
//     multiLineCount = 1,
//     gapBetweenLines = "space-y-1",
// }) => {
//     const isHorizontal = orientation === "horizontal";
//     const borderClass = lineStyleClasses[lineStyle];

//     const baseClasses = `
//     ${gradient ? `bg-gradient-to-r ${gradientFrom} ${gradientTo}` : color}
//     ${radiusMap[radius]}
//     ${animate ? "animate-pulse" : ""}
//     transition-all duration-300
//     border-${color.replace("bg-", "")}
//     ${borderClass}
//   `.trim();

//     const renderLine = (key: number) => (
//         <div
//             key={key}
//             className={` ${isHorizontal ? `w-${width}` : `h-${height}`} ${isHorizontal ? height : `w-${width} h-full`} border ${baseClasses} `}
//             style={{
//                 minHeight: isHorizontal ? height : undefined,
//                 minWidth: isHorizontal ? undefined : width,
//             }}
//         />
//     );

//     const renderMultiLines = () => {
//         const lines = [];
//         for (let i = 0; i < multiLineCount; i++) {
//             lines.push(renderLine(i));
//         }

//         return (
//             <div
//                 className={`flex ${gapBetweenLines} ${orientation === "vertical" ? "flex-col" : "flex-row"} items-center`}
//             >
//                 {lines}
//             </div>
//         );
//     };

//     return (
//         <div className={orientationClass(orientation)}>
//             {multiLineCount > 1 ? renderMultiLines() : renderLine(0)}
//         </div>
//     );
// };

// export default Line;

import React from "react";
import { twMerge } from "tailwind-merge";

type LineStyle = "solid" | "dashed" | "dotted" | "double";
type Orientation = "horizontal" | "vertical";
type Radius = "none" | "sm" | "md" | "lg" | "full";

interface LineProps {
    width?: string; // e.g. "w-full", "w-1/2", "w-4"
    height?: string; // e.g. "h-0.5", "h-1"
    color?: string; // Tailwind color class like "bg-gray-300" or "border-gray-300"
    orientation?: Orientation;
    styleType?: LineStyle;
    radius?: Radius;
    className?: string;
}

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

const Line: React.FC<LineProps> = ({
    width = "full",
    height = "h-0.5",
    color = "bg-gray-300",
    orientation = "horizontal",
    styleType = "solid",
    radius = "none",
    className = "",
}) => {
    const isHorizontal = orientation === "horizontal";
    const isThinHorizontal = isHorizontal && height === "h-1";
    const isThinVertical = !isHorizontal && width === "w-1";
    const isThinLine = isThinHorizontal || isThinVertical;

    // Extract color name from bg-* or border-* classes
    const baseColor = color.replace(/(bg-|border-)/g, "");

    // If it's a thin line, apply color only to border
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

export default Line;
