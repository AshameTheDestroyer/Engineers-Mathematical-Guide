interface String {

    /** Trims all spaces from the text into one space, (except the first and last one). */
    trimAll(): string;
}

String.prototype.trimAll = function (): string {
    let currentValue: string = (this as string).trim(),
        previousValue: string = currentValue;

    do {
        previousValue = currentValue;
        currentValue = currentValue.replaceAll("  ", " ");
    } while (previousValue != currentValue);

    return currentValue;
}