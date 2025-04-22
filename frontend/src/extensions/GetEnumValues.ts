interface ObjectConstructor {
    /**
     * Extracts the values of an enum as an array.
     * @param enum_ The enum object from which to extract values.
     */
    getEnumValues: <T extends Enum>(enum_: T) => ExtractEnumValues<T>;
}

Object.getEnumValues = <T extends Enum>(enum_: T): ExtractEnumValues<T> => {
    return Object.values(enum_) as unknown as ExtractEnumValues<T>;
};
