import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    ImageBackground,
    Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants/colors';
import { updateTmp } from '../../../features/rallies/ralliesSlice';
import CustomNavButton from '../../ui/CustomNavButton';
import {
    getPateDate,
    getPateTime,
    pateDateToSpinner,
    pateTimeToSpinner,
} from '../../../utils/date';
import { compareAsc } from 'date-fns';
import { printObject } from '../../../utils/helpers';

export default function RallyLogisticsForm({ rallyId }) {
    // messy
    let dateNow = new Date(2022, 6, 23);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const tmp = useSelector((state) => state.rallies.tmpRally);
    const [finishDateError, setFinishDateError] = useState(false);
    const [date, setDate] = useState(
        tmp?.eventDate ? pateDateToSpinner(tmp?.eventDate) : dateNow
    );
    // const [date, setDate] = useState(new Date(Date.now()));
    const [startTime, setStartTime] = useState(
        tmp?.startTime
            ? pateTimeToSpinner(tmp?.eventDate, tmp?.startTime)
            : dateNow
    );
    // const [startTime, setStartTime] = useState(new Date(Date.now()));
    const [endTime, setEndTime] = useState(
        tmp?.endTime ? pateTimeToSpinner(tmp?.eventDate, tmp?.endTime) : dateNow
    );
    // const [endTime, setEndTime] = useState(new Date(Date.now()));
    const handleNext = () => {
        let theDateObject = date;
        let ed = Date.parse(theDateObject);
        let pDate = getPateDate(ed);

        theDateObject = startTime;
        let st = Date.parse(theDateObject);
        let pStart = getPateTime(st);

        theDateObject = endTime;
        let et = Date.parse(theDateObject);
        let pEnd = getPateTime(et);

        //make sure the Finish/End date/time is = or greater than start.
        // 1 means et is less than st
        const dateCompare = compareAsc(st, et);

        if (dateCompare === 1) {
            setFinishDateError(true);
            return;
        }

        // build object to save
        let values = {
            eventDate: pDate,
            startTime: pStart,
            endTime: pEnd,
        };

        // printObject('handleNext::values', values);
        dispatch(updateTmp(values));
        navigation.navigate('RallyEditFlow', {
            rallyId: rallyId,
            stage: 3,
        });
    };
    const onDateChange = (event, value) => {
        setDate(value);
    };
    const onStartTimeChange = (event, value) => {
        setStartTime(value);
    };
    const onEndTimeChange = (event, value) => {
        setEndTime(value);
    };

    // printObject('1. tmpRally:', tmp);
    return (
        <>
            <ImageBackground
                source={require('../../../components/images/background.png')}
                style={styles.bgImageContainer}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.root}>
                        <ScrollView style={styles.infoWrapper}>
                            <View style={styles.formHeader}>
                                <Text style={styles.titleText}>Logistics</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <View>
                                    <View>
                                        <View style={styles.inputLabels}>
                                            <Text style={styles.inputLabelText}>
                                                Event Date
                                            </Text>
                                            <View
                                                style={styles.datePickerWrapper}
                                            >
                                                <DateTimePicker
                                                    testID='dateTimePicker'
                                                    minimumDate={new Date()}
                                                    value={date}
                                                    mode='date'
                                                    display={
                                                        Platform.OS === 'ios'
                                                            ? 'spinner'
                                                            : 'default'
                                                    }
                                                    is24Hour={true}
                                                    onChange={onDateChange}
                                                    style={styles.datePicker}
                                                />
                                            </View>
                                            <Text style={styles.inputLabelText}>
                                                Start Time
                                            </Text>
                                            <View
                                                style={styles.datePickerWrapper}
                                            >
                                                <DateTimePicker
                                                    value={startTime}
                                                    minuteInterval={15}
                                                    mode='time'
                                                    display={
                                                        Platform.OS === 'ios'
                                                            ? 'spinner'
                                                            : 'default'
                                                    }
                                                    is24Hour={true}
                                                    onChange={onStartTimeChange}
                                                    style={styles.datePicker}
                                                />
                                            </View>
                                            <Text style={styles.inputLabelText}>
                                                Finish Time
                                            </Text>
                                            <View
                                                style={styles.datePickerWrapper}
                                            >
                                                <DateTimePicker
                                                    value={endTime}
                                                    mode='time'
                                                    minuteInterval={15}
                                                    display={
                                                        Platform.OS === 'ios'
                                                            ? 'spinner'
                                                            : 'default'
                                                    }
                                                    is24Hour={true}
                                                    onChange={onEndTimeChange}
                                                    style={styles.datePicker}
                                                />
                                            </View>
                                            {finishDateError && (
                                                <View
                                                    style={
                                                        styles.finishTimeErrorWrapper
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.finishTimeErrorText
                                                        }
                                                    >
                                                        Finish Time cannot be
                                                        before Start Time
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.buttonContainer}>
                            <CustomNavButton
                                title='Next'
                                graphic={{
                                    name: 'forward',
                                    color: 'white',
                                    size: 10,
                                }}
                                cbStyles={{
                                    backgroundColor: 'green',
                                    color: 'white',
                                    width: '50%',
                                }}
                                onPress={() => handleNext()}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </>
    );
}
const styles = StyleSheet.create({
    root: {
        flex: 1,

        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    infoWrapper: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 20,
    },
    formHeader: {
        marginVertical: 10,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    inputLabels: {
        alignItems: 'center',
    },
    inputLabelText: {
        fontSize: 24,
        // fontWeight: 'bold',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    submitButton: {
        width: '70%',
    },
    datePickerWrapper: {
        borderWidth: 4,
        backgroundColor: 'white',
        borderColor: Colors.gray35,
        borderRadius: 10,
        marginBottom: 5,
    },
    datePicker: {
        width: 320,
        height: 100,
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        // borderWidth: 3,
        // borderStyle: 'double',
        borderColor: Colors.gray700,
    },
    finishTimeErrorWrapper: {
        paddingHorizontal: 5,
    },

    finishTimeErrorText: {
        fontSize: 24,
        color: Colors.critical,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
