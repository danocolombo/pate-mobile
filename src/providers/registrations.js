import axios from 'axios';
import { printObject } from '../utils/helpers';
const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};
export async function getRegistrarsForEvent(eid) {
    //this will need to join users

    let obj = {
        operation: 'getRegistrationsForEvent',
        payload: {
            eid: eid,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/registrations';

    let res = await axios.post(api2use, body, config);
    var returnValue = res;
    return returnValue;
}
export async function deleteRegistration(reg) {
    let obj = {
        operation: 'deleteRegistration',
        payload: {
            Key: {
                uid: reg.uid,
            },
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/registrations';
    //console.log('body:', body);
    //console.log('api2use', api2use);
    await axios
        .post(api2use, body, config)
        .then((response) => {
            console.log('R:40-->DDB deleteRegistration successful');
        })
        .catch((error) => {
            console.log('R:43-->error deleting registration');
            console.log(error);
        });
}
