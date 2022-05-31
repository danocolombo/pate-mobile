import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Button } from '@react-native-material/core';
import { Colors } from '../../constants/colors.js';
import { globalStyles } from './FormikStyles.js';
import { Formik } from 'formik';

export default function ReviewForm({}) {
    return (
        <View>
            <Text>Location Section</Text>
            <Formik
                initialValues={{
                    locationName: '',
                    street: '',
                    city: '',
                    stateProv: 'GA',
                    postalCode: '',
                }}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    console.log('values:\n', values);
                }}
            >
                {(formikProps) => (
                    <>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder='Location Name'
                                onChangeText={formikProps.handleChange(
                                    'locationName'
                                )}
                                value={formikProps.values.locationName}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder='Street'
                                onChangeText={formikProps.handleChange(
                                    'street'
                                )}
                                value={formikProps.values.street}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='City'
                                onChangeText={formikProps.handleChange('city')}
                                value={formikProps.values.city}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='STATE'
                                onChangeText={formikProps.handleChange(
                                    'stateProv'
                                )}
                                value={formikProps.values.stateProv}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='Zipcode'
                                onChangeText={formikProps.handleChange(
                                    'postalCode'
                                )}
                                keyboardType='numeric'
                                value={formikProps.values.postalCode}
                            />

                            <View style={styles.buttonContainer}>
                                <Button
                                    variant='contained'
                                    title='SUBMIT'
                                    color={Colors.mediumBackground}
                                    tintColor='white'
                                    style={styles.submitButton}
                                    // style={styles.submitButton}
                                    onPress={formikProps.handleSubmit}
                                />
                            </View>
                        </View>
                    </>
                )}
                {/* this ends the formik execution */}
            </Formik>
        </View>
    );
}
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: Colors.gray35,
        padding: 10,
        marginHorizontal: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    submitButton: {
        width: '70%',
    },
});
