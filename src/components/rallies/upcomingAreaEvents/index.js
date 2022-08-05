import {
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    Dimensions,
} from 'react-native';
import React from 'react';
import MapView, { Callout, Marker, Circle } from 'react-native-maps';
import { Colors } from '../../../constants/colors';
const UpcomingAreaEvents = ({ locations, mapHeight, mapWidth }) => {
    let mH = 0.35;
    let mW = 0.9;

    //locations should be geodefined targets to display
    const mHeight = Dimensions.get('window').height * mH;
    const mWidth = Dimensions.get('window').width * mW;
    const { height, width } = useWindowDimensions();
    return (
        <View style={styles.container}>
            <MapView
                provider='google'
                style={{ ...styles.map, width: mWidth, height: mHeight }}
                initialRegion={{
                    latitude: 32.5334093,
                    longitude: -84.9882142,
                    latitudeDelta: 1,
                    longitudeDelta: 1,
                }}
            >
                <Marker
                    key='alna;nva;vad;'
                    coordinate={{
                        latitude: 32.7279,
                        longitude: -84.8749,
                    }}
                    pinColor={Colors.primary}
                >
                    <Callout>
                        <Text>HAMY</Text>

                        <Text style={{ textAlign: 'center' }}>NOW</Text>
                    </Callout>
                </Marker>
                <Marker
                    key='sssfwlfjwojf'
                    coordinate={{
                        latitude: 32.8704,
                        longitude: -84.6746,
                    }}
                    pinColor={Colors.primary}
                >
                    <Callout>
                        <Text>WARMY</Text>

                        <Text style={{ textAlign: 'center' }}>NOW</Text>
                    </Callout>
                </Marker>
            </MapView>
        </View>
    );
};

export default UpcomingAreaEvents;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
    },
});
