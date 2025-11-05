interface Array<T> {

    /** Finds the element with the maximum value, according to a given predicate.
     * @param predicate A function that's used to choose how to determine what values are dealt with.
     */
    maxBy<U>(predicate: (element: T) => U): T;
}

Array.prototype.maxBy = function <T, U>(predicate: (element: T) => U): T {
    const ARRAY: Array<T> = this;

    let maximum: T = ARRAY[0];
    ARRAY.forEach(element => {
        if (predicate(maximum) <= predicate(element)) { maximum = element; }
    });

    return maximum;
}