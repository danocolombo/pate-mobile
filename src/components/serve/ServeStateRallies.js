import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import EventListCard from '../ui/EventListCard';
import P8Button from '../ui/P8Button';
import CustomButton from '../ui/CustomButton';
import { getStateRallies } from '../../features/rallies/ralliesSlice';
import { StateProvs } from '../../constants/geo';
import { Pressable } from 'react-native';
import { printObject, asc_sort_raw, desc_sort_raw } from '../../utils/helpers';
// import { sl } from 'date-fns/locale';
const ServeMyRallies = () => {
    const dispatch = useDispatch();
    let me = useSelector((state) => state.users.currentUser);
    const stateName = StateProvs.map((s) => {
        if (s.symbol === me.stateRep) {
            return s.name;
        }
    });
    let rallies = useSelector((state) => state.rallies.allRallies);
    const stateRalliesRAW = useSelector((state) =>
        state.rallies.allRallies.filter((r) => r.stateProv === me.stateRep)
    );

    function asc_sort(a, b) {
        return b.eventDate - a.eventDate;
    }
    let displayData = stateRalliesRAW.sort(asc_sort);

    // sortRallies()
    //     .then((results) => {
    //         //printObject('diplayData-sorted', displayData);
    //     })
    //     .catch((err) => {
    //         console.log('error sorting', err);
    //     });
    const navigation = useNavigation();
    const handleEventPress = (e) => {
        printObject('event', e);
    };
    let sliceRallies = getStateRallies();
    printObject('sliceRallies', sliceRallies);
    return (
        <View style={styles.rootContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>{stateName} Events</Text>
            </View>
            <View>
                <View style={styles.infoArea}>
                    <Text>All {stateName} Events</Text>
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
                            >
                                <EventListCard
                                    key={ral.uid}
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
