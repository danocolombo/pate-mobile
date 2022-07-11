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
import { convertPateTime } from '../../utils/date';

function RallyItem(rally) {
    const { uid, eventDate, name, city, stateProv, startTime } = rally.rally;
    printObject('RI:18', rally.rally);
    const navigation = useNavigation();
    function rallyPressHandler() {
        navigation.navigate('RallyDetail', {
            rally: rally.rally,
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
                            <View style={styles.col1}>
                                <View style={styles.eventDateWrapper}>
                                    <CardDate date={eventDate} />
                                </View>
                                <View style={styles.eventTimeWrapper}>
                                    <Text style={styles.eventTime}>
                                        {convertPateTime(startTime)}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.col2}>
                                <View style={styles.locationWrapper}>
                                    <View style={styles.itemRow}>
                                        <Text style={styles.locationText}>
                                            {city}, {stateProv}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.hostWrapper}>
                                    <Text style={styles.hostName}>{name}</Text>
                                </View>
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
        marginVertical: 5,
        paddingBottom: 5,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        //justifyContent: 'space-between',
        borderRadius: 10,
        elevation: 3,
        shadowColor: Colors.primary500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    // dataWrapper: {
    //     flexDirection: 'column',
    // },
    col1: {
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingLeft: 10,
        // borderWidth: 1,
        // borderColor: 'yellow',
    },
    eventDateWrapper: {
        paddingTop: 5,
    },

    eventTimeWrapper: {
        // paddingHorizontal: 0,
        // justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'white',
    },
    eventTime: {
        // marginLeft: 5,
        // marginRight: 30,
        fontSize: 16,
        color: 'white',
        justifyContent: 'center',
    },
    col2: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        // borderWidth: 1,
        // borderColor: 'yellow',
    },
    locationText: {
        width: '100%',
        marginLeft: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.accent500,
    },
    hostWrapper: {
        paddingLeft: 25,
        // borderWidth: 1,
        // borderColor: 'yellow',
    },
    hostName: {
        // marginLeft: 20,
        fontSize: 20,
        // fontWeight: 'bold',
        color: Colors.accent500,
    },
    hostRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-start',

        // marginBottom: 10,
    },
    itemRow: {
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
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
