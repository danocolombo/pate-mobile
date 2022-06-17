import {
    StyleSheet,
    Text,
    View,
    ViewBase,
    ImageBackground,
} from 'react-native';
import React from 'react';
import ServeMyRallies from '../../components/serve/ServeMyRallies';

const ServeEventsMyScreen = () => {
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
