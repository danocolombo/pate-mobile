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
        printObject('MHS:33-->registrations', registrations);
        printObject('MHS-34-->allRallies', allRallies);
        registrations.map((reg) => {
            //for each registration
            let rallyInfo = allRallies.filter((ral) => {
                return ral.uid === reg.eid;
            });
            let regId = reg.uid;
            let entireRegDetails = { reg, rallyInfo };
            entireRegDetails.uid = regId;
            summaryRegs.push(entireRegDetails);
        });
        printObject('MHS:43-->summaryRegs', summaryRegs);
    };
    useEffect(() => {
        //we want to associate rally details with each registration
        setIsLoading(true);
        combineDetails()
            .then((results) => {
                console.log('done');
            })
            .catch((error) => {
                console.log('MHS:51-->error', error);
            });
        setIsLoading(false);
    }, []);
    // useEffect(() => {
    //     setIsLoading(true);
    //     if (process.env.ENV === 'DEV') {
    //         const registrations = REGISTRATIONS_TTLEAD.body;
    //         setMyRegistrations(registrations);
    //     } else {
    //         const config = {
    //             headers: {
    //                 'Content-type': 'application/json; charset=UTF-8',
    //             },
    //         };
    //         let obj = {
    //             operation: 'getAllUserRegistrations',
    //             payload: {
    //                 rid: user.uid,
    //             },
    //         };
    //         let body = JSON.stringify(obj);

    //         let api2use = process.env.AWS_API_ENDPOINT + '/registrations';
    //         //let dbRallies = await axios.post(api2use, body, config);
    //         axios
    //             .post(api2use, body, config)
    //             .then((response) => {
    //                 setMyRegistrations(response?.data?.body);
    //                 setIsLoading(false);
    //             })
    //             .catch((err) => {
    //                 console.log('MHS-40: error:', err);
    //                 navigation.navigate('ErrorMsg', {
    //                     id: 'MS-60',
    //                     message:
    //                         'Cannot connect to server. Please check internet connection and try again.',
    //                 });
    //             });
    //     }
    // }, []);
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
                                {registrations ? (
                                    registrations.map((r) => {
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
                                                        key={r.uid}
                                                    >
                                                        <View key={r.uid}>
                                                            <RegListCard
                                                                key={r.uid}
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
                                    <View>
                                        <Text>No History Recorded</Text>
                                    </View>
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
