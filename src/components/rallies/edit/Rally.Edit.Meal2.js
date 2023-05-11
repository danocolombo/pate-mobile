import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Pressable,
    Platform,
    Modal,
    ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomButton from '../../../components/ui/CustomButton';
import { Surface } from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import { Switch } from '@react-native-material/core';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants/colors';
import moment from 'moment';
import {
    getPateDate,
    getPateTime,
    pateDateToSpinner,
    pateTimeToSpinner,
} from '../../../utils/date';
import { updateTmp } from '../../../features/rallies/ralliesSlice';
import CustomNavButton from '../../ui/CustomNavButton';
import { printObject } from '../../../utils/helpers';

export default function RallyMealForm({ rallyId }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const tmp = useSelector((state) => state.rallies.tmpRally);
    const originalGathering = useSelector((state) => state.rallies.rallyCopy);
    const [defaultDateTime, setDefaultDateTime] = useState();
    const [defaultDateTimeString, setDefaultDateTimeString] = useState();
    const [mealStartTime, setMealStartTime] = useState();
    const [mealStartTimeString, setMealStartTimeString] = useState();
    const [deadlineDate, setDeadlineDate] = useState();
    const [deadlineDateString, setDeadlineDateString] = useState();
    const [modalMealTimeVisible, setModalMealTimeVisible] = useState();
    const [modalDeadlineVisible, setModalDeadlineVisible] = useState();
    const [offerMeal, setOfferMeal] = useState(!!tmp?.meal?.id);
    const [showMealCountConfirm, setShowMealCountConfirm] = useState(
        parseInt(tmp?.meal?.mealCount) > 0 ? true : false
    );
    // cost will be in cents (pennies) so  need to divide by 100, unless the value is 0
    const [cost, setCost] = useState(
        tmp?.meal?.cost ? (tmp.meal.cost !== 0 ? tmp.meal.cost / 100 : 0) : 0
    );

    const [mealMessage, setMealMessage] = useState(
        tmp?.meal?.message ? tmp.meal.message : ''
    );
    const makeTimeString = (data) => {
        const yr = parseInt(data.getFullYear());
        const mo = parseInt(data.getMonth());
        const da = parseInt(data.getDate());
        const hr = parseInt(data.getHours());
        const mi = parseInt(data.getMinutes());

        let str;
        // console.log('yr', yr);
        // console.log('mo', mo);
        // console.log('da', da);
        // console.log('hr', hr);
        // console.log('mi', mi);
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
    printObject('REM2:89-->orignalGathering:\n', originalGathering);
    printObject('REM2:90-->tmp:', tmp);
    useEffect(() => {
        if (!tmp?.meal?.id) {
            // default of today at noon
            // let tmpDate = new Date(yr, mo - 1, da, 12, 0, 0, 0);
            let tmpDate = new Date();
            tmpDate.setHours(12, 0, 0, 0);
            setDefaultDateTime(tmpDate);
            setDeadlineDate(tmpDate);
            setMealStartTime(tmpDate);
            setDeadlineDateString(tmpDate.toDateString());
            // let t = makeTimeString(tmpDate);
            // setMealStartTimeString(t);

            //default the deadline to be the date of the event
            const [yr, mo, da] = tmp.eventDate.split(/-/).map(Number);
            const dLineDate = new Date(yr, mo - 1, da, 12, 0, 0, 0);
            setDeadlineDate(dLineDate);
            setDeadlineDateString(dLineDate.toDateString());
        } else {
            // get the tmp.meal.startTime value into Date object
            if (!tmp?.meal?.startTime) {
                // there is meal, but no start time, default to noon
                const date = new Date();
                date.setHours(12, 0, 0, 0);
                setMealStartTime(date);
            } else {
                const [hours, minutes, seconds, milliseconds] =
                    tmp?.meal?.startTime.split(/[:.]/).map(Number);
                const date = new Date();
                date.setHours(hours, minutes, seconds, milliseconds);
                // printObject('REM2:122->startTIme:', date);
                setMealStartTime(date);
            }
            //      DEADLINE DATE
            let yr = 0;
            let mo = 0;
            let da = 0;
            if (!tmp?.meal?.deadline) {
                // this is meal, but no deadline, default to eventDate
                [yr, mo, da] = [...tmp.eventDate.split(/-/)].map(Number);
            } else {
                //use the tmp.meal.deadline
                [yr, mo, da] = [...tmp.meal.deadline.split(/-/)].map(Number);
            }

            // can use start times, since the values are not used
            const tmpDate = new Date(yr, mo - 1, da, 0, 0, 0);
            setDeadlineDate(tmpDate);
            setDeadlineDateString(tmpDate.toDateString());
        }
    }, []);

    const onMessageChange = (e) => {
        // printObject('REM:64-->e:', e);
        setMealMessage(e);
    };
    const onMealTimeConfirm = (data) => {
        FormatTime(data);
        setModalMealTimeVisible(false);
    };
    const FormatTime = (data) => {
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
        setMealStartTime(tmpDate);
        setMealStartTimeString(str);

        return;
    };
    const onDeadlineDateConfirm = (data) => {
        FormatDate(data);
        setModalDeadlineVisible(false);
    };
    const FormatDate = (data) => {
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
        setDeadlineDate(tmp);
        setDeadlineDateString(tmp.toDateString());
        return;
    };
    const onMealTimeCancel = (data) => setModalMealTimeVisible(false);
    const onDeadlineDateCancel = (data) => setModalDeadlineVisible(false);
    const handleNext = () => {
        try {
            console.log('offerMeal type:', typeof offerMeal);
            console.log('offerMeal value: ', offerMeal);
            printObject('tmp:\n', tmp);
            // let updatedMeal = {};
            // if (offerMeal) {
            //     const newMealDeadline = deadlineDate
            //         .toISOString()
            //         .substring(0, 10);
            //     let hours = mealStartTime
            //         .getHours()
            //         .toString()
            //         .padStart(2, '0');
            //     let minutes = mealStartTime
            //         .getMinutes()
            //         .toString()
            //         .padStart(2, '0');

            //     const newMealStartTime = `${hours}:${minutes}:00.000`;

            //     let newRally = tmp;
            //     updatedMeal = {
            //         ...newRally.meal,
            //         message: mealMessage,
            //         startTime: newMealStartTime,
            //         deadline: newMealDeadline,
            //         cost: cost,
            //         plannedCount: tmp?.meal?.plannedCount,
            //         actualCount: tmp?.meal?.actualCount,
            //         offerMeal: offerMeal,
            //     };
            // }
            // updateRally = {
            //     ...newRally,
            //     meal: updatedMeal,
            // };
            //* *********************************************************
            //      START RE-DO
            //* *********************************************************
            let mealUpdate = {};
            if (offerMeal) {
                const newMealDeadline = deadlineDate
                    .toISOString()
                    .substring(0, 10);
                let hours = mealStartTime
                    .getHours()
                    .toString()
                    .padStart(2, '0');
                let minutes = mealStartTime
                    .getMinutes()
                    .toString()
                    .padStart(2, '0');

                const newMealStartTime = `${hours}:${minutes}:00.000`;
                mealUpdate = {
                    ...tmp.meal,
                    id: tmp?.meal?.id || '0',
                    message: mealMessage,
                    deadline: newMealDeadline,
                    startTime: newMealStartTime,
                    cost: cost * 100,
                    // offerMeal: offerMeal,
                };
            }
            const rallyUpdate = {
                ...tmp,
                meal: mealUpdate,
            };

            let DANO1 = true;
            if (DANO1) {
                // printObject('RELM:166-->tmp:', tmp);
                printObject('RELM:167-->rallyUpdate:', rallyUpdate);
                // return;
                dispatch(updateTmp(rallyUpdate));
                navigation.navigate('RallyEditFlow', {
                    rallyId: rallyId,
                    stage: 6,
                });
            }
            //* *********************************************************
            //      END RE-DO
            //* *********************************************************
            // printObject('REM:235--> updatedRally):', updatedRally);
            // dispatch(updateTmp(updatedRally));
            // navigation.navigate('RallyEditFlow', {
            //     rallyId: rallyId,
            //     stage: 6,
            // });
        } catch (error) {
            printObject('REM:241--> error on Next:\n', error);
        }
    };
    // const dispatch = useDispatch();
    // printObject('REM:251-->tmp:\n', tmp);
    return (
        <>
            <Modal visible={showMealCountConfirm} animationStyle='slide'>
                <Surface style={styles.modalSurface}>
                    <View>
                        <Text style={styles.modalTitle}>
                            REGISTRATION WARNING
                        </Text>
                    </View>
                    <View style={styles.modalMessageWrapper}>
                        <Text style={styles.modalMessageText}>
                            Some registrars have RSVP'd to the meal of this
                            event. These commitments will be retained.
                        </Text>
                    </View>
                    <View style={styles.modalMessageWrapper}>
                        <Text style={styles.modalMessageText}>
                            If you elect to eliminate the meal, it would be
                            considerate to contact the registrars that did RSVP
                            and inform them of your changes.
                        </Text>
                    </View>
                    <View style={styles.modalMessageWrapper}>
                        <Text style={styles.modalMessageText}>
                            You can see who RSVP'd on the main serve page in the
                            Registrations scroll box.
                        </Text>
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <View style={styles.modalButtonWrapper}>
                            <View style={styles.modalConfirmButton}>
                                <CustomButton
                                    title='OK'
                                    graphic={null}
                                    cbStyles={{
                                        backgroundColor: Colors.gray35,
                                        color: 'black',
                                    }}
                                    txtColor='white'
                                    onPress={() =>
                                        setShowMealCountConfirm(false)
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </Surface>
            </Modal>
            <ImageBackground
                source={require('../../../components/images/background.png')}
                style={styles.bgImageContainer}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.root}>
                        <View style={styles.infoWrapper}>
                            <ScrollView>
                                <View style={styles.formHeader}>
                                    <Text style={styles.titleText}>
                                        Meal Information
                                    </Text>
                                </View>
                                <View style={styles.offerRow}>
                                    <View style={styles.offerTextWrapper}>
                                        <Text style={styles.offerText}>
                                            Offer a meal:
                                        </Text>
                                    </View>
                                    <View style={styles.offerSwitchWrapper}>
                                        <Switch
                                            value={offerMeal}
                                            onValueChange={() =>
                                                setOfferMeal(!offerMeal)
                                            }
                                            style={styles.offerSwitch}
                                        />
                                    </View>
                                </View>
                                <View style={styles.datePickerWrapper}>
                                    <View>
                                        <Text style={styles.datePickerLabel}>
                                            Meal Start Time
                                        </Text>
                                    </View>
                                    <Pressable
                                        onPress={() =>
                                            setModalMealTimeVisible(true)
                                        }
                                    >
                                        <View
                                            style={
                                                offerMeal
                                                    ? styles.dateTimeDisplay
                                                    : styles.disabledDateTimeDisplay
                                            }
                                        >
                                            <Text
                                                style={
                                                    offerMeal
                                                        ? styles.dateTimeTextString
                                                        : styles.disabledDateTimeTextString
                                                }
                                            >
                                                {moment(mealStartTime).format(
                                                    'h:mm A'
                                                )}
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>
                                <View style={styles.costWrapper}>
                                    <Text style={styles.costLabel}>
                                        Meal Cost
                                    </Text>

                                    <CurrencyInput
                                        value={cost}
                                        onChangeValue={setCost}
                                        prefix='$'
                                        placeholder='cost'
                                        minValue={0}
                                        delimiter=','
                                        separator='.'
                                        precision={2}
                                        editable={offerMeal}
                                        style={
                                            offerMeal
                                                ? styles.costInput
                                                : styles.disabledCostInput
                                        }
                                        // onChangeText={(formattedValue) => {
                                        //     console.log(formattedValue); // $2,310.46
                                        // }}
                                    />
                                </View>

                                <View style={styles.datePickerWrapper}>
                                    <Text style={styles.datePickerLabel}>
                                        Deadline to signup for meal
                                    </Text>
                                    <Pressable
                                        onPress={() =>
                                            setModalDeadlineVisible(true)
                                        }
                                    >
                                        <View
                                            style={
                                                offerMeal
                                                    ? styles.dateTimeDisplay
                                                    : styles.disabledDateTimeDisplay
                                            }
                                        >
                                            <Text
                                                style={
                                                    offerMeal
                                                        ? styles.dateTimeTextString
                                                        : styles.disabledDateTimeTextString
                                                }
                                            >
                                                {deadlineDateString
                                                    ? deadlineDateString
                                                    : defaultDateTimeString}
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>
                                <View style={styles.messageWrapper}>
                                    <Text style={styles.mealMessageLabel}>
                                        Meal message (max. 60 characters)
                                    </Text>
                                    <TextInput
                                        style={styles.messageInput}
                                        numberOfLines={2}
                                        multiline
                                        maxLength={60}
                                        placeholder='Meal Message'
                                        onChangeText={(e) => onMessageChange(e)}
                                        value={mealMessage}
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
                        <DateTimePickerModal
                            isVisible={modalMealTimeVisible}
                            date={mealStartTime}
                            mode='time'
                            value={mealStartTime}
                            onConfirm={onMealTimeConfirm}
                            onCancel={onMealTimeCancel}
                        />
                        <DateTimePickerModal
                            isVisible={modalDeadlineVisible}
                            date={deadlineDate}
                            mode='date'
                            value={deadlineDate}
                            onConfirm={onDeadlineDateConfirm}
                            onCancel={onDeadlineDateCancel}
                        />
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
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    formHeader: {
        marginVertical: 10,
        alignItems: 'center',
    },
    offerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    offerTextWrapper: {
        marginRight: 10,
    },
    offerText: {
        fontSize: 20,
        fontWeight: '600',
    },
    offerSwitchWrapper: {},
    offerSwitch: {},
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
    disabledDateTimeDisplay: {
        // backgroundColor: 'lightgrey',
        marginVertical: 2,
        marginHorizontal: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgrey',
    },
    dateTimeTextString: {
        padding: 15,
        fontSize: 25,
    },
    disabledDateTimeTextString: {
        padding: 15,
        fontSize: 25,
        color: 'lightgrey',
    },
    datePickerLabel: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 5,
    },
    datePickerWrapper: {
        marginBottom: 5,
        alignItems: 'center',
    },
    datePicker: {
        width: 300,
        height: 100,
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        // backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 6,
        // borderStyle: 'double',
        borderColor: Colors.gray35,
    },
    costWrapper: {
        flexDirection: 'column',
        // marginLeft: 35,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    costLabel: {
        fontSize: 20,
        fontWeight: '600',
    },
    costInput: {
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 6,
        width: 100,
        backgroundColor: 'lightgrey',
        marginHorizontal: 0,
        borderColor: Colors.gray35,
        paddingHorizontal: 12,
        height: 45,
    },
    disabledCostInput: {
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 6,
        color: 'lightgrey',
        width: 100,
        marginHorizontal: 0,
        borderColor: Colors.gray35,
        paddingHorizontal: 12,
        height: 45,
    },
    costInputDisabled: {
        marginVertical: 8,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 6,
        width: 100,
        backgroundColor: 'color',
        color: Colors.gray35,
        marginHorizontal: 0,
        borderColor: Colors.gray35,
        paddingHorizontal: 12,
        height: 45,
    },
    messageWrapper: {
        // flex: 1,
        marginTop: 20,
        // marginLeft: '10%',
        alignItems: 'center',
    },
    mealMessageLabel: {
        fontWeight: '600',
        fontSize: 18,
    },
    messageInput: {
        // flex: 1,
        // flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        marginTop: 0,
        fontSize: 18,
        borderRadius: 6,
        width: '90%',
        // backgroundColor: 'white',
        height: 60,
        justifyContent: 'flex-start',
    },
    modalSurface: {
        marginTop: 80,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    modalTitle: {
        marginTop: 15,
        fontSize: 24,
        fontWeight: 'bold',
    },
    modalMessageWrapper: {
        marginVertical: 15,
        marginHorizontal: 15,
    },
    modalMessageText: {
        fontSize: 18,
        fontWeight: 'normal',
    },
    modalButtonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    modalButtonWrapper: {
        marginHorizontal: 10,
    },
});
