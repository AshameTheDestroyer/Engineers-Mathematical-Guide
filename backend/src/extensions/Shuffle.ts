interface Array<T> {

    /** Rearranges the array randomly. */
    shuffle(): Array<T>;
}

Array.prototype.shuffle = function <T>(): Array<T> {
    const ARRAY: Array<T> = this;
    return ARRAY.sort((_a, _b) => Math.random() - 0.5);
}