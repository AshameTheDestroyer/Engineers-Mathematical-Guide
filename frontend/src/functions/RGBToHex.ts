export function RGBToHex(text: RGB | RGBA): HEX {
    if (!text.startsWith("rgb")) {
        throw new Error("Text wasn't in the correct format.");
    }

    return ("#" +
        text
            .replace(/rgba?\(/, "")
            .replace(")", "")
            .split(",")
            .map((c, i) =>
                Math.round(Number(c) * (i < 3 ? 1 : 255))
                    .toString(16)
                    .padStart(2, "0")
            )
            .join("")
            .toUpperCase()) as HEX;
}
