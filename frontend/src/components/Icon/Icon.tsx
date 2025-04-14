import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
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
    const { data, isLoading, isError } = useQuery({
        queryKey: [`ICON-${source}`, fill, width, height, stroke, thickness],
        queryFn: () =>
            fetch(source)
                .then((response) => response.text())
                .then((text) =>
                    new DOMParser().parseFromString(text, "image/svg+xml")
                )
                .then((svg) => svg.querySelector("svg")!)
                .then(InjectProperties)
                .then(
                    (svgElement) =>
                        new XMLSerializer().serializeToString(svgElement) ??
                        "<svg></svg>"
                )
                .catch(console.error),
    });

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

        return svgElement;
    }

    return (
        <div
            id={id}
            className={className}
            dangerouslySetInnerHTML={{
                __html: isLoading ? "..." : isError ? "ERR" : (data ?? ""),
            }}
        />
    );
};
