import { twMerge } from "tailwind-merge";
import { ComponentProps } from "@types_/ComponentProps";
import {
    FC,
    useRef,
    useState,
    useEffect,
    HTMLAttributes,
    useImperativeHandle,
} from "react";

export type HeaderProps = ComponentProps<HTMLDivElement> & {
    isSticky?: boolean;
    onHeaderScroll?: (
        direction: "up" | "down",
        headerElement: HTMLDivElement
    ) => void;
} & HTMLAttributes<HTMLDivElement>;

export const Header: FC<HeaderProps> = ({
    id,
    ref,
    children,
    isSticky,
    className,
    onHeaderScroll,
    ...props
}) => {
    const headerReference = useRef<HTMLDivElement>(null);
    const [direction, setDirection] = useState<"up" | "down">("up");

    useImperativeHandle(ref, () => headerReference.current!);

    useEffect(() => {
        if (onHeaderScroll == null) {
            return;
        }

        window.addEventListener("scroll", ScrollCallback);

        return () => {
            window.removeEventListener("scroll", ScrollCallback);
        };
    }, [onHeaderScroll]);

    useEffect(() => {
        if (headerReference.current == null) {
            return;
        }

        onHeaderScroll?.(direction, headerReference.current);
    }, [direction]);

    function ScrollCallback() {
        if (headerReference.current == null) {
            return;
        }

        setDirection(
            window.scrollY < headerReference.current.clientHeight
                ? "up"
                : "down"
        );
    }

    return (
        <header
            id={id}
            ref={headerReference}
            className={twMerge(
                isSticky ? "sticky top-0" : "",
                "-m-page mb-page z-10 flex flex-wrap place-items-center justify-between gap-4 px-4 py-2",
                className
            )}
            {...props}
        >
            {children}
        </header>
    );
};
