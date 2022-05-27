import { format } from 'date-fns';

export function getFormattedDate(date) {
    return date.toISOString().slice(0, 10);
}
export function dateNumToJSDate(dateNum) {
    const year = +dateNum.substring(0, 4);
    const month = +dateNum.substring(4, 6);
    const day = +dateNum.substring(6, 8);
    const javaScriptDate = new Date(year, month - 1, day);
    return javaScriptDate;
}

export function dateNumsToLongDayLongMondayDay(dateNum) {
    const convDate = dateNumToJSDate(dateNum);
    const result = format(convDate, 'EEEE, LLLL do');
    return result;
}

export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
export function subtractMonths(numOfMonths, date = new Date()) {
    date.setMonth(date.getMonth() - numOfMonths);

    return date;
}
export function isDateBeforeToday(meetingDate) {
    let datePart = meetingDate.split('-');
    //need to increment month
    let mo = parseInt(datePart[1] - 1);
    let mDate = new Date(parseInt(datePart[0]), mo, parseInt(datePart[2]));
    let testDate = new Date(mDate.toDateString());
    return testDate < new Date(new Date().toDateString());
}
export function getToday() {
    var d = new Date();
    d.setDate(d.getDate() - 1); // date - one
    const dminusone = d.toLocaleString(); //  M/DD/YYYY, H:MM:SS PM
    let datetime = dminusone.split(', '); // M/DD/YYYY
    const dateparts = datetime[0].split('/');
    const yr = dateparts[2];
    const mn = dateparts[0] < 10 ? '0' + dateparts[0] : dateparts[0];
    const da = dateparts[1] < 10 ? '0' + dateparts[1] : dateparts[1];
    const target = yr + '-' + mn + '-' + da;
    return target;
}
export function numTimeToDisplayTime(numTime) {
    // numTime expecting something like 13:30 which would be 1:30pm
    let timeParts = numTime.split(':');

    // Get the hours of 29 February 2012 11:45:00:
    const result = new Date(2012, 1, 29, timeParts[0], timeParts[1]);
    const returnTime = format(result, 'h:mm a');
    return returnTime;
}
