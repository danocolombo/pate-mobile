import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    ImageBackground,
} from 'react-native';
import { Surface, Headline, Subheading } from 'react-native-paper';
import { REGISTRATIONS_TTLEAD } from '../../data/getRegistrationsForUser_ttrep';
import RegListCard from '../components/ui/RegistrationListCard';
import { useSelector } from 'react-redux';

import { printObject } from '../utils/helpers';

const MyHistoryScreen = () => {
    const user = useSelector((state) => state.users.currentUser);
    const [myRegistrations, setMyRegistrations] = useState([]);
    useEffect(() => {
        if (process.env.ENV === 'DEV') {
            const registrations = REGISTRATIONS_TTLEAD.body;
            setMyRegistrations(registrations);
        } else {
            const config = {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            };
            let obj = {
                operation: 'getAllUserRegistrations',
                payload: {
                    rid: user.uid,
                },
            };
            let body = JSON.stringify(obj);

            let api2use = process.env.AWS_API_ENDPOINT + '/registrations';
            //let dbRallies = await axios.post(api2use, body, config);
            axios
                .post(api2use, body, config)
                .then((response) => {
                    setMyRegistrations(response.body);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('MHS-40: error:', err);
                    navigation.navigate('ErrorMsg', {
                        id: 'MS-60',
                        message:
                            'Cannot connect to server. Please check internet connection and try again.',
                    });
                });
        }
    }, []);

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
                                    Your past registrations
                                </Text>
                            </View>
                            {myRegistrations ? (
                                myRegistrations.map((r) => (
                                    <View key={r.uid}>
                                        <RegListCard
                                            key={r.uid}
                                            registration={r}
                                        />
                                    </View>
                                ))
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
