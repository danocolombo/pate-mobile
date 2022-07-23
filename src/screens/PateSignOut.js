import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text } from 'react-native';
import { Auth } from 'aws-amplify';
import { logout } from '../features/users/usersSlice';
import { logout as ralliesSignout } from '../features/rallies/ralliesSlice';
import { logout as profilesLogout } from '../features/profiles/profilesSlice';
const PateSignOut = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logout());
        dispatch(ralliesSignout);
        dispatch(profilesLogout);
        Auth.signOut();
    }, []);

    return (
        <View>
            <Text>AmplifySignOut</Text>
        </View>
    );
};

export default PateSignOut;
