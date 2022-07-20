import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Modal,
} from 'react-native';
import { Headline } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
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
import { normalize } from 'react-native-elements';
import { printObject } from '../../../utils/helpers';

export default function RallyMealForm({ rallyId }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const rallyEntry = useSelector((state) =>
        state.rallies.allRallies.filter((r) => r.uid === rallyId)
    );
    // get the current rally information
    const rally = rallyEntry[0];
    const [showMealCountConfirm, setShowMealCountConfirm] = useState(
        parseInt(rally?.meal?.mealCount) > 0 ? true : false
    );
    let mealSetting = true;
    if (rally?.meal?.offered === false) {
        mealSetting = false;
    }
    const [offerMeal, setOfferMeal] = useState(mealSetting);
    const [mealTime, setMealTime] = useState(
        pateTimeToSpinner(rally.eventDate, rally.meal.startTime)
    );
    const [cost, setCost] = useState(rally?.meal?.cost);
    const [deadline, setDeadline] = useState(
        pateDateToSpinner(rally.eventDate)
    );
    const [mealMessage, setMealMessage] = useState(
        rally?.meal?.message ? rally.meal.message : ''
    );
    const onMealTimeChange = (event, value) => {
        setMealTime(value);
    };
    const onDeadlineChange = (event, value) => {
        setDeadline(value);
    };
    const onMessageChange = (e) => {
        // printObject('REM:64-->e:', e);
        setMealMessage(e);
    };
    const handleNext = () => {
        let mealOffered = offerMeal;
        let theDateObject = '';
        let mTime = '';
        let mDeadline = '';
        let mCost = '';
        let mMessage = mealMessage;
        if (mealOffered === true) {
            theDateObject = mealTime;
            let mt = Date.parse(theDateObject);
            mTime = getPateTime(mt);
            theDateObject = deadline;
            let mealDeadline = Date.parse(theDateObject);
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
                mealCount: rally?.meal?.mealCount,
                mealServed: rally?.meal?.mealsServed,
                message: mealMessage,
            },
        };
        // printObject('REM:93--> meal:', meal);
        dispatch(updateTmp(meal));
        navigation.navigate('RallyEditFlow', {
            rallyId: rallyId,
            stage: 5,
        });
    };
    // const dispatch = useDispatch();
    return (
        <View>
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
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <ScrollView>
                            <View style={styles.formHeader}>
                                <Headline>Rally Meal Information</Headline>
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
                                <DateTimePicker
                                    value={mealTime}
                                    minuteInterval={15}
                                    mode='time'
                                    disabled={!offerMeal}
                                    display={
                                        Platform.OS === 'ios'
                                            ? 'spinner'
                                            : 'default'
                                    }
                                    is24Hour={true}
                                    onChange={onMealTimeChange}
                                    style={styles.datePicker}
                                />
                            </View>
                            <View style={styles.costWrapper}>
                                <Text style={styles.costLabel}>Meal Cost</Text>

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
                                            : styles.costInputDisabled
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
                                <DateTimePicker
                                    value={deadline}
                                    mode='date'
                                    maximumDate={pateDateToSpinner(
                                        rally.eventDate
                                    )}
                                    minuteInterval={15}
                                    disabled={!offerMeal}
                                    display={
                                        Platform.OS === 'ios'
                                            ? 'spinner'
                                            : 'default'
                                    }
                                    is24Hour={true}
                                    onChange={onDeadlineChange}
                                    style={styles.datePicker}
                                />
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
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    formHeader: {
        marginVertical: 10,
        alignItems: 'center',
    },
    offerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    offerTextWrapper: {
        marginRight: 10,
    },
    offerText: {
        fontSize: 20,
    },
    offerSwitchWrapper: {},
    offerSwitch: {},
    inputContainer: {
        marginLeft: '10%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        marginTop: 0,
        fontSize: 18,
        borderRadius: 6,
        width: '90%',
    },
    inputStateProv: {
        width: 75,
    },
    inputPostalCode: {
        width: 125,
    },

    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    submitButton: {
        width: '70%',
    },
    datePickerLabel: {
        fontSize: 20,
        fontWeight: '300',
        marginBottom: 10,
    },
    datePickerWrapper: {
        // borderWidth: 4,
        // borderColor: Colors.gray35,
        // borderRadius: 10,
        marginBottom: 5,
        alignItems: 'center',
        // marginHorizontal: 3,
    },
    datePicker: {
        width: 300,
        height: 100,
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        borderWidth: 1,
        borderRadius: 6,
        // borderStyle: 'double',
        borderColor: Colors.gray35,
    },
    costWrapper: {
        flexDirection: 'column',
        // marginLeft: 35,
        alignItems: 'center',
    },
    costLabel: {
        fontSize: 20,
        fontWeight: '300',
    },
    costInput: {
        marginVertical: 8,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 6,
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
        color: Colors.gray35,
        marginHorizontal: 0,
        borderColor: Colors.gray35,
        paddingHorizontal: 12,
        height: 45,
    },
    messageWrapper: {
        // flex: 1,
        marginVertical: 10,
        marginLeft: '10%',
    },
    mealMessageLabel: {
        fontWeight: '300',
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
