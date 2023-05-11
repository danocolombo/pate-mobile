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
import moment from 'moment';
import { printObject } from '../../../utils/helpers';

export default function RallyLogisticsForm({ rallyId }) {
    const feo = useSelector((state) => state.division);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const tmp = useSelector((state) => state.rallies.tmpRally);
    // printObject('REL:28-->LOGISTICS-->tmpRally', tmp);
    const [eventDate, setEventDate] = useState(tmp?.eventDate);
    const [eventDateObject, setEventDateObject] = useState();
    const [eventStartTime, setEventStartTime] = useState(tmp?.startTime);
    const [eventEndTime, setEventEndTime] = useState(tmp?.endTime);
    printObject('REL:34-->tmp:\n', tmp);
    printObject('REL:35-->eventDate:', eventDate);
    printObject('<REL:36></REL:36>-->startTime:', eventStartTime);
    printObject('REL:37-->endTime:', eventEndTime);
    const [defaultDateString, setDefaultDateString] = useState();
    // const [eventDateString, setEventDateString] = useState();
    // const [startTime, setStartTime] = useState();
    // const [startTimeString, setStartTimeString] = useState();
    // const [endTime, setEndTime] = useState();
    // const [endTimeString, setEndTimeString] = useState();
    const [modalEventDateVisible, setModalEventDateVisible] = useState(false);
    const [modalStartTimeVisible, setModalStartTimeVisible] = useState(false);
    const [modalEndTimeVisible, setModalEndTimeVisible] = useState(false);

    useEffect(() => {
        if (rallyId !== 0) {
            console.log('eventDate:>', tmp.eventDate, '<');
            console.log('startTime:>', tmp.startTime, '<');
            console.log('endTime:>', tmp.endTime, '<');

            const [hours, minutes, seconds, milliseconds] = tmp.startTime
                .split(/[:.]/)
                .map(Number);

            const [year, month, day] = tmp?.eventDate.split('-');
            const startDateObject = new Date(year, parseInt(month) - 1, day);
            const startDate = new Date(startDateObject); // convert to Date object

            setEventDate(startDate);

            //      START TIME
            // let tmp = { startTime: '17:00:00.000' };
            const startTime = new Date(
                Date.UTC(1970, 0, 1, hours, minutes, seconds, milliseconds)
            );
            const timeZone = 'America/New_York'; // Change this to the timezone you want to display the time in
            const options = {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
                timeZone,
            };
            const eventStartTimeString = startTime.toLocaleString(
                'en-US',
                options
            );
            setEventStartTime(eventStartTimeString);

            //      END TIME
            const [ehours, eminutes, eseconds, emilliseconds] = tmp.endTime
                .split(/[:.]/)
                .map(Number);
            const endTime = new Date(
                Date.UTC(1970, 0, 1, ehours, eminutes, eseconds, emilliseconds)
            );
            const eventEndTimeString = endTime.toLocaleString('en-US', options);
            setEventEndTime(eventEndTimeString);
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
        console.log('data:', data);
        setEventDate(data);
        setModalEventDateVisible(false);
    };

    const onStartTimeConfirm = (data) => {
        setEventStartTime(data);
        setModalStartTimeVisible(false);
    };
    const onEndTimeConfirm = (data) => {
        console.log('CONFIRMED:', data);
        // FormatTime(data, 'END');
        setModalEndTimeVisible(false);
    };

    const onEventCancel = (data) => setModalEventDateVisible(false);
    const onStartTimeCancel = (data) => setModalStartTimeVisible(false);
    const onEndTimeCancel = (data) => setModalEndTimeVisible(false);
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
                                                <Text
                                                    style={{
                                                        padding: 15,
                                                        fontSize: 25,
                                                    }}
                                                >
                                                    {eventDate
                                                        ? moment(
                                                              eventDate
                                                          ).format(
                                                              'ddd MMM DD, YYYY'
                                                          )
                                                        : defaultDateString}
                                                </Text>
                                            </Text>
                                        </View>
                                    </Pressable>
                                    <Pressable
                                        onPress={() =>
                                            setModalStartTimeVisible(true)
                                        }
                                    >
                                        <View style={styles.dateTimeDisplay}>
                                            <Text
                                                style={{
                                                    padding: 15,
                                                    fontSize: 25,
                                                }}
                                            >
                                                {eventStartTime
                                                    ? `${moment(
                                                          eventStartTime,
                                                          'HH:mm'
                                                      ).format('h:mm A')}`
                                                    : defaultDateString}
                                            </Text>
                                        </View>
                                    </Pressable>
                                    <Pressable
                                        onPress={() =>
                                            setModalEndTimeVisible(true)
                                        }
                                    >
                                        <View style={styles.dateTimeDisplay}>
                                            <Text
                                                style={{
                                                    padding: 15,
                                                    fontSize: 25,
                                                }}
                                            >
                                                {eventEndTime
                                                    ? `${moment(
                                                          eventEndTime,
                                                          'HH:mm'
                                                      ).format('h:mm A')}`
                                                    : defaultDateString}
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>

                                <DateTimePickerModal
                                    isVisible={modalEventDateVisible}
                                    mode='date'
                                    date={eventDate}
                                    value={eventDate}
                                    onConfirm={onEventDateConfirm}
                                    onCancel={onEventCancel}
                                    timeZoneOffsetInMinutes={new Date().getTimezoneOffset()}
                                />
                                <DateTimePickerModal
                                    isVisible={modalStartTimeVisible}
                                    mode='time'
                                    date={moment(
                                        eventStartTime,
                                        'HH:mm'
                                    ).toDate()}
                                    value={eventStartTime}
                                    onConfirm={onStartTimeConfirm}
                                    onCancel={onStartTimeCancel}
                                    timeZoneOffsetInMinutes={new Date().getTimezoneOffset()}
                                />
                                <DateTimePickerModal
                                    isVisible={modalEndTimeVisible}
                                    mode='time'
                                    date={moment(
                                        eventEndTime,
                                        'HH:mm'
                                    ).toDate()}
                                    value={eventEndTime}
                                    onConfirm={onEndTimeConfirm}
                                    onCancel={onEndTimeCancel}
                                    timeZoneOffsetInMinutes={new Date().getTimezoneOffset()}
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
