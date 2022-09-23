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
    // let dateNow = new Date(2022, 6, 23);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const feo = useSelector((state) => state.system);
    const tmp = useSelector((state) => state.rallies.tmpRally);
    let dateNow = new Date();

    const [defaultDateTime, setDefaultDateTime] = useState();
    const [defaultDateTimeString, setDefaultDateTimeString] = useState();
    const [mealStartTime, setMealStartTime] = useState();
    const [mealStartTimeString, setMealStartTimeString] = useState();
    const [deadlineDate, setDeadlineDate] = useState();
    const [deadlineDateString, setDeadlineDateString] = useState();
    const [modalMealTimeVisible, setModalMealTimeVisible] = useState();
    const [modalDealineVisible, setModalDeadlineVisible] = useState();

    const [showMealCountConfirm, setShowMealCountConfirm] = useState(
        parseInt(tmp?.meal?.mealCount) > 0 ? true : false
    );
    let mealSetting = true;
    if (tmp?.meal?.offered === false) {
        mealSetting = false;
    }
    const [offerMeal, setOfferMeal] = useState(mealSetting);
    const [cost, setCost] = useState(tmp?.meal?.cost);
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
    useState(() => {
        // get mealStartTime and deadline, or set default
        printObject('feo', feo);
        let yr = feo.today.substr(0, 4);
        let mo = feo.today.substr(4, 2);
        let da = feo.today.substr(6, 2);
        if (tmp?.meal?.offered === false) {
            // default of today at noon
            let tmpDate = new Date(yr, mo - 1, da, 12, 0, 0, 0);
            setDefaultDateTime(tmpDate);
            yr = parseInt(tmp.eventDate.substr(0, 4));
            mo = parseInt(tmp.eventDate.substr(4, 2));
            da = parseInt(tmp.eventDate.substr(6, 2));
            setDeadlineDate(tmpDate);
            setDeadlineDateString(tmpDate.toDateString());
        } else {
            let hr = 12;
            let mi = 0;
            if (tmp.uid) {
                hr = parseInt(tmp.meal.startTime.substr(0, 2));
                mi = parseInt(tmp.meal.startTime.substr(3, 2));
            }
            // console.log('yr', yr);
            // console.log('mo', mo);
            // console.log('da', da);
            // console.log('hr', hr);
            // console.log('mi', mi);
            let tmpDate = new Date(yr, mo - 1, da, hr, mi, 0);
            setMealStartTime(tmpDate);
            let t = makeTimeString(tmpDate);
            setMealStartTimeString(t);

            //now set deadline
            if (tmp?.meal?.deadline) {
                yr = parseInt(tmp.meal.deadline.substr(0, 4));
                mo = parseInt(tmp.meal.deadline.substr(4, 2));
                da = parseInt(tmp.meal.deadline.substr(6, 2));
            } else {
                //set t o eventDate
                yr = parseInt(tmp.eventDate.substr(0, 4));
                mo = parseInt(tmp.eventDate.substr(4, 2));
                da = parseInt(tmp.eventDate.substr(6, 2));
            }
            // can use start times, since the values are not used
            tmpDate = new Date(yr, mo - 1, da, hr, mi, 0);
            setDeadlineDate(tmpDate);
            setDeadlineDateString(tmpDate.toDateString());
        }
        if (tmp?.meal?.offered === false) {
            let tmpDate = new Date(yr, mo - 1, da, 12, 0, 0);
            setMealStartTime(tmpDate);
            let t = makeTimeString(tmpDate);
            setMealStartTimeString(t);
            //default the deadline to be the date of the event
            yr = parseInt(tmp.eventDate.substr(0, 4));
            mo = parseInt(tmp.eventDate.substr(4, 2));
            da = parseInt(tmp.eventDate.substr(6, 2));
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
        let mealOffered = offerMeal;
        let theDateObject = '';
        let mTime = '';
        let mDeadline = '';
        let mCost = '';
        let mMessage = mealMessage;
        if (mealOffered === true) {
            // theDateObject = mealTime;
            let mt = Date.parse(mealStartTime);
            mTime = getPateTime(mt);
            // theDateObject = deadline;
            let mealDeadline = Date.parse(deadlineDate);
            mDeadline = getPateDate(mealDeadline);
            mCost = cost;
            mMessage = mealMessage;
        }

        // build a meal object
        let meal = {
            meal: {
                offered: mealOffered,
                startTime: mTime,
                cost: mCost,
                deadline: mDeadline,
                mealCount: tmp?.meal?.mealCount,
                mealServed: tmp?.meal?.mealsServed,
                message: mealMessage,
            },
        };
        // printObject('REM:93--> meal:', meal);
        dispatch(updateTmp(meal));
        navigation.navigate('RallyEditFlow', {
            rallyId: rallyId,
            stage: 6,
        });
    };
    // const dispatch = useDispatch();
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
                            considrate to contact the registrars that did RSVP
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
                                                {mealStartTimeString
                                                    ? mealStartTimeString
                                                    : defaultDateTimeString}
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
                            isVisible={modalDealineVisible}
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
