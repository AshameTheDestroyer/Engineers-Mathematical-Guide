export function GenerateTextShadow(
    options: {
        blur?: number;
        colour?: string;
        thickness?: number;
    } = {}
) {
    const { thickness = 0.75, blur = 0, colour = "black" } = options;

    return [
        [-1, -1],
        [-1, +1],
        [+1, -1],
        [+1, +1],
    ]
        .map(([x, y]) => [x * thickness, y * thickness])
        .map(([x, y]) => `${x}px ${y}px ${blur}px ${colour}`)
        .join();
}
