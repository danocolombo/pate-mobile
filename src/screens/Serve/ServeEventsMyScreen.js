import { StyleSheet, Text, View, ViewBase, _View } from 'react-native';
import React from 'react';

const ServeEventsMyScreen = () => {
    return (
        <View style={styles.rootContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>My Events</Text>
            </View>
        </View>
    );
};

export default ServeEventsMyScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        // alignItems: 'center',
    },
    screenHeader: {
        alignItems: 'center',
    },
    screenHeaderText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});
