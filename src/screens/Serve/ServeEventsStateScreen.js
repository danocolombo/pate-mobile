import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import ServeStateRallies from '../../components/serve/ServeStateRallies';
const ServeEventsStateScreen = () => {
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
