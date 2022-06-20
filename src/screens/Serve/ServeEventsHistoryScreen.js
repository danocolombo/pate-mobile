import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import React, { useState } from 'react';

const ServeEventsHistoryScreen = () => {
    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate;
    //     setShow(false);
    //     setDate(currentDate);
    // };

    return (
        <View style={styles.rootContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>Historical Events</Text>
            </View>
        </View>
    );
};

export default ServeEventsHistoryScreen;

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
