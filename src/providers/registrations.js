import axios from 'axios';
import { printObject } from '../utils/helpers';
const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};
export async function getRegistrarsForEvent(eid) {
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
