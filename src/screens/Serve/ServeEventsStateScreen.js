import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ServeEventsStateScreen = () => {
    return (
        <View style={styles.rootContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>State Events</Text>
            </View>
        </View>
    );
};

export default ServeEventsStateScreen;

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
