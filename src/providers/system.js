import axios from 'axios';
import { printObject } from '../utils/helpers';
const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};
export async function getRegionByAffiliateStateProv(affiliate, stateProv) {
    let obj = {
        operation: 'getRegionByAffiliateStateProv',
        payload: {
            affiliate: affiliate,
            stateProv,
            stateProv,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/regions';

    let res = await axios.post(api2use, body, config);
    var returnValue = res.data;
    return returnValue;
}
