import { StyleSheet, Text, View, ViewBase, _View } from 'react-native';
import React from 'react';
import ServeMyRallies from '../../components/serve/ServeMyRallies';

const ServeEventsMyScreen = () => {
    return <ServeMyRallies />;
};

export default ServeEventsMyScreen;

const styles = StyleSheet.create({
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
