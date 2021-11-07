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
        if ( currentDate.month === this.startDate.month && this.startDate.month === this.endDate.month) {
            // The period starts and ends in the same month, and we're in that month, so fully check the day
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

// Convenience functions
const cd = (m,d) => new CalendarDate(m, d);
const cp = (s,e) => new CalendarPeriod(s, e);

const MARCH_EQUINOX = new CalendarDate(3, 20);
const JUNE_SOLSTICE = new CalendarDate(6, 21);
const SEPTEMBER_EQUINOX = new CalendarDate(9, 23);
const DECEMBER_SOLSTICE = new CalendarDate(12, 21);
const NEW_YEAR = new CalendarDate(1, 1);
const NEW_YEARS_EVE = new CalendarDate(12, 31);

// We pick the first theme that matches the conditions.
const themes = [
    [cp(cd(12,24), cd(12,26)), require('./xmas').default],
    [cp(DECEMBER_SOLSTICE, MARCH_EQUINOX), require('./winter').default],
    [cp(SEPTEMBER_EQUINOX, DECEMBER_SOLSTICE), require('./autumn').default],
    [cp(NEW_YEAR, NEW_YEARS_EVE), require('./clean').default], // Default theme
];

export default function getCurrentTheme(testDate) {
    const today = new CalendarDate(testDate || new Date());

    return themes.find(([period, theme]) => period.contains(today))[1];
}