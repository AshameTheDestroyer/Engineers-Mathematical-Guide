interface String {
    /** Trims all spaces from the text into one space, (except the first and last one). */
    trimAll(): string;
}

String.prototype.trimAll = function (): string {
    return this.trim().replace(/\s+/g, " ");
};
