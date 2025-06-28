import { useState, useEffect } from "react";

export function useThrottle<T>(value: T, delay: number = 100): T {
    const [throttledValue, setThrottledValue] = useState<T>(value);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setThrottledValue(value);
        }, delay);

        return () => {
            clearTimeout(timeoutID);
        };
    }, [value, delay]);

    return throttledValue;
}
