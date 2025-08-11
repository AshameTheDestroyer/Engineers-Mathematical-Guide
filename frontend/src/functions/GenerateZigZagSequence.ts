export type GenerateZigZagSequenceOptions = {
    gap?: number;
    seed: number;
    length: number;
    minima?: number;
    maxima?: number;
    threshold?: number;
    startAtCenter?: boolean;
};

export function GenerateZigZagSequence({
    seed,
    length,
    gap = 5,
    minima = 0,
    maxima = 100,
    threshold = 0.35,
    startAtCenter = false,
}: GenerateZigZagSequenceOptions): number[] {
    let currentSeed = seed;
    const random = (): number => {
        currentSeed = (currentSeed * 9301 + 49297) % 233280;
        return currentSeed / 233280;
    };

    const result: number[] = [];

    const startValue = startAtCenter
        ? (minima + (maxima - minima)) / 2
        : minima + random() * (maxima - minima);
    let currentValue = Math.round(startValue);
    let increasing = random() < 0.5;

    result.push(currentValue);

    for (let i = 1; i < length; i++) {
        if (currentValue <= minima) {
            increasing = true;
        } else if (currentValue >= maxima) {
            increasing = false;
        } else if (random() < threshold) {
            increasing = !increasing;
        }

        currentValue = increasing ? currentValue + gap : currentValue - gap;
        currentValue = Math.max(minima, Math.min(maxima, currentValue));
        result.push(currentValue);
    }

    return result;
}
