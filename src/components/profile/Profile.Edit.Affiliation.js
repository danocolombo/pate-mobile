import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';
import { Surface, List, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from '../ui/PhoneInput';
// import { Colors } from '../../../constants/colors';
// import { putRally } from '../../providers/rallies';
// import { createTmp, updateTmp } from '../../../features/rallies/ralliesSlice';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomButton from '../ui/CustomButton';
import { updateCurrentUser } from '../../features/users/usersSlice';
import { updateProfile } from '../../providers/users';
import { Colors } from '../../constants/colors';
import {
    printObject,
    getPhoneType,
    createPatePhone,
    capitalize,
} from '../../utils/helpers';

// create validation schema for yup to pass to formik
const profileSchema = yup.object({
    firstName: yup.string().required('first name is required').min(2),
    lastName: yup.string().required('last name is required'),
    email: yup.string().email(),
    street: yup.string(),
    city: yup.string().min(2),
    stateProv: yup.string().min(2).max(2),
    postalCode: yup.string(),
    // .test('is-postalCode-numeric', 'required (10000 - 99999)', (val) => {
    //     return parseInt(val) > 9999 && parseInt(val) < 100000;
    // }),
    affiliateName: yup.string().min(2),
    affiliateCity: yup.string().min(2),
    affiliateStateProv: yup.string().min(2).max(2),
});

export default function ProfileEditAffiliation() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    let user = useSelector((state) => state.users.currentUser);
    let { affiliate } = useSelector((state) => state.system);

    const [showPhoneError, setShowPhoneError] = useState(false);
    //printObject('PF:49-->user', user);

    let phoneDisplayValue;
    if (user.phone) {
        let phoneType = getPhoneType(user.phone);

        switch (phoneType) {
            case 'PATE':
                phoneDisplayValue = user.phone;
                break;
            case 'MASKED':
                // console.log('PF:60 user.phone', user.phone);
                phoneDisplayValue = createPatePhone(user.phone);
                break;
            default:
                phoneDisplayValue = '';
                break;
        }
    }

    const [userPhone, setUserPhone] = useState(phoneDisplayValue);

    let rally;

    const handleSubmit = (values) => {
        // printObject('PF:73-->values', values);
        // printObject('PF:74-->user', user);
        //ensure that the phone is in expected format 1234567890
        // 1. value needs to be either 0 or 14 characters.
        let pType = getPhoneType(userPhone);
        let phoneToPass;
        switch (pType) {
            case 'PATE':
                phoneToPass = userPhone;
                break;
            case 'MASKED':
                phoneToPass = createPatePhone(userPhone);
                break;
            default:
                phoneToPass = '';
                break;
        }

        // gather data
        values.phone = phoneToPass;
        dispatch(updateCurrentUser(values));
        // need to create residence structure
        let dbProfile = {
            uid: user.uid,
            firstName: values?.firstName ? values.firstName : '',
            lastName: values?.lastName ? values.lastName : '',
            email: values?.email ? values.email : '',
            phone: userPhone,
            residence: {
                street: values?.street ? values.street : '',
                city: values?.city ? values.city : '',
                stateProv: values?.stateProv ? values.stateProv : '',
                postalCode: values?.postalCode ? values.postalCode : '',
            },
            affiliate: {
                name: values?.affiliateName ? values.affiliateName : '',
                city: values?.affiliateCity ? values.affiliateCity : '',
                stateProv: values?.affiliateStateProv
                    ? values.affiliateStateProv
                    : '',
            },
            isLoggedIn: true,
        };
        // now conditionally add the rep and lead info if applicable
        if (user?.stateRep) {
            dbProfile = { ...dbProfile, stateRep: user.stateRep };
            dbProfile = { ...dbProfile, profile: user.profile };
        }
        if (user?.stateLead) {
            dbProfile = { ...dbProfile, stateLead: user.stateLead };
            dbProfile = { ...dbProfile, profile: user.profile };
        }
        dbProfile = { ...dbProfile, username: user.username };
        dbProfile = { ...dbProfile, role: user.role };
        dbProfile = { ...dbProfile, region: user.region };
        // printObject('PF:127-->dbProfile', dbProfile);
        if (!user?.affiliate) {
            dbProfile = { ...dbProfile, affiliate: 'FEO' };
        }
        updateProfile(dbProfile).then((response) => {
            navigation.navigate('Main', null);
        });
    };
    const [isOpened, setIsOpened] = useState(true);
    const handlePress = () => setIsOpened(!isOpened);
    // const dispatch = useDispatch();
    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Formik
                    initialValues={{
                        firstName: user?.firstName ? user.firstName : '',
                        lastName: user?.lastName ? user.lastName : '',
                        phone: user?.phone ? user.phone : '',
                        email: user?.email ? user.email : '',
                        street: user?.residence?.street
                            ? user.residence.street
                            : '',
                        city: user?.residence?.city ? user.residence.city : '',
                        stateProv: user?.residence?.stateProv
                            ? user.residence.stateProv
                            : '',
                        postalCode: user?.residence?.postalCode
                            ? user.residence.postalCode
                            : '',
                        affiliateName: user?.affiliate?.name
                            ? user.affiliate.name
                            : '',

                        affiliateCity: user?.affiliate?.city
                            ? user.affiliate.city
                            : '',
                        affiliateStateProv: user?.affiliate?.stateProv
                            ? user.affiliate.stateProv
                            : '',
                    }}
                    validationSchema={profileSchema}
                    onSubmit={async (values, actions) => {
                        handleSubmit(values);
                    }}
                >
                    {(formikProps) => (
                        <Surface style={styles.personalSurface}>
                            <View style={styles.heading}>
                                <Text style={styles.headerText}>
                                    Edit {capitalize(affiliate.label)} Info
                                </Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <View style={styles.labelContainer}>
                                    <Text style={styles.labelText}>
                                        {capitalize(affiliate.label)} Name
                                    </Text>
                                </View>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Name'
                                    onChangeText={formikProps.handleChange(
                                        'affiliateName'
                                    )}
                                    value={formikProps.values.affiliateName}
                                    onBlur={formikProps.handleBlur(
                                        'affiliateName'
                                    )}
                                />
                                {formikProps.errors.affiliateName &&
                                formikProps.touched.affiliateName ? (
                                    <Text style={styles.errorText}>
                                        {formikProps.touched.affiliateName &&
                                            formikProps.errors.affiliateName}
                                    </Text>
                                ) : null}
                                <View style={styles.labelContainer}>
                                    <Text style={styles.labelText}>City</Text>
                                </View>
                                <TextInput
                                    style={styles.input}
                                    placeholder='City'
                                    onChangeText={formikProps.handleChange(
                                        'affiliateCity'
                                    )}
                                    value={formikProps.values.affiliateCity}
                                    onBlur={formikProps.handleBlur(
                                        'affiliateCity'
                                    )}
                                />
                                {formikProps.errors.affiliateCity &&
                                formikProps.touched.affiliateCity ? (
                                    <Text style={styles.errorText}>
                                        {formikProps.touched.affiliateCity &&
                                            formikProps.errors.affiliateCity}
                                    </Text>
                                ) : null}
                                <View style={styles.labelContainer}>
                                    <Text style={styles.labelText}>State</Text>
                                </View>
                                <TextInput
                                    style={[
                                        styles.input,
                                        styles.inputStateProv,
                                    ]}
                                    placeholder='State'
                                    onChangeText={formikProps.handleChange(
                                        'affiliateStateProv'
                                    )}
                                    value={
                                        formikProps.values.affiliateStateProv
                                    }
                                    onBlur={formikProps.handleBlur(
                                        'affiliateStateProv'
                                    )}
                                />

                                {formikProps.errors.affiliateStateProv &&
                                formikProps.touched.affiliateStateProv ? (
                                    <Text style={styles.errorText}>
                                        {formikProps.touched
                                            .affiliateStateProv &&
                                            formikProps.errors
                                                .affiliateStateProv}
                                    </Text>
                                ) : null}
                            </View>

                            <View style={styles.buttonContainer}>
                                <CustomButton
                                    title='Update'
                                    graphic=''
                                    cbStyles={{
                                        backgroundColor: 'green',
                                        color: 'white',
                                        width: '50%',
                                    }}
                                    onPress={formikProps.handleSubmit}
                                />
                            </View>
                        </Surface>
                    )}
                    {/* this ends the formik execution */}
                </Formik>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    personalSurface: {
        marginHorizontal: 10,
        paddingVertical: 0,
        marginTop: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    heading: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginLeft: '10%',
        backgroundColor: 'white',
    },
    labelContainer: {
        marginTop: 3,
    },
    labelText: {
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 5,
        marginTop: 2,
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
    phoneWrapper: {
        marginTop: 5,
        marginBottom: 3,
    },
    phoneWrapperError: {
        marginBottom: 10,
    },
    phoneError: {
        color: 'red',
        fontWeight: '500',
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
    affiliateSurfaceContainter: {
        padding: 5,
        marginHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    affiliateTitle: {
        textAlign: 'center',
        fontSize: 24,
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