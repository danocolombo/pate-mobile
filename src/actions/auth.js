import axios from 'axios';
import { Auth } from 'aws-amplify';
import { getProfile } from '../providers/users';
// GET CLIENT INFO

export const authenticateUser = async (username, password) => {
    try {
        let signInUser = {};
        Auth.signIn(username, password)
            .then((response) => {
                signInUser = response.attributes;
                let currentUser = {
                    uid: response.attributes.sub,
                    username: response.username,
                    email: response.attributes.email,
                    groups: response.signInUserSession.idToken.payload[
                        'cognito:groups'
                    ],
                    jwtToken: response.signInUserSession.idToken.jwtToken,
                };
                console.log('currentUser (derived)', currentUser);
                const returnObject = {
                    status: 200,
                    user: currentUser,
                };
                return returnObject;
            })
            .catch((err) => {
                console.log(
                    'Error getting current user database values: ',
                    err
                );
                const returnObject = {
                    status: 404,
                    message: 'Error getting current user database values',
                    error: err,
                };
                return returnObject;
            });
    } catch (error) {
        Alert.alert('Error\n' + error.message + '\nAA:31');
        const returnObject = {
            status: 400,
            message: 'Error getting current user database values',
            error: err,
        };
        return returnObject;
    }
};
export const appendUserProfile = async (currentUser) => {
    try {
        // get the profile for the user from DDB
        const profileResponse = await getProfile(currentUser.uid);
        //todo: need to figure out what we get when there is no profile
        //todo: update status as 404.
        const profileFound = '200';
        const updatedUser = [...currentUser, profileResponse];
        const returnObject = {
            status: profileFound,
            user: updatedUser,
        };
        return returnObject;
    } catch (error) {
        Alert.alert('Error\n' + error.message + '\nSIS:71');
        const returnObject = {
            status: '400',
            user: currentUser,
        };
        return returnObject;
    }
};
