import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React, { useLayoutEffect } from 'react';

import { useSelector } from 'react-redux';
import ServeRallyForm from '../../components/serve/ServeRallyForm';
import { printObject } from '../../utils/helpers';
const ServeRallyFormScreen = ({ route, navigation }) => {
    const rally = route.params.rally;

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
            <ServeRallyForm rally={rally} navigation />
        </ImageBackground>
    );
};

export default ServeRallyFormScreen;

const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
});
