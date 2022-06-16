import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Surface, Stack } from '@react-native-material/core';
import { Button } from 'react-native-elements';
import { Colors } from '../../constants/colors';
import {
    dateNumsToLongDayLongMondayDay,
    numTimeToDisplayTime,
} from '../../utils/date';
import NumberInput from '../ui/NumberInput/NumberInput';
const RallyRegister = ({ rallyId }) => {
    const [registrarCount, setRegistrar] = useState(0);
    const [mealCount, setMealCount] = useState(0);
    let ral = useSelector((state) =>
        state.rallies.allRallies.filter((r) => r.uid === rallyId)
    );
    let rally = ral[0];
    const handleRegistarCountChange = (e) => {
        setRegistrar(parseInt(e));
    };
    const handleMealCountChange = (e) => {
        setMealCount(parseInt(e));
    };
    const handleRegistrationRequest = () => {};
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

                        <Surface>
                            <Text style={styles.regisrationCountText}>
                                How many will be attending with you?
                            </Text>
                            <View
                                style={styles.registrationCountNumberContainer}
                            >
                                <NumberInput
                                    value={registrarCount}
                                    onAction={handleRegistarCountChange}
                                />
                            </View>
                        </Surface>

                        {rally?.meal?.startTime ? (
                            <View style={styles.registrationCountContainer}>
                                <Text style={styles.regisrationCountText}>
                                    There is a meal offered at the event.
                                </Text>
                                {rally?.meal?.cost ? (
                                    <View style={styles.mealTextWrapper}>
                                        <Text style={styles.mealCostText}>
                                            Cost: {rally.meal.cost}
                                        </Text>
                                        <Text style={styles.mealStartTime}>
                                            Meal starts at{' '}
                                            {rally.meal.startTime}
                                        </Text>
                                        <Text style={styles.mealCostText}>
                                            Will any of your group like to
                                            attend?
                                        </Text>
                                    </View>
                                ) : null}
                                <View
                                    style={
                                        styles.registrationCountNumberContainer
                                    }
                                >
                                    <NumberInput
                                        value={mealCount}
                                        onAction={handleMealCountChange}
                                    />
                                </View>
                            </View>
                        ) : null}
                        <Button
                            // icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{
                                borderRadius: 5,
                                marginLeft: 40,
                                marginRight: 40,
                                marginBottom: 0,
                            }}
                            title='REGISTER'
                            onPress={handleRegistrationRequest}
                        />
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
    registrationCountContainer: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: Colors.primary,
        marginVertical: 10,
        backgroundColor: Colors.gray10,
    },
    regisrationCountText: {
        fontSize: 16,
        padding: 10,
    },
    mealTextWrapper: {
        paddingBottom: 10,
    },
    mealCostText: {
        textAlign: 'center',
    },
    mealStartTime: {
        textAlign: 'center',
        paddingVertical: 5,
    },
    registrationCountNumberContainer: {
        marginBottom: 10,
    },
});
