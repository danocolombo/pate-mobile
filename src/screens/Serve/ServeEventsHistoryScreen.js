import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ServeEventsHistoryScreen = () => {
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
