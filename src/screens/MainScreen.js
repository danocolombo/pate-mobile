import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    Modal,
    ScrollView,
} from 'react-native';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ALL_EVENTS } from '../../data/getRegionalEvents';
import CustomButton from '../components/ui/CustomButton';
import { Surface } from 'react-native-paper';
import {
    loadRallies,
    loadUserRallies,
    loadRepRallies,
} from '../features/rallies/ralliesSlice';
import { loadRegistrations } from '../features/users/usersSlice';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import NoEventsCard from '../components/ui/NoEventsCard';
import RalliesOutput from '../components/rallies/RalliesOutput';
import { UserInterfaceIdiom } from 'expo-constants';
import { getToday, printObject } from '../utils/helpers';
import { getPateDate } from '../utils/date';

import { StylesContext } from '@material-ui/styles';

export default function MainScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    const [entireRallyList, setEntireRallyList] = useState([]);
    const [entireRegList, setEntireRegList] = useState([]);
    // console.log('MS:39-->user', user);
    const [showProfileNeededModal, setShowProfileNeededModal] = useState(
        !user.profile
    );
    const [isLoading, setIsLoading] = useState(true);
    const [rallies, setRallies] = useState([]);
    const [approvedRallies, setApprovedRallies] = useState([]);
    async function loadStateRallies(dbRallies) {
        setRallies(dbRallies);
    }
    async function saveAllRallies(allRallies) {
        setEntireRallyList(allRallies);
    }
    useEffect(() => {
        const eventRegion = process.env.EVENT_REGION;
        // console.log('MS:54-->process.env.EVENT_REGION', eventRegion);
        if (process.env.ENV === 'DEV') {
            const fileRallies = ALL_EVENTS.body.Items;
            let response = {
                body: fileRallies,
            };
            dispatch(loadRallies(fileRallies));
            loadStateRallies(response).then(() => {
                console.log('MS:59-->rallies loaded');
            });
            const tDay = getToday();
            const publicRallies = fileRallies.filter(
                (r) => r.approved === true && r.eventDate >= tDay
            );
            setApprovedRallies(publicRallies);
            setIsLoading(false);
        } else {
            const tDay = getPateDate(getToday());
            const config = {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            };
            let obj = {
                operation: 'getAllEvents',
            };
            let body = JSON.stringify(obj);

            let api2use = process.env.AWS_API_ENDPOINT + '/events';
            //let dbRallies = await axios.post(api2use, body, config);

            axios
                .post(api2use, body, config)
                .then((response) => {
                    dispatch(loadRallies(response.data.body.Items));
                    saveAllRallies(response.data.body.Items);
                    // console.log('MS:81-->events', response.data.body.Items);
                    loadStateRallies(response.data.body.Items)
                        .then(() => {
                            console.log('rallies loaded');
                        })
                        .catch((error) => {
                            console.log('error loading rallies\n', error);
                        });

                    let dbRallies = response.data.body.Items;
                    const publicRallies = dbRallies.filter((r) => {
                        return (
                            r.approved === true &&
                            r.eventDate >= tDay &&
                            r.eventRegion === eventRegion
                        );
                        // console.log('==============================');
                        // console.log('r.name:', r.name);
                        // console.log('r.approved:', r.approved);
                        // console.log('r.eventDate', r.eventDate);
                        // console.log('tDay:', tDay);
                        // console.log('r.eventRegion:', r.eventRegion);
                        // console.log('EVENT_REGION:', eventRegion);
                    });
                    // printObject('MS:112->publicRallies', publicRallies);
                    setApprovedRallies(publicRallies);
                })
                .catch((err) => {
                    console.log('MS-60: error:', err);
                    navigation.navigate('ErrorMsg', {
                        id: 'MS-60',
                        message:
                            'Cannot connect to server. Please check internet connection and try again.',
                    });
                });
            //================================================
            // now get all the registrations for the user
            //================================================
            // printObject('MS:128--> entireRallyList', entireRallyList);
            obj = {
                operation: 'getAllUserRegistrations',
                payload: {
                    rid: user.uid,
                },
            };
            body = JSON.stringify(obj);

            api2use = process.env.AWS_API_ENDPOINT + '/registrations';
            //let dbRallies = await axios.post(api2use, body, config);
            axios
                .post(api2use, body, config)
                .then((response) => {
                    let respData = response.data.body;
                    if (respData) {
                        function asc_sort(a, b) {
                            return b.eventDate - a.eventDate;
                        }
                        let newRegList = respData.sort(asc_sort);
                        // printObject('MS:148-->regList', newRegList);

                        dispatch(loadRegistrations(newRegList));
                    }
                })
                .catch((err) => {
                    console.log('MS-120: error:', err);
                    navigation.navigate('ErrorMsg', {
                        id: 'MS-60',
                        message:
                            'Cannot connect to server. Please check internet connection and try again.',
                    });
                });
            //now load the event details for each registration
            //let's get event details for each registration

            const fullRegInfo = entireRegList.map((reg) => {
                //for each registration, try to get event details
                const matchedRally = entireRallyList.filter(
                    (rally) => rally.uid === reg.eid
                );
                let combinedInfo = Object.assign({}, reg, matchedRally);
                return combinedInfo;
            });
            setIsLoading(false);
        }
    }, []);
    console.log('ENV:', process.env.ENV);
    const stateRallies = useSelector((state) => state.rallies.allRallies);
    const handleProfileAcknowledge = () => {
        setShowProfileNeededModal(false);
        navigation.navigate('Profile');
    };
    return isLoading ? (
        <LoadingOverlay />
    ) : (
        <ImageBackground
            source={require('../components/images/background.png')}
            style={styles.bgImageContainer}
        >
            <>
                {/* <ScrollView> */}
                <Modal visible={showProfileNeededModal} animationStyle='slide'>
                    <Surface style={styles.modalSurface}>
                        <View style={styles.modalInfoWrapper}>
                            <Text style={styles.modalTitle}>
                                Please complete your profile.
                            </Text>
                        </View>
                        <View style={styles.modalButtonContainer}>
                            <View style={styles.modalButtonWrapper}>
                                <View style={styles.modalCancelButton}>
                                    <CustomButton
                                        title='OK'
                                        graphic={null}
                                        cbStyles={{
                                            backgroundColor: 'green',
                                            color: 'white',
                                        }}
                                        txtColor='white'
                                        onPress={() => {
                                            handleProfileAcknowledge();
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </Surface>
                </Modal>

                {approvedRallies.length !== 0 ? (
                    <RalliesOutput rallies={approvedRallies} />
                ) : (
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../components/images/no-events-card.png')}
                            style={styles.image}
                        />
                    </View>
                )}
                {/* //{' '}
                <View style={{ marginTop: 30 }}>
                    //{' '}
                    <Text styles={styles.infoText}>
                        // RALLIES: {approvedRallies.length}
                        //{' '}
                    </Text>
                    //{' '}
                </View>
                // <RalliesOutput rallies={approvedRallies} /> */}
                {/* </ScrollView> */}
            </>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    infoText: {
        color: 'white',
        fontSize: 24,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '85%',
        height: '65%',
    },
    modalContainer: {
        marginTop: '200',
        // alignSelf: 'flex-end',
    },
    modalSurface: {
        marginTop: '50%',
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    modalInfoWrapper: {
        alignItems: 'center',
    },
    modalTitle: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalButtonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    modalButtonWrapper: {
        marginHorizontal: 10,
    },
});
