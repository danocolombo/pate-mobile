import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
function ServeScreen() {
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
