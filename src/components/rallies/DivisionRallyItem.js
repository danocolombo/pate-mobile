import React, { useContext, useLayoutEffect } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import CardDate from '../ui/RallyCardDate';
import EventCardDate from '../ui/EventCardDate';
import { Colors } from '../../constants/colors';
import { printObject } from '../../utils/helpers';
import { convertPateTime, displayAWSTime } from '../../utils/date';

function DivisionRallyItem(rally) {
    const navigation = useNavigation();
    const registrations = useSelector((state) => state.users.registrations);
    const feo = useSelector((state) => state.division);
    const { uid, eventDate, name, city, stateProv, startTime } = rally.rally;
    const theEvent = rally.rally;
    let registered = false;
    let found = registrations.find((r) => {
        return r.eventId === theEvent.id;
    });
    if (found) {
        registered = true;
    }
    // printObject('RI:18', rally.rally);

    function rallyPressHandler() {
        // if the user is registered, take them to registerForm
        if (registered) {
            navigation.navigate('RallyRegister', {
                registration: found,
            });
        } else {
            printObject('');
            navigation.navigate('RallyDetail', {
                rally: theEvent,
            });
        }
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.appName,
        });
    }, [navigation, feo]);
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
                                    <EventCardDate date={theEvent.eventDate} />
                                </View>
                                <View style={styles.eventTimeWrapper}>
                                    <Text style={styles.eventTime}>
                                        {/* {convertPateTime(theEvent.startTime)} */}
                                        {displayAWSTime(theEvent.startTime)}
                                    </Text>
                                </View>
                                {!!registered && (
                                    <View style={styles.registeredWrapper}>
                                        <Text style={styles.registeredText}>
                                            REGISTERED
                                        </Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.col2}>
                                <View style={styles.locationWrapper}>
                                    <Text style={styles.locationText}>
                                        {theEvent.location.city},{' '}
                                        {theEvent.location.stateProv}
                                    </Text>
                                </View>

                                <View style={styles.hostWrapper}>
                                    <Text style={styles.hostName}>
                                        {theEvent.name}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </ImageBackground>
        </>
    );
}

export default DivisionRallyItem;

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
        paddingVertical: 8,
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingLeft: 10,
        // borderWidth: 1,
        // borderColor: 'yellow',
    },
    eventDateWrapper: {
        // paddingTop: 5,
        // borderWidth: 1,
        // borderColor: 'yellow',
    },

    eventTimeWrapper: {
        marginTop: 5,
        marginBottom: 5,
        // paddingHorizontal: 0,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2,
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
    registeredWrapper: {
        borderWidth: 1,
        padding: 4,
        borderRadius: 10,
        borderColor: Colors.success,
        backgroundColor: Colors.success,
        alignItems: 'center',
    },
    registeredText: { color: 'white', fontSize: 10 },
    col2: {
        flex: 1,
        paddingVertical: 8,
        flexDirection: 'column',
        justifyContent: 'space-around',
        // borderWidth: 1,
        // borderColor: 'yellow',
    },
    locationWrapper: {
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'white',
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
        // borderColor: 'white',
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
    },
});
