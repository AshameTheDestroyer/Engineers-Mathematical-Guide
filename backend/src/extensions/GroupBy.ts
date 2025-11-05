interface Array<T> {

    /** Groups the array's element by a specified factor.
     * @param {predicate} predicate A function that takes an element and return a grouping factor.
     */
    groupBy<U>(predicate: (element: T) => U): Map<U, Array<T>>;
}

Array.prototype.groupBy = function <T, U>(predicate: (element: T) => U): Map<U, Array<T>> {
    const groups: Map<U, Array<T>> = new Map();

    this.forEach(element => {
        const group: U = predicate(element);

        if (!groups.has(group)) { groups.set(group, [element]); return; }
        groups.set(group, [...groups.get(group) ?? [], element]);
    });

    return groups;
}