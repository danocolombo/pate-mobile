import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import ServeRallyForm from '../../components/serve/ServeRallyForm';
import { printObject } from '../../utils/helpers';
const ServeRallyFormScreen = ({ route, navigation }) => {
    const rally = route.params.rally;
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
