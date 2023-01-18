import {
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, {
    Callout,
    Marker,
    Circle,
    PROVIDER_GOOGLE,
} from 'react-native-maps';
import { useWorkletCallback } from 'react-native-reanimated';
import {
    dateNumToDateDash,
    dateNumToDisplayTime,
    awsTimeToDisplayTime,
} from '../../utils/date';
import { Colors } from '../../constants/colors';
import { printObject } from '../../utils/helpers';

const EventMap = ({ rally, mapHeight, mapWidth }) => {
    const [theLocation, setTheLocation] = useState(null);
    //default coordinates: Atlanta, GA
    const [geoLat, setGeoLat] = useState(
        rally?.location?.latitude
            ? parseFloat(rally.location.latitude)
            : 33.7676931
    );
    const [geoLng, setGeoLng] = useState(
        rally?.location?.longitude
            ? parseFloat(rally.location.longitude)
            : 33.7676931
    );
    const [eventCoordinates, setEventCoordinates] = useState({
        latitude: parseFloat(geoLat),
        longitude: parseFloat(geoLng),
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
    });
    const GAK = process.env.GOOGLE_API_KEY;
    useEffect(() => {
        //printObject('RM:28-->rally:', rally);
        // if rally does not have lat and lng, get from address
        if (!rally?.location?.latitude || !rally?.location.longitude) {
            //build the address
            let address =
                rally.location.street.replace(/ /g, '+') +
                ',+' +
                rally.location.city.replace(/ /g, '+') +
                ',+' +
                rally.location.stateProv +
                '+' +
                rally.location.postalCode;
            setTheLocation(address);
            const geoRequestString =
                'https://maps.googleapis.com/maps/api/geocode/xml?address=' +
                address +
                '&key=' +
                GAK;
            console.log('geoRequestString:\n', geoRequestString);
            //todo ---->>> NEED TO DO API CALL AND GET LOCATION
        } else {
            setGeoLat(parseFloat(rally.location.latitude));
            setGeoLng(parseFloat(rally.location.longitude));
            // console.log('RM:51-->lat', rally.geolocation.lat);
            // console.log('RM:52-->lng', rally.geolocation.lng);
        }
    }, []);
    const mHeight = Dimensions.get('window').height * mapHeight;
    const mWidth = Dimensions.get('window').width * mapWidth;
    const { height, width } = useWindowDimensions();
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ ...styles.map, width: mWidth, height: mHeight }}
                initialRegion={{
                    latitude: geoLat,
                    longitude: geoLng,
                    latitudeDelta: 0.08,
                    longitudeDelta: 0.08,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: geoLat,
                        longitude: geoLng,
                    }}
                    pinColor={Colors.primary}
                >
                    <Callout>
                        <Text>
                            {dateNumToDateDash(
                                rally.eventDate.replace(/-/g, '')
                            )}
                        </Text>

                        <Text style={{ textAlign: 'center' }}>
                            {awsTimeToDisplayTime(rally.startTime)}
                        </Text>
                    </Callout>
                </Marker>
                <Circle
                    center={{
                        latitude: geoLat,
                        longitude: geoLng,
                    }}
                    radius={3000}
                    strokeWidth={3}
                    strokeColor={Colors.primary}
                />
            </MapView>
        </View>
    );
};

export default EventMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        // width: Dimensions.get('window').width * 0.9,
        // height: Dimensions.get('window').height * hMultiplier,
        borderWidth: 4,
        paddingHorizontal: 5,
        borderColor: 'black',
    },
});
