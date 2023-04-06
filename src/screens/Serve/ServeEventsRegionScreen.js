import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ServeRegionRallies from '../../components/serve/ServeRegionRallies';
const ServeEventsRegionScreen = () => {
    const navigation = useNavigation();
    const feo = useSelector((state) => state.division);
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
            <ServeRegionRallies />
        </ImageBackground>
    );
};

export default ServeEventsRegionScreen;
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
});
