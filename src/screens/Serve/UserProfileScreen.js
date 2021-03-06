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
import { printObject } from '../../utils/helpers';
const UserProfileScreen = ({ route }) => {
    const profile = route.params.profile;
    //printObject('UPS:14--profile:', profile);
    return (
        <ImageBackground
            source={require('../../components/images/background.png')}
            style={styles.bgImageContainer}
        >
            <View style={styles.rootContainer}>
                <View style={styles.screenHeader}>
                    <Text style={styles.screenHeaderText}>User Profile</Text>
                </View>
                <View style={styles.userWrapper}>
                    <UserDisplay profile={profile} />
                </View>
            </View>
        </ImageBackground>
    );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    rootContainer: {
        flex: 1,
    },
    screenHeader: {
        alignItems: 'center',
    },
    screenHeaderText: {
        paddingVertical: 20,
        fontSize: 30,
        fontWeight: 'bold',
    },
    userWrapper: {},
});
