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
    ActivityIndicator,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import MapView, {
    Callout,
    Marker,
    Circle,
    PROVIDER_GOOGLE,
} from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants/colors';
import { updateTmp } from '../../../features/rallies/ralliesSlice';
import { getGeoCode } from '../../../providers/google';
import CustomNavButton from '../../ui/CustomNavButton';
import { printObject } from '../../../utils/helpers';

export default function RallyLocationConfirm(props) {
    const rallyId = props.rallyId;
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const tmp = useSelector((state) => state.rallies.tmpRally);
    const [locationDefined, setLocationDefined] = useState(false);
    const [geoLat, setGeoLat] = useState('');
    const [geoLng, setGeoLng] = useState('');
    const [pin, setPin] = useState({});

    let rally;

    useEffect(() => {
        // printObject('RELC:43-->tmp:\n', tmp);
        rally = tmp;

        // need to make sure that geoLocation is defined
        if (!rally?.location?.latitude || !rally?.location?.longitude) {
            //build address string
            let address =
                rally?.location?.street.replace(/ /g, '+') +
                ',+' +
                rally?.location?.city.replace(/ /g, '+') +
                ',+' +
                rally?.location?.stateProv +
                '+' +
                rally?.location?.postalCode;
            getGeoCode(address)
                .then((geoInfo) => {
                    // console.log('REL:58');
                    try {
                        setGeoLat(geoInfo.latitude);
                        setGeoLng(geoInfo.longitude);
                        setPin(geoInfo);
                        setLocationDefined(true);
                    } catch (error) {
                        console.log('Error decoding geoInfo\n', error);
                    }
                    // console.log('REL:67');
                })
                .catch((err) => {
                    Alert.alert('ERROR', 'could not get geoInfo');
                });
            // console.log('REL:72');
        } else {
            setGeoLat(parseFloat(rally.location.latitude));
            setGeoLng(parseFloat(rally.location.longitude));
            setPin({
                latitude: parseFloat(rally.location.latitude),
                longitude: parseFloat(rally.location.longitude),
            });
            setLocationDefined(true);
        }
    }, []);
    //props, isFocused

    const handleNext = () => {
        let latValue = pin.latitude;
        let lngValue = pin.longitude;

        let latStrValue = latValue.toString();
        let lngStrValue = lngValue.toString();
        //* *********************************************************
        //      START RE-DO
        //* *********************************************************
        const locationUpdates = {
            ...tmp.location,
            latitude: latStrValue,
            longitude: lngStrValue,
        };
        const rallyUpdate = {
            ...tmp,
            location: locationUpdates,
        };

        let DANO = true;
        if (DANO) {
            // printObject('REL:135-->tmp:', tmp);
            // printObject('REL:136-->rallyUpdate:', rallyUpdate);
            dispatch(updateTmp(rallyUpdate));
            navigation.navigate('RallyEditFlow', {
                rallyId: rallyId,
                stage: 2,
            });
        }
        //* *********************************************************
        //      END RE-DO
        //* *********************************************************
        let newRally = tmp;
        const updatedLocation = {
            ...newRally.location,
            latitude: '32.5489939',
            longitude: '-84.928685',
        };
        newRally = {
            ...newRally,
            location: updatedLocation,
        };

        dispatch(updateTmp(newRally));

        navigation.navigate('RallyEditFlow', {
            rallyId: rallyId,
            stage: 3,
        });
    };
    const mHeight = Dimensions.get('window').height * 0.4;
    const mWidth = Dimensions.get('window').width * 0.9;

    if (!locationDefined || !pin.latitude || !pin.longitude) {
        return <ActivityIndicator />;
    }
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

                                {pin && locationDefined && (
                                    <View style={styles.container}>
                                        <MapView
                                            provider={PROVIDER_GOOGLE}
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
                                    onPress={() => handleNext()}
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
