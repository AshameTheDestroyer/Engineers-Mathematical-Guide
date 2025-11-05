interface Array<T> {

    /** Chooses an element randomly from the array. */
    chooseRandomly(): T;
}

Array.prototype.chooseRandomly = function <T>(): T {
    const ARRAY: Array<T> = this;
    return ARRAY[~~(Math.random() * ARRAY.length)];
}