import React, { useContext } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CardDate from '../ui/RallyCardDate';
import { Colors } from '../../constants/colors';
import { printObject } from '../../utils/helpers';

function RallyItem(rally) {
    const { uid, eventDate, name, city, stateProv } = rally;
    // printObject('RI:18', rally);
    const navigation = useNavigation();
    function rallyPressHandler() {
        navigation.navigate('RallyDetail', {
            rally: rally,
        });
    }

    return (
        <>
            <ImageBackground
                source={require('../../components/images/background.png')}
                style={styles.bgImageContainer}
            >
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
            </ImageBackground>
        </>
    );
}

export default RallyItem;

const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    pressed: {
        opacity: 0.75,
    },
    rootContainer: {
        marginHorizontal: 5,
    },
    rallyItem: {
        padding: 2,
        marginVertical: 8,
        backgroundColor: Colors.primary,
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
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '85%',
        height: '65%',
    },
});
