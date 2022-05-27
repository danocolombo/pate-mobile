import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text } from 'react-native';
// import { Auth } from 'aws-amplify';
// import { logout } from '../features/users/userSlice';

const PateSignOut = () => {
    const dispatch = useDispatch();
    // useEffect(() => {
    //     Auth.signOut()
    //         .then(() => {
    //             dispatch(logout());
    //             console.log('logout');
    //         })
    //         .catch((err) => console.log('LOGOUT Error\n', err));
    // }, []);

    return (
        <View>
            <Text>AmplifySignOut</Text>
        </View>
    );
};

export default PateSignOut;
