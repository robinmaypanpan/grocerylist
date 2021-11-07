export class CalendarDate {
    constructor(month, day) {
        if (month instanceof Date) {
            this.month = month.getMonth() + 1;
            this.day = month.getDate();
        } else {
            this.month = month;
            this.day = day;
        }
    }

    contains(currentDate) {
        return currentDate.day === this.day && currentDate.month === this.month;
    }
}

export class CalendarPeriod {
    constructor (startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    contains(currentDate) {
        if (this.startDate.month === currentDate.month) {
            // The period starts and ends in the same month, so fully check the day
            return currentDate.day >= this.startDate.day && currentDate.day <= this.endDate.day;
        } else if (currentDate.month === this.startDate.month) {
            // We are in the same month as when this starts. Check the day!
            return currentDate.day >= this.startDate.day;
        } else if (currentDate.month === this.endDate.month) {
            // We are in the same month as when this period ends.  Check the day!
            return currentDate.day <= this.endDate.day;
        } else if (this.startDate.month > this.endDate.month) {
            // The period goes over new years, so we need to check two periods
            return (currentDate.month >= this.startDate.month && currentDate.month <= 12) || (currentDate.month >= 1 && currentDate.month <= this.endDate.month);
        } else if (currentDate.month > this.startDate.month && currentDate.month < this.endDate.month) {
            // Our month is strictly between the start and end months, so we're good
            return true;
        } else {
            // We're not in the middle of the dates
            return false;
        }
    }
}

const MARCH_EQUINOX = new CalendarDate(2, 20);
const JUNE_SOLSTICE = new CalendarDate(5, 21);
const SEPTEMBER_EQUINOX = new CalendarDate(8, 23);
const DECEMBER_SOLSTICE = new CalendarDate(11, 21);
const NEW_YEAR = new CalendarDate(0, 1);
const NEW_YEARS_EVE = new CalendarDate(12, 31);

// We pick the first theme that matches the conditions.
const themes = [
    [new CalendarPeriod(DECEMBER_SOLSTICE, MARCH_EQUINOX), require('./winter').default],
    [new CalendarPeriod(SEPTEMBER_EQUINOX, DECEMBER_SOLSTICE), require('./autumn').default],
    [new CalendarPeriod(NEW_YEAR, NEW_YEARS_EVE), require('./clean').default], // Default theme
];

export default function getCurrentTheme(testDate) {
    const today = new CalendarDate(testDate || new Date());

    return themes.find(([period, theme]) => period.contains(today))[1];
}