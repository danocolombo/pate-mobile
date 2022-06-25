import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text } from 'react-native';
import { Auth } from 'aws-amplify';
import { logout } from '../features/users/usersSlice';

const PateSignOut = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logout());
        Auth.signOut();
    }, []);

    return (
        <View>
            <Text>AmplifySignOut</Text>
        </View>
    );
};

export default PateSignOut;
