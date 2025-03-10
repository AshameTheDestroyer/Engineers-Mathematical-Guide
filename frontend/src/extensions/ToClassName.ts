interface Array<T> {

    /** Joins all the items within the array into a class name, (after removing all nullish ones). */
    toClassName(): string;
}

Array.prototype.toClassName = function (): string {
    return (this as Array<any>).filter(item => item != null && item != "" && item != " ").join(" ");
}