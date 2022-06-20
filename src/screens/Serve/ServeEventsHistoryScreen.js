import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import React, { useState } from 'react';
import MaskInput from 'react-native-mask-input';
const ServeEventsHistoryScreen = () => {
    const [pn, setPn] = useState();
    const US_PHONE = [
        "(",
        /\d/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
    ];
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    return (
        <View style={styles.rootContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>Historical Events</Text>
                <Text>
                    <View style={{ alignItems: "center" }}>
        <MaskInput
          mask={US_PHONE}
          keyboardType="numeric"
          placeholderFillCharacter="x"
          value={pn}
          style={styles.textInput}
          onChangeText={setPn}
        />
      </View>
                </Text>
            </View>
        </View>
    );
};

export default ServeEventsHistoryScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    screenHeader: {
        alignItems: 'center',
    },
    screenHeaderText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    textInput: {
        borderWidth: 1,
        width: 120,
        paddingLeft: 5,
        alignText: 'center',
  }
});
