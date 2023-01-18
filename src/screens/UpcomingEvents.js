import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import UpcomingAreaEvents from '../components/rallies/upcomingAreaEvents';
import DivisionRallyItem from '../components/rallies/DivisionRallyItem';
import UpcomingDivisionEventsMap from '../components/rallies/upcomingDivisionEventsMap';
import RallyItem from '../components/rallies/RallyItem';
import NoEventsNotice from '../components/ui/NoEventsNotice.js';
import { ActivityIndicator, Surface } from 'react-native-paper';
import { printObject } from '../utils/helpers';

export default function UpcomingEventsScreen(props) {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const feo = useSelector((state) => state.system);
    const allRallies = useSelector((state) => state.rallies.allRallies);
    const divisionEvents = useSelector((state) => state.division.allRallies);
    const { eventRegion, affiliateHeader, today, affiliation } = useSelector(
        (state) => state.system
    );

    const [isLoading, setIsLoading] = useState(true);
    const [displayRallies, setDisplayRallies] = useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.appName,
        });
    }, [navigation, feo]);
    useEffect(() => {
        setIsLoading(true);
        const filteredRallies = allRallies.filter(
            (r) =>
                r.eventDate >= today &&
                r.approved === true &&
                r.affiliate === affiliation
        );
        if (filteredRallies) {
            setDisplayRallies(filteredRallies);
        }

        setIsLoading(false);
    }, [props, isFocused]);
    if (isLoading) {
        return <ActivityIndicator />;
    }

    return (
        <ImageBackground
            source={require('../components/images/background.png')}
            style={styles.bgImageContainer}
        >
            <>
                {displayRallies.length > 0 ? (
                    <>
                        <View>
                            <Text style={styles.affiliateHeader}>
                                {affiliateHeader}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.titleText}>
                                Upcoming Events
                            </Text>
                        </View>

                        <View style={styles.mapContainer}>
                            {/* <UpcomingAreaEvents
                                locations={displayRallies}
                                mapHeight={0.35}
                                mapWidth={0.9}
                            /> */}
                            <UpcomingDivisionEventsMap
                                locations={divisionEvents}
                                mapHeight={0.35}
                                mapWidth={0.9}
                            />
                        </View>
                        <View>
                            <FlatList
                                data={divisionEvents}
                                keyExtractor={(item) => item.uid}
                                renderItem={({ item, key }) => (
                                    <DivisionRallyItem key={key} rally={item} />
                                )}
                            />
                        </View>
                    </>
                ) : (
                    <View style={styles.imageContainer}>
                        <View style={{ borderRadius: 30 }}>
                            <NoEventsNotice />
                        </View>
                        <View
                            style={{
                                marginTop: 5,
                                marginHorizontal: 40,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                padding: 5,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '200',
                                    textAlign: 'center',
                                }}
                            >
                                Events are managed and released periodically by
                                regional event teams.
                            </Text>
                        </View>
                    </View>
                )}
                {/* </ScrollView> */}
            </>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    affiliateHeader: {
        paddingTop: 20,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleText: {
        paddingBottom: 20,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    mapContainer: {
        alignItems: 'center',
        marginBottom: 10,
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
