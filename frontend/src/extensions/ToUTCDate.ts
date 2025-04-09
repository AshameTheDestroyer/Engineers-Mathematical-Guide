interface Date {
    /** Returns the number of milliseconds between this date and the date midnight, January 1, 1970 Universal Coordinated Time (UTC). */
    toUTCDate(): number;
}

Date.prototype.toUTCDate = function (): number {
    const date: Date = this;
    return Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    );
};
