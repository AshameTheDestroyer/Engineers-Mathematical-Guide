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
    const [svgContent, setSvgContent] = useState<string>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchSvg = async () => {
            try {
                const response = await fetch(source);
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch SVG: ${response.statusText}.`
                    );
                }
                const svgText = await response.text();

                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
                const svgElement = svgDoc.querySelector("svg");

                if (!svgElement) {
                    throw new Error("Invalid SVG content.");
                }

                InjectProperties(svgElement);

                const serializer = new XMLSerializer();
                const updatedSvgContent =
                    serializer.serializeToString(svgElement);

                setSvgContent(updatedSvgContent);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            }
        };

        fetchSvg();
    }, [fill, width, source, height, stroke, thickness]);

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
        svgContent && (
            <div
                id={id}
                className={className}
                dangerouslySetInnerHTML={{ __html: svgContent }}
            />
        )
    );
};
