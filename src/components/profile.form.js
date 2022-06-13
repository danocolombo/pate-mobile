import React, { useEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';
import { Headline, Surface } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// import { Button } from '@react-native-material/core';
import { useDispatch, useSelector } from 'react-redux';
// import { Colors } from '../../../constants/colors';
// import { putRally } from '../../providers/rallies';
// import { createTmp, updateTmp } from '../../../features/rallies/ralliesSlice';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomButton from '../components/ui/CustomButton';
import { updateCurrentUser } from '../features/users/usersSlice';
import { printObject } from '../utils/helpers';

// create validation schema for yup to pass to formik
const profileSchema = yup.object({
    firstName: yup.string().required('first name is required').min(2),
    lastName: yup.string().required('last name is required'),
    phone: yup.string(),
    email: yup.string().email(),
    street: yup.string(),
    city: yup.string().min(2),
    stateProv: yup.string().min(2).max(2),
    postalCode: yup.string(),
    // .test('is-postalCode-numeric', 'required (10000 - 99999)', (val) => {
    //     return parseInt(val) > 9999 && parseInt(val) < 100000;
    // }),
    churchName: yup.string().min(2),
    churchCity: yup.string().min(2),
    churchStateProv: yup.string().min(2).max(2),
});

export default function ProfileForm() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    let user = useSelector((state) => state.users.currentUser);
    printObject('user', user);
    let rally;

    const handleSubmit = (values) => {
        // gather data
        dispatch(updateCurrentUser(values));
        //todo: save the user info to DDB
        navigation.navigate('Main', null);
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
                                    firstName: user?.firstName
                                        ? user.firstName
                                        : '',
                                    lastName: user?.lastName
                                        ? user.lastName
                                        : '',
                                    phone: user?.phone ? user.phone : '',
                                    email: user?.email ? user.email : '',
                                    street: user?.street ? user.street : '',
                                    city: user?.city ? user.city : '',
                                    stateProv: user?.stateProv
                                        ? user.stateProv
                                        : '',
                                    postalCode: user?.postalCode
                                        ? user.postalCode
                                        : '',
                                    churchName: user?.churchName
                                        ? user.churchName
                                        : '',
                                    churchStreet: user?.churchStreet
                                        ? user.churchStreet
                                        : '',
                                    churchCity: user?.churchCity
                                        ? user.churchCity
                                        : '',
                                    churchState: user?.churchState
                                        ? user.churchState
                                        : '',
                                }}
                                validationSchema={profileSchema}
                                onSubmit={async (values, actions) => {
                                    handleSubmit(values);
                                }}
                            >
                                {(formikProps) => (
                                    <>
                                        <View style={styles.formHeader}>
                                            <Headline>
                                                Your Profile Information
                                            </Headline>
                                        </View>
                                        <Surface style={styles.personalSurface}>
                                            <View style={styles.inputContainer}>
                                                <View>
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder='First Name'
                                                        autocomplete='off'
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
                                                    {formikProps.errors
                                                        .firstName &&
                                                    formikProps.touched
                                                        .firstName ? (
                                                        <Text
                                                            style={
                                                                styles.errorText
                                                            }
                                                        >
                                                            {formikProps.touched
                                                                .firstName &&
                                                                formikProps
                                                                    .errors
                                                                    .firstName}
                                                        </Text>
                                                    ) : null}
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder='Last Name'
                                                        autocomplete='off'
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
                                                    {formikProps.errors
                                                        .lastName &&
                                                    formikProps.touched
                                                        .lastName ? (
                                                        <Text
                                                            style={
                                                                styles.errorText
                                                            }
                                                        >
                                                            {formikProps.touched
                                                                .lastName &&
                                                                formikProps
                                                                    .errors
                                                                    .lastName}
                                                        </Text>
                                                    ) : null}
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder='Email'
                                                        autocomplete='off'
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
                                                    {formikProps.errors.email &&
                                                    formikProps.touched
                                                        .email ? (
                                                        <Text
                                                            style={
                                                                styles.errorText
                                                            }
                                                        >
                                                            {formikProps.touched
                                                                .email &&
                                                                formikProps
                                                                    .errors
                                                                    .email}
                                                        </Text>
                                                    ) : null}
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder='Phone'
                                                        autocomplete='off'
                                                        onChangeText={formikProps.handleChange(
                                                            'phone'
                                                        )}
                                                        value={
                                                            formikProps.values
                                                                .phone
                                                        }
                                                        onBlur={formikProps.handleBlur(
                                                            'phone'
                                                        )}
                                                    />
                                                    {formikProps.errors.phone &&
                                                    formikProps.touched
                                                        .phone ? (
                                                        <Text
                                                            style={
                                                                styles.errorText
                                                            }
                                                        >
                                                            {formikProps.touched
                                                                .phone &&
                                                                formikProps
                                                                    .errors
                                                                    .phone}
                                                        </Text>
                                                    ) : null}
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
                                                    {formikProps.errors
                                                        .street &&
                                                    formikProps.touched
                                                        .street ? (
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
                                                    ) : null}
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
                                                    {formikProps.errors.city &&
                                                    formikProps.touched.city ? (
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
                                                    ) : null}

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
                                                                        placeholder='State'
                                                                        onChangeText={formikProps.handleChange(
                                                                            'stateProv'
                                                                        )}
                                                                        value={
                                                                            formikProps
                                                                                .values
                                                                                .stateProv
                                                                        }
                                                                        onBlur={formikProps.handleBlur(
                                                                            'stateProv'
                                                                        )}
                                                                    />
                                                                </View>
                                                                <View
                                                                    style={
                                                                        styles.stateProvErrorContainer
                                                                    }
                                                                >
                                                                    {formikProps
                                                                        .errors
                                                                        .stateProv &&
                                                                    formikProps
                                                                        .touched
                                                                        .stateProv ? (
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
                                                                    ) : null}
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
                                                                    {formikProps
                                                                        .errors
                                                                        .postalCode &&
                                                                    formikProps
                                                                        .touched
                                                                        .postalCode ? (
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
                                                                    ) : null}
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </Surface>
                                        <Surface
                                            style={
                                                styles.churchSurfaceContainter
                                            }
                                        >
                                            <View style={styles.inputContainer}>
                                                <View>
                                                    <Text
                                                        style={
                                                            styles.churchTitle
                                                        }
                                                    >
                                                        Church Affiliation
                                                    </Text>
                                                </View>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder='Church Name'
                                                    onChangeText={formikProps.handleChange(
                                                        'churchName'
                                                    )}
                                                    value={
                                                        formikProps.values
                                                            .churchName
                                                    }
                                                    onBlur={formikProps.handleBlur(
                                                        'churchName'
                                                    )}
                                                />
                                                {formikProps.errors
                                                    .churchName &&
                                                formikProps.touched
                                                    .churchName ? (
                                                    <Text
                                                        style={styles.errorText}
                                                    >
                                                        {formikProps.touched
                                                            .churchName &&
                                                            formikProps.errors
                                                                .churchName}
                                                    </Text>
                                                ) : null}
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder='City'
                                                    onChangeText={formikProps.handleChange(
                                                        'churchCity'
                                                    )}
                                                    value={
                                                        formikProps.values
                                                            .churchCity
                                                    }
                                                    onBlur={formikProps.handleBlur(
                                                        'churchCity'
                                                    )}
                                                />
                                                {formikProps.errors
                                                    .churchCity &&
                                                formikProps.touched
                                                    .churchCity ? (
                                                    <Text
                                                        style={styles.errorText}
                                                    >
                                                        {formikProps.touched
                                                            .churchCity &&
                                                            formikProps.errors
                                                                .churchCity}
                                                    </Text>
                                                ) : null}
                                                <TextInput
                                                    style={[
                                                        styles.input,
                                                        styles.inputStateProv,
                                                    ]}
                                                    placeholder='State'
                                                    onChangeText={formikProps.handleChange(
                                                        'churchStateProv'
                                                    )}
                                                    value={
                                                        formikProps.values
                                                            .churchStateProv
                                                    }
                                                    onBlur={formikProps.handleBlur(
                                                        'churchStateProv'
                                                    )}
                                                />

                                                {formikProps.errors
                                                    .churchStateProv &&
                                                formikProps.touched
                                                    .churchStateProv ? (
                                                    <Text
                                                        style={styles.errorText}
                                                    >
                                                        {formikProps.touched
                                                            .churchStateProv &&
                                                            formikProps.errors
                                                                .churchStateProv}
                                                    </Text>
                                                ) : null}
                                            </View>
                                        </Surface>
                                        <View style={styles.buttonContainer}>
                                            <CustomButton
                                                title='Update'
                                                graphic=''
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
    personalSurface: {
        padding: 5,
        marginHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
    },
    inputContainer: {
        marginLeft: '10%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        marginTop: 5,
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
    churchSurfaceContainter: {
        padding: 5,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    churchTitle: {
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
