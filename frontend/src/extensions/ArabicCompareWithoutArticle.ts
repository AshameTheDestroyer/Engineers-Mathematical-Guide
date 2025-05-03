interface String {
    /** Compares to another arabic words, ignoring articles. */
    arabicCompareWithoutArticle(other: string): number;
}

String.prototype.arabicCompareWithoutArticle = function (
    other: string
): number {
    let currentValue: string = this as string;
    const articleRegex = /^ال|^لل/;

    return currentValue
        .replace(articleRegex, "")
        .localeCompare(other.replace(articleRegex, ""));
};
