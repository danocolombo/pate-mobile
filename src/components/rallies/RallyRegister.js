import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Surface, Stack } from '@react-native-material/core';
import { Button } from 'react-native-elements';
import { Colors } from '../../constants/colors';
import {
    CONFIG,
    printObject,
    createPatePhone,
    getPhoneType,
} from '../../utils/helpers';
import {
    dateNumsToLongDayLongMondayDay,
    dateNumToDisplayTime,
} from '../../utils/date';
import {
    updateRegistration,
    addNewRegistration,
} from '../../features/users/usersSlice';
import NumberInput from '../ui/NumberInput/NumberInput';
const RallyRegister = ({ rally = {}, registration = {} }) => {
    const dispatch = useDispatch();
    let ral = rally;
    let reg = registration;

    if (!ral?.uid && reg?.eid) {
        //need to get the rally from reg.eid
        let rallyArray = useSelector((state) =>
            state.rallies.allRallies.filter((r) => r.uid === reg.eid)
        );
        ral = rallyArray[0];
    }
    let [mealOffered, setMealOffered] = useState(ral?.meal?.offered);
    printObject('RR:25 -->ral', ral);
    printObject('RR:26 -->reg', reg);
    // const r = rally.rally;
    const navigation = useNavigation();
    const [registrarCount, setRegistrar] = useState(
        reg?.attendeeCount ? reg?.attendeeCount : 0
    );
    const [mealCount, setMealCount] = useState(
        reg?.mealCount ? reg?.mealCount : 0
    );
    const user = useSelector((state) => state.users.currentUser);

    const handleRegistarCountChange = (e) => {
        setRegistrar(parseInt(e));
    };
    const handleMealCountChange = (e) => {
        setMealCount(parseInt(e));
    };
    const handleRegistrationRequest = () => {
        //determine if update or new
        if (reg?.uid) {
            // update attendeeCount and mealCount values

            let updateReg = {
                ...reg,
                ...{ attendeeCount: registrarCount, mealCount: mealCount },
            };
            printObject('RR:49-->updateReg:', updateReg);
            dispatch(updateRegistration(updateReg));
            let obj = {
                operation: 'updateRegistration',
                payload: {
                    Item: updateReg,
                },
            };
            let body = JSON.stringify(obj);

            let api2use = process.env.AWS_API_ENDPOINT + '/registrations';
            axios
                .post(api2use, body, CONFIG)
                .then((response) => {
                    console.log('registion updated in ddb');
                })
                .catch((err) => {
                    console.log('RR-65: error:', err);
                });
            navigation.navigate('Main', null);
        } else {
            // this is a new registration
            printObject('RR:90-->rally', rally);
            printObject('RR:91-->user', user);
            let newReg = {
                attendeeCount: registrarCount,
                mealCount: mealCount,
                // location: {
                //     name: rally?.name,
                //     street: rally?.street,
                //     city: rally?.city,
                //     stateProv: rally?.stateProv,
                //     postalCode: rally?.postalCode,
                // },
                // endTime: rally?.endTime,
                // eventDate: rally?.eventDate,
                eid: rally?.uid,
                eventId: rally?.uid,
                church: {
                    name: user?.church?.name,
                    city: user?.church?.city,
                    stateProv: user?.church?.stateProv,
                },
                rid: user?.uid,
                registrarId: user?.uid,
                // startTime: rally?.startTime,
                registrar: {
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    residence: {
                        street: user?.residence?.street,
                        city: user?.residence?.city,
                        stateProv: user?.residence?.stateProv,
                        postalCode: user?.residence?.postalCode,
                    },
                    phone: getPhoneType(createPatePhone(user?.phone)),
                    email: user?.email,
                },
            };
            printObject('RR:82-->newReg', newReg);
            //=====================================
            // insert reg into redux userSlice
            //=====================================
            dispatch(addNewRegistration(newReg));

            let obj = {
                operation: 'createRegistration',
                payload: {
                    Item: newReg,
                },
            };
            let body = JSON.stringify(obj);

            let api2use = process.env.AWS_API_ENDPOINT + '/registrations';
            axios
                .post(api2use, body, CONFIG)
                .then((response) => {
                    console.log('registion added to ddb');
                })
                .catch((err) => {
                    console.log('RR-77: error:', err);
                });
            navigation.navigate('Main', null);
        }
    };

    if (!rally) {
        return (
            <View style={styles.rootContainer}>
                <ActivityIndicator size='large' />
            </View>
        );
    } else {
        return (
            <ImageBackground
                source={require('../images/background.png')}
                style={styles.bgImageContainer}
            >
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
                                <Text
                                    style={[styles.hostText, styles.hostName]}
                                >
                                    {ral.name}
                                </Text>
                                <Text
                                    style={[
                                        styles.hostText,
                                        styles.hostAddress,
                                    ]}
                                >
                                    {ral.street}
                                </Text>
                                <Text
                                    style={[
                                        styles.hostText,
                                        styles.hostAddress,
                                    ]}
                                >
                                    {ral.city}, {ral.stateProv} {ral.postalCode}
                                </Text>
                                <View style={styles.logisticsContainer}>
                                    <View style={styles.dateContainer}>
                                        <Text style={styles.dateValues}>
                                            {dateNumsToLongDayLongMondayDay(
                                                ral.eventDate
                                            )}
                                        </Text>
                                    </View>
                                    <View style={styles.timeContainer}>
                                        <Text style={styles.timeValues}>
                                            {dateNumToDisplayTime(
                                                ral.startTime
                                            )}{' '}
                                            -{' '}
                                            {dateNumToDisplayTime(ral.endTime)}
                                        </Text>
                                    </View>
                                </View>

                                <Surface>
                                    <Text style={styles.regisrationCountText}>
                                        How many will be attending with you?
                                    </Text>
                                    <View
                                        style={
                                            styles.registrationCountNumberContainer
                                        }
                                    >
                                        <NumberInput
                                            value={registrarCount}
                                            onAction={handleRegistarCountChange}
                                        />
                                    </View>
                                </Surface>
                                <View>
                                    <Text>offered: {mealOffered}</Text>
                                </View>
                                {mealOffered !== false ? (
                                    <View
                                        style={
                                            styles.registrationCountContainer
                                        }
                                    >
                                        <Text
                                            style={styles.regisrationCountText}
                                        >
                                            There is a meal offered at the
                                            event.
                                        </Text>
                                        {ral?.meal?.cost ? (
                                            <View
                                                style={styles.mealTextWrapper}
                                            >
                                                <Text
                                                    style={styles.mealCostText}
                                                >
                                                    Cost: {ral.meal.cost}
                                                </Text>
                                                <Text
                                                    style={styles.mealStartTime}
                                                >
                                                    Meal starts at{' '}
                                                    {ral.meal.startTime}
                                                </Text>
                                                <Text
                                                    style={styles.mealCostText}
                                                >
                                                    Will any of your group like
                                                    to attend?
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
                                    title={reg.uid ? 'UPDATE' : 'REGISTER'}
                                    onPress={handleRegistrationRequest}
                                    disabled={registrarCount < 1}
                                />
                            </View>
                        </Surface>
                    </View>
                </View>
            </ImageBackground>
        );
    }
};

export default RallyRegister;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    bgImageContainer: {
        flex: 1,

        width: '100%',
        height: '100%',
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
