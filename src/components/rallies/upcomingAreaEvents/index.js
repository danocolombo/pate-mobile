import {
    StyleSheet,
    Text,
    View,
    Alert,
    useWindowDimensions,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MapView, {
    Callout,
    Marker,
    Circle,
    PROVIDER_GOOGLE,
} from 'react-native-maps';
import { Colors } from '../../../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StylesContext } from '@material-ui/styles';
import { printObject } from '../../../utils/helpers';
import { pateDateToShortMonthDay } from '../../../utils/date';
const UpcomingAreaEvents = ({ locations, mapHeight, mapWidth }) => {
    const navigation = useNavigation();
    let mH = mapHeight || 0.35;
    let mW = mapWidth || 0.9;

    //locations should be geodefined targets to display
    const mHeight = Dimensions.get('window').height * mH;
    const mWidth = Dimensions.get('window').width * mW;
    const { height, width } = useWindowDimensions();
    const handleMarkerClick = (target) => {
        console.log('target:', target);
        navigation.navigate('RallyDetail', {
            rally: target,
        });
    };

    if (!locations) {
        return <ActivityIndicator />;
    }
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                zoomEnabled={false}
                style={{ ...styles.map, width: mWidth, height: mHeight }}
                initialRegion={{
                    latitude: 32.5334093,
                    longitude: -84.9882142,
                    latitudeDelta: 3,
                    longitudeDelta: 3,
                }}
            >
                {locations.map(
                    (l) =>
                        l?.geolocation?.lat &&
                        l?.geolocation?.lng && (
                            <Marker
                                key={l.uid}
                                coordinate={{
                                    latitude: parseFloat(l.geolocation.lat),
                                    longitude: parseFloat(l.geolocation.lng),
                                }}
                                pinColor={Colors.primary}
                            >
                                <Callout
                                    tooltip
                                    style={styles.callout}
                                    onPress={() => handleMarkerClick(l)}
                                >
                                    <View>
                                        <Text style={styles.locationName}>
                                            {l.name}
                                        </Text>

                                        <Text style={styles.eventDate}>
                                            {pateDateToShortMonthDay(
                                                l.eventDate
                                            )}
                                        </Text>
                                    </View>
                                </Callout>
                            </Marker>
                        )
                )}
            </MapView>
        </View>
    );
};

export default UpcomingAreaEvents;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
    },
    callout: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    locationName: {
        fontWeight: '600',
        paddingHorizontal: 10,
    },
    eventDate: {
        fontSize: 12,
        paddingHorizontal: 10,
    },
});
