import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Surface } from 'react-native-paper';
import RegListCard from '../components/ui/RegistrationListCard';
import { useSelector, useDispatch } from 'react-redux';
import { deleteRegistration as deleteDDBRegistration } from '../providers/registrations';
import { deleteRegistration as deleteReduxUserRegistration } from '../features/users/usersSlice';
import { updateRegNumbers as updateReduxRalliesNumbers } from '../features/rallies/ralliesSlice';
import { updateEventNumbers as updateDDBEventNumbers } from '../providers/rallies';
import { printObject } from '../utils/helpers';
import { dateNumToDateDash, isDateDashBeforeToday } from '../utils/date';
import { Colors } from '../constants/colors';

const MyRegistrationsScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const user = useSelector((state) => state.users.currentUser);
    const allRallies = useSelector((state) => state.rallies.allRallies);
    const registrations = useSelector((state) => state.users.registrations);
    const [isLoading, setIsLoading] = useState(false);
    const [displayEvents, setDisplayEvents] = useState();
    const combineDetails = async () => {
        // printObject('MHS:33-->registrations', registrations);
        // printObject('MHS-34-->allRallies', allRallies);
        const allCombinedRegs = registrations.map((reg) => {
            //for each registration
            // printObject('MHS:37-->reg:', reg);

            let registration = reg;
            registration = { ...registration, registrationId: reg?.uid };
            registration = { ...registration, rallyId: reg?.eid };
            registration = { ...registration, registrar: reg?.rid };
            let eventId;
            if (reg?.eventId) {
                eventId = reg.eventId;
            } else {
                //old registration
                eventId = reg.eid;
            }
            let rallyInfo = allRallies.filter((ral) => {
                return ral.uid === eventId;
            });
            // printObject('MHS:53-->registration', registration);
            // printObject('MHS:54-->rallyInfo[0]', rallyInfo[0]);
            let entireRegDetails = Object.assign(
                {},
                registration,
                rallyInfo[0]
            );
            entireRegDetails.uid = registration.registrationId;
            // printObject('MHS:61-->entireRegDetails', entireRegDetails);
            return entireRegDetails;
        });
        return allCombinedRegs;
    };

    useEffect(() => {
        //we want to associate rally details with each registration
        console.log('\nREGISTRATIONS RELOAD....\n');
        setIsLoading(true);
        combineDetails()
            .then((results) => {
                setDisplayEvents(results);
            })
            .catch((error) => {
                console.log('MHS:74-->error', error);
            });
        setIsLoading(false);
    }, [registrations]);

    function regPressHandler(reg) {
        // printObject('MHS:64-->reg', reg);
        //   go to RegisterScreen
        navigation.navigate('RallyRegister', {
            registration: reg,
        });
    }
    async function handleDeleteRequest(reg) {
        // printObject('MHS:86-->reg', reg);
        //   1. deleteReduxUserRegistration
        dispatch(deleteReduxUserRegistration(reg));
        //   2. deleteDDBRegistration
        await deleteDDBRegistration(reg)
            .then(() => console.log('deleteDDBRegistration success'))
            .catch((err) =>
                console.log('deleteDDBRegistration failure\n', err)
            );
        // determine the numbers to reduce.
        let numberUpdates = {
            rDiff: parseInt(reg.attendeeCount) * -1,
            mDiff: parseInt(reg.mealCount) * -1,
        };
        //   3. update REDUX Rallies.allRallies numbers
        dispatch(
            updateReduxRalliesNumbers({
                uid: reg.eid,
                registrationCount: parseInt(reg.attendeeCount) * -1,
                mealCount: parseInt(reg.mealCount) * -1,
            })
        );
        //   4. update DDB p8Events numbers
        numberUpdates = { ...numberUpdates, uid: reg.eid };

        updateDDBEventNumbers(numberUpdates)
            .then(() => console.log('DDB event numbers updated'))
            .catch((err) =>
                console.log('RR:137--> error saving numbers to DDB\n', err)
            );
    }
    if (isLoading) {
        return <ActivityIndicator />;
    } else {
        return (
            <ImageBackground
                source={require('../components/images/background.png')}
                style={styles.bgImageContainer}
            >
                <View style={styles.rootContainer}>
                    <Surface style={styles.surfaceContainer}>
                        <ScrollView>
                            <View style={styles.entry}>
                                <View style={styles.heading}>
                                    <Text style={styles.headerText}>
                                        Your Registrations
                                    </Text>
                                    {displayEvents ? (
                                        displayEvents.length > 0 ? (
                                            <View
                                                style={
                                                    styles.taglineTextWrapper
                                                }
                                            >
                                                <Text
                                                    style={styles.taglineText}
                                                >
                                                    Tap events for details.
                                                </Text>
                                                <Text style={styles.noteText}>
                                                    (past events cannot be
                                                    deleted)
                                                </Text>
                                            </View>
                                        ) : null
                                    ) : null}
                                </View>
                                {displayEvents ? (
                                    displayEvents.length > 0 ? (
                                        displayEvents.map((r) => {
                                            const isOld =
                                                !isDateDashBeforeToday(
                                                    dateNumToDateDash(
                                                        r.eventDate
                                                    )
                                                );

                                            if (isOld) {
                                                return (
                                                    <Pressable
                                                        onPress={() =>
                                                            regPressHandler(r)
                                                        }
                                                        style={({ pressed }) =>
                                                            pressed &&
                                                            styles.pressed
                                                        }
                                                        key={r.uid}
                                                    >
                                                        <View key={r.uid}>
                                                            <RegListCard
                                                                key={r.uid}
                                                                registration={r}
                                                                onDeletePress={
                                                                    handleDeleteRequest
                                                                }
                                                            />
                                                        </View>
                                                    </Pressable>
                                                );
                                            } else {
                                                return (
                                                    <Pressable
                                                        onPress={() =>
                                                            regPressHandler(r)
                                                        }
                                                        style={({ pressed }) =>
                                                            pressed &&
                                                            styles.pressed
                                                        }
                                                        key={r.uid}
                                                    >
                                                        <View key={r.uid}>
                                                            <RegListCard
                                                                key={r.uid}
                                                                registration={r}
                                                                oldStyle={{
                                                                    backgroundColor:
                                                                        Colors.secondaryDark,
                                                                }}
                                                            />
                                                        </View>
                                                    </Pressable>
                                                );
                                            }
                                        })
                                    ) : (
                                        <View style={styles.noHistoryContainer}>
                                            <Text style={styles.noHistoryText}>
                                                No Historical Informaton
                                            </Text>
                                        </View>
                                    )
                                ) : null}
                            </View>
                        </ScrollView>
                    </Surface>
                </View>
            </ImageBackground>
        );
    }
};

export default MyRegistrationsScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    bgImageContainer: {
        flex: 1,

        width: '100%',
        height: '100%',
    },
    surfaceContainer: {
        flexDirection: 'row',
        marginTop: 15,
        borderRadius: 5,
        // flex: 1,
        paddingVertical: 10,
        marginHorizontal: 10,
        padding: 5,
        // padding: 10,
    },
    entry: {
        flexDirection: 'column',
        flex: 1,
        marginHorizontal: 0,
        // alignItems: 'center',
        // padding: 10,
    },
    heading: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    taglineTextWrapper: {
        marginTop: 5,
    },
    taglineText: {
        fontSize: 16,
        textAlign: 'center',
    },
    noteText: {
        fontSize: 12,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        paddingVertical: 10,
    },
    noHistoryContainer: {
        alignItems: 'center',
        marginVertical: 30,
    },
    noHistoryText: {
        fontWeight: '700',
        fontSize: 18,
    },
});
