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
import {
    loadRallies,
    loadUserRallies,
    loadRepRallies,
} from '../features/rallies/ralliesSlice';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import NoEventsCard from '../components/ui/NoEventsCard';
import RalliesOutput from '../components/rallies/RalliesOutput';
import { UserInterfaceIdiom } from 'expo-constants';
import { printObject } from '../utils/helpers';

import { StylesContext } from '@material-ui/styles';

export default function MainScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [showProfileNeededModal, setShowProfileNeededModal] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [rallies, setRallies] = useState([]);
    const [approvedRallies, setApprovedRallies] = useState([]);
    async function loadStateRallies(dbRallies) {
        setRallies(dbRallies);
    }
    useEffect(() => {
        if (process.env.ENV === 'DEV') {
            const fileRallies = ALL_EVENTS.body.Items;
            let response = {
                body: fileRallies,
            };
            dispatch(loadRallies(fileRallies));
            loadStateRallies(response).then(() => {
                console.log('rallies loaded');
            });

            const publicRallies = fileRallies.filter(
                (r) => r.approved === true && r.eventDate >= '20220616'
            );
            setApprovedRallies(publicRallies);
            setIsLoading(false);
        } else {
            const config = {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            };
            let obj = {
                operation: 'getRegionalEvents',
                payload: {
                    region: process.env.EVENT_REGION,
                },
            };
            let body = JSON.stringify(obj);

            let api2use = process.env.AWS_API_ENDPOINT + '/events';
            //let dbRallies = await axios.post(api2use, body, config);
            axios
                .post(api2use, body, config)
                .then((response) => {
                    dispatch(loadRallies(response.data.body.Items));
                    loadStateRallies(response.data.body.Items).then(() => {
                        console.log('rallies loaded');
                    });

                    let dbRallies = response.data.body.Items;
                    const publicRallies = dbRallies.filter(
                        (r) => r.approved === true && r.eventDate >= '20220616'
                    );
                    setApprovedRallies(publicRallies);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('MS-60: error:', err);
                    navigation.navigate('ErrorMsg', {
                        id: 'MS-60',
                        message:
                            'Cannot connect to server. Please check internet connection and try again.',
                    });
                });
        }
    }, []);
    console.log('ENV:', process.env.ENV);
    const stateRallies = useSelector((state) => state.rallies.allRallies);
    const handleProfileAcknowledge = () => {
        setShowProfileNeededModal(false);
    };
    return isLoading ? (
        <LoadingOverlay />
    ) : (
        <ImageBackground
            source={require('../components/images/background.png')}
            style={styles.bgImageContainer}
        >
            <>
                <ScrollView>
                    <Modal visible={showStatusModal} animationStyle='slide'>
                        <Surface style={styles.modalSurface}>
                            <View style={styles.modalInfoWrapper}>
                                <Text style={styles.modalTitle}>
                                    PROFILE NEEDED
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
                </ScrollView>
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
});
