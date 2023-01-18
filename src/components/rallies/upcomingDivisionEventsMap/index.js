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
import { useSelector } from 'react-redux';
import { Colors } from '../../../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StylesContext } from '@material-ui/styles';
import { printObject } from '../../../utils/helpers';
import { pateDateToShortMonthDay, getPateDate } from '../../../utils/date';
const UpcomingDivisionEventsMap = ({ locations, mapHeight, mapWidth }) => {
    const navigation = useNavigation();
    const divEvents = useSelector((state) => state.division.allRallies);
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

    if (!divEvents) {
        return <ActivityIndicator />;
    }
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                zoomEnabled={true}
                showsUserLocation
                style={{ ...styles.map, width: mWidth, height: mHeight }}
                initialRegion={{
                    latitude: 32.5334093,
                    longitude: -84.9882142,
                    latitudeDelta: 3,
                    longitudeDelta: 3,
                }}
            >
                {divEvents.map(
                    (l) =>
                        l?.location?.latitude &&
                        l?.location?.longitude && (
                            <Marker
                                key={l.id}
                                coordinate={{
                                    latitude: parseFloat(l.location.latitude),
                                    longitude: parseFloat(l.location.longitude),
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
                                            {l.eventDate}
                                            {/* {pateDateToShortMonthDay(
                                                getPateDate(l.eventDate)
                                            )} */}
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

export default UpcomingDivisionEventsMap;

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
        fontSize: 10,
        paddingHorizontal: 10,
    },
});
