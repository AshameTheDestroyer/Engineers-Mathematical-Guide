interface Number {

    /** Converts the number into an nth style string. */
    toNth(): string;
}

Number.prototype.toNth = function (): string {
    let value: number = this as number;

    if (Number.isNaN(value)) { return "NaN"; }
    if (value <= 0) { return value.toString(); }

    return value + ((): string => {
        if (11 <= value && value <= 13) { return "th"; }

        switch (value.toString().at(-1)) {
            case "1": return "st";
            case "2": return "nd";
            case "3": return "rd";
            default: return "th";
        }
    })();
}