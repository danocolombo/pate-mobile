import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';
import { Headline } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CurrencyInput from 'react-native-currency-input';
import { Button } from '@react-native-material/core';
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

export default function RallyMealForm({ rallyId }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const rallyEntry = useSelector((state) =>
        state.rallies.allRallies.filter((r) => r.uid === rallyId)
    );
    const rally = rallyEntry[0];
    const [mealTime, setMealTime] = useState(
        pateTimeToSpinner(rally.eventDate, rally.meal.startTime)
    );
    const [cost, setCost] = useState(0);
    const [deadline, setDeadline] = useState(
        pateDateToSpinner(rally.eventDate)
    );
    const onMealTimeChange = (event, value) => {
        setMealTime(value);
    };
    const onDeadlineChange = (event, value) => {
        setDeadline(value);
    };
    const handleNext = (values) => {
        let theDateObject = deadline;
        let mealDeadline = Date.parse(theDateObject);
        let mDeadline = getPateDate(mealDeadline);

        theDateObject = mealTime;
        let mt = Date.parse(theDateObject);
        let mTime = getPateTime(mt);
        // build a meal object
        let meal = {
            meal: {
                startTime: mTime,
                cost: cost,
                deadline: mDeadline,
            },
        };
        dispatch(updateTmp(meal));
        navigation.navigate('RallyEditFlow', {
            rallyId: rallyId,
            stage: 5,
        });
    };
    // const dispatch = useDispatch();
    return (
        <View>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <ScrollView>
                            <View style={styles.formHeader}>
                                <Headline>Rally Meal Information</Headline>
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
                                    style={styles.costInput}
                                    prefix='$'
                                    placeholder='cost'
                                    minValue={0}
                                    delimiter=','
                                    separator='.'
                                    precision={2}
                                    onChangeText={(formattedValue) => {
                                        console.log(formattedValue); // $2,310.46
                                    }}
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
                            <View style={styles.inputContainer}>
                                <View>
                                    {/* <TextInput
                                        style={styles.input}
                                        placeholder='Meal Deadline'
                                        onChangeText={formikProps.handleChange(
                                            'deadline'
                                        )}
                                        value={formikProps.values.deadline}
                                        onBlur={formikProps.handleBlur(
                                            'deadline'
                                        )}
                                    />
                                    <Text style={styles.errorText}>
                                        {formikProps.touched.deadline &&
                                            formikProps.errors.deadline}
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Meal Message'
                                        onChangeText={formikProps.handleChange(
                                            'message'
                                        )}
                                        value={formikProps.values.message}
                                        onBlur={formikProps.handleBlur(
                                            'message'
                                        )}
                                    />
                                    <Text style={styles.errorText}>
                                        {formikProps.touched.message &&
                                            formikProps.errors.message}
                                    </Text> */}
                                </View>
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
                                    onPress={handleNext}
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
        fontWeight: '500',
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
        fontWeight: '500',
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
});
