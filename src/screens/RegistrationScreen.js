import React, { useLayoutEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { List, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import CardDate from '../components/ui/RallyCardDate';
import RegistrationDetails from '../components/registrations/Registration.Details';
function RegistrationScreen({ route }) {
    const reg = route.params.reg;
    const navigation = useNavigation();
    const feo = useSelector((state) => state.division);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.appName,
        });
    }, [navigation, feo]);
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
