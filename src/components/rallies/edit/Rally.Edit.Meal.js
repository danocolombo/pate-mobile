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
import { getPateTime, pateTimeToSpinner } from '../../../utils/date';
// import { putRally } from '../../providers/rallies';
import { updateTmp } from '../../../features/rallies/ralliesSlice';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomNavButton from '../../ui/CustomNavButton';

// create validation schema for yup to pass to formik
const rallyMealSchema = yup.object({
    startTime: yup.string(),
    cost: yup.string(),
    deadline: yup.string(),
    message: yup.string(),
});

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
    const [cost, setCost] = useState();
    const onMealTimeChange = (event, value) => {
        setMealTime(value);
    };
    const handleNext = (values) => {
        // build a meal object
        let meal = {
            meal: values,
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
                            <Formik
                                initialValues={{
                                    startTime: rally?.meal?.startTime
                                        ? rally.meal.startTime
                                        : '',
                                    cost: rally?.meal?.cost
                                        ? rally.meal.cost
                                        : '',
                                    deadline: rally?.meal?.deadline
                                        ? rally.meal.deadline
                                        : '',
                                    message: rally?.meal?.message
                                        ? rally.meal.message
                                        : '',
                                }}
                                validationSchema={rallyMealSchema}
                                onSubmit={async (values, actions) => {
                                    // printObject('onSubmit::values', values);
                                    handleNext(values);
                                }}
                            >
                                {(formikProps) => (
                                    <>
                                        <View style={styles.formHeader}>
                                            <Headline>
                                                Rally Meal Information
                                            </Headline>
                                        </View>
                                        <View style={styles.datePickerWrapper}>
                                            <View>
                                                <Text
                                                    style={
                                                        styles.datePickerLabel
                                                    }
                                                >
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
                                            <Text style={styles.costLabel}>
                                                Meal Cost
                                            </Text>

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
                                                onChangeText={(
                                                    formattedValue
                                                ) => {
                                                    console.log(formattedValue); // $2,310.46
                                                }}
                                            />
                                        </View>

                                        <View style={styles.inputContainer}>
                                            <View>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder='Meal Deadline'
                                                    onChangeText={formikProps.handleChange(
                                                        'deadline'
                                                    )}
                                                    value={
                                                        formikProps.values
                                                            .deadline
                                                    }
                                                    onBlur={formikProps.handleBlur(
                                                        'deadline'
                                                    )}
                                                />
                                                <Text style={styles.errorText}>
                                                    {formikProps.touched
                                                        .deadline &&
                                                        formikProps.errors
                                                            .deadline}
                                                </Text>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder='Meal Message'
                                                    onChangeText={formikProps.handleChange(
                                                        'message'
                                                    )}
                                                    value={
                                                        formikProps.values
                                                            .message
                                                    }
                                                    onBlur={formikProps.handleBlur(
                                                        'message'
                                                    )}
                                                />
                                                <Text style={styles.errorText}>
                                                    {formikProps.touched
                                                        .message &&
                                                        formikProps.errors
                                                            .message}
                                                </Text>
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
                                                onPress={
                                                    formikProps.handleSubmit
                                                }
                                            />
                                        </View>
                                    </>
                                )}
                                {/* this ends the formik execution */}
                            </Formik>
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
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,
        // textAlign: 'center',
    },
    stateProvPostalCodeContainerRow: {
        // borderWidth: 1,
        // borderColor: 'black',
    },
    stateProvPostalCodeContainer: {
        flexDirection: 'row',
    },
    stateProvSectionContainer: {
        // borderWidth: 1,
        // borderColor: 'blue',
        marginRight: 30,
    },
    stateProvInputContainer: {
        // borderWidth: 1,
        // borderColor: 'blue',
    },
    stateProvErrorContainer: {
        //borderWidth: 1, borderColor: 'blue'
    },
    postalCodeSectionContainer: {
        //borderWidth: 1, borderColor: 'black'
    },
    postalCodeInputContainer: {
        //borderWidth: 1, borderColor: 'black'
    },
    postalCodeErrorContainer: {
        //borderWidth: 1, borderColor: 'black'
    },
    stateContainer: {
        backgroundColor: 'yellow',

        borderWidth: 1,
        borderColor: 'black',
    },
    postalCodeContainer: {},
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
        marginLeft: 35,
        alignItems: 'flex-start',
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
