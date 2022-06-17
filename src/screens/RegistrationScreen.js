import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { List, Badge } from 'react-native-paper';
import CardDate from '../components/ui/RallyCardDate';
import RegistrationDetails from '../components/registrations/Registration.Details';
function RegistrationScreen({ route }) {
    const reg = route.params.reg;
    return (
        <>
            <ImageBackground
                source={require('../components/images/background.png')}
                style={styles.bgImageContainer}
            >
                <RegistrationDetails reg={reg} />
            </ImageBackground>
        </>
    );
}
export default RegistrationScreen;
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});
