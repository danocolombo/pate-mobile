import axios from 'axios';
import { API, graphqlOperation } from 'aws-amplify';
import { printObject } from '../utils/helpers';
import * as mutations from '../pateGraphQL/mutations';
const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};
export const updateGQLUser = async (userInfo) => {
    if (!userInfo) {
        return {
            status: 400,
            data: 'updateGQLUser: userInfo is required',
        };
    }
    if (!userInfo.id) {
        return {
            status: 400,
            data: 'updateGQLUser: id is required to update record',
        };
    }

    let DANO = false;
    if (DANO) {
        printObject('userInfo:\n', userInfo);
        return {
            status: 200,
            data: userInfo,
        };
    }
    // const inputVariables = {
    //     id: user.id,
    //     street: userInfo.street,
    //     city: profileInfo.city,
    //     stateProv: userInfo.stateProv,
    //     postalCode: userInfo.postalCode,
    // };
    try {
        let returnValue = {};
        const updateUserResults = await API.graphql({
            query: mutations.updateUser,
            variables: { input: userInfo },
        });
        if (updateUserResults?.data?.updateUser?.id) {
            //==========================================
            // update REDUX
            //==========================================
            return {
                status: 200,
                data: updateUserResults?.data?.updateUser,
            };
        } else {
            return {
                status: 404,
                data: updateUserResults,
            };
        }
    } catch (error) {
        return { status: 400, data: error, line: 28 };
    }
};

export async function updateProfileDDB(profile) {
    let obj = {
        operation: 'updateUser',
        payload: {
            Item: profile,
        },
    };
    let body = JSON.stringify(obj);
    // printObject('body going to DBDBDBDBDBDBDBDBDBDBDB', body);
    // console.log('\n###########################\n');
    let api2use = process.env.AWS_API_ENDPOINT + '/users';

    let res = await axios.post(api2use, body, config);
    var returnValue = res.data.Item;
    return returnValue;
}

export async function getProfile(uid) {
    let obj = {
        operation: 'getUser',
        payload: {
            uid: uid,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/users';
    try {
        let res = await axios.post(api2use, body, config);
        if (res.data.statusCode === 200) {
            // see if there is a profile
            let returnValue = {};
            if (res.data.body.Count > 0) {
                returnValue.statusCode = 200;
                let profile = res.data.body.Items[0];
                returnValue.userProfile = profile;
            } else {
                returnValue.statusCode = 404;
                returnValue.message = 'no profile found';
                returnValue.userProfile = {};
            }
            return returnValue;
        } else {
            let errorReturn = {};
            errorReturn.statusCode = 400;
            errorReturn.message = 'error returned from API call';
            errorReturn.error = res.data;
            return errorReturn;
        }
    } catch (err) {
        console.log('error getProfile:', err);
        let errorReturn = {};
        errorReturn.statusCode = 400;
        errorReturn.message = 'Exception error trying api call (prov.users:61';
        errorReturn.error = err;
        return errorReturn;
    }
}
//
export async function getAffiliateProfiles(affiliate) {
    console.log('getAffiliateProfiles for ', affiliate);
    let obj = {
        operation: 'getAffiliateUsers',
        payload: {
            affiliate: affiliate,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/users';
    try {
        let res = await axios.post(api2use, body, config);
        if (res.data.statusCode === 200) {
            // see if there is a profile
            let returnValue = {};
            if (res.data.body.Count > 0) {
                returnValue.statusCode = 200;
                returnValue.profiles = res.data.body.Items;
            } else {
                returnValue.statusCode = 404;
                returnValue.message = 'no profiles found';
                returnValue.userProfile = {};
            }
            return returnValue;
        } else {
            let errorReturn = {};
            errorReturn.statusCode = 400;
            errorReturn.message = 'error returned from API call';
            errorReturn.error = res.data;
            return errorReturn;
        }
    } catch (err) {
        console.log('error getAffiliateProfiles:', err);
        let errorReturn = {};
        errorReturn.statusCode = 400;
        errorReturn.message = 'Exception error trying api call (prov.users:100';
        errorReturn.error = err;
        return errorReturn;
    }
}
export async function getAllProfiles() {
    let obj = {
        operation: 'getAllUsers',
        payload: {},
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/users';
    try {
        let res = await axios.post(api2use, body, config);
        if (res.data.statusCode === 200) {
            // see if there is a profile
            let returnValue = {};
            if (res.data.body.Count > 0) {
                returnValue.statusCode = 200;
                returnValue.profiles = res.data.body.Items;
            } else {
                returnValue.statusCode = 404;
                returnValue.message = 'no profiles found';
                returnValue.userProfile = {};
            }
            return returnValue;
        } else {
            let errorReturn = {};
            errorReturn.statusCode = 400;
            errorReturn.message = 'error returned from API call';
            errorReturn.error = res.data;
            return errorReturn;
        }
    } catch (err) {
        console.log('error getProfile:', err);
        let errorReturn = {};
        errorReturn.statusCode = 400;
        errorReturn.message = 'Exception error trying api call (prov.users:61';
        errorReturn.error = err;
        return errorReturn;
    }
}
