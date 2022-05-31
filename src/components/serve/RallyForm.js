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
import CollapsibleView from '@eliav2/react-native-collapsible-view';
import { Colors } from '../../constants/colors.js';
import { putRally } from '../../providers/rallies';
import { addNewRally } from '../../features/rallies/ralliesSlice.js';
import { Formik } from 'formik';
import * as yup from 'yup';

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
});

export default function ReviewForm({}) {
    const dispatch = useDispatch();
    return (
        <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <Text>Location Section</Text>
                    <View>
                        <ScrollView contentContainerStyle={{ height: '100%' }}>
                            <View style={styles.container}>
                                <CollapsibleView title='Custom Usage'>
                                    <CollapsibleView
                                        title={
                                            <Text
                                                style={{
                                                    color: 'red',
                                                    fontSize: 24,
                                                    fontStyle: 'italic',
                                                }}
                                            >
                                                Custom Styling
                                            </Text>
                                        }
                                        style={{
                                            borderWidth: 0,
                                            // backgroundColor: '#6495ED',
                                        }}
                                        arrowStyling={{
                                            size: 24,
                                            rounded: true,
                                            thickness: 2,
                                            color: 'purple',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                // color: 'white',
                                                fontSize: 24,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            whipeeeeeeeeeeeeeeeeeeeeeeeeee
                                        </Text>
                                        <Formik
                                            initialValues={{
                                                locationName: '',
                                                street: '',
                                                city: '',
                                                stateProv: 'GA',
                                                postalCode: '',
                                            }}
                                            validationSchema={newRallySchema}
                                            onSubmit={(values, actions) => {
                                                actions.resetForm();
                                                let dbUpdateResults =
                                                    async () => {
                                                        //update dynamo
                                                        putRally(values);
                                                    };
                                                dbUpdateResults()
                                                    .then((results) => {
                                                        dispatch(
                                                            addNewRally,
                                                            actions
                                                        );
                                                    })
                                                    .then(() => {
                                                        console.log(
                                                            'these values were saved: \n',
                                                            values
                                                        );
                                                    })
                                                    .catch((err) => {
                                                        console.log(
                                                            'We got error\n:',
                                                            err
                                                        );
                                                    });
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
                                                            value={
                                                                formikProps
                                                                    .values
                                                                    .locationName
                                                            }
                                                            onBlur={formikProps.handleBlur(
                                                                'locationName'
                                                            )}
                                                        />
                                                        <Text
                                                            style={
                                                                styles.errorText
                                                            }
                                                        >
                                                            {formikProps.touched
                                                                .locationName &&
                                                                formikProps
                                                                    .errors
                                                                    .locationName}
                                                        </Text>
                                                        <TextInput
                                                            style={styles.input}
                                                            placeholder='Street'
                                                            onChangeText={formikProps.handleChange(
                                                                'street'
                                                            )}
                                                            value={
                                                                formikProps
                                                                    .values
                                                                    .street
                                                            }
                                                            onBlur={formikProps.handleBlur(
                                                                'street'
                                                            )}
                                                        />
                                                        <Text
                                                            style={
                                                                styles.errorText
                                                            }
                                                        >
                                                            {formikProps.touched
                                                                .street &&
                                                                formikProps
                                                                    .errors
                                                                    .street}
                                                        </Text>
                                                        <TextInput
                                                            style={styles.input}
                                                            placeholder='City'
                                                            onChangeText={formikProps.handleChange(
                                                                'city'
                                                            )}
                                                            value={
                                                                formikProps
                                                                    .values.city
                                                            }
                                                            onBlur={formikProps.handleBlur(
                                                                'city'
                                                            )}
                                                        />
                                                        <Text
                                                            style={
                                                                styles.errorText
                                                            }
                                                        >
                                                            {formikProps.touched
                                                                .city &&
                                                                formikProps
                                                                    .errors
                                                                    .city}
                                                        </Text>
                                                        <TextInput
                                                            style={styles.input}
                                                            placeholder='STATE'
                                                            onChangeText={formikProps.handleChange(
                                                                'stateProv'
                                                            )}
                                                            value={
                                                                formikProps
                                                                    .values
                                                                    .stateProv
                                                            }
                                                            onBlur={formikProps.handleBlur(
                                                                'state'
                                                            )}
                                                        />
                                                        <Text
                                                            style={
                                                                styles.errorText
                                                            }
                                                        >
                                                            {formikProps.touched
                                                                .stateProv &&
                                                                formikProps
                                                                    .errors
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
                                                                formikProps
                                                                    .values
                                                                    .postalCode
                                                            }
                                                            onBlur={formikProps.handleBlur(
                                                                'postalCode'
                                                            )}
                                                        />
                                                        <Text
                                                            style={
                                                                styles.errorText
                                                            }
                                                        >
                                                            {formikProps.touched
                                                                .postalCode &&
                                                                formikProps
                                                                    .errors
                                                                    .postalCode}
                                                        </Text>
                                                        <View
                                                            style={
                                                                styles.buttonContainer
                                                            }
                                                        >
                                                            <Button
                                                                variant='contained'
                                                                title='SUBMIT'
                                                                color={
                                                                    Colors.mediumBackground
                                                                }
                                                                tintColor='white'
                                                                style={
                                                                    styles.submitButton
                                                                }
                                                                // style={styles.submitButton}
                                                                onPress={
                                                                    formikProps.handleSubmit
                                                                }
                                                            />
                                                        </View>
                                                    </View>
                                                </>
                                            )}
                                            {/* this ends the formik execution */}
                                        </Formik>
                                    </CollapsibleView>
                                </CollapsibleView>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </TouchableWithoutFeedback>
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
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    submitButton: {
        width: '70%',
    },
});
