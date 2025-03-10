interface Array<T> {

    /** Zips this array into another one, mainly merges each adjacent elements via a specified predicate.
     * @param otherArray The other array that this one will be zipped into.
     * @param predicate A function that determines how the each adjacent elements will be merged.
     * @param emptyValues The values that'll replace the none zipped elements.
     */
    zip<U, V>(otherArray: Array<U>, predicate: (a: T, b: U) => V, emptyValues?: [T?, U?]): Array<V>;
}

Array.prototype.zip = function <T, U, V>(otherArray: Array<U>, predicate: (a: T, b: U) => V, emptyValues?: [T?, U?]): Array<V> {
    const
        originalArray: Array<T> = this as Array<T>,
        resultArray: Array<V> = [],
        LENGTH: number = (emptyValues === undefined) ?
            Math.min(originalArray.length, otherArray.length) :
            Math.max(originalArray.length, otherArray.length);

    for (let i: number = 0; i < LENGTH; i++) {
        resultArray.push(predicate(
            originalArray[i] ?? emptyValues![0]!,
            otherArray[i] ?? emptyValues![1]!
        ));
    }

    return resultArray;
}