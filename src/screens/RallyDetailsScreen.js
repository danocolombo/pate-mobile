import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import RallyDetails from '../components/rallies/RallyDetails';
const RallyDetailsScreen = ({ route, navigation }) => {
    const rally = route.params.rally;
    return (
        <ImageBackground
            source={require('../components/images/background.png')}
            style={styles.bgImageContainer}
        >
            <RallyDetails rally={rally} navigation />
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
