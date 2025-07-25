import { useThrottle } from "@/hooks/useThrottle";
import {
    FC,
    useState,
    useEffect,
    useContext,
    createContext,
    PropsWithChildren,
} from "react";

export type ScreenSizeStateProps = {
    screenSize: number;
    breakpoints: Record<Breakpoint, number>;
    isScreenSize: Record<Breakpoint | `max-${Breakpoint}`, boolean>;
};

export const ScreenSizeContext = createContext<ScreenSizeStateProps>(null!);

export const useScreenSize = () => useContext(ScreenSizeContext);

export type ScreenSizeProviderProps = PropsWithChildren;

export const ScreenSizeProvider: FC<ScreenSizeProviderProps> = ({
    children,
}) => {
    const [state, setState] = useState<ScreenSizeStateProps>(() => {
        const breakpoints = GetBreakpoints();
        return {
            breakpoints,
            screenSize: window.innerWidth,
            isScreenSize: LogicizeScreenSize(window.innerWidth, breakpoints),
        };
    });

    const throttledScreenSize = useThrottle(window.innerWidth, 100);

    useEffect(() => {
        function OnScreenResize() {
            const isScreenSize = LogicizeScreenSize(
                throttledScreenSize,
                state.breakpoints
            );

            setState((prevState) => ({
                ...prevState,
                isScreenSize,
                screenSize: throttledScreenSize,
            }));
        }

        OnScreenResize();

        window.addEventListener("resize", OnScreenResize);

        return () => {
            window.removeEventListener("resize", OnScreenResize);
        };
    }, [state.breakpoints, throttledScreenSize]);

    function GetBreakpoints() {
        const root = document.querySelector(":root") as HTMLElement;
        const computedStyles = root.computedStyleMap();
        const styles = [...computedStyles.entries()];

        const paletteRegex = /--breakpoint-(.*?)/;
        const fontSize = parseFloat(
            computedStyles.get("font-size")?.toString()!
        );

        return styles
            .filter(([key, _value]) => paletteRegex.test(key))
            .filter((style) => style != null)
            .reduce(
                (accumulator, [key, value]) => ({
                    ...accumulator,
                    [key.replace(/^--breakpoint-/, "")]:
                        parseFloat(`${value}`.replace(/rem$/, "")) * fontSize,
                }),
                {} as ScreenSizeStateProps["breakpoints"]
            );
    }

    function LogicizeScreenSize(
        screenSize: number,
        breakpoints: ScreenSizeStateProps["breakpoints"]
    ) {
        return Object.keys(breakpoints).reduce(
            (accumulator, key) => {
                const breakpointKey = key as Breakpoint;
                const breakpointValue = breakpoints[breakpointKey];
                return {
                    ...accumulator,
                    [breakpointKey]: screenSize >= breakpointValue,
                    [`max-${breakpointKey}`]: screenSize < breakpointValue,
                };
            },
            {} as ScreenSizeStateProps["isScreenSize"]
        );
    }

    return (
        <ScreenSizeContext.Provider value={state}>
            {children}
        </ScreenSizeContext.Provider>
    );
};
