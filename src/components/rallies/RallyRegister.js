import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const RallyRegister = () => {
    return (
        <View style={styles.rootContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>Rally Registration</Text>
            </View>
        </View>
    );
};

export default RallyRegister;

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
