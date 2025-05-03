import { AssertColourIsRGB } from "./AssertColourIs";

export function RGBToHex(colour: RGB | RGBA): Hex {
    AssertColourIsRGB(colour);

    return ("#" +
        colour
            .replace(/rgba?\(/, "")
            .replace(")", "")
            .split(",")
            .map((c, i) =>
                Math.round(Number(c) * (i < 3 ? 1 : 255))
                    .toString(16)
                    .padStart(2, "0")
            )
            .join("")
            .toUpperCase()) as Hex;
}
