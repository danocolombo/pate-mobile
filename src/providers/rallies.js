import { even } from '@react-native-material/core';
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
    await fetch(process.env.AWS_API_ENDPOINT + '/events', {
        method: 'POST',
        body: JSON.stringify({
            operation: 'getAllActiveApprovedEvents',
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            printObject('data.body', data.body);
            setPlans(data.body);
            return plans;
        });
}
export async function getAllEventsForCoordinator(uid) {
    await fetch(process.env.AWS_API_ENDPOINT + '/events', {
        method: 'POST',
        body: JSON.stringify({
            operation: 'getEventsForRep',
            payload: {
                uid: uid,
            },
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}
export async function updateRally(rally, user) {
    let obj = {
        operation: 'insertNewEvent',
        payload: {
            Item: rally,
        },
    };
    let body = JSON.stringify(obj);
    printObject('body going to DBDBDBDBDBDBDBDBDBDBDB', body);
    console.log('\n###########################\n');
    let api2use = process.env.AWS_API_ENDPOINT + '/events';

    let res = await axios.post(api2use, body, config);
    var returnValue = res.data;
    return returnValue;
}
export async function putRally(rally, user) {
    // this function
    // 1. if no eventCompKey, create one
    // 2.
    // 3. update remote database with event object
    // 4. return submitted event object
    //
    //   NOTE: unique id is done by API and returned to us
    //--------------------------------------------------------------

    //default rally with user info
    // printObject('rally=======in putRally', rally);
    const readyEvent = {
        meal: {
            startTime: rally?.meal?.startTime ? rally.meal.startTime : '',
            mealCount: rally?.meal?.count ? rally.meal.count : 0,
            cost: rally?.meal?.cost ? rally.meal.cost : '',
            message: rally?.meal?.message ? rally.meal.message : '',
            mealsServed: rally?.meal?.served ? rally.meal.served : 0,
            deadline: rally?.meal?.deadline ? rally.meal.deadline : '30000101',
        },
        eventDate: rally?.eventDate ? rally.eventDate : '30000101',
        contact: {
            name: rally?.contact?.name ? rally.contact.name : '',
            phone: rally?.contact?.phone ? rally.contact.phone : '',
            email: rally?.contact?.email ? rally.contact.email : '',
        },
        status: rally?.status ? rally.status : 'draft',
        eventRegion: rally?.eventRegion ? rally.eventRegion : 'test',
        region: rally?.region ? rally.region : 'us#east',
        message: rally?.eventMessage ? rally.eventMessage : '',
        stateProv: rally?.stateProv ? rally.stateProv : '',
        coordinator: {
            name: rally?.coordinator?.name
                ? rally.coordinator.name
                : user.firstName + ' ' + user.lastName,
            id: rally?.coordinator?.id ? rally.coordinator.id : user.uid,
            phone: rally?.coordinator?.phone
                ? rally.coordinator.phone
                : user.phone,
            email: rally?.coordinator?.email
                ? rally.coordinator.email
                : user.email,
        },
        uid: rally?.uid ? rally.uid : '',
        name: rally?.name ? rally.name : '',
        registrations: rally?.registrations ? rally.registrations : 0,
        startTime: rally?.startTime ? rally.startTime : '00:00',
        city: rally?.city ? rally.city : '',
        graphic: rally?.graphic ? rally.graphic : '',
        approved: rally?.approved ? rally.approved : false,
        attendees: rally?.attendees ? rally.attendees : 0,
        endTime: rally?.endTime ? rally.endTime : '00:00',
        id: rally?.id ? rally.id : '',
        postalCode: rally?.postalCode ? rally.postalCode : '',
        street: rally?.street ? rally.street : '',
    };
    //always update the eventCompKey
    // Year#Month#State#Day#UID#Coordinator.id
    const yr = readyEvent.eventDate.substr(0, 4);
    const mo = readyEvent.eventDate.substr(4, 2);
    const da = readyEvent.eventDate.substr(6, 2);
    //==========================================
    // NOTE: if new rally, uid will blank
    let eventCompKey =
        yr +
        '#' +
        mo +
        '#' +
        readyEvent.stateProv +
        '#' +
        da +
        '#' +
        readyEvent?.uid
            ? readyEvent.uid
            : 'TBD' + '#' + readyEvent.coordinator.id;
    readyEvent.eventCompKey = eventCompKey;

    let obj = {
        operation: 'insertNewEvent',
        payload: {
            Item: readyEvent,
        },
    };
    printObject('obj to DBDBDBDBDBDBDBDBDBDBDB', obj);
    console.log('\n###########################\n');
    let body = JSON.stringify(obj);
    printObject('body going to DBDBDBDBDBDBDBDBDBDBDB', body);
    console.log('\n###########################\n');
    let api2use = process.env.AWS_API_ENDPOINT + '/events';

    let res = await axios.post(api2use, body, config);
    console.log('WANT TO RETURN.....', res);
    var returnValue = res.data;
    return returnValue;
}
