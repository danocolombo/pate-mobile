import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ServeStateRallies from '../../components/serve/ServeStateRallies';
const ServeEventsStateScreen = () => {
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
            <ServeStateRallies />
        </ImageBackground>
    );
};

export default ServeEventsStateScreen;
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
});
