interface Array<T> {
    /** Returns a new array containing elements from the provided "otherArray" that have matching values for the specified key in the original array.
     * @param otherArray The array to compare against.
     * @param key The key by which to compare object properties.
     */
    intersectionBy(otherArray: Array<T>, key: keyof T): Array<T>;
}

Array.prototype.intersectionBy = function <T>(
    otherArray: Array<T>,
    key: keyof T
): Array<T> {
    const lookup = new Set(this.map((item) => item?.[key]));
    return otherArray.filter((item) => lookup.has(item?.[key]));
};
