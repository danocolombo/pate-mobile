import axios from 'axios';
import { printObject } from '../utils/helpers';
const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};
export async function updateProfile(profile) {
    let obj = {
        operation: 'updateUser',
        payload: {
            Item: profile,
        },
    };
    let body = JSON.stringify(obj);
    printObject('body going to DBDBDBDBDBDBDBDBDBDBDB', body);
    console.log('\n###########################\n');
    let api2use = process.env.AWS_API_ENDPOINT + '/users';

    let res = await axios.post(api2use, body, config);
    var returnValue = res.data.Item;
    return returnValue;
}
