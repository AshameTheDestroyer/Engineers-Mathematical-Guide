export function AssertColourIsRGB(
    colour: string
): asserts colour is RGB | RGBA {
    if (
        !colour.match(/rgb\(\d{1,3}, ?\d{1,3}, ?\d{1,3}\)/g) &&
        !colour.match(/rgba\(\d{1,3}, ?\d{1,3}, ?\d{1,3}, ?\d*\.?\d*\)/g)
    ) {
        throw new Error("Text wasn't in the correct format.");
    }
}

export function AssertColourIsHex(colour: string): asserts colour is Hex {
    if (
        !colour.match(/#[\d,a,b,c,d,e,f,A,B,C,D,E,F]{6}/g) &&
        !colour.match(/#[\d,a,b,c,d,e,f,A,B,C,D,E,F]{8}/g)
    ) {
        throw new Error("Text wasn't in the correct format.");
    }
}
