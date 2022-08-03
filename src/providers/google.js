import axios from 'axios';
import { printObject } from '../utils/helpers';
const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};

export async function getGeoCode(address) {
    let body = JSON.stringify(obj);
    let api2use =
        process.env.GOOGLE_API_ENDPOINT +
        address +
        '&key=' +
        process.env.GOOGLE_API_KEY;
    try {
        let res = await axios.post(api2use);
        if (res.data.statusCode === 200) {
            //now get the lat and long from response
            return returnValue;
        } else {
            let errorReturn = {};
            errorReturn.statusCode = 400;
            errorReturn.message = 'error returned from API call';
            errorReturn.error = res.data;
            return errorReturn;
        }
    } catch (err) {
        console.log('error getGeoCode:', err);
        let errorReturn = {};
        errorReturn.statusCode = 400;
        errorReturn.message = 'Exception error trying api call (google.js:34';
        errorReturn.error = err;
        return errorReturn;
    }
}
