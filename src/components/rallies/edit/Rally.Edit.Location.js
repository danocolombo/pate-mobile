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
// import { useDispatch } from 'react-redux';
import { Colors } from '../../../constants/colors';
// import { putRally } from '../../providers/rallies';
// import { addNewRally } from '../../features/rallies/ralliesSlice.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomButton from '../../ui/CustomButton';

// create validation schema for yup to pass to formik
const rallyLocationSchema = yup.object({
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
});

export default function RallyLocationForm({ rally }) {
    // const dispatch = useDispatch();
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
                                }}
                                validationSchema={rallyLocationSchema}
                                // onSubmit={async (values, actions) => {
                                //     actions.resetForm();
                                //     await putRally(values);
                                //     dispatch(addNewRally, actions);
                                //     console.log(
                                //         'these values were saved: \n',
                                //         values
                                //     );
                                // }}
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

                                            <View
                                                style={styles.buttonContainer}
                                            >
                                                <CustomButton
                                                    title='Next'
                                                    graphic={{
                                                        name: 'forward',
                                                        color: 'white',
                                                        size: 20,
                                                    }}
                                                    cbStyles={{
                                                        backgroundColor:
                                                            'green',
                                                        color: 'white',
                                                        width: '50%',
                                                    }}
                                                />
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
        borderColor: 'grey',
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
