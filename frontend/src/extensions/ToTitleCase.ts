interface String {
    /** Converts all alphabetic characters that are the start of a word, to uppercase. */
    toTitleCase(...fullyCapitalize: Array<string>): string;
}

String.prototype.toTitleCase = function (
    ...fullyCapitalize: Array<string>
): string {
    let currentValue: string = this as string;
    const uncapitalizeableWords =
        "a an the in on at to by for of with about as into off onto per than up via and but or nor yet so is was are were be am";

    return currentValue
        .split(/[\ |\-\_]/)
        .map((word, i) =>
            fullyCapitalize.includes(word)
                ? word.toUpperCase()
                : i > 0 && uncapitalizeableWords.includes(word)
                  ? word
                  : `${word[0].toUpperCase()}${word.slice(1)}`
        )
        .join(" ");
};
