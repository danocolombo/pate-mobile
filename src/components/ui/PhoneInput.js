import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import MaskInput from 'react-native-mask-input';
const PhoneInput = (props) => {
    const { overrideStyle, value, onChange } = props;
    const [pn, setPn] = useState();
    const US_PHONE = [
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
    ];
    return (
        <View style={{ ...styles.textWrapper, ...overrideStyle }}>
            <MaskInput
                mask={US_PHONE}
                keyboardType='numeric'
                placeholderFillCharacter='x'
                maxLength={14}
                value={value}
                fontSize={18}
                style={styles.textInput}
                onChangeText={onChange}
            />
        </View>
    );
};

export default PhoneInput;

const styles = StyleSheet.create({
    textWrapper: {
        borderWidth: 1,
        width: 150,
        alignItems: 'center',
    },
    textInput: {
        fontSize: 18,
        padding: 5,
    },
});
