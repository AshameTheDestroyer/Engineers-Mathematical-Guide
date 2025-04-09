interface DateConstructor {
    /** Returns the number of milliseconds (or other units) between two dates. */
    between(
        date1: Date,
        date2: Date,
        unit?: `${Exclude<DateUnit, "century">}s` | "centuries",
        options?: {
            rounding:
                | "none"
                | Include<keyof typeof Math, "round" | "ceil" | "floor">;
        }
    ): number;
}

Date.between = function (
    date1,
    date2,
    unit = "milliseconds",
    options = { rounding: "none" }
) {
    const result =
        Math.abs(date1.toUTCDate() - date2.toUTCDate()) *
        Date.convertUnit({ from: "milliseconds", to: unit });

    return options.rounding != "none" && options.rounding in Math
        ? Math[options.rounding](result)
        : result;
};
