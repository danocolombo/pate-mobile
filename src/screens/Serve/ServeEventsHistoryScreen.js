import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import React, { useState } from 'react';
import CurrencyInput from 'react-native-currency-input';

const ServeEventsHistoryScreen = () => {
    const [cost, setCost] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    return (
        <View style={styles.rootContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>Historical Events</Text>
            </View>

            <CurrencyInput
                value={cost}
                style={styles.costInput}
                onChangeValue={setCost}
                prefix={'$ '}
                signPosition='beforePrefix'
                delimiter=','
                precision={2}
                placeholder='cost'
                separator='.'
            />
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
    costInput: {
        marginVertical: 8,
        fontSize: 18,
        borderWidth: 1,
        width: 100,
        marginHorizontal: 30,
        borderColor: '#cdcdcd',
        paddingHorizontal: 12,
        height: 54,
    },
});
