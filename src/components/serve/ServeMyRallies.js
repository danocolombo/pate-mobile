import { StyleSheet, Text, View, ScrollView, Modal } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Subheading, Surface } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import EventListCard from '../ui/EventListCard';
import RallyLocationInfo from '../rallies/info/Rally.Location.Info';
import RallyLogisticsInfo from '../rallies/info/Rally.Logistics.Info';
import { deleteRally } from '../../features/rallies/ralliesSlice';
import CustomButton from '../ui/CustomButton';
import { Pressable } from 'react-native';
import { printObject, asc_sort, desc_sort } from '../../utils/helpers';
import { CONFIG } from '../../utils/helpers';
import { Colors } from '../../constants/colors';
const ServeMyRallies = () => {
    const navigation = useNavigation();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [rally, setRally] = useState();
    const dispatch = useDispatch();
    const feo = useSelector((state) => state.division);
    let me = useSelector((state) => state.users.currentUser);
    printObject('SMR:24-->me:\n', me);
    let rallies = useSelector((state) => state.division.gatherings);
    printObject('SMR:26 rallies:', rallies);
    const myRalliesRAW = rallies.filter((r) => r.coordinator.id === me.id);
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
            printObject('displayData-sorted', displayData);
        })
        .catch((err) => {
            console.log('error sorting', err);
        });

    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.appName,
            headerRight: () => (
                <Button
                    onPress={() =>
                        navigation.navigate('RallyEditFlow', {
                            rallyId: rally.uid,
                            stage: 1,
                        })
                    }
                    color='white'
                    title='Edit'
                />
            ),
        });
    }, [navigation, feo]);
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
                        uid: rally.id,
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
                        <View>
                            <RallyLocationInfo
                                rally={rally}
                                title='Event Information'
                            />
                        </View>
                        <View>
                            <RallyLogisticsInfo
                                rally={rally}
                                customStyle={{ paddingVertical: 10 }}
                            />
                        </View>
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
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <View>
                    <Text> </Text>
                </View>
                <View style={styles.screenHeader}>
                    <Text style={styles.screenHeaderText}>Your Events</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                    <Ionicons
                        name='md-add-circle-sharp'
                        size={24}
                        color={Colors.primary}
                        onPress={() =>
                            navigation.navigate('RallyEditFlow', {
                                rallyId: 0,
                                stage: 1,
                            })
                        }
                    />
                </View>
            </View>
            {displayData.length > 0 && (
                <View>
                    <View style={styles.infoArea}>
                        <Text>Tap any event to see details.</Text>
                    </View>
                </View>
            )}
            <ScrollView>
                {displayData.length < 1 && (
                    <Surface style={styles.noEventsSurface}>
                        <View>
                            <Text style={styles.noEventsText}>
                                No Historical Information
                            </Text>
                        </View>
                    </Surface>
                )}
                <View>
                    {displayData.map((ral, index) => (
                        <View key={index} style={{ margin: 10 }}>
                            <Pressable
                                onPress={() =>
                                    navigation.navigate('RallyInfo', {
                                        rallyId: ral.id,
                                    })
                                }
                                key={index}
                            >
                                <EventListCard
                                    key={index}
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
    noEventsSurface: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 30,
        marginHorizontal: 40,
        padding: 8,
        justifyContent: 'center',
        height: 100,
        alignItems: 'center',
        borderRadius: 20,
        elevation: 5,
    },
    noEventsText: {
        fontSize: 20,
        fontWeight: '500',
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
