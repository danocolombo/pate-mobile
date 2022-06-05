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
import { Headline } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-native-material/core';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants/colors';
// import { putRally } from '../../providers/rallies';
// import { addNewRally } from '../../features/rallies/ralliesSlice.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import { printObject } from '../../../utils/helpers';
import CustomNavButton from '../../ui/CustomNavButton';

// create validation schema for yup to pass to formik
const rallyLocationSchema = yup.object({
    contactName: yup.string(),
    contactPhone: yup.string(),
    contactEmail: yup.string().email(),
});

export default function RallyContactForm({ rallyId }) {
    const navigation = useNavigation();
    const tmp = useSelector((state) => state.rallies.tmpRally);
    const rallyEntry = useSelector((state) =>
        state.rallies.publicRallies.filter((r) => r.uid === rallyId)
    );
    const rally = rallyEntry[0];
    const handleNext = () => {
        console.log('handleNext triggered');
        navigation.navigate('RallyEditFlow', {
            rallyId: rallyId,
            stage: 4,
        });
    };
    printObject('2. tmpRally:', tmp);
    return (
        <View>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <ScrollView>
                            <Formik
                                initialValues={{
                                    contactName: rally?.contact?.name
                                        ? rally.contact.name
                                        : '',
                                    contactPhone: rally?.contact?.phone
                                        ? rally.contact.phone
                                        : '',
                                    contactEmail: rally?.contact?.email
                                        ? rally.contact.email
                                        : '',
                                }}
                                validationSchema={rallyLocationSchema}
                                onSubmit={async (values, actions) => {
                                    //     actions.resetForm();
                                    //     await putRally(values);
                                    //     dispatch(addNewRally, actions);
                                    //     console.log(
                                    //         'these values were saved: \n',
                                    //         values
                                    //     );
                                    console.log('onSubmit triggered');
                                }}
                            >
                                {(formikProps) => (
                                    <>
                                        <View style={styles.formHeader}>
                                            <Headline>
                                                Rally Contact Information
                                            </Headline>
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <View>
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
                                            </View>
                                        </View>
                                    </>
                                )}
                                {/* this ends the formik execution */}
                            </Formik>
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
});
