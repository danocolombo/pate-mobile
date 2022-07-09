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
import { Surface, Headline, Subheading } from 'react-native-paper';
import { REGISTRATIONS_TTLEAD } from '../../data/getRegistrationsForUser_ttrep';
import RegListCard from '../components/ui/RegistrationListCard';
import { useSelector, useDispatch } from 'react-redux';
import { deleteRegistration } from '../providers/registrations';
import { deleteRegistration as deleteReduxRegistration } from '../features/users/usersSlice';
import { printObject } from '../utils/helpers';
import { dateNumToDateDash, isDateDashBeforeToday } from '../utils/date';
import { Colors } from '../constants/colors';

const MyHistoryScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const user = useSelector((state) => state.users.currentUser);
    const allRallies = useSelector((state) => state.rallies.allRallies);
    const registrations = useSelector((state) => state.users.registrations);
    const [myRegistrations, setMyRegistrations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const combineDetails = async () => {
        let summaryRegs = [];
        // printObject('MHS:33-->registrations', registrations);
        // printObject('MHS-34-->allRallies', allRallies);
        registrations.map((reg) => {
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

            printObject('MHS:56-->registration', registration);
            printObject('MHS:50-->rallyInfo', rallyInfo);
            let entireRegDetails = Object.assign(
                {},
                registration,
                rallyInfo[0]
            );
            entireRegDetails.uid = registration.registrationId;
            printObject('MHS:52-->entireRegDetails', entireRegDetails);

            summaryRegs.push(entireRegDetails);
        });
        setMyRegistrations(summaryRegs);
        // printObject('MHS:56-->summaryRegs', summaryRegs);
    };
    useEffect(() => {
        //we want to associate rally details with each registration
        setIsLoading(true);
        combineDetails()
            .then((results) => {
                console.log('done');
            })
            .catch((error) => {
                console.log('MHS:66-->error', error);
            });
        setIsLoading(false);
    }, []);

    function regPressHandler(reg) {
        // printObject('MHS:64-->reg', reg);
        navigation.navigate('RallyRegister', {
            registration: reg,
        });
    }
    async function onDeletePress(reg) {
        console.log('DELETING ', reg.uid);
        dispatch(deleteReduxRegistration(reg));
        const results = await deleteRegistration(reg);
        //deleteRegistration
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

                                    <Text>Tap to edit active events.</Text>
                                </View>
                                {myRegistrations ? (
                                    myRegistrations.map((r) => {
                                        const enablePress =
                                            !isDateDashBeforeToday(
                                                dateNumToDateDash(r.eventDate)
                                            );

                                        if (enablePress) {
                                            return (
                                                <>
                                                    <Pressable
                                                        onPress={() =>
                                                            regPressHandler(r)
                                                        }
                                                        style={({ pressed }) =>
                                                            pressed &&
                                                            styles.pressed
                                                        }
                                                        key={r.name}
                                                    >
                                                        <View key={r.name}>
                                                            <RegListCard
                                                                key={r.name}
                                                                registration={r}
                                                                onDeletePress={
                                                                    onDeletePress
                                                                }
                                                            />
                                                        </View>
                                                    </Pressable>
                                                </>
                                            );
                                        } else {
                                            return (
                                                <View key={r.uid}>
                                                    <RegListCard
                                                        key={r.uid}
                                                        registration={r}
                                                        oldStyle={{
                                                            backgroundColor:
                                                                Colors.secondary,
                                                        }}
                                                    />
                                                </View>
                                            );
                                        }
                                    })
                                ) : (
                                    <>
                                        <View>
                                            <Text>
                                                No Historical Information
                                            </Text>
                                        </View>
                                    </>
                                )}
                            </View>
                        </ScrollView>
                    </Surface>
                </View>
            </ImageBackground>
        );
    }
};

export default MyHistoryScreen;

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
    text: {
        fontSize: 16,
        paddingVertical: 10,
    },
});
