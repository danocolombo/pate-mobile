import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/colors';

const NoEventsNotice = () => {
    return (
        <>
            <View>
                <View style={styles.root}>
                    <ImageBackground
                        source={require('../images/road.png')}
                        imageStyle={{ borderRadius: 20 }}
                        style={styles.bgImageContainer}
                    >
                        <View style={styles.mainTextContainer}>
                            <Text style={styles.mainTitle}>
                                No Events At This Time
                            </Text>
                        </View>
                        <View style={styles.subTextContainer}>
                            <Text style={styles.subTitle}>
                                Please check back soon...
                            </Text>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </>
    );
};

export default NoEventsNotice;

const styles = StyleSheet.create({
    root: {
        backgroundColor: Colors.secondary,
        marginTop: 20,
        borderRadius: 30,
        height: 400,
        width: 300,
        // flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    bgImageContainer: {
        // flex: 1,
        borderRadius: 30,
        width: '100%',
        height: '100%',
    },
    mainTextContainer: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'top',
        alignItems: 'center',
    },
    subTextContainer: {
        position: 'absolute',
        top: 220,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 20,
        letterSpacing: 0.5,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
});
