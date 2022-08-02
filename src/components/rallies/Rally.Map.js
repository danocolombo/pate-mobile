import {
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Callout, Marker, Circle } from 'react-native-maps';
import { useWorkletCallback } from 'react-native-reanimated';

import { Colors } from '../../constants/colors';

const RallyMap = ({ rally }) => {
    const [theLocation, setTheLocation] = useState(null);
    //default coordinates: Atlanta, GA
    const [geoLat, setGeoLat] = useState(33.7676931);
    const [geoLng, setGeoLng] = useState(-84.4906436);
    const [eventCoordinates, setEventCoordinates] = useState({
        latitude: parseFloat(geoLat),
        longitude: parseFloat(geoLng),
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
    });
    const GAK = process.env.GOOGLE_API_KEY;
    useEffect(() => {
        // if rally does not have lat and lng, get from address
        if (!rally?.geolocation?.lat || !rally?.geolocation.lng) {
            //build the address
            let address =
                rally.street.replace(/ /g, '+') +
                ',+' +
                rally.city.replace(/ /g, '+') +
                ',+' +
                rally.stateProv +
                '+' +
                rally.postalCode;
            setTheLocation(address);
            const geoRequestString =
                'https://maps.googleapis.com/maps/api/geocode/xml?address=' +
                address +
                '&key=' +
                GAK;
            console.log('geoRequestString:\n', geoRequestString);
            //todo ---->>> NEED TO DO API CALL AND GET LOCATION
        } else {
            setGeoLat(parseFloat(rally.geolocation.lat));
            setGeoLng(parseFloat(rally.geolocation.lng));
        }
    }, []);

    const { height, width } = useWindowDimensions();
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: geoLat,
                    longitude: geoLng,
                    latitudeDelta: 0.3,
                    longitudeDelta: 0.3,
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
                        <Text>HERE</Text>
                    </Callout>
                </Marker>
                <Circle
                    center={{
                        latitude: geoLat,
                        longitude: geoLng,
                    }}
                    radius={5000}
                    strokeWidth={3}
                    strokeColor={Colors.primary}
                />
            </MapView>
        </View>
    );
};

export default RallyMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.3,
    },
});
