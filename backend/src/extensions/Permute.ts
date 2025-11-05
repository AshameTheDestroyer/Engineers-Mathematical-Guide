interface Array<T> {

    /** Reorders all the element within the array to be in each order possible. */
    permute(): Array<Array<T>>;
}

Array.prototype.permute = function <T>(): Array<Array<T>> {
    const array: Array<T> = this as Array<T>;

    if (!array.length) { return []; }
    if (array.length == 1) { return [array]; }
    if (array.length == 2) {
        return [
            [array[0], array[1]],
            [array[1], array[0]],
        ];
    }

    const fullArray: Array<Array<T>> = [];
    for (let i: number = 0; i < array.length; i++) {
        let restArray: Array<Array<T>> =
            array.filter((_, i_) => i != i_).permute();

        for (let j: number = 0; j < restArray.length; j++) {
            fullArray.push([array[i], ...restArray[j]]);
        }
    }

    return fullArray;
}