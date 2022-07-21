import {
    StyleSheet,
    Text,
    View,
    Button,
    Platform,
    ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import UserDisplay from '../../components/serve/UserDisplay';
const UserProfileScreen = ({ route }) => {
    const profile = route.params.profile;
    return (
        <View style={styles.rootContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>User Profile</Text>
            </View>
            <UserDisplay profile={profile} />
        </View>
    );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    rootContainer: {
        flex: 1,
    },
    screenHeader: {
        alignItems: 'center',
    },
    screenHeaderText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});
