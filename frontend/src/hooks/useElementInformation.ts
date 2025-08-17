import { useState, RefObject, useLayoutEffect } from "react";

export function useElementInformation<T extends HTMLElement>(
    ref: RefObject<T | null>
): DOMRect {
    const [rect, setRect] = useState<DOMRect>(() => {
        const rect = {
            ...{ width: 0, height: 0, x: 0, y: 0 },
            ...{ top: 0, left: 0, right: 0, bottom: 0 },
        };
        return { ...rect, toJSON: () => JSON.stringify(rect) };
    });

    useLayoutEffect(() => {
        function UpdateClientInfo() {
            if (ref.current == null) {
                return;
            }

            setRect(ref.current.getBoundingClientRect());
        }

        UpdateClientInfo();

        window.addEventListener("resize", UpdateClientInfo);

        return () => {
            window.removeEventListener("resize", UpdateClientInfo);
        };
    }, [ref.current]);

    return rect;
}
