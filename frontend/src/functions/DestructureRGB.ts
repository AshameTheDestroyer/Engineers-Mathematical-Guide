import { AssertColourIsRGB } from "./AssertColourIs";

export function DestructureRGB(colour: RGB | RGBA): {
    r: number;
    g: number;
    b: number;
    a: number;
} {
    AssertColourIsRGB(colour);

    const array = colour
        .replace(/rgba?\(/, "")
        .replace(")", "")
        .split(",")
        .map((c) => Number(c));

    return {
        r: array[0],
        g: array[1],
        b: array[2],
        a: array[3] ?? 1,
    };
}
