interface ObjectConstructor {
    /**
     * Dynamically picks specified properties from an object and returns a new object containing only those properties.
     * @param object - The source object from which properties will be picked, must be a non-null object.
     * @param props - An array of property names to include in the resulting object.
     */
    pick<T extends object, Key extends keyof T>(
        object: T,
        ...props: Array<Key>
    ): Pick<T, Key>;
}

Object.pick = function <T extends object, Key extends keyof T>(
    object: T,
    ...props: Array<Key>
): Pick<T, Key> {
    if (typeof object != "object" || object == null) {
        throw new TypeError("First argument must be an object.");
    }

    return props.reduce(
        (accumulator, prop) => {
            if (prop in object) {
                accumulator[prop] = object[prop];
            }

            return accumulator;
        },
        {} as Pick<T, Key>
    );
};
