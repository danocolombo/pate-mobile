import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Surface, Headline, Subheading } from 'react-native-paper';
import { printObject } from '../utils/helpers';

const ErrorScreen = (props) => {
    printObject('props', props);
    const errorCode = props.route.params.id;
    const errorMsg = props.route.params.message;
    return (
        <View style={styles.rootContainer}>
            <Surface style={styles.surfaceContainer}>
                <Headline>System Error</Headline>
                <Text style={styles.text}>ERROR: {errorCode}</Text>
                <Text style={styles.text}>{errorMsg}</Text>
            </Surface>
        </View>
    );
};

export default ErrorScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    surfaceContainer: {
        marginHorizontal: 10,
        padding: 20,
    },
    text: {
        fontSize: 16,
        paddingVertical: 10,
    },
});
