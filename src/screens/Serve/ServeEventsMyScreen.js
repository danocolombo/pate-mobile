import {
    StyleSheet,
    Text,
    View,
    ViewBase,
    ImageBackground,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ServeMyRallies from '../../components/serve/ServeMyRallies';

const ServeEventsMyScreen = () => {
    const navigation = useNavigation();
    const feo = useSelector((state) => state.system);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.appName,
        });
    }, [navigation, feo]);
    return (
        <ImageBackground
            source={require('../../components/images/background.png')}
            style={styles.bgImageContainer}
        >
            <ServeMyRallies />
        </ImageBackground>
    );
};

export default ServeEventsMyScreen;

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
