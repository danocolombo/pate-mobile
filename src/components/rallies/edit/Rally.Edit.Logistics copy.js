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
import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from 'react-native-windows';
import { useNavigation } from '@react-navigation/native';
import { Headline } from 'react-native-paper';
import { Button } from '@react-native-material/core';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants/colors';
// import { putRally } from '../../providers/rallies';
import { updateTmp } from '../../../features/rallies/ralliesSlice';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomNavButton from '../../ui/CustomNavButton';
import { printObject } from '../../../utils/helpers';

// create validation schema for yup to pass to formik
const rallyLogisticsSchema = yup.object({
    eventDate: yup.string().required().min(8),
    startTime: yup.string(),
    endTime: yup.string(),
});

export default function RallyLogisticsForm({ rallyId }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const tmp = useSelector((state) => state.rallies.tmpRally);
    const rallyEntry = useSelector((state) =>
        state.rallies.allRallies.filter((r) => r.uid === rallyId)
    );
    const rally = rallyEntry[0];
    const [date, setDate] = useState(new Date(Date.now()));
    const handleNext = (values) => {
        //printObject('handleNext::values', values);
        dispatch(updateTmp(values));
        navigation.navigate('RallyEditFlow', {
            rallyId: rallyId,
            stage: 3,
        });
    };
    // printObject('1. tmpRally:', tmp);
    return (
        <View>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <ScrollView>
                            <Formik
                                initialValues={{
                                    eventDate: rally?.eventDate
                                        ? rally.eventDate
                                        : '',
                                    startTime: rally?.startTime
                                        ? rally.startTime
                                        : '',
                                    endTime: rally?.endTime
                                        ? rally.endTime
                                        : '',
                                }}
                                validationSchema={rallyLogisticsSchema}
                                onSubmit={async (values, actions) => {
                                    // printObject('onSubmit::values', values);
                                    handleNext(values);
                                }}
                            >
                                {(formikProps) => (
                                    <>
                                        <View style={styles.formHeader}>
                                            <Headline>
                                                Rally Logistics Information
                                            </Headline>
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <View>
                                                <View
                                                    style={{
                                                        flexDirection: 'column',
                                                        flex: 1,
                                                    }}
                                                >
                                                    <View>
                                                        <Text>Event Date</Text>
                                                        <DateTimePicker
                                                            testID='dateTimePicker'
                                                            value={date}
                                                            mode='date'
                                                            display={
                                                                Platform.OS ===
                                                                'ios'
                                                                    ? 'spinner'
                                                                    : 'default'
                                                            }
                                                            is24Hour={true}
                                                            //onChange={onChange}
                                                            style={
                                                                styles.datePicker
                                                            }
                                                        />
                                                    </View>
                                                </View>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder='Event Date'
                                                    onChangeText={formikProps.handleChange(
                                                        'eventDate'
                                                    )}
                                                    value={
                                                        formikProps.values
                                                            .eventDate
                                                    }
                                                    onBlur={formikProps.handleBlur(
                                                        'eventDate'
                                                    )}
                                                />
                                                <Text style={styles.errorText}>
                                                    {formikProps.touched
                                                        .eventDate &&
                                                        formikProps.errors
                                                            .eventDate}
                                                </Text>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder='Start Time'
                                                    onChangeText={formikProps.handleChange(
                                                        'startTime'
                                                    )}
                                                    value={
                                                        formikProps.values
                                                            .startTime
                                                    }
                                                    onBlur={formikProps.handleBlur(
                                                        'startTime'
                                                    )}
                                                />
                                                <Text style={styles.errorText}>
                                                    {formikProps.touched
                                                        .startTime &&
                                                        formikProps.errors
                                                            .startTime}
                                                </Text>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder='End Time'
                                                    onChangeText={formikProps.handleChange(
                                                        'endTime'
                                                    )}
                                                    value={
                                                        formikProps.values
                                                            .endTime
                                                    }
                                                    onBlur={formikProps.handleBlur(
                                                        'endTime'
                                                    )}
                                                />
                                                <Text style={styles.errorText}>
                                                    {formikProps.touched
                                                        .endTime &&
                                                        formikProps.errors
                                                            .endTime}
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
