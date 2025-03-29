export function HexToRGB(text: Hex): RGB | RGBA {
    if (
        isNaN(parseInt(text.replace("#", ""), 16)) ||
        !text.startsWith("#") ||
        text.length < 7 ||
        text.length > 9
    ) {
        throw new Error("Text wasn't in the correct format.");
    }

    if (text.length >= 7) {
        const r = parseInt(text.slice(1, 3), 16);
        const g = parseInt(text.slice(3, 5), 16);
        const b = parseInt(text.slice(5, 7), 16);

        if (text.length == 7) {
            return `rgb(${r}, ${g}, ${b})` as RGB;
        } else if (text.length == 9) {
            const a = Number(
                (parseInt(text.slice(7, 9), 16) / 255).toPrecision(2)
            );
            return `rgb(${r}, ${g}, ${b}, ${a})` as RGBA;
        }
    }

    throw new Error("Text wasn't in the correct format.");
}
