interface String {
    /** Converts all alphabetic characters that are the start of a word, to uppercase. */
    toTitleCase(): string;
}

String.prototype.toTitleCase = function (): string {
    let currentValue: string = this as string;
    const uncapitalizeableWords =
        "a an the in on at to by for of with about as into off onto per than up via and but or nor yet so is was are were be am";

    return currentValue
        .split(/[\ |\-\_]/)
        .map((word) =>
            uncapitalizeableWords.includes(word)
                ? word
                : `${word[0].toUpperCase()}${word.slice(1)}`
        )
        .join(" ");
};
