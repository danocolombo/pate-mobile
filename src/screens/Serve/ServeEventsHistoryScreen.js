import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from 'react-native-web';
const ServeEventsHistoryScreen = () => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    return (
        <View style={styles.rootContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>Historical Events</Text>
            </View>
            <View>
                <View>
                    <Button
                        onPress={showDatepicker}
                        title='Show date picker!'
                    />
                </View>
                <View>
                    <Button
                        onPress={showTimepicker}
                        title='Show time picker!'
                    />
                </View>
                <Text>selected: {date.toLocaleString()}</Text>
                {show && (
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
            </View>
            <View>
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode='date'
                    is24Hour={true}
                    onChange={onChange}
                />
            </View>
            <View style={styles.datePickerWrapper}>
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode='date'
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onChange}
                    style={styles.datePicker}
                />
            </View>
            <View style={styles.datePickerWrapper}>
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode='time'
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onChange}
                    style={styles.datePicker}
                />
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
    datePickerWrapper: {
        borderWidth: 2,
        borderColor: 'red',
        alignItems: 'center',
    },
    datePicker: {
        width: 320,
        height: 100,
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
    },
});
