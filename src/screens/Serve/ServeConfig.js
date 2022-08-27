import {
    StyleSheet,
    Text,
    View,
    Button,
    Platform,
    ImageBackground,
} from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import UsersDisplay from '../../components/serve/UsersDisplay';

// const ServeEventsHistoryScreen = () => {
const ServeConfigScreen = () => {
    const navigation = useNavigation();
    const feo = useSelector((state) => state.system);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.appName,
        });
    }, [navigation, feo]);
    return (
        <View style={styles.rootContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>Management</Text>
            </View>
            <UsersDisplay />
        </View>
    );
};

export default ServeConfigScreen;

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
