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
    const [eventDate, setEventDate] = useState(new Date());
    const [eventDateObject, setEventDateObject] = useState();
    const [eventStartTime, setEventStartTime] = useState(new Date());
    const [eventEndTime, setEventEndTime] = useState(new Date());
    const [defaultDateString, setDefaultDateString] = useState(new Date());
    // odl school...
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
            // const test = {
            //     eventDate: '2023-03-05',
            //     startTime: '12:00:00.000',
            // };

            const [year, month, day] = tmp?.eventDate.split('-');
            const startDateObject = new Date(year, parseInt(month) - 1, day);
            const startDate = new Date(startDateObject); // convert to Date object
            setEventDate(startDate);
            //      START TIME
            //      START TIME
            // let tmp = { startTime: '17:00:00.000' };
            const [hours, minutes, seconds, milliseconds] = tmp.startTime
                .split(/[:.]/)
                .map(Number);
            const date = new Date();
            date.setHours(hours, minutes, seconds, milliseconds);
            setEventStartTime(date);
            //      END TIME
            const [ehours, eminutes, eseconds, emilliseconds] = tmp.endTime
                .split(/[:.]/)
                .map(Number);
            const edate = new Date();
            edate.setHours(ehours, eminutes, eseconds, emilliseconds);
            setEventEndTime(edate);
        }
    }, []);

    const handleNext = () => {
        let DANO = false;
        if (DANO) {
            console.log(
                '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'
            );
            console.log('eventDate:', tmp.eventDate, ' vs ', eventDate);
            console.log(typeof tmp.eventDate, ' - ', typeof eventDate);
            console.log(
                'eventStartTime:',
                tmp.startTime,
                ' vs ',
                eventStartTime
            );
            console.log(typeof tmp.startTime, ' - ', typeof eventStartTime);
            console.log('eventEndTime:', tmp.endTime, ' vs ', eventEndTime);
            console.log(
                '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'
            );
            console.log(typeof tmp.startTime, ' - ', typeof eventEndTime);
            // return;
        }
        let FORTSON = true;
        if (FORTSON) {
            /*      ---------------------------------------------
                need to convert long dateObject value to YYYY-MM-DD
                eventDate: "2023-05-10"  vs  "Sat May 13 2023 00:00:00 GMT-0400 (Eastern Daylight Time)"

                need to convert long dateObject value to HH:MM:00.000 value
                eventStartTime: 13:00:00.000  vs  Sun Mar 26 2023 12:00:00 GMT-0400 (Eastern Daylight Time)

                need to convert long dateObject value to HH:MM:00.000 value
                eventEndTime: 16:00:00.000  vs  Sun Mar 26 2023 16:30:00 GMT-0400 (Eastern Daylight Time)
            */
            const newEventDate = eventDate.toISOString().substring(0, 10);
            let hours = eventStartTime.getHours().toString().padStart(2, '0');
            let minutes = eventStartTime
                .getMinutes()
                .toString()
                .padStart(2, '0');
            let milliseconds = eventStartTime
                .getMilliseconds()
                .toString()
                .padStart(3, '0')
                .padEnd(6, '0');
            const newEventStartTime = `${hours}:${minutes}:00.000`;
            hours = eventEndTime.getHours().toString().padStart(2, '0');
            minutes = eventEndTime.getMinutes().toString().padStart(2, '0');
            milliseconds = eventEndTime
                .getMilliseconds()
                .toString()
                .padStart(3, '0')
                .padEnd(6, '0');
            const newEventEndTime = `${hours}:${minutes}:00.000`;

            // console.log(
            //     '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'
            // );
            // console.log('eventDate:', tmp.eventDate, ' vs ', newEventDate);
            // console.log(typeof tmp.eventDate, ' - ', typeof newEventDate);
            // console.log(
            //     'eventStartTime:',
            //     tmp.startTime,
            //     ' vs ',
            //     newEventStartTime
            // );
            // console.log(typeof tmp.startTime, ' - ', typeof newEventStartTime);
            // console.log('eventEndTime:', tmp.endTime, ' vs ', newEventEndTime);
            // console.log(typeof tmp.startTime, ' - ', typeof newEventEndTime);
            // console.log(
            //     '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'
            // );
            // build object to save
            let values = {
                eventDate: newEventDate,
                startTime: newEventStartTime,
                endTime: newEventEndTime,
            };
            //* *********************************************************
            //      START RE-DO
            //* *********************************************************

            const rallyUpdate = {
                ...tmp,
                eventDate: newEventDate,
                startTime: newEventStartTime,
                endTime: newEventEndTime,
            };

            let DANO1 = true;
            if (DANO1) {
                // printObject('RELM:166-->tmp:', tmp);
                // printObject('RELM:167-->rallyUpdate:', rallyUpdate);
                dispatch(updateTmp(rallyUpdate));
                navigation.navigate('RallyEditFlow', {
                    rallyId: rallyId,
                    stage: 4,
                });
            }
            //* *********************************************************
            //      END RE-DO
            //* *********************************************************
            dispatch(updateTmp(values));
            navigation.navigate('RallyEditFlow', {
                rallyId: rallyId,
                stage: 4,
            });
        }
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
        setEventEndTime(data);
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
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            fontWeight: '400',
                                            letterSpacing: 0.6,
                                        }}
                                    >
                                        EVENT START TIME
                                    </Text>
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
                                                {moment(eventStartTime).format(
                                                    'h:mm A'
                                                )}
                                            </Text>
                                        </View>
                                    </Pressable>
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            fontWeight: '400',
                                            letterSpacing: 0.6,
                                        }}
                                    >
                                        EVENT END TIME
                                    </Text>
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
                                                {moment(eventEndTime).format(
                                                    'h:mm A'
                                                )}
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
                                    date={eventStartTime}
                                    // value={eventStartTime}
                                    onConfirm={onStartTimeConfirm}
                                    onCancel={onStartTimeCancel}
                                    //timeZoneOffsetInMinutes={eventStartTime.getTimezoneOffset()}
                                />
                                <DateTimePickerModal
                                    isVisible={modalEndTimeVisible}
                                    mode='time'
                                    date={eventEndTime}
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
