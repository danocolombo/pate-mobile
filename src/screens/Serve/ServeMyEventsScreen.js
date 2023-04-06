import {
    StyleSheet,
    Text,
    View,
    ViewBase,
    ImageBackground,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import * as queries from '../../pateGraphQL/queries';
import { API, graphqlOperation } from 'aws-amplify';
import ServeMyRallies from '../../components/serve/ServeMyRallies';
import ServeMyEvents from '../../components/serve/ServeMyEvents';
import { useCallback } from 'react';
import { printObject } from '../../utils/helpers';

const ServeMyEventsScreen = () => {
    const navigation = useNavigation();
    const feo = useSelector((state) => state.division);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: <feo className='appName'></feo>,
            headerRight: () => (
                <Button
                    onPress={() =>
                        navigation.navigate('RallyEditFlow', {
                            rallyId: rally.uid,
                            stage: 1,
                        })
                    }
                    // color='white'
                    title='NEW'
                />
            ),
        });
    }, [navigation, feo]);
    useFocusEffect(
        useCallback(() => {
            try {
                async function getMyEvents() {
                    //todo HARDCODE-HARDCODE
                    const variables = {
                        id: '0ebefcdf-9fd2-4702-a1e7-76bcf90d9b68',
                    };
                    API.graphql(
                        graphqlOperation(
                            queries.getCoordinatorEvents,
                            variables
                        )
                    )
                        .then((coordinatorEventsResponse) => {
                            printObject(
                                'SMES:48-->CE:\n',
                                coordinatorEventsResponse
                            );
                            // if (
                            //     divisionEvents?.data?.getDivision?.events.items
                            //         .length > 0
                            // ) {
                            //     dispatch(
                            //         loadDivisionInfo(
                            //             divisionEvents?.data?.getDivision
                            //                 ?.events.items
                            //         )
                            //     );
                            // } else {
                            //     console.log('NOPE');
                            // }
                        })
                        .catch((error) => {
                            printObject(
                                'error getting division events from graphql',
                                error
                            );
                        });
                }
                //getMyEvents();
            } catch (error) {
                printObject(
                    'SMES:70-->ERROR GETTING GRAPHQL DATA---->:\n',
                    error
                );
            }
        }, [])
    );
    return (
        <ImageBackground
            source={require('../../components/images/background.png')}
            style={styles.bgImageContainer}
        >
            <ServeMyRallies />
            {/* <ServeMyEvents events={myEvents} /> */}
        </ImageBackground>
    );
};

export default ServeMyEventsScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    screenHeader: {
        alignItems: 'center',
    },
    screenHeaderText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    bgImageContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
});
