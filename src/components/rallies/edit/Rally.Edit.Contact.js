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
    contactName: yup.string(),
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
        setShowPhoneError(false);
        // build a contact object
        // printObject('values', values);
        let phoneToPass;
        if (contactPhone) {
            //ensure that the phone is in expected format (xxx) xxx-xxxx
            // 1. value needs to be either 0 or 14 characters.
            let phoneValue = contactPhone;

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
        // console.log('handleNext contactPhone(after):', contactPhone);
        let contact = {
            contact: {
                name: values.name,
                phone: phoneToPass,
                email: values.email,
            },
        };
        // printObject('updateTmp(contact)', contact);
        dispatch(updateTmp(contact));
        navigation.navigate('RallyEditFlow', {
            rallyId: rallyId,
            stage: 4,
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
                            name: tmp?.contact?.name ? tmp.contact.name : '',
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
                                        <View>
                                            <View style={styles.formHeader}>
                                                <Text style={styles.titleText}>
                                                    Contact Information
                                                </Text>
                                            </View>
                                            <View style={styles.inputContainer}>
                                                <View>
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder='Contact Name'
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
        fontWeight: '500',
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
