interface Array<T> {
    /** Returns a new array with specified items moved to the front in the given order, whilst the remaining items follow in their original relative order. */
    prioritize(priorityArray: Array<T>): Array<T>;
}

Array.prototype.prioritize = function <T>(priorityArray: Array<T>): Array<T> {
    const ARRAY: Array<T> = this;
    return priorityArray.length == 0
        ? ARRAY
        : [
              ...priorityArray.filter((item) => ARRAY.includes(item)),
              ...ARRAY.filter((item) => !priorityArray.includes(item)),
          ];
};
