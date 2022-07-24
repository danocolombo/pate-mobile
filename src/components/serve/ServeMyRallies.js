import { StyleSheet, Text, View, ScrollView, Modal } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Subheading, Surface } from 'react-native-paper';
import EventListCard from '../ui/EventListCard';
import RallyLocationInfo from '../rallies/info/Rally.Location.Info';
import { deleteRally } from '../../features/rallies/ralliesSlice';
import CustomButton from '../ui/CustomButton';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { printObject, asc_sort, desc_sort } from '../../utils/helpers';
import { CONFIG } from '../../utils/helpers';
import { Colors } from '../../constants/colors';
const ServeMyRallies = () => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [rally, setRally] = useState();
    const dispatch = useDispatch();
    let me = useSelector((state) => state.users.currentUser);
    let rallies = useSelector((state) => state.rallies.allRallies);
    // printObject('SR20 rallies:', rallies);
    const myRalliesRAW = rallies.filter((r) => r.coordinator.id === me.uid);
    // now sort the rallies
    function asc_sort(a, b) {
        return b.eventDate - a.eventDate;
    }
    let myRallies = myRalliesRAW.sort(asc_sort);
    let displayData;
    async function sortRallies() {
        displayData = myRallies.sort(asc_sort);
        // return displayData;
    }
    sortRallies()
        .then((results) => {
            //printObject('diplayData-sorted', displayData);
        })
        .catch((err) => {
            console.log('error sorting', err);
        });

    const navigation = useNavigation();
    const handleDeleteConfirm = (rally) => {
        if (process.env.ENV === 'DEV') {
            console.log('DEV DELETE REQUEST');
            dispatch(deleteRally(rally));
        } else {
            //first delete from db, then remove from redux

            let obj = {
                operation: 'deleteEvent',
                payload: {
                    Key: {
                        uid: rally.uid,
                    },
                },
            };
            let body = JSON.stringify(obj);

            let api2use = process.env.AWS_API_ENDPOINT + '/events';
            //let dbRallies = await axios.post(api2use, body, config);
            axios
                .post(api2use, body, CONFIG)
                .then((response) => {
                    dispatch(deleteRally(rally));
                })
                .catch((err) => {
                    console.log('SMR-62: error:', err);
                });
        }
        setShowDeleteConfirm(false);
    };
    const handleDeleteRequest = (rally) => {
        setShowDeleteConfirm(true);
        setRally(rally);
    };
    const handleEventPress = (e) => {
        printObject('event', e);
    };
    return (
        <View style={styles.rootContainer}>
            <Modal visible={showDeleteConfirm} animationStyle='slide'>
                <Surface style={styles.modalSurface}>
                    <View>
                        <Text style={styles.modalTitle}>
                            Confirm You Want To Delete
                        </Text>
                        <RallyLocationInfo rally={rally} />
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <View style={styles.modalButtonWrapper}>
                            <View style={styles.modalConfirmButton}>
                                <CustomButton
                                    title='CANCEL'
                                    graphic={null}
                                    cbStyles={{
                                        backgroundColor: Colors.gray35,
                                        color: 'black',
                                    }}
                                    txtColor='white'
                                    onPress={() => setShowDeleteConfirm(false)}
                                />
                            </View>
                        </View>
                        <View style={styles.modalButtonWrapper}>
                            <View style={styles.modalCancelButton}>
                                <CustomButton
                                    title='DELETE'
                                    graphic={null}
                                    cbStyles={{
                                        backgroundColor: 'red',
                                        color: 'white',
                                    }}
                                    txtColor='white'
                                    onPress={() => {
                                        handleDeleteConfirm(rally);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Surface>
            </Modal>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>Your Events</Text>
            </View>
            <View>
                <View style={styles.infoArea}>
                    <Text>Tap any event to see details.</Text>
                </View>
            </View>
            <ScrollView>
                <View>
                    {displayData.map((ral) => (
                        <View key={ral.uid} style={{ margin: 10 }}>
                            <Pressable
                                onPress={() =>
                                    navigation.navigate('RallyInfo', {
                                        rallyId: ral.uid,
                                    })
                                }
                                key={ral.uid}
                            >
                                <EventListCard
                                    key={ral.uid}
                                    // rallyId={ral.uid}
                                    rally={ral}
                                    deletePress={handleDeleteRequest}
                                    // date={ral.eventDate}
                                    // locationName={ral.name}
                                    // city={ral.city}
                                    // stateProv={ral.stateProv}
                                />
                            </Pressable>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <CustomButton
                    title='ADD NEW EVENT'
                    graphic={null}
                    cbStyles={{
                        backgroundColor: 'green',
                        color: 'white',
                        width: 200,
                        textAlign: 'center',
                    }}
                    txtColor='white'
                    onPress={() =>
                        navigation.navigate('RallyEditFlow', {
                            rallyId: 0,
                            stage: 1,
                        })
                    }
                />
            </View>
        </View>
    );
};

export default ServeMyRallies;

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
    infoArea: {
        alignItems: 'center',
    },
    eventListSurface: {
        marginTop: 10,
        padding: 8,
        width: '80%',
        height: 200,
        justifyContent: 'center',
        elevation: 5,
    },

    buttonContainer: {
        alignItems: 'center',
    },

    modalContainer: {
        marginTop: 50,
        // alignSelf: 'flex-end',
    },
    modalSurface: {
        marginTop: 80,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
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
