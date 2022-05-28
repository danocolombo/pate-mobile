import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
const RallyRegister = ({ rallyId }) => {
    let ral = useSelector((state) =>
        state.rallies.publicRallies.filter((r) => r.uid === rallyId)
    );
    let rally = ral[0];
    return (
        <View style={styles.rootContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>Rally Registration</Text>
            </View>
            <View>
                <Text>{rally.name}</Text>
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
