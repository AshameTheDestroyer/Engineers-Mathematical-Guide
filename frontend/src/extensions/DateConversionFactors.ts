interface DateConstructor {
    /** Returns the multiplicative quantity of each unit and its next. */
    conversionFactors: {
        /** Returns the number of milliseconds in one second. */
        millisecondsInSecond: number;
        /** Returns the number of seconds in one minute. */
        secondsInMinute: number;
        /** Returns the number of minutes in one hour. */
        minutesInHour: number;
        /** Returns the number of hours in one day. */
        hoursInDay: number;
        /** Returns the number of days in one month. */
        daysInMonth: number;
        /** Returns the number of months in one year. */
        monthsInYear: number;
        /** Returns the number of years in one century. */
        yearsInCentury: number;
    };
}

Date.conversionFactors = {
    millisecondsInSecond: 1000,
    secondsInMinute: 60,
    minutesInHour: 60,
    hoursInDay: 24,
    daysInMonth: 30.44,
    monthsInYear: 11.999,
    yearsInCentury: 100,
};
