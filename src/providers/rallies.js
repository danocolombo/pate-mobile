import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { printObject } from '../utils/helpers';
const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};
export async function fetchActiveApprovedRallies() {
    const [plans, setPlans] = useState();
    await fetch(
        'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
        {
            method: 'POST',
            body: JSON.stringify({
                operation: 'getAllActiveApprovedEvents',
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
    )
        .then((response) => response.json())
        .then((data) => {
            printObject('data.body', data.body);
            setPlans(data.body);
            return plans;
        });
}
export async function putRally(rally) {
    console.log('WILL SAVE TO DB');
}
export async function getAllActiveMeetingsForClient(client, startDate) {
    const config = {
        headers: {
            'Access-Control-Allow-Headers':
                'Content-Type, x-auth-token, Access-Control-Allow-Headers',
            'Content-Type': 'application/json',
        },
    };
    let obj = {
        operation: 'getMeetingsOnAfterDate',
        payload: {
            clientId: client,
            date: startDate,
            direction: 'ASC',
        },
    };

    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/meetings';

    let res = await axios.post(api2use, body, config);

    var returnValue = res.data.body.Items;
    if (res.status === 200) {
        return returnValue;
    } else {
        console.log('we got no meetings');
        return null;
    }
}

export async function getMeetingsBetweenDates(
    client,
    startDate,
    stopDate,
    direction
) {
    const config = {
        headers: {
            'Access-Control-Allow-Headers':
                'Content-Type, x-auth-token, Access-Control-Allow-Headers',
            'Content-Type': 'application/json',
        },
    };
    let obj = {
        operation: 'getMeetingsBetweenDates',
        payload: {
            clientId: client,
            startDate: startDate,
            stopDate: stopDate,
            direction: direction,
        },
    };

    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/meetings';
    let res = await axios.post(api2use, body, config);
    var returnValue = res.data.body.Items;
    if (res.status === 200) {
        return returnValue;
    } else {
        console.log('we got no meetings');
        return null;
    }
}
export const fetchActiveMeetings = async () => {
    const today = getToday();
    const config = {
        headers: {
            'Access-Control-Allow-Headers':
                'Content-Type, x-auth-token, Access-Control-Allow-Headers',
            'Content-Type': 'application/json',
        },
    };
    let obj = {
        operation: 'getMeetingsOnAfterDate',
        payload: {
            clientId: 'wbc',
            date: today,
            direction: 'ASC',
        },
    };

    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/meetings';

    let res = await axios.post(api2use, body, config);
    // console.log('meetings:\n', res.data);
    return res.data;
};
export const fetchHistoricMeetings = async () => {
    //------------------------------
    // need to get two months back
    //==============================
    let twoMonthsAgo = subtractMonths(2).toJSON();

    let startDate = twoMonthsAgo.slice(0, 10);
    let target = getToday();
    const historicMeetings = await getMeetingsBetweenDates(
        'wbc',
        startDate,
        target,
        'DESC'
    );
    return historicMeetings;
};
export const deleteMeeting = async (meetingId) => {
    let obj = {
        operation: 'deleteMeeting',
        payload: {
            Key: {
                meetingId: meetingId,
            },
        },
    };

    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/meetings';

    let res = await axios.post(api2use, body, config);

    var returnValue = res.data.body;
    if (res.status === 200) {
        return returnValue;
    } else {
        console.log('we got no meetings');
        return null;
    }
};
export const addMeeting = async (newMeeting) => {
    let obj = {
        operation: 'putMeeting',
        payload: {
            Item: newMeeting,
        },
    };

    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/meetings';

    let res = await axios.post(api2use, body, config);
    var returnValue = res.data.body;
    if (res.status === 200) {
        return returnValue;
    } else {
        console.log('we got no meetings');
        return null;
    }
};
