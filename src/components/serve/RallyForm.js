import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';
import { Button } from '@react-native-material/core';
import { useDispatch } from 'react-redux';
import { Colors } from '../../constants/colors.js';
import { putRally } from '../../providers/rallies';
import { addNewRally } from '../../features/rallies/ralliesSlice.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import { printObject } from '../../utils/helpers.js';

// create validation schema for yup to pass to formik
const newRallySchema = yup.object({
    locationName: yup.string().required().min(5),
    street: yup.string(),
    city: yup.string().required().min(2),
    stateProv: yup.string().required().min(2).max(2),
    postalCode: yup
        .string()
        .required()
        .test(
            'is-postalCode-numeric',
            'Postal code has to be between 10000 - 99999',
            (val) => {
                return parseInt(val) > 9999 && parseInt(val) < 100000;
            }
        ),
    contactName: yup.string(),
    contactPhone: yup.string(),
    contactEmail: yup.string(),
    eventDate: yup.string(),
    startTime: yup.string(),
    endTime: yup.string(),
    eventMessage: yup.string(),
});

export default function ReviewForm({ rally }) {
    const dispatch = useDispatch();
    return (
        <View>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <ScrollView>
                            <Formik
                                initialValues={{
                                    locationName: rally?.name ? rally.name : '',
                                    street: rally?.street ? rally.street : '',
                                    city: rally?.city ? rally.city : '',
                                    stateProv: rally?.stateProv
                                        ? rally.stateProv
                                        : '',
                                    postalCode: rally?.postalCode
                                        ? rally.postalCode
                                        : '',
                                    contactName: rally?.contact?.name
                                        ? rally.contact.name
                                        : '',
                                    contactPhone: rally?.contact?.phone
                                        ? rally.contact?.phone
                                        : '',
                                    contactEmail: rally?.contact?.email
                                        ? rally.contact.email
                                        : '',
                                    eventDate: rally?.eventDate
                                        ? rally.eventDate
                                        : '',
                                    startTime: rally?.startTime
                                        ? rally.startTime
                                        : '',
                                    endTime: rally?.endTime
                                        ? rally.endTime
                                        : '',
                                    eventMessage: rally?.message
                                        ? rally.message
                                        : '',
                                    mealOffered: rally?.meal?.startTime
                                        ? 'true'
                                        : 'false',
                                    mealStart: rally?.meal?.startTime
                                        ? rally.meal.startTime
                                        : '',
                                    mealCost: rally?.meal?.cost
                                        ? rally.meal.cost
                                        : '',
                                    mealMessage: rally?.meal?.message
                                        ? rally.meal.message
                                        : '',
                                    mealDeadline: rally?.meal?.deadline
                                        ? rally.meal?.deadline
                                        : '',
                                }}
                                validationSchema={newRallySchema}
                                onSubmit={async (values, actions) => {
                                    actions.resetForm();
                                    await putRally(values);
                                    dispatch(addNewRally, actions);
                                    console.log(
                                        'these values were saved: \n',
                                        values
                                    );
                                }}
                            >
                                {(formikProps) => (
                                    <>
                                        <View>
                                            <Text style={styles.sectionHeader}>
                                                LOCATION
                                            </Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Location Name'
                                                onChangeText={formikProps.handleChange(
                                                    'locationName'
                                                )}
                                                value={
                                                    formikProps.values
                                                        .locationName
                                                }
                                                onBlur={formikProps.handleBlur(
                                                    'locationName'
                                                )}
                                            />
                                            <Text style={styles.errorText}>
                                                {formikProps.touched
                                                    .locationName &&
                                                    formikProps.errors
                                                        .locationName}
                                            </Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Street'
                                                onChangeText={formikProps.handleChange(
                                                    'street'
                                                )}
                                                value={
                                                    formikProps.values.street
                                                }
                                                onBlur={formikProps.handleBlur(
                                                    'street'
                                                )}
                                            />
                                            <Text style={styles.errorText}>
                                                {formikProps.touched.street &&
                                                    formikProps.errors.street}
                                            </Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='City'
                                                onChangeText={formikProps.handleChange(
                                                    'city'
                                                )}
                                                value={formikProps.values.city}
                                                onBlur={formikProps.handleBlur(
                                                    'city'
                                                )}
                                            />
                                            <Text style={styles.errorText}>
                                                {formikProps.touched.city &&
                                                    formikProps.errors.city}
                                            </Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='STATE'
                                                onChangeText={formikProps.handleChange(
                                                    'stateProv'
                                                )}
                                                value={
                                                    formikProps.values.stateProv
                                                }
                                                onBlur={formikProps.handleBlur(
                                                    'state'
                                                )}
                                            />
                                            <Text style={styles.errorText}>
                                                {formikProps.touched
                                                    .stateProv &&
                                                    formikProps.errors
                                                        .stateProv}
                                            </Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Postal Code'
                                                onChangeText={formikProps.handleChange(
                                                    'postalCode'
                                                )}
                                                keyboardType='numeric'
                                                value={
                                                    formikProps.values
                                                        .postalCode
                                                }
                                                onBlur={formikProps.handleBlur(
                                                    'postalCode'
                                                )}
                                            />
                                            <Text style={styles.errorText}>
                                                {formikProps.touched
                                                    .postalCode &&
                                                    formikProps.errors
                                                        .postalCode}
                                            </Text>
                                            <Text style={styles.sectionHeader}>
                                                CONTACT
                                            </Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Contact Name'
                                                onChangeText={formikProps.handleChange(
                                                    'contactName'
                                                )}
                                                value={
                                                    formikProps.values
                                                        .contactName
                                                }
                                                onBlur={formikProps.handleBlur(
                                                    'contactName'
                                                )}
                                            />
                                            <Text style={styles.errorText}>
                                                {formikProps.touched
                                                    .contactName &&
                                                    formikProps.errors
                                                        .contactName}
                                            </Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Contact Phone'
                                                onChangeText={formikProps.handleChange(
                                                    'contactPhone'
                                                )}
                                                value={
                                                    formikProps.values
                                                        .contactPhone
                                                }
                                                onBlur={formikProps.handleBlur(
                                                    'contactPhone'
                                                )}
                                            />
                                            <Text style={styles.errorText}>
                                                {formikProps.touched
                                                    .contactPhone &&
                                                    formikProps.errors
                                                        .contactPhone}
                                            </Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Contact Email'
                                                onChangeText={formikProps.handleChange(
                                                    'contactEmail'
                                                )}
                                                value={
                                                    formikProps.values
                                                        .contactEmail
                                                }
                                                onBlur={formikProps.handleBlur(
                                                    'contactEmail'
                                                )}
                                            />
                                            <Text style={styles.errorText}>
                                                {formikProps.touched
                                                    .contactEmail &&
                                                    formikProps.errors
                                                        .contactEmail}
                                            </Text>
                                            <Text style={styles.sectionHeader}>
                                                LOGISTICS
                                            </Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Event Date'
                                                onChangeText={formikProps.handleChange(
                                                    'eventDate'
                                                )}
                                                value={
                                                    formikProps.values.eventDate
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
                                                    formikProps.values.startTime
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
                                                    formikProps.values.endTime
                                                }
                                                onBlur={formikProps.handleBlur(
                                                    'endTime'
                                                )}
                                            />
                                            <Text style={styles.errorText}>
                                                {formikProps.touched.endTime &&
                                                    formikProps.errors.endTime}
                                            </Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Event Message'
                                                onChangeText={formikProps.handleChange(
                                                    'eventMessage'
                                                )}
                                                value={
                                                    formikProps.values
                                                        .eventMessage
                                                }
                                                onBlur={formikProps.handleBlur(
                                                    'eventMessage'
                                                )}
                                            />
                                            <Text style={styles.errorText}>
                                                {formikProps.touched
                                                    .eventMessage &&
                                                    formikProps.errors
                                                        .eventMessage}
                                            </Text>
                                            <Text style={styles.sectionHeader}>
                                                MEAL DETAILS
                                            </Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Meal Offered'
                                                onChangeText={formikProps.handleChange(
                                                    'mealOffered'
                                                )}
                                                value={
                                                    formikProps.values
                                                        .mealOffered
                                                }
                                                onBlur={formikProps.handleBlur(
                                                    'mealOffered'
                                                )}
                                            />
                                            <Text style={styles.errorText}>
                                                {formikProps.touched
                                                    .mealOffered &&
                                                    formikProps.errors
                                                        .mealOffered}
                                            </Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Meal Start Time'
                                                onChangeText={formikProps.handleChange(
                                                    'mealStart'
                                                )}
                                                value={
                                                    formikProps.values.mealStart
                                                }
                                                onBlur={formikProps.handleBlur(
                                                    'mealStart'
                                                )}
                                            />
                                            <Text style={styles.errorText}>
                                                {formikProps.touched
                                                    .mealStart &&
                                                    formikProps.errors
                                                        .mealStart}
                                            </Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Meal Cost'
                                                onChangeText={formikProps.handleChange(
                                                    'mealCost'
                                                )}
                                                value={
                                                    formikProps.values.mealCost
                                                }
                                                onBlur={formikProps.handleBlur(
                                                    'mealCost'
                                                )}
                                            />
                                            <Text style={styles.errorText}>
                                                {formikProps.touched.mealCost &&
                                                    formikProps.errors.mealCost}
                                            </Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Meal Deadline'
                                                onChangeText={formikProps.handleChange(
                                                    'mealDeadline'
                                                )}
                                                value={
                                                    formikProps.values
                                                        .mealDeadline
                                                }
                                                onBlur={formikProps.handleBlur(
                                                    'mealDeadline'
                                                )}
                                            />
                                            <Text style={styles.errorText}>
                                                {formikProps.touched
                                                    .mealDeadline &&
                                                    formikProps.errors
                                                        .mealDeadline}
                                            </Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Meal Message'
                                                onChangeText={formikProps.handleChange(
                                                    'mealMessage'
                                                )}
                                                value={
                                                    formikProps.values
                                                        .mealMessage
                                                }
                                                onBlur={formikProps.handleBlur(
                                                    'mealMessage'
                                                )}
                                            />
                                            <Text style={styles.errorText}>
                                                {formikProps.touched
                                                    .mealMessage &&
                                                    formikProps.errors
                                                        .mealMessage}
                                            </Text>
                                            <View
                                                style={styles.buttonContainer}
                                            >
                                                <Button
                                                    variant='contained'
                                                    title='SUBMIT'
                                                    color={
                                                        Colors.mediumBackground
                                                    }
                                                    tintColor='white'
                                                    style={styles.submitButton}
                                                    // style={styles.submitButton}
                                                    onPress={
                                                        formikProps.handleSubmit
                                                    }
                                                />
                                            </View>
                                            <View>
                                                <Text>Would this happen?</Text>
                                            </View>
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
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.gray35,
        padding: 10,
        marginHorizontal: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    submitButton: {
        width: '70%',
    },
});
