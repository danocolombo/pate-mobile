import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
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
    const navigation = useNavigation();
    const [displayData, setDisplayData] = useState([]);
    let me = useSelector((state) => state.users.currentUser);
    const stateName = StateProvs.map((s) => {
        if (s.symbol === me.residence.stateProv) {
            return s.name;
        }
    });
    let feo = useSelector((state) => state.division);
    let rallies = useSelector((state) => state.division.gatherings);

    const handleEventPress = (e) => {
        printObject('event', e);
    };
    useLayoutEffect(() => {
        const sortAndLoadEvents = async () => {
            if (rallies.length > 1) {
                const sortedRallies = [...rallies].sort((a, b) => {
                    return new Date(b.eventDate) - new Date(a.eventDate);
                });

                setDisplayData(sortedRallies);
                printObject('useLayoutEffect__sorted:\n', sortedRallies);
            }
        };
        sortAndLoadEvents();
    }, [rallies]);

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
                    {displayData &&
                        displayData?.map((ral) => (
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
