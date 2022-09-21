import React, { useLayoutEffect } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import RallyDetails from '../components/rallies/RallyDetails';
const RallyDetailsScreen = ({ route, navigation }) => {
    const rally = route.params.rally;
    const feo = useSelector((state) => state.system);
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
            <RallyDetails rally={rally} />
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
