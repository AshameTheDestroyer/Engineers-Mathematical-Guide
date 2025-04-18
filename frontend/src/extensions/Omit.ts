interface ObjectConstructor {
    /**
     * Dynamically omits specified properties from an object and returns a new object excluding those properties.
     * @param object - The source object from which properties will be omitted, must be a non-null object.
     * @param props - An array of property names to exclude from the resulting object.
     */
    omit<T extends object, Key extends keyof T>(
        object: T,
        ...props: Array<Key>
    ): Omit<T, Key>;
}

Object.omit = function <T extends object, Key extends keyof T>(
    object: T,
    ...props: Array<Key>
): Omit<T, Key> {
    if (typeof object != "object" || object == null) {
        throw new TypeError("First argument must be an object.");
    }

    return Object.keys(object).reduce(
        (accumulator, key) => {
            if (!props.includes(key as Key)) {
                // @ts-ignore
                accumulator[key as Key] = object[key as Key];
            }
            return accumulator;
        },
        {} as Omit<T, Key>
    );
};
