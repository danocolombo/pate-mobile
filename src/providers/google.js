import axios from 'axios';
import { printObject } from '../utils/helpers';
const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};

export async function getGeoCode(address) {
    //let body = JSON.stringify(obj);

    let GAE = process.env.GOOGLE_API_ENDPOINT;
    let GAK = process.env.GOOGLE_API_KEY;

    let api2use = GAE + address + '&key=' + GAK;
    // console.log('G:22-->api2use:', api2use);
    try {
        let res = await axios.get(api2use);
        const results = res.data.results[0];

        // printObject('G:21-->results', results);
        if (res.data.status === 'OK') {
            //now get the lat and long from response
            // console.log(
            //     'G:25-->results.geometry.location.lng',
            //     results.geometry.location.lng
            // );
            let returnLat = results.geometry.location.lat;
            let returnLng = results.geometry.location.lng;
            // console.log('lat:', returnLat);
            // console.log('lng:', returnLng);
            let returnValue = {
                latitude: returnLat,
                longitude: returnLng,
            };

            // console.log('returnValue\n', returnValue);
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
