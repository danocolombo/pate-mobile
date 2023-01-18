import { format } from 'date-fns';
import moment from 'moment/moment';

const SHORT_MONTH = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
};
export function getFormattedDate(date) {
    return date.toISOString().slice(0, 10);
}
export function dateNumToJSDate(dateNum) {
    // YYYYMMDD to JSDate
    if (!dateNum) {
        return null;
    }
    if (dateNum.length < 8) {
        return null;
    }
    const year = +dateNum.substring(0, 4);
    const month = +dateNum.substring(4, 6);
    const day = +dateNum.substring(6, 8);
    const javaScriptDate = new Date(year, month - 1, day);
    return javaScriptDate;
}

export function dateNumsToLongDayLongMondayDay(dateNum) {
    if (!dateNum) {
        return null;
    }
    // YYYYMMDD to long date
    const convDate = dateNumToJSDate(dateNum);
    const result = format(convDate, 'EEEE, LLLL do');
    return result;
}
export function awsDateToLongDayLongMondayDay(dateNum) {
    //remove dashes
    //console.log('DATE:47-->', dateNum);
    //var newDate = dateNum.replace(/-/g, ''); // 20231210

    if (!newDate) {
        return null;
    }
    // YYYYMMDD to long date
    const convDate = dateNumToJSDate(newDate);
    const result = format(convDate, 'EEEE, LLLL do');
    return result;
}
export function dateNumToDateDash(dateNum) {
    // converts YYYYMMDD to YYYY-MM-DD
    if (!dateNum) {
        return null;
    }
    if (dateNum.length !== 8) {
        return '';
    }
    const y = dateNum.substr(0, 4);
    const m = dateNum.substr(4, 2);
    const d = dateNum.substr(6);
    const returnValue = y + '-' + m + '-' + d;
    return returnValue;
}
export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
export function subtractMonths(numOfMonths, date = new Date()) {
    date.setMonth(date.getMonth() - numOfMonths);

    return date;
}
export function isDateDashBeforeToday(dateDash) {
    // uses dashDate yyyy-mm-dd
    //check if we have any dashes
    if (!dateDash) {
        return null;
    }
    let dashPos = dateDash.indexOf('-');
    if (dashPos === -1) {
        return null;
    }
    let datePart = dateDash.split('-');
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
export function dateNumToDisplayTime(numTime) {
    if (!numTime) {
        return null;
    }
    // 1330 or 13:30 to 1:30 PM
    let A = '';
    let B = '';
    let confirmedValue;
    // the length of numTime can only be 4 or 5 characters, if not return ""
    if (numTime.length < 4 || numTime.length > 5) {
        console.log('1');
        return '';
    }
    if (numTime.length === 4) {
        const colon = numTime.indexOf(':');
        if (colon === -1) {
            //no colon, split the numbers and stick colon in.
            A = numTime.substr(0, 2);
            B = numTime.substr(2);
            let returnValue = A + ':' + B;
            confirmedValue = returnValue;
        } else {
            let parts = numTime.split(':');
            let returnValue = parts[0] + ':' + parts[1];
            confirmedValue = returnValue;
        }
    } else if (numTime.length === 5) {
        const colon = numTime.indexOf(':');
        if (colon === -1) {
            return '';
        } else {
            confirmedValue = numTime;
        }
    }
    let timeParts = confirmedValue.split(':');

    // Get the hours of 29 February 2012 11:45:00:
    try {
        const result = new Date(2012, 1, 29, timeParts[0], timeParts[1]);
        const returnTime = format(result, 'h:mm a');
        return returnTime;
    } catch (error) {
        return '';
    }
}
export function awsTimeToDisplayTime(numTime) {
    // need to get the UTC time to numTime
    const moment = require('moment-timezone');
    const dateString = '16:00:00.000-05:00';
    const time = moment.tz(numTime, 'HH:mm:ss.SSSZ', 'UTC').format('h:mmA');

    if (!time) {
        return null;
    }
    // 1330 or 13:30 to 1:30 PM
    let A = '';
    let B = '';
    let confirmedValue;
    // the length of numTime can only be 4 or 5 characters, if not return ""
    if (time.length < 4 || time.length > 5) {
        console.log('1');
        return '';
    }
    if (time.length === 4) {
        const colon = time.indexOf(':');
        if (colon === -1) {
            //no colon, split the numbers and stick colon in.
            A = time.substr(0, 2);
            B = time.substr(2);
            let returnValue = A + ':' + B;
            confirmedValue = returnValue;
        } else {
            let parts = time.split(':');
            let returnValue = parts[0] + ':' + parts[1];
            confirmedValue = returnValue;
        }
    } else if (time.length === 5) {
        const colon = time.indexOf(':');
        if (colon === -1) {
            return '';
        } else {
            confirmedValue = time;
        }
    }
    let timeParts = confirmedValue.split(':');

    // Get the hours of 29 February 2012 11:45:00:
    try {
        const result = new Date(2012, 1, 29, timeParts[0], timeParts[1]);
        const returnTime = format(result, 'h:mm a');
        return returnTime;
    } catch (error) {
        return '';
    }
}
export function displayAWSTime(awsTime) {
    //  this converts AWSTime to 12-hour time format.
    // 13:00.000-05.00 => 1:00PM
    //-------------------
    // create date object
    // console.log('awsTime:', awsTime);
    var moment = require('moment');
    var date = moment(awsTime, 'HH:mm:ss.sssZ').format('h:mm A');
    return date; // "1:00:00 PM"

    const tm = awsTime;
    var date = new Date(tm);
    var options = { hour: 'numeric', minute: 'numeric', hour12: true };
    var formattedTime = date.toLocaleString('en-US', options);
    return formattedTime;
}
export function getPateDate(dateTimeNumber) {
    // takes dateStamp and returns YYYYMMDD
    // this gets the time dateStamp and returns P8 date string "YYYYMMDD"
    let inputDate = new Date(dateTimeNumber);

    let yr = String(inputDate.getFullYear());
    let mo = String(inputDate.getMonth() + 1);
    let da = String(inputDate.getDate());
    // now see if we need to add zero to month
    if (parseInt(mo) < 10) {
        mo = '0' + mo;
    }
    // now see if we need to add zero to day of month
    if (parseInt(da) < 10) {
        da = '0' + da;
    }
    let returnValue = yr + mo + da;
    return returnValue;
}
export function getPateTime(dateTimeNumber) {
    // dateTimeStamp to 1230
    let inputDate = new Date(dateTimeNumber);
    let h = String(inputDate.getHours());
    let m = String(inputDate.getMinutes());
    //add zeros if necessary
    if (parseInt(h) < 10) {
        h = '0' + h;
    }
    if (parseInt(m) < 10) {
        m = '0' + m;
    }
    let returnValue = h + m;
    return returnValue;
}
export function pateDateToSpinner(pDate) {
    // this takes in pateDate (YYYYMMDD) and returns Date object
    //break apart
    let y = pDate.substring(0, 4);
    let m = pDate.substring(4, 6);
    let d = pDate.substring(6);
    let date = new Date(y, m - 1, d);
    return date;
}
export function pateDateToShortMonthDay(pDate) {
    let y = pDate.substring(0, 4);
    let m = pDate.substring(4, 6);
    let d = pDate.substring(6);
    let mo = SHORT_MONTH[parseInt(m)];
    let returnDate = mo + ' ' + d;
    return returnDate;
}
export function convertPateDate(pDate) {
    //break apart
    let y = pDate.substring(0, 4);
    let m = pDate.substring(4, 6);
    let d = pDate.substring(6);
    let date = new Date(y, m - 1, d);
    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };
    let returnValue = date.toLocaleDateString('en-us', options);
    return returnValue;
}
export function convertPateTime(pTime) {
    //break apart, always 2 digits and 2 digits
    let ho = pTime.substring(0, 2);
    let mi = pTime.substring(2);
    //determine if AM or PM
    let half = 'AM';
    if (parseInt(ho) < 12) {
        half = 'AM';
    } else {
        half = 'PM';
    }
    if (parseInt(ho) < 13) {
        ho = ho * 1; // this gets rid of leading zero if applicable
    } else {
        ho = ho - 12;
    }
    let returnValue = ho + ':' + mi + ' ' + half;
    return returnValue;
}
export function pateTimeToSpinner(pDate, pTime) {
    //this takes pDate and pTime and returns date object
    let y = pDate.substring(0, 4);
    let m = pDate.substring(4, 6);
    let d = pDate.substring(6);
    let date = new Date(y, m - 1, d);

    //break apart, always 2 digits and 2 digits
    let ho = pTime.substring(0, 2);
    let mi = pTime.substring(3);

    date.setHours(ho);
    date.setMinutes(mi);

    return date;
}
