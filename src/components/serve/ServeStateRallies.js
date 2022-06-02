import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import EventListCard from '../ui/EventListCard';
import { Pressable } from 'react-native';
import { printObject } from '../../utils/helpers';
import { StateProvs } from '../../constants/geo';
const ServeStateRallies = () => {
    const navigation = useNavigation();
    const stateProvs = StateProvs;
    let currentUser = useSelector((state) => state.users.currentUser);

    let rallies = useSelector((state) =>
        state.rallies.publicRallies.filter(
            (ral) => ral.stateProv === currentUser.stateRep
        )
    );

    const foundStateProv = StateProvs.filter((sp) => {
        return sp.symbol === currentUser.stateRep;
    });
    const stateProv = foundStateProv[0];
    const handleEventPress = (e) => {
        printObject('event', e);
    };
    return (
        <View style={styles.rootContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>
                    {stateProv.name} Events
                </Text>
            </View>
            <View>
                <View style={styles.infoArea}>
                    <Text>This is where your events will be listed.</Text>
                </View>
            </View>

            <View>
                {rallies.map((ral) => (
                    <View key={ral.uid} style={{ margin: 10 }}>
                        <Pressable
                            onPress={() =>
                                navigation.navigate('ServeRallyForm', {
                                    rally: ral,
                                })
                            }
                        >
                            <EventListCard
                                key={ral.eventDate}
                                date={ral.eventDate}
                                locationName={ral.name}
                                city={ral.city}
                                stateProv={ral.stateProv}
                            />
                        </Pressable>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default ServeStateRallies;

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
});
