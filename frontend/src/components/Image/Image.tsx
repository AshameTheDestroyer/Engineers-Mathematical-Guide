import { Icon } from "../Icon/Icon";
import { twJoin, twMerge } from "tailwind-merge";
import { QueryStatus } from "@tanstack/react-query";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { useState, useRef, useEffect, FC, ImgHTMLAttributes } from "react";

import network_error_icon from "@icons/network_error.svg";

export type ImageProps = ChildlessComponentProps<HTMLDivElement> & {
    sizes?: string;
    source?: string;
    alternative: string;
    doesFadeIn?: boolean;
    placeholder?: string;
    hideNotFoundIcon?: boolean;
    sourceSet?: Record<string, string>;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "srcSet">;

export const Image: FC<ImageProps> = ({
    id,
    ref,
    sizes,
    source,
    sourceSet,
    className,
    alternative,
    hideNotFoundIcon,
    doesFadeIn = true,
    placeholder = "$skeleton",
    ...props
}) => {
    const imageReference = useRef<HTMLImageElement>(null);

    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState<QueryStatus>("pending");

    const isPlaceholderShown = status == "pending" && placeholder;

    useEffect(() => {
        const imageElement = imageReference.current;
        if (imageElement == null) {
            return;
        }

        if ("loading" in HTMLImageElement) {
            imageElement.addEventListener("load", () => setStatus("success"));
            imageElement.addEventListener("error", () => setStatus("error"));
        } else {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setIsVisible(true);
                            observer.unobserve(imageElement);
                        }
                    });
                },
                { rootMargin: "0px 0px 200px 0px" }
            );

            observer.observe(imageElement);
            return () => observer.unobserve(imageElement);
        }

        return () => {
            imageElement.removeEventListener?.("load", () => {});
            imageElement.removeEventListener?.("error", () => {});
        };
    }, [source]);

    useEffect(() => {
        if (status == "success") {
            setTimeout(() => {
                const imageElement = imageReference.current;
                if (imageElement != null) {
                    imageElement.style.opacity = "1";
                }
            }, 10);
        }
    }, [status]);

    return (
        <div
            id={id}
            ref={ref}
            className={twMerge(
                "relative h-auto w-full overflow-hidden",
                className
            )}
        >
            {isPlaceholderShown && (
                <div
                    aria-hidden
                    className={twJoin(
                        "absolute inset-0 animate-pulse bg-black/15",
                        placeholder == "$skeleton" ? "rounded-md" : ""
                    )}
                />
            )}

            {(status == "error" || source == null) && !hideNotFoundIcon && (
                <Icon
                    source={network_error_icon}
                    className="-translate-1/2 absolute left-1/2 top-1/2 h-1/3 w-1/3 [&>svg]:h-full [&>svg]:w-full"
                />
            )}

            <img
                ref={imageReference}
                className={twJoin(
                    status == "error" || source == null ? "sr-only" : "",
                    doesFadeIn && status == "success"
                        ? "fade-in opacity-0 transition-opacity duration-300 ease-in"
                        : ""
                )}
                src={source}
                loading="lazy"
                decoding="async"
                alt={alternative}
                srcSet={
                    isVisible || "loading" in HTMLImageElement
                        ? Object.entries(sourceSet ?? {})
                              .map(([key, value]) => `${value} ${key}`)
                              .join(",")
                        : undefined
                }
                sizes={
                    isVisible || "loading" in HTMLImageElement
                        ? sizes
                        : undefined
                }
                {...props}
                onLoad={(e) => (props.onLoad?.(e), setStatus("success"))}
                onError={(e) => (props.onError?.(e), setStatus("error"))}
            />

            {alternative != null && !isPlaceholderShown && (
                <span className="sr-only">{alternative}</span>
            )}
        </div>
    );
};
