import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
function ServeScreen() {
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
                source={require('../../components/images/background.png')}
                style={styles.bgImageContainer}
            >
                <Text>Serve Screen</Text>
            </ImageBackground>
        </>
    );
}
export default ServeScreen;
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
});
