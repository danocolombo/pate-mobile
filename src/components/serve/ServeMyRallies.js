import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import EventListCard from '../ui/EventListCard';
import P8Button from '../ui/P8Button';
import CustomButton from '../ui/CustomButton';
import { Pressable } from 'react-native';
import { printObject, asc_sort, desc_sort } from '../../utils/helpers';
const ServeMyRallies = () => {
    let me = useSelector((state) => state.users.currentUser);
    let rallies = useSelector((state) => state.rallies.publicRallies);
    const myRallies = useSelector((state) =>
        state.rallies.publicRallies.filter((r) => r.coordinator.id === me.uid)
    );
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
    const handleEventPress = (e) => {
        printObject('event', e);
    };
    return (
        <View style={styles.rootContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>Your Events</Text>
            </View>
            <View>
                <View style={styles.infoArea}>
                    <Text>Tap any event to see details.</Text>
                </View>
            </View>

            <View>
                {displayData.map((ral) => (
                    <View key={ral.uid} style={{ margin: 10 }}>
                        <Pressable
                            onPress={() =>
                                navigation.navigate('RallyInfo', {
                                    rallyId: ral.uid,
                                })
                            }
                        >
                            <EventListCard
                                key={ral.uid}
                                // rallyId={ral.uid}
                                rally={ral}
                                // date={ral.eventDate}
                                // locationName={ral.name}
                                // city={ral.city}
                                // stateProv={ral.stateProv}
                            />
                        </Pressable>
                    </View>
                ))}
            </View>
            {/* <View style={styles.buttonContainer}>
                <CustomButton
                    title='Create New Event'
                    graphic={null}
                    cbStyles={{ backgroundColor: 'green', color: 'white' }}
                    txtColor='white'
                    onPress={() =>
                        navigation.navigate('ServeRallyForm', { rally: null })
                    }
                />
            </View> */}
            <View style={styles.buttonContainer}>
                <CustomButton
                    title='New Event Flow'
                    graphic={null}
                    cbStyles={{ backgroundColor: 'green', color: 'white' }}
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
});
