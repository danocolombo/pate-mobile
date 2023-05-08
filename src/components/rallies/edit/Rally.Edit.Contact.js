import React, { useState } from 'react';
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
import PhoneInput from '../../ui/PhoneInput';
// import { putRally } from '../../providers/rallies';
import { updateTmp } from '../../../features/rallies/ralliesSlice';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
    createPatePhone,
    printObject,
    checkPatePhoneValue,
    getPhoneType,
    transformPatePhone,
} from '../../../utils/helpers';
import CustomNavButton from '../../ui/CustomNavButton';

// create validation schema for yup to pass to formik
const rallyContactSchema = yup.object({
    contactFirstName: yup.string(),
    contactLastName: yup.string(),
    contactPhone: yup.string(),
    contactEmail: yup.string().email(),
});

export default function RallyContactForm({ rallyId }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [showPhoneError, setShowPhoneError] = useState(false);
    const tmp = useSelector((state) => state.rallies.tmpRally);

    // phone control needs the value in numeric format. Check if we need to
    // alter to use
    let phoneDisplayValue;
    if (tmp?.contact?.phone) {
        let phoneType = getPhoneType(tmp?.contact?.phone);

        switch (phoneType) {
            case 'PATE':
                phoneDisplayValue = tmp.contact.phone;
                break;
            case 'MASKED':
                // console.log('REC:57 tmp.contact.phone', tmp.contact.phone);
                phoneDisplayValue = createPatePhone(tmp.contact.phone);
                break;
            default:
                phoneDisplayValue = '';
                break;
        }
    } else {
        phoneDisplayValue = '';
    }

    const [contactPhone, setContactPhone] = useState(phoneDisplayValue);

    const handleNext = (values) => {
        //setShowPhoneError(false);
        // build a contact object
        // printObject('values', values);
        let phoneToPass;
        if (contactPhone) {
            //ensure that the phone is in expected format (xxx) xxx-xxxx
            // 1. value needs to be either 0 or 14 characters.
            let phoneValue = contactPhone;
            let phoneOkay = false;
            if (phoneValue.length === 10 && phoneValue.indexOf(')') === -1) {
                phoneOkay = true;
            } else if (
                phoneValue.indexOf(')') === 4 &&
                phoneValue.length === 14
            ) {
                phoneOkay = true;
            }
            if (phoneOkay === false) {
                setShowPhoneError(true);
                return;
            }
            if (contactPhone) {
                let pType = getPhoneType(contactPhone);
                switch (pType) {
                    case 'PATE':
                        phoneToPass = transformPatePhone(contactPhone);
                        break;
                    case 'MASKED':
                        phoneToPass = contactPhone;
                        break;
                    default:
                        phoneToPass = '';
                        break;
                }
            } else {
                phoneToPass = '';
            }
        } else {
            phoneToPass = '';
        }
        let newRally = tmp;
        let rallyUpdate = {};
        if (
            values.firstName.length > 0 ||
            values.lastName.length > 0 ||
            phoneToPass.length > 0 ||
            values.email.length > 0
        ) {
            // contact info provide

            rallyUpdate = {
                ...newRally.contact,
                firstName: values.firstName,
                lastName: values.lastName,
                phone: phoneToPass,
                email: values.email,
            };
        }
        //* *********************************************************
        //      START RE-DO
        //* *********************************************************

        let DANO1 = true;
        if (DANO1) {
            // printObject('RELM:166-->tmp:', tmp);
            // printObject('RELM:167-->rallyUpdate:', rallyUpdate);
            // return;
            dispatch(updateTmp(rallyUpdate));
            navigation.navigate('RallyEditFlow', {
                rallyId: rallyId,
                stage: 5,
            });
        }
        //* *********************************************************
        //      END RE-DO
        //* *********************************************************
        let updatedRally = {
            ...newRally,
            contact: updatedContact,
        };
        // console.log('handleNext contactPhone(after):', contactPhone);

        // printObject('REC:123-->updateTmp', updatedRally);
        dispatch(updateTmp(updatedRally));
        navigation.navigate('RallyEditFlow', {
            rallyId: rallyId,
            stage: 5,
        });
    };
    // printObject('2. tmpRally:', tmp);
    return (
        <>
            <ImageBackground
                source={require('../../../components/images/background.png')}
                style={styles.bgImageContainer}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Formik
                        initialValues={{
                            firstName: tmp?.contact?.firstName
                                ? tmp.contact.firstName
                                : '',
                            lastName: tmp?.contact?.lastName
                                ? tmp.contact.lastName
                                : '',
                            email: tmp?.contact?.email ? tmp.contact.email : '',
                        }}
                        validationSchema={rallyContactSchema}
                        onSubmit={async (values, actions) => {
                            // printObject('onSubmit::values', values);
                            handleNext(values);
                        }}
                    >
                        {(formikProps) => (
                            <>
                                <ScrollView contentContainerStyle={styles.root}>
                                    <View style={styles.root}>
                                        <View style={styles.infoWrapper}>
                                            <View style={styles.formHeader}>
                                                <Text style={styles.titleText}>
                                                    Contact Information
                                                </Text>
                                            </View>
                                            <View style={styles.inputContainer}>
                                                <View>
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder='First Name'
                                                        onChangeText={formikProps.handleChange(
                                                            'firstName'
                                                        )}
                                                        value={
                                                            formikProps.values
                                                                .firstName
                                                        }
                                                        onBlur={formikProps.handleBlur(
                                                            'firstName'
                                                        )}
                                                    />
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder='Last Name'
                                                        onChangeText={formikProps.handleChange(
                                                            'lastName'
                                                        )}
                                                        value={
                                                            formikProps.values
                                                                .lastName
                                                        }
                                                        onBlur={formikProps.handleBlur(
                                                            'lastName'
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
                                                    <View
                                                        style={
                                                            showPhoneError
                                                                ? styles.phoneWrapperError
                                                                : styles.phoneWrapper
                                                        }
                                                    >
                                                        <PhoneInput
                                                            overrideStyle={{
                                                                borderColor:
                                                                    Colors.gray35,
                                                                borderWidth: 2,
                                                                borderRadius: 6,
                                                                backgroundColor:
                                                                    'white',
                                                            }}
                                                            value={contactPhone}
                                                            onChange={
                                                                setContactPhone
                                                            }
                                                        />
                                                        {showPhoneError ? (
                                                            <Text
                                                                style={
                                                                    styles.phoneError
                                                                }
                                                            >
                                                                Please correct
                                                                the phone number
                                                            </Text>
                                                        ) : null}
                                                    </View>
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder='Contact Email'
                                                        autocomplete='off'
                                                        autoCapitalize='none'
                                                        onChangeText={formikProps.handleChange(
                                                            'email'
                                                        )}
                                                        value={
                                                            formikProps.values
                                                                .email
                                                        }
                                                        onBlur={formikProps.handleBlur(
                                                            'email'
                                                        )}
                                                    />
                                                    <Text
                                                        style={styles.errorText}
                                                    >
                                                        {formikProps.touched
                                                            .email &&
                                                            formikProps.errors
                                                                .email}
                                                    </Text>
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
                                </ScrollView>
                            </>
                        )}
                        {/* this ends the formik execution */}
                    </Formik>
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
    infoWrapper: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 20,
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
        backgroundColor: 'white',
        borderRadius: 6,
        width: '90%',
    },
    phoneWrapper: {
        marginBottom: 30,
    },
    phoneWrapperError: {
        marginBottom: 10,
    },
    phoneError: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
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
