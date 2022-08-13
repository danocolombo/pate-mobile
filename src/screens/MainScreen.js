import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    Modal,
    FlatList,
    ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/ui/CustomButton';
import NoEventsNotice from '../components/ui/NoEventsNotice.js';
import { Surface } from 'react-native-paper';
// import { displayRallies } from '../features/rallies/ralliesSlice';
import RallyItem from '../components/rallies/RallyItem';
import UpcomingAreaEvents from '../components/rallies/upcomingAreaEvents';
import { printObject } from '../utils/helpers';
import { getAvailableEvents } from '../features/rallies/ralliesSlice';

export default function MainScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    const { today } = useSelector((state) => state.system);
    const { displayRallies, allRallies } = useSelector(
        (state) => state.rallies
    );
    const { affiliateHeader } = useSelector((state) => state.system);

    useEffect(() => {
        dispatch(getAvailableEvents({ name, today }));
    }, [allRallies]);

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
                        {/* <Image
                            source={require('../components/images/no-events-card.png')}
                            style={styles.image}
                        /> */}
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
    modalSurface: {
        marginTop: '50%',
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
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
