import getCurrentTheme, {CalendarDate, CalendarPeriod} from './index';
import cleanTheme from './clean';
import autumnTheme from './autumn';
import winterTheme from './winter';

describe('theme selector', () => {
    describe('getCurrentTheme', () => {
        test('It returns the clean theme in times that are not specified', () => {
            const testTheme = getCurrentTheme(new Date('6-3-1986'));
            expect(testTheme).toEqual(cleanTheme);
        });
        test('It returns the winter theme in winter', () => {
            const testTheme = getCurrentTheme(new Date('12-30-1986'));
            expect(testTheme).toEqual(winterTheme);
        });
        test('It returns the winter theme on December 21', () => {
            const testTheme = getCurrentTheme(new Date('12-21-1986'));
            expect(testTheme).toEqual(winterTheme);
        });
        test('It returns the autumn theme in autumn', () => {
            const testTheme = getCurrentTheme(new Date('11-1-1986'));
            expect(testTheme).toEqual(autumnTheme);
        });
    });
    describe('CalendarDate', () => {
        test('Accepts month and date', () => {
            const test = new CalendarDate(12, 1);
            expect(test.day).toEqual(1);
            expect(test.month).toEqual(12);
        });

        test('Accepts Javascript Date objects', () => {
            const jsDate = new Date('6-3-1986');
            const test = new CalendarDate(jsDate);
            expect(test.day).toEqual(3);
            expect(test.month).toEqual(6);
        });

        test('contains checks dates', () => {
            const test1 = new CalendarDate(7,4);
            const test2 = new CalendarDate(7,4);
            const test3 = new CalendarDate(7,5);

            expect(test1.contains(test2)).toBe(true);
            expect(test1.contains(test3)).toBe(false);
        });
    });
    describe('CalendarPeriod', () => {
        test('Works when the period starts and ends in the same month', () => {
            const period = new CalendarPeriod(new CalendarDate(11,2), new CalendarDate(11,20));
            expect(period.contains(new CalendarDate(11,1))).toBe(false);
            expect(period.contains(new CalendarDate(7,8))).toBe(false);
            expect(period.contains(new CalendarDate(11,5))).toBe(true);
            expect(period.contains(new CalendarDate(11,15))).toBe(true);            
        });
        test('Works when in adjacent months', () => {
            const period = new CalendarPeriod(new CalendarDate(11,2), new CalendarDate(12,20));
            expect(period.contains(new CalendarDate(11,1))).toBe(false);
            expect(period.contains(new CalendarDate(7,8))).toBe(false);
            expect(period.contains(new CalendarDate(11,5))).toBe(true);
            expect(period.contains(new CalendarDate(12,15))).toBe(true);
            expect(period.contains(new CalendarDate(12,30))).toBe(false);
        });
        test('Works when in an in-between month', () => {
            const period = new CalendarPeriod(new CalendarDate(10,5), new CalendarDate(12,20));
            expect(period.contains(new CalendarDate(10,1))).toBe(false);
            expect(period.contains(new CalendarDate(11,5))).toBe(true);
            expect(period.contains(new CalendarDate(11,20))).toBe(true);
            expect(period.contains(new CalendarDate(12,30))).toBe(false);
            expect(period.contains(new CalendarDate(1,15))).toBe(false);
            expect(period.contains(new CalendarDate(7,8))).toBe(false);
        });
        test('Works in a period over new years', () => {
            const period = new CalendarPeriod(new CalendarDate(10,5), new CalendarDate(3,20));
            expect(period.contains(new CalendarDate(10,1))).toBe(false);
            expect(period.contains(new CalendarDate(10,10))).toBe(true);
            expect(period.contains(new CalendarDate(2,1))).toBe(true);
            expect(period.contains(new CalendarDate(3,1))).toBe(true);
            expect(period.contains(new CalendarDate(3,25))).toBe(false);
            expect(period.contains(new CalendarDate(7,8))).toBe(false);
        });
    });
});