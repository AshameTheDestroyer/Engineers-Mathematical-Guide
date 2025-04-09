interface DateConstructor {
    /** Returns the number of milliseconds between this date and the date midnight, January 1, 1970 Universal Coordinated Time (UTC). */
    convertUnit(
        props: Record<
            "from" | "to",
            `${Exclude<DateUnit, "century">}s` | "centuries"
        >
    ): number;
}

Date.convertUnit = function ({ from, to }) {
    function GetToUnit(key: `${string}In${string}`) {
        const toUnit = key.substring(key.indexOf("In") + 2).toLocaleLowerCase();
        return toUnit == "century" ? "centuries" : toUnit + "s";
    }

    const conversionFactors = Object.entries(Date.conversionFactors)
        .reduce(
            (accumulator, [key, value]) => [
                ...accumulator,
                {
                    [GetToUnit(key as keyof typeof Date.conversionFactors)]:
                        value *
                        Object.values(accumulator.at(-1) ?? { 0: 1 })[0],
                },
            ],
            [] as Array<Record<string, number>>
        )
        .reduce((accumulator, factor) => ({ ...accumulator, ...factor }), {
            milliseconds: 1,
        });

    return conversionFactors[from] / conversionFactors[to];
};
