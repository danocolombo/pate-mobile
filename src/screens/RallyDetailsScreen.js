import React, { useLayoutEffect } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import RallyDetails from '../components/rallies/RallyDetails';
import EventDetails from '../components/rallies/EventDetails';
const RallyDetailsScreen = ({ route, navigation }) => {
    const rally = route.params.rally;
    const feo = useSelector((state) => state.division);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.appName,
            headerBackTitle: 'Back',
        });
    }, [navigation, feo]);
    return (
        <ImageBackground
            source={require('../components/images/background.png')}
            style={styles.bgImageContainer}
        >
            <EventDetails rally={rally} />
        </ImageBackground>
    );
};

export default RallyDetailsScreen;
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});
