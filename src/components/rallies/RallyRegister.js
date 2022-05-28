import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { Surface, Stack } from '@react-native-material/core';
import { Colors } from '../../constants/colors';
import {
    dateNumsToLongDayLongMondayDay,
    numTimeToDisplayTime,
} from '../../utils/date';
const RallyRegister = ({ rallyId }) => {
    let ral = useSelector((state) =>
        state.rallies.publicRallies.filter((r) => r.uid === rallyId)
    );
    let rally = ral[0];
    return (
        <View style={styles.rootContainer}>
            {/* <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>Rally Registration</Text>
            </View> */}

            <View style={styles.registrationCardContainer}>
                <Surface
                    elevation={6}
                    category='medium'
                    style={styles.registrationCard}
                >
                    <View style={styles.hostContainer}>
                        <Text style={[styles.hostText, styles.hostName]}>
                            {rally.name}
                        </Text>
                        <Text style={[styles.hostText, styles.hostAddress]}>
                            {rally.street}
                        </Text>
                        <Text style={[styles.hostText, styles.hostAddress]}>
                            {rally.city}, {rally.stateProv} {rally.postalCode}
                        </Text>
                        <View style={styles.logisticsContainer}>
                            <View style={styles.dateContainer}>
                                <Text style={styles.dateValues}>
                                    {dateNumsToLongDayLongMondayDay(
                                        rally.eventDate
                                    )}
                                </Text>
                            </View>
                            <View style={styles.timeContainer}>
                                <Text style={styles.timeValues}>
                                    {numTimeToDisplayTime(rally.startTime)} -{' '}
                                    {numTimeToDisplayTime(rally.endTime)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Surface>
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
        marginVertical: 10,
        alignItems: 'center',
    },
    screenHeaderText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    registrationCardContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    registrationCard: {
        width: '90%',
        padding: 10,
    },
    hostContainer: {
        alignItems: 'center',
    },
    hostText: {
        color: Colors.primary,
    },
    hostName: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    hostAddress: {
        fontSize: 20,
    },
    logisticsContainer: {
        marginVertical: 10,
    },
    dateContainer: { alignItems: 'center' },
    dateValues: { fontSize: 26, fontWeight: 'bold' },
    timeContainer: { alignItems: 'center', marginVertical: 0 },
    timeValues: { fontSize: 24, fontWeight: 'bold' },
});
