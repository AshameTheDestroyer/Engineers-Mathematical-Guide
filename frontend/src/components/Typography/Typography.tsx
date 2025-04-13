import React from "react";
import { TypographyDisplayProps } from "@/pages/TestPage/components/TypographyDisplay";

type TextVariant =
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";

type TextColor =
    | "primary"
    | "secondary"
    | "tertiary"
    | "background"
    | "foreground"
    | "gray"
    | "vibrant-red"
    | "vibrant-yellow"
    | "vibrant-green"
    | "vibrant-blue"
    | "vibrant-purple";

interface TypographyProps extends TypographyDisplayProps {
    variant?: TextVariant;
    color?: TextColor;
    weight?: "light" | "normal" | "medium" | "semibold" | "bold";
    align?: "left" | "center" | "right" | "justify";
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}

const Typography: React.FC<TypographyProps> = ({
    variant = "md",
    color = "foreground",
    weight = "normal",
    align = "left",
    as: Tag = "p",
    children,
    className = "",
    ...props
}) => {
    // Map weight to Tailwind classes
    const weightMap = {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
    };

    const colorClass = `text-${color}`;

    return (
        <Tag
            className={[
                `text-${variant}`,
                colorClass,
                weightMap[weight],
                `text-${align}`,
                className,
            ].join(" ")}
            {...props}
        >
            {children}
        </Tag>
    );
};

export default Typography;
