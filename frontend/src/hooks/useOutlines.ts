import { useMemo } from "react";

export const useOutlines = (
    outlines: Array<`${number}px ${string}`>
): string => {
    return useMemo(
        () =>
            outlines
                .reduce<{ shadows: Array<string>; cumulativeSpread: number }>(
                    (accumulator, outline) => {
                        const [spreadStr, ...colorParts] = outline
                            .trim()
                            .split(/\s+/);
                        const spread = parseInt(spreadStr, 10);

                        if (isNaN(spread)) {
                            console.warn(
                                `Invalid spread value in outline: "${outline}"`
                            );
                            return accumulator;
                        }

                        const newSpread = accumulator.cumulativeSpread + spread;
                        const color = colorParts.join(" ");
                        const shadow = `0 0 0 ${newSpread}px ${color}`;

                        return {
                            shadows: [...accumulator.shadows, shadow],
                            cumulativeSpread: newSpread,
                        };
                    },
                    { shadows: [], cumulativeSpread: 0 }
                )
                .shadows.join(", "),
        [outlines]
    );
};
