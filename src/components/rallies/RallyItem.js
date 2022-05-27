import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CardDate from '../ui/RallyCardDate';
import { Colors } from '../../constants/colors';

function RallyItem({ uid, eventDate, name, city, stateProv }) {
    const navigation = useNavigation();
    function rallyPressHandler() {
        navigation.navigate('RallyDetail', {
            rallyId: uid,
        });
    }

    return (
        <>
            <Pressable
                onPress={rallyPressHandler}
                style={({ pressed }) => pressed && styles.pressed}
            >
                <View style={styles.rootContainer}>
                    <View style={styles.rallyItem}>
                        <View style={styles.itemRow}>
                            <CardDate date={eventDate} />
                            <Text style={styles.locationText}>
                                {city}, {stateProv}
                            </Text>
                        </View>
                        <View style={styles.hostRow}>
                            <Text style={styles.hostName}>{name}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </>
    );
}

export default RallyItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    rootContainer: {
        marginHorizontal: 5,
    },
    rallyItem: {
        padding: 2,
        marginVertical: 8,
        backgroundColor: Colors.secondary,
        // flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        elevation: 3,
        shadowColor: Colors.primary500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    itemRow: {
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    hostRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    locationText: {
        marginLeft: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.accent500,
    },
    hostName: {
        // marginLeft: 20,
        fontSize: 20,
        // fontWeight: 'bold',
        color: Colors.accent500,
    },
});
