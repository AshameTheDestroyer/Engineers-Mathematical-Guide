interface String {

    /** Converts all alphabetic characters that are the start of a word, to uppercase. */
    toTitleCase(): string;
}

String.prototype.toTitleCase = function (): string {
    let currentValue: string = this as string;

    return currentValue
        .split(" ")
        .map(word => (word.length == 1) ? word : `${word[0].toUpperCase()}${word.slice(1)}`)
        .join(" ");
}