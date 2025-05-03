import { AssertColourIsHex } from "./AssertColourIs";

export function HexToRGB(colour: Hex): RGB | RGBA {
    AssertColourIsHex(colour);

    if (colour.length >= 7) {
        const r = parseInt(colour.slice(1, 3), 16);
        const g = parseInt(colour.slice(3, 5), 16);
        const b = parseInt(colour.slice(5, 7), 16);

        if (colour.length == 7) {
            return `rgb(${r}, ${g}, ${b})` as RGB;
        } else if (colour.length == 9) {
            const a = Number(
                (parseInt(colour.slice(7, 9), 16) / 255).toPrecision(2)
            );
            return `rgb(${r}, ${g}, ${b}, ${a})` as RGBA;
        }
    }

    throw new Error("Text wasn't in the correct format.");
}
