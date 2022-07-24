import React, { useEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    ImageBackground,
} from 'react-native';
import { Headline } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-native-material/core';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants/colors';
// import { putRally } from '../../providers/rallies';
import { createTmp, updateTmp } from '../../../features/rallies/ralliesSlice';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomNavButton from '../../ui/CustomNavButton';
import { printObject } from '../../../utils/helpers';

// create validation schema for yup to pass to formik
const rallyLocationSchema = yup.object({
    name: yup.string().required().min(5),
    street: yup.string(),
    city: yup.string().required().min(2),
    stateProv: yup.string().required().min(2).max(2),
    postalCode: yup
        .string()
        .required()
        .test('is-postalCode-numeric', 'required (10000 - 99999)', (val) => {
            return parseInt(val) > 9999 && parseInt(val) < 100000;
        }),
});

export default function RallyLocationForm({ rallyId }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    let rallyEntry;
    if (rallyId !== 0) {
        rallyEntry = useSelector((state) =>
            state.rallies.allRallies.filter((r) => r.uid === rallyId)
        );
    }
    let rally;
    if (rallyEntry) {
        rally = rallyEntry[0];
    }
    // console.log('REL:50 rally.uid:', rally?.uid);
    //printObject('REL:51--> rally', rally);
    useEffect(() => {
        if (rally?.uid) {
            //save existing values to tmpEntry
            dispatch(createTmp(rally));
        }
    }, []);

    const handleNext = (values) => {
        // gather data
        // console.log('in handleNext');
        if (rally?.uid) {
            dispatch(updateTmp(values));
        } else {
            dispatch(createTmp(values));
        }
        navigation.navigate('RallyEditFlow', {
            rallyId: rallyId,
            stage: 2,
        });
    };
    // const dispatch = useDispatch();
    return (
        <>
            <ImageBackground
                source={require('../../../components/images/background.png')}
                style={styles.bgImageContainer}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.root}>
                        <ScrollView contentContainerStyle={styles.root}>
                            <Formik
                                initialValues={{
                                    name: rally?.name ? rally.name : '',
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
                                onSubmit={async (values, actions) => {
                                    handleNext(values);
                                }}
                            >
                                {(formikProps) => (
                                    <View style={styles.root}>
                                        <View>
                                            <View style={styles.formHeader}>
                                                <Text
                                                    style={
                                                        styles.inputLabelText
                                                    }
                                                >
                                                    Location Information
                                                </Text>
                                            </View>
                                            <View style={styles.inputContainer}>
                                                <View>
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder='Location Name'
                                                        autocomplete='off'
                                                        onChangeText={formikProps.handleChange(
                                                            'name'
                                                        )}
                                                        value={
                                                            formikProps.values
                                                                .name
                                                        }
                                                        onBlur={formikProps.handleBlur(
                                                            'name'
                                                        )}
                                                    />
                                                    <Text
                                                        style={styles.errorText}
                                                    >
                                                        {formikProps.touched
                                                            .name &&
                                                            formikProps.errors
                                                                .name}
                                                    </Text>
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder='Street'
                                                        onChangeText={formikProps.handleChange(
                                                            'street'
                                                        )}
                                                        value={
                                                            formikProps.values
                                                                .street
                                                        }
                                                        onBlur={formikProps.handleBlur(
                                                            'street'
                                                        )}
                                                    />
                                                    <Text
                                                        style={styles.errorText}
                                                    >
                                                        {formikProps.touched
                                                            .street &&
                                                            formikProps.errors
                                                                .street}
                                                    </Text>
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder='City'
                                                        onChangeText={formikProps.handleChange(
                                                            'city'
                                                        )}
                                                        value={
                                                            formikProps.values
                                                                .city
                                                        }
                                                        onBlur={formikProps.handleBlur(
                                                            'city'
                                                        )}
                                                    />
                                                    <Text
                                                        style={styles.errorText}
                                                    >
                                                        {formikProps.touched
                                                            .city &&
                                                            formikProps.errors
                                                                .city}
                                                    </Text>

                                                    <View
                                                        style={
                                                            styles.stateProvPostalCodeContainerRow
                                                        }
                                                    >
                                                        <View
                                                            style={
                                                                styles.stateProvPostalCodeContainer
                                                            }
                                                        >
                                                            <View
                                                                style={
                                                                    styles.stateProvSectionContainer
                                                                }
                                                            >
                                                                <View
                                                                    style={
                                                                        styles.stateProvInputContainer
                                                                    }
                                                                >
                                                                    <TextInput
                                                                        style={[
                                                                            styles.input,
                                                                            styles.inputStateProv,
                                                                        ]}
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
                                                                </View>
                                                                <View
                                                                    style={
                                                                        styles.stateProvErrorContainer
                                                                    }
                                                                >
                                                                    <Text
                                                                        style={
                                                                            styles.errorText
                                                                        }
                                                                    >
                                                                        {formikProps
                                                                            .touched
                                                                            .stateProv &&
                                                                            formikProps
                                                                                .errors
                                                                                .stateProv}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View
                                                                style={
                                                                    styles.postalCodeSectionContainer
                                                                }
                                                            >
                                                                <View
                                                                    style={
                                                                        styles.postalCodeInputContainer
                                                                    }
                                                                >
                                                                    <TextInput
                                                                        style={[
                                                                            styles.input,
                                                                            styles.inputPostalCode,
                                                                        ]}
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
                                                                </View>
                                                                <View
                                                                    style={
                                                                        styles.postalCodeErrorContainer
                                                                    }
                                                                >
                                                                    <Text
                                                                        style={
                                                                            styles.errorText
                                                                        }
                                                                    >
                                                                        {formikProps
                                                                            .touched
                                                                            .postalCode &&
                                                                            formikProps
                                                                                .errors
                                                                                .postalCode}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
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
                                    </View>
                                )}
                                {/* this ends the formik execution */}
                            </Formik>
                        </ScrollView>
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
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
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
        backgroundColor: 'white',
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
