import {
    StyleSheet,
    Text,
    View,
    Button,
    Platform,
    ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import UsersDisplay from '../../components/serve/UsersDisplay';

// const ServeEventsHistoryScreen = () => {
const ServeManageUsersScreen = () => {
    return (
        <View style={styles.rootContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>Manage Users</Text>
            </View>
            <UsersDisplay />
        </View>
    );
};

export default ServeManageUsersScreen;

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
        paddingVertical: 10,
        fontSize: 30,
        fontWeight: 'bold',
    },
});
