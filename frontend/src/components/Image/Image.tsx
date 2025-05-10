import { QueryStatus } from "@tanstack/react-query";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { useState, useRef, useEffect, FC, ImgHTMLAttributes } from "react";
import { twJoin, twMerge } from "tailwind-merge";

export const FALLBACK_SOURCE = "";

export type ImageProps = ChildlessComponentProps<HTMLDivElement> & {
    source: string;
    sizes?: string;
    alternative: string;
    doesFadeIn?: boolean;
    placeholder?: string;
    fallbackSource?: string;
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
    doesFadeIn = true,
    placeholder = "$skeleton",
    fallbackSource = FALLBACK_SOURCE,
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
            imageElement.addEventListener("error", () => {
                setStatus("error");
                imageElement.src = fallbackSource;
            });
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
    }, [source, fallbackSource]);

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

            <img
                ref={imageReference}
                className={twJoin(
                    doesFadeIn && status == "success"
                        ? "fade-in opacity-0 transition-opacity duration-300 ease-in"
                        : ""
                )}
                loading="lazy"
                decoding="async"
                alt={alternative}
                src={status == "error" ? fallbackSource : source}
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
                onError={(e) => {
                    props.onError?.(e);
                    setStatus("error");
                    if (fallbackSource) {
                        e.currentTarget.src = fallbackSource;
                    }
                }}
            />

            {alternative != null && !isPlaceholderShown && (
                <span className="sr-only">{alternative}</span>
            )}
        </div>
    );
};
