import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useLayoutEffect } from 'react';
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
        if (s.symbol === me.residence.stateProv) {
            return s.name;
        }
    });
    let feo = useSelector((state) => state.division);
    let rallies = useSelector((state) => state.division.gatherings);
    printObject('SSR:23 rallies:', rallies);

    function asc_sort(a, b) {
        return b.eventDate - a.eventDate;
    }
    // let displayData = stateRalliesRAW.sort(asc_sort);
    let displayData = rallies;
    printObject('SSR:30-->displayData:\n', displayData);
    const navigation = useNavigation();
    const handleEventPress = (e) => {
        printObject('event', e);
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.appName,
        });
    }, [navigation, feo]);
    let sliceRallies = getStateRallies();
    // printObject('SSR:43-->sliceRallies', sliceRallies);
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
                        <View key={ral.id} style={{ margin: 10 }}>
                            <Pressable
                                onPress={() =>
                                    navigation.navigate('RallyInfo', {
                                        rallyId: ral.id,
                                    })
                                }
                            >
                                <EventListCard key={ral.id} rally={ral} />
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
