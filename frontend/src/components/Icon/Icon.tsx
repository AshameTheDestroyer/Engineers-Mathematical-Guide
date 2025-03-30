import { useState, useEffect, FC } from "react";
import { ChildlessComponentProps } from "@types_/ComponentProps";

export type IconProps = {
    fill?: string;
    source: string;
    width?: number;
    height?: number;
    stroke?: string;
    thickness?: number;
} & ChildlessComponentProps;

export const Icon: FC<IconProps> = ({
    id,
    fill,
    width,
    source,
    height,
    stroke,
    thickness,
    className,
}) => {
    const [svg, setSVG] = useState<string>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        FetchSVG();
    }, [fill, width, source, height, stroke, thickness]);

    async function FetchSVG() {
        try {
            const response = await fetch(source);

            if (!response.ok) {
                throw new Error(`Failed to fetch SVG: ${response.statusText}.`);
            }

            const text = await response.text();

            const svg = new DOMParser().parseFromString(text, "image/svg+xml");
            const svgElement = svg.querySelector("svg");

            if (svgElement == null) {
                throw new Error("Invalid SVG content.");
            }

            InjectProperties(svgElement);
            setSVG(new XMLSerializer().serializeToString(svgElement));
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    }

    function InjectProperties(svgElement: SVGElement) {
        Object.entries({
            width,
            height,
        }).forEach(
            ([key, value]) =>
                value != null && svgElement.setAttribute(key, value.toString())
        );

        Object.entries({
            fill,
            stroke,
            "stroke-width": thickness?.toString(),
        }).forEach(
            ([key, value]) =>
                value != null &&
                [
                    svgElement,
                    ...svgElement.querySelectorAll(`& [${key}]`),
                ].forEach((child) => child.setAttribute(key, value))
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        svg && (
            <div
                id={id}
                className={className}
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        )
    );
};
