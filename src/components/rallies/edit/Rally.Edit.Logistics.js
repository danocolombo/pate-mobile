import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    ImageBackground,
    Pressable,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants/colors';
import { updateTmp } from '../../../features/rallies/ralliesSlice';
import CustomNavButton from '../../ui/CustomNavButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getPateDate, getPateTime } from '../../../utils/date';
import { compareAsc } from 'date-fns';
import { printObject } from '../../../utils/helpers';

export default function RallyLogisticsForm({ rallyId }) {
    const feo = useSelector((state) => state.system);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const tmp = useSelector((state) => state.rallies.tmpRally);
    printObject('REL:28-->LOGISTICS-->tmpRally', tmp);
    const [defaultDateString, setDefaultDateString] = useState();
    const [eventDate, setEventDate] = useState();
    const [eventDateString, setEventDateString] = useState();
    const [startTime, setStartTime] = useState();
    const [startTimeString, setStartTimeString] = useState();
    const [endTime, setEndTime] = useState();
    const [endTimeString, setEndTimeString] = useState();
    const [modalEventDateVisible, setModalEventDateVisible] = useState(false);
    const [modalStartTimeVisible, setModalStartTimeVisisble] = useState(false);
    const [modalEndTimeVisible, setModalEndTimeVisisble] = useState(false);

    const [finishDateError, setFinishDateError] = useState(false);

    useEffect(() => {
        if (rallyId !== 0) {
            // console.log('-->', tmp.startTime);
            console.log('eventDate:>', tmp.eventDate, '<');
            console.log('stateTime:>', tmp.startTime, '<');
            console.log('endTime:>', tmp.endTime, '<');

            const [year, month, day] = tmp?.eventDate.split('-');
            const startDateObject = new Date(year, month - 1, day);

            // Outputs: Sat Jun 04 2022 00:00:00 GMT-0700 (Pacific Daylight Time)
            let stDate = new Date(`1970-01-01T${tmp?.startTime}Z`);
            const formattedStartTime = stDate.toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
            });

            // Outputs: "1:00 PM" (in the user's locale)
            let etDate = new Date(`1970-01-01T${tmp?.endTime}Z`);
            const formattedEndTime = etDate.toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
            });
            // let tmpDate = new Date(yr, mo - 1, da, shr, smi, 0);
            console.log('AFTER...');
            console.log('8888888888888888888888888888888888');

            console.log('startDateObject:', startDateObject);
            console.log('startTime:', stDate);
            console.log('endTime:', etDate);
            console.log('8888888888888888888888888888888888');

            setEventDate(startDateObject);
            setEventDateString(startDateObject.toDateString());
            setDefaultDateString(startDateObject.toDateString());
            setStartTime(stDate.toTimeString());
            let stime = makeDateString(formattedStartTime);
            setStartTimeString(etDate);

            setEndTime(formattedEndTime);
            let eTime = makeDateString(formattedStartTime);
            setEndTimeString(eTime);
        } else {
            const yr = feo.today.substr(0, 4);
            const mo = feo.today.substr(5, 2);
            const da = feo.today.substr(8, 2);
            let tmpDate = new Date(yr, mo - 1, da, 13, 0, 0, 0);
            console.log('tmpDate2:', tmpDate);
            setEventDate(tmpDate);
            setEventDateString(tmpDate.toDateString());
            setStartTime(tmpDate);
            let stime = makeDateString(tmpDate);
            setStartTimeString(stime);
            tmpDate = new Date(yr, mo - 1, da, 17, 0, 0, 0);
            setEndTime(tmpDate);
            let etime = makeDateString(tmpDate);
            setEndTimeString(etime);
        }
    }, []);
    const handleNext = () => {
        let ed = Date.parse(eventDate);
        let pDate = getPateDate(ed);

        let st = Date.parse(startTime);
        let pStart = getPateTime(st);

        let et = Date.parse(endTime);
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
        dispatch(updateTmp(values));
        navigation.navigate('RallyEditFlow', {
            rallyId: rallyId,
            stage: 4,
        });
    };
    const onEventDateConfirm = (data) => {
        FormatEventDate(data);
        setModalEventDateVisible(false);
    };
    const FormatEventDate = (data) => {
        let dateString =
            data.getMonth() +
            1 +
            '-' +
            data.getDate() +
            '-' +
            data.getFullYear() +
            ' ';
        const yr = parseInt(data.getFullYear());
        const mo = parseInt(data.getMonth());
        const da = parseInt(data.getDate());
        const tmp = new Date(yr, mo, da, 0, 0, 0);
        setEventDate(tmp);
        setEventDateString(tmp.toDateString());
        return;
    };
    const onStartTimeConfirm = (data) => {
        FormatTime(data, 'START');
        setModalStartTimeVisisble(false);
    };
    const onEndTimeConfirm = (data) => {
        FormatTime(data, 'END');
        setModalEndTimeVisisble(false);
    };
    const FormatTime = (data, target) => {
        const yr = parseInt(data.getFullYear());
        const mo = parseInt(data.getMonth());
        const da = parseInt(data.getDate());
        const hr = parseInt(data.getHours());
        const mi = parseInt(data.getMinutes());
        const tmpDate = new Date(yr, mo, da, hr, mi, 0, 0);
        let str;
        if (Platform === 'android') {
            str =
                (hr > 12 ? hr - 12 : hr).toString() +
                ':' +
                ('0' + mi.toString()).slice(-2) +
                ' ' +
                (hr > 11 ? 'PM' : 'AM');
        } else {
            str =
                (hr > 12 ? hr - 12 : hr).toString() +
                ':' +
                ('0' + mi.toString()).slice(-2) +
                ' ' +
                (hr > 11 ? 'PM' : 'AM');
        }
        if (target === 'START') {
            setStartTime(tmpDate);
            setStartTimeString(str);
        } else {
            setEndTime(tmpDate);
            setEndTimeString(str);
        }
        return;
    };
    const makeDateString = (data) => {
        console.log('makeDateString(data)', data);
        return data;
        const yr = parseInt(data.getFullYear());
        const mo = parseInt(data.getMonth());
        const da = parseInt(data.getDate());
        const hr = parseInt(data.getHours());
        const mi = parseInt(data.getMinutes());

        let str;
        if (Platform === 'android') {
            str =
                (hr > 12 ? hr - 12 : hr).toString() +
                ':' +
                ('0' + mi.toString()).slice(-2) +
                ' ' +
                (hr > 11 ? 'PM' : 'AM');
        } else {
            str =
                (hr > 12 ? hr - 12 : hr).toString() +
                ':' +
                ('0' + mi.toString()).slice(-2) +
                ' ' +
                (hr > 11 ? 'PM' : 'AM');
        }
        return str;
    };
    const onEventCancel = (data) => setModalEventDateVisible(false);
    const onStartTimeCancel = (data) => setModalStartTimeVisisble(false);
    const onEndTimeCancel = (data) => setModalEndTimeVisisble(false);
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
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            fontWeight: '400',
                                            letterSpacing: 0.6,
                                        }}
                                    >
                                        EVENT DATE
                                    </Text>
                                    <Pressable
                                        onPress={() =>
                                            setModalEventDateVisible(true)
                                        }
                                    >
                                        <View style={styles.dateTimeDisplay}>
                                            <Text
                                                style={{
                                                    padding: 15,
                                                    fontSize: 25,
                                                }}
                                            >
                                                {eventDateString
                                                    ? eventDateString
                                                    : defaultDateString}
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        marginTop: 15,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            fontWeight: '400',
                                            letterSpacing: 0.6,
                                        }}
                                    >
                                        START TIME
                                    </Text>
                                    <Pressable
                                        onPress={() =>
                                            setModalStartTimeVisisble(true)
                                        }
                                    >
                                        <View style={styles.dateTimeDisplay}>
                                            <Text
                                                style={{
                                                    padding: 15,
                                                    fontSize: 25,
                                                }}
                                            >
                                                {startTimeString
                                                    ? startTimeString
                                                    : defaultDateString}
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        marginTop: 15,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            fontWeight: '400',
                                            letterSpacing: 0.6,
                                        }}
                                    >
                                        FINISH TIME
                                    </Text>
                                    <Pressable
                                        onPress={() =>
                                            setModalEndTimeVisisble(true)
                                        }
                                    >
                                        <View style={styles.dateTimeDisplay}>
                                            <Text
                                                style={{
                                                    padding: 15,
                                                    fontSize: 25,
                                                }}
                                            >
                                                {endTimeString
                                                    ? endTimeString
                                                    : defaultDateString}
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>

                                <DateTimePickerModal
                                    isVisible={modalEventDateVisible}
                                    date={eventDate}
                                    mode='date'
                                    value={eventDate}
                                    onConfirm={onEventDateConfirm}
                                    onCancel={onEventCancel}
                                />
                                <DateTimePickerModal
                                    isVisible={modalStartTimeVisible}
                                    date={startTime}
                                    mode='time'
                                    value={startTime}
                                    onConfirm={onStartTimeConfirm}
                                    onCancel={onStartTimeCancel}
                                />
                                <DateTimePickerModal
                                    isVisible={modalEndTimeVisible}
                                    date={endTime}
                                    mode='time'
                                    value={endTime}
                                    onConfirm={onEndTimeConfirm}
                                    onCancel={onEndTimeCancel}
                                />
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
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    dateTimeDisplay: {
        backgroundColor: 'lightgrey',
        marginVertical: 2,
        marginHorizontal: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
});
