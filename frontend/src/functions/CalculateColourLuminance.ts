import { DestructureRGB } from "./DestructureRGB";
import { AssertColourIsRGB } from "./AssertColourIs";

export function CalculateColourLuminance(colour: RGB | RGBA): number {
    AssertColourIsRGB(colour);
    const { r, g, b } = DestructureRGB(colour);

    const normalize = (x: number) => {
        const normalized = x / 255;
        return normalized <= 0.03928
            ? normalized / 12.92
            : Math.pow((normalized + 0.055) / 1.055, 2.4);
    };

    const r_ = normalize(r);
    const g_ = normalize(g);
    const b_ = normalize(b);

    return 0.299 * r_ + 0.587 * g_ + 0.114 * b_;
}

export function IsDarkColour(colour: RGB | RGBA): boolean {
    return CalculateColourLuminance(colour) < 0.5;
}
