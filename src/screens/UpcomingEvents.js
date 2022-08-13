import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import CustomButton from '../components/ui/CustomButton';
import { Colors } from '../constants/colors';
import UpcomingAreaEvents from '../components/rallies/upcomingAreaEvents';
import RallyItem from '../components/rallies/RallyItem';
import NoEventsNotice from '../components/ui/NoEventsNotice.js';
import { ActivityIndicator, Surface } from 'react-native-paper';
import { printObject } from '../utils/helpers';

export default function UpcomingEventsScreen(props) {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const allRallies = useSelector((state) => state.rallies.allRallies);
    const { eventRegion, affiliateHeader, today } = useSelector(
        (state) => state.system
    );

    const [isLoading, setIsLoading] = useState(true);
    const [displayRallies, setDisplayRallies] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const filteredRallies = allRallies.filter(
            (r) => r.eventDate >= today && r.approved === true
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
                {displayRallies ? (
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
                        <View>
                            <Text>today: -- {today} --</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <UpcomingAreaEvents
                                locations={displayRallies}
                                mapHeight={0.35}
                                mapWidth={0.9}
                            />
                        </View>
                        <View>
                            <FlatList
                                data={displayRallies}
                                keyExtractor={(item) => item.uid}
                                renderItem={({ item }) => (
                                    <RallyItem rally={item} />
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
        alignItems: 'center',
    },
    graphicRoot: {
        backgroundColor: Colors.secondary,
        // flex: 0.8,
        flexDirection: 'column',

        paddingHorizontal: 10,
        marginTop: 20,
        borderRadius: 30,

        width: '90%',
    },
    heroImageContainer: {
        // flexDirection: 'column',
        marginTop: 10,

        justifyContent: 'center',
        alignItems: 'center',
        // height: '100%',
    },
    mainTextContainer: {
        justifyContent: 'top',
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center',
    },
    subTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 34,
        letterSpacing: 0.5,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
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
    infoText: {
        color: 'white',
        fontSize: 24,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '85%',
        height: '65%',
    },
    modalContainer: {
        marginTop: '200',
        // alignSelf: 'flex-end',
    },
    welcomeSurface: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: Colors.primary500,
        marginHorizontal: 20,
        justifyContent: 'space-between',
        borderRadius: 10,
        elevation: 5,
        shadowColor: Colors.primary500,
        shadowRadius: 8,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.6,
    },
    modalSurface: {
        marginTop: '50%',
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        // elevation: 3,
        shadowColor: Colors.primary500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    modalInfoWrapper: {
        alignItems: 'center',
    },
    modalTitle: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalButtonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    modalButtonWrapper: {
        marginHorizontal: 10,
    },
});
