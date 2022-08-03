import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Alert,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    ImageBackground,
    Dimensions,
} from 'react-native';
import { Headline } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-native-material/core';
import MapView, { Callout, Marker, Circle } from 'react-native-maps';
import { Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants/colors';
import CustomButton from '../../../components/ui/CustomButton';
import { createTmp, updateTmp } from '../../../features/rallies/ralliesSlice';

import CustomNavButton from '../../ui/CustomNavButton';
import { printObject } from '../../../utils/helpers';

export default function RallyLocationConfirm({ rallyId }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    let rallyEntry;
    if (rallyId !== 0) {
        rallyEntry = useSelector((state) =>
            state.rallies.allRallies.filter((r) => r.uid === rallyId)
        );
    }
    let rally;
    if (rallyEntry) {
        rally = rallyEntry[0];
    }
    // console.log('REL:50 rally.uid:', rally?.uid);
    //printObject('REL:51--> rally', rally);
    const [geoLat, setGeoLat] = useState(rally?.geolocation?.lat);
    const [geoLng, setGeoLng] = useState(rally?.geolocation?.lng);
    const [publishedLat, setPublishedLat] = useState(geoLat);
    const [publishedLng, setPublishedLng] = useState(geoLng);
    const [pin, setPin] = useState({
        latitude: parseFloat(geoLat),
        longitude: parseFloat(geoLng),
    });
    useEffect(() => {
        if (rally?.uid) {
            //save existing values to tmpEntry
            dispatch(createTmp(rally));
        }
        if (!rally?.geolocation?.lat || !rally?.geolocation?.lng) {
            Alert.alert('NOTICE', 'NEED geo');
        }
    }, []);

    const handleNext = () => {
        // gather data
        // console.log('in handleNext');
        // build object to save

        let latValue = pin.latitude;
        let lngValue = pin.longitude;

        let latStrValue = latValue.toString();
        let lngStrValue = lngValue.toString();

        let values = {
            geolocation: {
                lat: latValue,
                lng: lngValue,
            },
        };

        // printObject('handleNext::values', values);
        dispatch(updateTmp(values));

        navigation.navigate('RallyEditFlow', {
            rallyId: rallyId,
            stage: 3,
        });
    };
    // const dispatch = useDispatch();
    const mHeight = Dimensions.get('window').height * 0.4;
    const mWidth = Dimensions.get('window').width * 0.9;

    return (
        <>
            <ImageBackground
                source={require('../../../components/images/background.png')}
                style={styles.bgImageContainer}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.root}>
                        <ScrollView contentContainerStyle={styles.root}>
                            <View style={styles.infoWrapper}>
                                <View style={styles.formHeader}>
                                    <Text style={styles.titleText}>
                                        Location Confirmation
                                    </Text>
                                </View>
                                <View style={styles.instructionWrapper}>
                                    <Text style={styles.instructionText}>
                                        Using the address provided, the location
                                        is defined on the map below. Please
                                        confirm the location, or adjust the pin
                                        as needed.
                                    </Text>
                                </View>
                                {pin && (
                                    <View style={styles.container}>
                                        <MapView
                                            provider='google'
                                            style={{
                                                ...styles.map,
                                                width: mWidth,
                                                height: mHeight,
                                            }}
                                            initialRegion={{
                                                latitude: geoLat,
                                                longitude: geoLng,
                                                latitudeDelta: 0.08,
                                                longitudeDelta: 0.08,
                                            }}
                                        >
                                            <Marker
                                                coordinate={pin}
                                                pinColor={Colors.primary}
                                                draggable={true}
                                                onDragStart={(e) => {
                                                    console.log(
                                                        'DRAG - START',
                                                        e.nativeEvent
                                                            .coordinates
                                                    );
                                                }}
                                                onDragEnd={(e) => {
                                                    setPin({
                                                        latitude:
                                                            e.nativeEvent
                                                                .coordinate
                                                                .latitude,
                                                        longitude:
                                                            e.nativeEvent
                                                                .coordinate
                                                                .longitude,
                                                    });
                                                }}
                                            ></Marker>
                                            <Circle
                                                center={pin}
                                                radius={3000}
                                                strokeWidth={3}
                                                strokeColor={Colors.primary}
                                            />
                                        </MapView>
                                    </View>
                                )}
                                <View style={styles.geoLabelLatContainer}>
                                    <Text style={styles.geoLabelText}>
                                        Latitude: {pin.latitude}
                                    </Text>
                                </View>
                                <View style={styles.geoLabelLngContainer}>
                                    <Text style={styles.geoLabelText}>
                                        Latitude: {pin.longitude}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <CustomNavButton
                                    title='Next'
                                    graphic={{
                                        name: 'forward',
                                        color: 'white',
                                        size: 10,
                                    }}
                                    cbStyles={{
                                        backgroundColor: 'green',
                                        color: 'white',
                                        width: '50%',
                                    }}
                                    onPress={handleNext}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </>
    );
}
const styles = StyleSheet.create({
    root: {
        flex: 1,

        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    infoWrapper: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 20,
    },
    formHeader: {
        marginVertical: 10,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    instructionWrapper: {
        marginHorizontal: 30,
    },
    instructionText: {
        fontSize: 18,
        letterSpacing: 0.5,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    geoLabelLatContainer: {
        marginTop: 10,
        marginBottom: 5,
    },
    geoLabelLngContainer: {
        marginBottom: 10,
    },
    geoLabelText: {
        fontSize: 16,
        textAlign: 'center',
    },
});
