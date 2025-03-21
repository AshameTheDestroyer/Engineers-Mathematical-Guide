import { useState, useEffect, FC } from "react";
import { ChildlessComponentProps } from "@types_/ComponentProps";

export type IconProps = {
    fill?: string;
    source: string;
    width?: number;
    height?: number;
    stroke?: string;
} & ChildlessComponentProps;

export const Icon: FC<IconProps> = ({
    id,
    fill,
    width,
    source,
    height,
    stroke,
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

                if (fill) {
                    svgElement.setAttribute("fill", fill);
                }
                if (width) {
                    svgElement.setAttribute("width", width.toString());
                }
                if (height) {
                    svgElement.setAttribute("height", height.toString());
                }
                if (stroke) {
                    svgElement.setAttribute("stroke", stroke);
                }

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
    }, [id, fill, width, source, height, stroke]);

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
