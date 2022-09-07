import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { logout } from '../features/users/usersSlice';
import { logout as ralliesSignout } from '../features/rallies/ralliesSlice';
import { logout as profilesLogout } from '../features/profiles/profilesSlice';
import { logout as systemLogout } from '../features/system/systemSlice';
const RemoveUser = () => {
    const dispatch = useDispatch();
    Alert.alert('ACCOUNT DELETED.\nPlease come back soon.');

    async function deleteUserNow() {
        console.log('deleteUserNow begin');
        try {
            const result = await Auth.deleteUser();
            Alert.alert('ACCOUNT DELETED.\nPlease come back soon.');
        } catch (error) {
            Alert.alert('Error deleting user\n', error);
        }
    }
    useEffect(() => {
        dispatch(logout());
        dispatch(ralliesSignout());
        dispatch(profilesLogout());
        dispatch(systemLogout());
        deleteUserNow()
            .then((response) => console.log('deleteUser.response:', response))
            .catch((err) => console.log('deleteUser.err:', err));
    }, []);

    return (
        <View>
            <Text>AmplifySignOut</Text>
        </View>
    );
};

export default RemoveUser;
