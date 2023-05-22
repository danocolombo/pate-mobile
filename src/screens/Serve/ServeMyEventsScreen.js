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
import { useCallback } from 'react';
import { printObject } from '../../utils/helpers';

const ServeMyEventsScreen = () => {
    const navigation = useNavigation();
    const feo = useSelector((state) => state.division);
    const currentUser = useSelector((state) => state.user);
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
