import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { printObject } from '../../utils/helpers';

const P8Button = () => {
    printObject('rotue', route);
    // const bgColor = route.params.bgColor;
    // const onPress = route.params.onPress;
    // const txtColor = route.params.txtColor;
    //bgColor, txtColor, onPress
    return (
        <Pressable onPress={onPress}>
            <View style={styles.buttonContainer}>
                <Text style={styles.button}>P8Button</Text>
            </View>
        </Pressable>
    );
};

export default P8Button;

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'green',
    },
    button: {
        color: 'white',
    },
});
