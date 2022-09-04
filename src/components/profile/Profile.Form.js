import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Modal,
} from 'react-native';
import { List, Surface, withTheme, Snackbar, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from 'react-native-paper-dropdown';
import PhoneInput from '../ui/PhoneInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomButton from '../ui/CustomButton';
import {
    updateCurrentUser,
    updateAffiliationActive,
    updateAffiliateActiveAndReference,
} from '../../features/users/usersSlice';
import {
    updateRegion,
    updateAppName,
    updateAffiliate,
    updateAffiliateTitle,
    updateStateProv,
    updateAffiliation,
} from '../../features/system/systemSlice';
import PersonalHeader from './personalHeader';
import { updateProfile } from '../../providers/users';
import { getAffiliate } from '../../providers/system';
import { clearLeadersAndGuests } from '../../features/profiles/profilesSlice';
import { Colors } from '../../constants/colors';
import {
    printObject,
    capitalize,
    getPhoneType,
    createPatePhone,
} from '../../utils/helpers';
import { Ionicons } from '@expo/vector-icons';
// import { select } from '@react-native-material/core';
// import { or } from 'ramda';
import { original } from '@reduxjs/toolkit';
// import { validate } from 'react-native-web/dist/cjs/exports/StyleSheet/validate';

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
    affiliateity: yup.string().min(2),
    affiliateStateProv: yup.string().min(2).max(2),
});

const ProfileForm = (props) => {
    const navigation = useNavigation();
    const [showUnsupportedChange, setShowUnsupportedChange] = useState(false);
    const [showCantChangeModal, setShowCantChangeModal] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [contactAccordionIsOpen, setContactAccordionIsOpen] = useState(false);
    const [affiliationAccordionIsOpen, setAffiliationAccordionIsOpen] =
        useState(false);
    const [affiliationsAccordionIsOpen, setAffiliationsAccordionIsOpen] =
        useState(false);
    const { colors } = props.theme;
    const dispatch = useDispatch();
    const feo = useSelector((state) => state.system);
    const originalUser = useSelector((state) => state.users.currentUser);
    let user = useSelector((state) => state.users.currentUser);
    const [affiliationSelected, setAffiliationSelected] = useState(
        user?.affiliations?.active.value
    );

    const onDismissSnackBar = () => setSnackbarVisible(false);
    const [showPhoneError, setShowPhoneError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const [fName, setFName] = useState(user?.firstName ? user.firstName : '');
    const [lName, setLName] = useState(user?.lastName ? user.lastName : '');
    // const [headerUser, setHeaderUser] = useState(user);
    useEffect(() => {
        //setHeaderUser(user);
        if (originalUser.firstName !== user.firstName) {
            setFName = user.firstName;
        }
        if (originalUser.lastName !== user.lastName) {
            setLName = user.lastName;
        }
        // setFName = user.firstName
    }, [user]);

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
    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.appName,
        });
    }, [navigation, feo]);

    let rally;
    const handleAccordPress = () => {
        setContactAccordionIsOpen(!contactAccordionIsOpen);
        setAffiliationAccordionIsOpen(false);
        setAffiliationsAccordionIsOpen(false);
    };
    const handleAffiliationPress = () => {
        setAffiliationAccordionIsOpen(!affiliationAccordionIsOpen);
        setContactAccordionIsOpen(false);
        setAffiliationsAccordionIsOpen(false);
    };
    const handleAffiliationsPress = () => {
        setAffiliationsAccordionIsOpen(!affiliationsAccordionIsOpen);
        setContactAccordionIsOpen(false);
        setAffiliationAccordionIsOpen(false);
    };
    const handleContactSubmit = (values) => {
        printObject('contactSubmit:', values);
    };
    const handleErrorReset = () => {
        setAffiliationSelected(originalUser.affiliations.active.value);
        // values.affiliateName = originalUser.affiliate.name;
        // values.affiliateCity = originalUser.affiliate.city;
        // values.affiliateStateProv = originalUser.affiliate.stateProv;
        setShowUnsupportedChange(false);
    };
    const handleSubmit = (values, actions) => {
        //   is contact info updated???
        const AFFCODE = affiliationSelected;
        // console.log('AFFCODE:', AFFCODE);
        // console.log('test', originalUser.affiliations.active.value);
        // printObject('originalUser', originalUser);
        // printObject('values:', values);
        if (AFFCODE !== originalUser?.affiliations?.active?.value) {
            //   affiliation change attempt.
            if (
                values.affiliateName !== originalUser.affiliate.name ||
                values.affiliateCity !== originalUser.affiliate.city ||
                values.affiliateStateProv !== originalUser.affiliate.stateProv
            ) {
                setShowUnsupportedChange(true);
                return;
            }
            //   proceed with changing the active affiliation
            //todo - get the affiliation details from ddb
            let affiliate = {};
            getAffiliate(affiliationSelected).then((response) => {
                if (response.statusCode !== 200) {
                    setShowCantChangeModal(true);
                    return;
                } else {
                    affiliate = response.body[0];

                    let target = originalUser.affiliations.options;
                    const UserAffOptionObject = target.filter(
                        (o) => o.value === AFFCODE
                    );

                    const USERAFFOPTION = UserAffOptionObject[0];

                    //   now create payload for userSlice
                    try {
                        let usPayload = {
                            label: USERAFFOPTION.label,
                            role: USERAFFOPTION.role,
                            region: affiliate.regions[0],
                            value: AFFCODE,
                        };
                        // printObject('usPayload:', usPayload);
                        dispatch(updateAffiliateActiveAndReference(usPayload));
                    } catch (error) {
                        console.log('error setting usPayload\n', error);
                        printObject('USERAFFOPTION:', USERAFFOPTION);
                        return;
                    }

                    //   now create payload for systemSlice
                    let addUserRole = { userRole: USERAFFOPTION.role };
                    let ssPayload = {
                        ...affiliate,
                        ...addUserRole,
                    };
                    // printObject('ssPayload:', ssPayload);
                    dispatch(updateAffiliation(ssPayload));

                    //   CREATE dbProfile and UPDATE DDB
                    //todo: create affiliations object
                    let affiliations = {
                        options: originalUser.affiliations.options,
                        active: {
                            label: USERAFFOPTION.label,
                            role: USERAFFOPTION.role,
                            region: affiliate.regions[0],
                            value: AFFCODE,
                        },
                    };
                    let dbProfile = {
                        uid: user.uid,
                        firstName: values?.firstName ? values.firstName : '',
                        lastName: values?.lastName ? values.lastName : '',
                        email: values?.email ? values.email : '',
                        phone: userPhone,
                        residence: {
                            street: values?.street ? values.street : '',
                            city: values?.city ? values.city : '',
                            stateProv: values?.stateProv
                                ? values.stateProv
                                : '',
                            postalCode: values?.postalCode
                                ? values.postalCode
                                : '',
                        },
                        affiliate: {
                            name: values?.affiliateName
                                ? values.affiliateName
                                : '',
                            city: values?.affiliateCity
                                ? values.affiliateCity
                                : '',
                            stateProv: values?.affiliateStateProv
                                ? values.affiliateStateProv
                                : '',
                        },
                        affiliations: affiliations,
                        userAffiliates: originalUser.userAffiliates,
                        isLoggedIn: true,
                    };
                    if (originalUser?.stateRep) {
                        // now conditionally add the rep and lead info if applicable
                        dbProfile = {
                            ...dbProfile,
                            stateRep: originalUser.stateRep,
                        };
                        dbProfile = {
                            ...dbProfile,
                            profile: originalUser.profile,
                        };
                    }
                    if (originalUser?.stateLead) {
                        dbProfile = {
                            ...dbProfile,
                            stateLead: originalUser.stateLead,
                        };
                        dbProfile = {
                            ...dbProfile,
                            profile: originalUser.profile,
                        };
                    }
                    dbProfile = {
                        ...dbProfile,
                        username: originalUser.username,
                    };
                    dbProfile = { ...dbProfile, role: originalUser.role };
                    dbProfile = { ...dbProfile, region: originalUser.region };
                    // printObject('PF:156-->originalUser', originalUser);
                    printObject('PF:261-->dbProfile', dbProfile);

                    updateProfile(dbProfile)
                        .then((response) => {
                            setSnackbarVisible(true);
                        })
                        .catch((err) =>
                            console.log(
                                'error saving profile to database\n',
                                err
                            )
                        );
                    // return;
                }
            });
            dispatch(clearLeadersAndGuests());
        } else {
            //   AFFILIATE NOT CHANGED, CHECK user details
            setShowPhoneError(false);
            setShowEmailError(false);
            // printObject('original:', originalUser);
            // printObject('values:', values);

            //todo --- validate phone format
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
                    setShowPhoneError(true);
                    return;
            }
            values.phone = phoneToPass;
            //todo - check the email format

            const validateEmail = (email) => {
                return String(email)
                    .toLowerCase()
                    .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    );
            };
            if (validateEmail(values.email) === null) {
                setShowEmailError(true);
                return;
            }

            let different = false;
            if (originalUser.firstName === values.firstName) {
                if (originalUser.lastName === values.lastName) {
                    if (originalUser.phone === values.phone) {
                        if (originalUser.email === values.email) {
                            if (
                                originalUser.residence.street === values.street
                            ) {
                                if (
                                    originalUser.residence.city === values.city
                                ) {
                                    if (
                                        originalUser.residence.stateProv ===
                                        values.stateProv
                                    ) {
                                        if (
                                            originalUser.residence
                                                .postalCode ===
                                            values.postalCode
                                        ) {
                                            if (
                                                originalUser.affiliate.name ===
                                                values.affiliateName
                                            ) {
                                                if (
                                                    originalUser.affiliate
                                                        .city ===
                                                    values.affiliateCity
                                                ) {
                                                    if (
                                                        originalUser.affiliate
                                                            .stateProv ===
                                                        values.affiliateStateProv
                                                    ) {
                                                        different = false;
                                                    } else {
                                                        different = true;
                                                    }
                                                } else {
                                                    different = true;
                                                }
                                            } else {
                                                different = true;
                                            }
                                        }
                                    } else {
                                        different = true;
                                    }
                                } else {
                                    different = true;
                                }
                            } else {
                                different = true;
                            }
                        } else {
                            different = true;
                        }
                    } else {
                        different = true;
                    }
                } else {
                    setLName(values.lastName);
                    different = true;
                }
            } else {
                setFName(values.firstName);
                different = true;
            }
            if (!different) {
                console.error('NO CHANGES DETECTED');
                return;
            }
            // var newCurrentUser = { ...originalUser };
            // put all values in new array

            let newCurrentUser = {
                ...originalUser,
                ['firstName']: values.firstName,
                ['lastName']: values.lastName,
                ['email']: values.email,
                ['phone']: values.phone,
            };
            let residence = {
                ...newCurrentUser.residence,
                street: values.street,
                city: values.city,
                stateProv: values.stateProv,
                postalCode: values.postalCode,
            };
            newCurrentUser = {
                ...newCurrentUser,
                residence: residence,
            };
            let updatedAffiliate = {
                ...newCurrentUser.affiliate,
                ['name']: values.affiliateName,
                ['city']: values.affiliateCity,
                ['stateProv']: values.affiliateStateProv,
            };
            newCurrentUser = {
                ...newCurrentUser,
                affiliate: updatedAffiliate,
            };
            dispatch(updateCurrentUser(newCurrentUser));
            // clean up newCurrent to save to DDB
            delete newCurrentUser.jwtToken;
            delete newCurrentUser.groups;
            updateProfile(newCurrentUser)
                .then((response) => {
                    setSnackbarVisible(true);
                })
                .catch((err) =>
                    console.log('error saving profile to database\n', err)
                );
            return;
            // printObject('newCurrentUser', newCurrentUser);
        }
    };
    const handleAffiliationsSelectClick = () => {
        console.log('PF:187-->affiliationSelected:', affiliationSelected);
    };
    // const dispatch = useDispatch();
    return (
        <>
            <Modal visible={showUnsupportedChange} animationStyle='slide'>
                <Surface style={styles.modalSurface}>
                    <View>
                        <View style={{ marginTop: 5, alignItems: 'center' }}>
                            <Text style={styles.modalTitle}>Error</Text>
                        </View>
                        <View style={styles.modalInfoWrapper}>
                            <Text style={styles.modalText}>
                                Cannot change the affiliate information and
                                attempt to change the affiliation definitions at
                                the same time.
                            </Text>
                        </View>
                        <View style={styles.modalInfoWrapper}>
                            <Text style={styles.modalText}>
                                Please correct your settings, or press the reset
                                button to back out changes.
                            </Text>
                        </View>
                        <View style={styles.modalButtonContainer}>
                            <View style={styles.modalButton}>
                                <CustomButton
                                    title='Reset'
                                    graphic={null}
                                    cbStyles={{
                                        backgroundColor: Colors.success,
                                        color: 'white',
                                    }}
                                    txtColor='white'
                                    onPress={() => handleErrorReset()}
                                />
                            </View>
                            <View style={styles.modalButton}>
                                <CustomButton
                                    title='Dismiss'
                                    graphic={null}
                                    cbStyles={{
                                        backgroundColor: Colors.gray35,
                                        color: 'black',
                                    }}
                                    txtColor='white'
                                    onPress={() =>
                                        setShowUnsupportedChange(false)
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </Surface>
            </Modal>
            <Modal visible={showUnsupportedChange} animationStyle='slide'>
                <Surface style={styles.modalSurface}>
                    <View>
                        <View style={{ marginTop: 5, alignItems: 'center' }}>
                            <Text style={styles.modalTitle}>Error</Text>
                        </View>
                        <View style={styles.modalInfoWrapper}>
                            <Text style={styles.modalText}>
                                Cannot make change at this time, please try
                                again later. Or contact support.
                            </Text>
                        </View>
                        <View style={styles.modalButtonContainer}>
                            <View style={styles.modalButton}>
                                <CustomButton
                                    title='Dismiss'
                                    graphic={null}
                                    cbStyles={{
                                        backgroundColor: Colors.gray35,
                                        color: 'black',
                                    }}
                                    txtColor='white'
                                    onPress={() => showCantChangeModal(false)}
                                />
                            </View>
                        </View>
                    </View>
                </Surface>
            </Modal>
            <PersonalHeader firstName={fName} lastName={lName} />
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
                                        street: user?.residence?.street
                                            ? user.residence.street
                                            : '',
                                        city: user?.residence?.city
                                            ? user.residence.city
                                            : '',
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
                                        affiliateStateProv: user?.affiliate
                                            ?.stateProv
                                            ? user.affiliate.stateProv
                                            : '',
                                    }}
                                    validationSchema={profileSchema}
                                    onSubmit={async (values, actions) => {
                                        handleSubmit(values, actions);
                                    }}
                                >
                                    {(formikProps) => (
                                        <>
                                            {/* <View style={styles.formHeader}>
                                            <Headline>
                                                Your Profile Information
                                            </Headline>
                                        </View> */}
                                            <Surface
                                                style={{ marginHorizontal: 0 }}
                                            >
                                                <List.Section>
                                                    <List.Accordion
                                                        title='Contact Information'
                                                        expanded={
                                                            contactAccordionIsOpen
                                                        }
                                                        style={[
                                                            styles.accordionHeader,
                                                            {
                                                                backgroundColor:
                                                                    colors.secondary,
                                                            },
                                                        ]}
                                                        titleStyle={{
                                                            color: colors.primary,
                                                            fontSize: 18,
                                                            fontWeight: '400',
                                                            letterSpacing: 0.5,
                                                        }}
                                                        onPress={
                                                            handleAccordPress
                                                        }
                                                        right={(props) => (
                                                            <Ionicons
                                                                name={
                                                                    contactAccordionIsOpen
                                                                        ? 'chevron-down-sharp'
                                                                        : 'chevron-up-sharp'
                                                                }
                                                                color={'black'}
                                                                size={24}
                                                            />
                                                        )}
                                                    >
                                                        <Surface
                                                            style={
                                                                styles.personalSurface
                                                            }
                                                        >
                                                            <View
                                                                style={
                                                                    styles.inputContainer
                                                                }
                                                            >
                                                                <View>
                                                                    <View
                                                                        style={
                                                                            styles.labelContainer
                                                                        }
                                                                    >
                                                                        <Text
                                                                            style={
                                                                                styles.labelText
                                                                            }
                                                                        >
                                                                            First
                                                                            Name
                                                                        </Text>
                                                                    </View>
                                                                    <TextInput
                                                                        style={
                                                                            styles.input
                                                                        }
                                                                        placeholder='First Name'
                                                                        autocomplete='off'
                                                                        onChangeText={formikProps.handleChange(
                                                                            'firstName'
                                                                        )}
                                                                        value={
                                                                            formikProps
                                                                                .values
                                                                                .firstName
                                                                        }
                                                                        onBlur={formikProps.handleBlur(
                                                                            'firstName'
                                                                        )}
                                                                    />
                                                                    {formikProps
                                                                        .errors
                                                                        .firstName &&
                                                                    formikProps
                                                                        .touched
                                                                        .firstName ? (
                                                                        <Text
                                                                            style={
                                                                                styles.errorText
                                                                            }
                                                                        >
                                                                            {formikProps
                                                                                .touched
                                                                                .firstName &&
                                                                                formikProps
                                                                                    .errors
                                                                                    .firstName}
                                                                        </Text>
                                                                    ) : null}
                                                                    <View
                                                                        style={
                                                                            styles.labelContainer
                                                                        }
                                                                    >
                                                                        <Text
                                                                            style={
                                                                                styles.labelText
                                                                            }
                                                                        >
                                                                            Last
                                                                            Name
                                                                        </Text>
                                                                    </View>
                                                                    <TextInput
                                                                        style={
                                                                            styles.input
                                                                        }
                                                                        placeholder='Last Name'
                                                                        autocomplete='off'
                                                                        onChangeText={formikProps.handleChange(
                                                                            'lastName'
                                                                        )}
                                                                        value={
                                                                            formikProps
                                                                                .values
                                                                                .lastName
                                                                        }
                                                                        onBlur={formikProps.handleBlur(
                                                                            'lastName'
                                                                        )}
                                                                    />
                                                                    {formikProps
                                                                        .errors
                                                                        .lastName &&
                                                                    formikProps
                                                                        .touched
                                                                        .lastName ? (
                                                                        <Text
                                                                            style={
                                                                                styles.errorText
                                                                            }
                                                                        >
                                                                            {formikProps
                                                                                .touched
                                                                                .lastName &&
                                                                                formikProps
                                                                                    .errors
                                                                                    .lastName}
                                                                        </Text>
                                                                    ) : null}
                                                                    <View
                                                                        style={
                                                                            styles.labelContainer
                                                                        }
                                                                    >
                                                                        <Text
                                                                            style={
                                                                                styles.labelText
                                                                            }
                                                                        >
                                                                            Email
                                                                        </Text>
                                                                    </View>
                                                                    <TextInput
                                                                        style={
                                                                            styles.input
                                                                        }
                                                                        placeholder='Email'
                                                                        autocomplete='off'
                                                                        onChangeText={formikProps.handleChange(
                                                                            'email'
                                                                        )}
                                                                        value={
                                                                            formikProps
                                                                                .values
                                                                                .email
                                                                        }
                                                                        onBlur={formikProps.handleBlur(
                                                                            'email'
                                                                        )}
                                                                    />
                                                                    {(formikProps
                                                                        .errors
                                                                        .email &&
                                                                        formikProps
                                                                            .touched
                                                                            .email) ||
                                                                    showEmailError ? (
                                                                        <Text
                                                                            style={
                                                                                styles.errorText
                                                                            }
                                                                        >
                                                                            {formikProps
                                                                                .touched
                                                                                .email &&
                                                                                formikProps
                                                                                    .errors
                                                                                    .email}
                                                                        </Text>
                                                                    ) : null}
                                                                    <View
                                                                        style={
                                                                            styles.labelContainer
                                                                        }
                                                                    >
                                                                        <Text
                                                                            style={
                                                                                styles.labelText
                                                                            }
                                                                        >
                                                                            Phone
                                                                        </Text>
                                                                    </View>
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
                                                                                    Colors.gray20,
                                                                                borderWidth: 2,
                                                                                borderRadius: 6,
                                                                                width: 280,
                                                                                alignItems:
                                                                                    'left',
                                                                            }}
                                                                            value={
                                                                                userPhone
                                                                            }
                                                                            onChange={
                                                                                setUserPhone
                                                                            }
                                                                        />
                                                                        {showPhoneError ? (
                                                                            <Text
                                                                                style={
                                                                                    styles.phoneError
                                                                                }
                                                                            >
                                                                                Please
                                                                                correct
                                                                                the
                                                                                phone
                                                                                number
                                                                            </Text>
                                                                        ) : null}
                                                                    </View>
                                                                    <View
                                                                        style={
                                                                            styles.labelContainer
                                                                        }
                                                                    >
                                                                        <Text
                                                                            style={
                                                                                styles.labelText
                                                                            }
                                                                        >
                                                                            Address
                                                                        </Text>
                                                                    </View>
                                                                    <TextInput
                                                                        style={
                                                                            styles.input
                                                                        }
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
                                                                    {formikProps
                                                                        .errors
                                                                        .street &&
                                                                    formikProps
                                                                        .touched
                                                                        .street ? (
                                                                        <Text
                                                                            style={
                                                                                styles.errorText
                                                                            }
                                                                        >
                                                                            {formikProps
                                                                                .touched
                                                                                .street &&
                                                                                formikProps
                                                                                    .errors
                                                                                    .street}
                                                                        </Text>
                                                                    ) : null}
                                                                    <View
                                                                        style={
                                                                            styles.labelContainer
                                                                        }
                                                                    >
                                                                        <Text
                                                                            style={
                                                                                styles.labelText
                                                                            }
                                                                        >
                                                                            City
                                                                        </Text>
                                                                    </View>
                                                                    <TextInput
                                                                        style={
                                                                            styles.input
                                                                        }
                                                                        placeholder='City'
                                                                        onChangeText={formikProps.handleChange(
                                                                            'city'
                                                                        )}
                                                                        value={
                                                                            formikProps
                                                                                .values
                                                                                .city
                                                                        }
                                                                        onBlur={formikProps.handleBlur(
                                                                            'city'
                                                                        )}
                                                                    />
                                                                    {formikProps
                                                                        .errors
                                                                        .city &&
                                                                    formikProps
                                                                        .touched
                                                                        .city ? (
                                                                        <Text
                                                                            style={
                                                                                styles.errorText
                                                                            }
                                                                        >
                                                                            {formikProps
                                                                                .touched
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
                                                                                    <View
                                                                                        style={
                                                                                            styles.labelContainer
                                                                                        }
                                                                                    >
                                                                                        <Text
                                                                                            style={
                                                                                                styles.labelText
                                                                                            }
                                                                                        >
                                                                                            State
                                                                                        </Text>
                                                                                    </View>
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
                                                                                    <View
                                                                                        style={
                                                                                            styles.labelContainer
                                                                                        }
                                                                                    >
                                                                                        <Text
                                                                                            style={
                                                                                                styles.labelText
                                                                                            }
                                                                                        >
                                                                                            Postal
                                                                                            Code
                                                                                        </Text>
                                                                                    </View>
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
                                                            <FAB
                                                                icon='check'
                                                                style={
                                                                    styles.FAB
                                                                }
                                                                onPress={
                                                                    formikProps.handleSubmit
                                                                }
                                                            />
                                                        </Surface>
                                                    </List.Accordion>
                                                </List.Section>
                                                <List.Section>
                                                    <List.Accordion
                                                        title={`${capitalize(
                                                            feo.affiliate.label
                                                        )} Information`}
                                                        expanded={
                                                            affiliationAccordionIsOpen
                                                        }
                                                        style={[
                                                            styles.accordionHeader,
                                                            {
                                                                backgroundColor:
                                                                    colors.secondary,
                                                            },
                                                        ]}
                                                        titleStyle={{
                                                            color: colors.primary,
                                                            fontSize: 18,
                                                            fontWeight: '400',
                                                            letterSpacing: 0.5,
                                                        }}
                                                        onPress={
                                                            handleAffiliationPress
                                                        }
                                                        right={(props) => (
                                                            <Ionicons
                                                                name={
                                                                    affiliationAccordionIsOpen
                                                                        ? 'chevron-down-sharp'
                                                                        : 'chevron-up-sharp'
                                                                }
                                                                color={'black'}
                                                                size={24}
                                                            />
                                                        )}
                                                    >
                                                        <Surface
                                                            style={
                                                                styles.affiliateSurfaceContainer
                                                            }
                                                        >
                                                            <View
                                                                style={
                                                                    styles.inputContainer
                                                                }
                                                            >
                                                                <View
                                                                    style={
                                                                        styles.labelContainer
                                                                    }
                                                                >
                                                                    <Text
                                                                        style={
                                                                            styles.labelText
                                                                        }
                                                                    >
                                                                        {capitalize(
                                                                            feo
                                                                                .affiliate
                                                                                .label
                                                                        ) + ' '}
                                                                        Name
                                                                    </Text>
                                                                </View>
                                                                <TextInput
                                                                    style={
                                                                        styles.input
                                                                    }
                                                                    placeholder={`${capitalize(
                                                                        feo
                                                                            .affiliate
                                                                            .label
                                                                    )} Name`}
                                                                    onChangeText={formikProps.handleChange(
                                                                        'affiliateName'
                                                                    )}
                                                                    value={
                                                                        formikProps
                                                                            .values
                                                                            .affiliateName
                                                                    }
                                                                    onBlur={formikProps.handleBlur(
                                                                        'affiliateName'
                                                                    )}
                                                                />
                                                                {formikProps
                                                                    .errors
                                                                    .affiliateName &&
                                                                formikProps
                                                                    .touched
                                                                    .affiliateName ? (
                                                                    <Text
                                                                        style={
                                                                            styles.errorText
                                                                        }
                                                                    >
                                                                        {formikProps
                                                                            .touched
                                                                            .affiliateName &&
                                                                            formikProps
                                                                                .errors
                                                                                .affiliateName}
                                                                    </Text>
                                                                ) : null}
                                                                <View
                                                                    style={
                                                                        styles.labelContainer
                                                                    }
                                                                >
                                                                    <Text
                                                                        style={
                                                                            styles.labelText
                                                                        }
                                                                    >
                                                                        City
                                                                    </Text>
                                                                </View>
                                                                <TextInput
                                                                    style={
                                                                        styles.input
                                                                    }
                                                                    placeholder='City'
                                                                    onChangeText={formikProps.handleChange(
                                                                        'affiliateCity'
                                                                    )}
                                                                    value={
                                                                        formikProps
                                                                            .values
                                                                            .affiliateCity
                                                                    }
                                                                    onBlur={formikProps.handleBlur(
                                                                        'affiliateCity'
                                                                    )}
                                                                />
                                                                {formikProps
                                                                    .errors
                                                                    .affiliateCity &&
                                                                formikProps
                                                                    .touched
                                                                    .affiliateCity ? (
                                                                    <Text
                                                                        style={
                                                                            styles.errorText
                                                                        }
                                                                    >
                                                                        {formikProps
                                                                            .touched
                                                                            .affiliateCity &&
                                                                            formikProps
                                                                                .errors
                                                                                .affiliateCity}
                                                                    </Text>
                                                                ) : null}
                                                                <View
                                                                    style={
                                                                        styles.labelContainer
                                                                    }
                                                                >
                                                                    <Text
                                                                        style={
                                                                            styles.labelText
                                                                        }
                                                                    >
                                                                        State
                                                                    </Text>
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
                                                                        formikProps
                                                                            .values
                                                                            .affiliateStateProv
                                                                    }
                                                                    onBlur={formikProps.handleBlur(
                                                                        'affiliateStateProv'
                                                                    )}
                                                                />

                                                                {formikProps
                                                                    .errors
                                                                    .affiliateStateProv &&
                                                                formikProps
                                                                    .touched
                                                                    .affiliateStateProv ? (
                                                                    <Text
                                                                        style={
                                                                            styles.errorText
                                                                        }
                                                                    >
                                                                        {formikProps
                                                                            .touched
                                                                            .affiliateStateProv &&
                                                                            formikProps
                                                                                .errors
                                                                                .affiliateStateProv}
                                                                    </Text>
                                                                ) : null}
                                                            </View>
                                                            <FAB
                                                                icon='check'
                                                                style={
                                                                    styles.FAB
                                                                }
                                                                onPress={
                                                                    formikProps.handleSubmit
                                                                }
                                                            />
                                                        </Surface>
                                                    </List.Accordion>
                                                </List.Section>
                                                {user?.affiliations.options
                                                    .length > 1 && (
                                                    <List.Section>
                                                        <List.Accordion
                                                            title='Affiliation Information'
                                                            expanded={
                                                                affiliationsAccordionIsOpen
                                                            }
                                                            style={[
                                                                styles.accordionHeader,
                                                                {
                                                                    backgroundColor:
                                                                        colors.secondary,
                                                                },
                                                            ]}
                                                            titleStyle={{
                                                                color: colors.primary,
                                                                fontSize: 18,
                                                                fontWeight:
                                                                    '400',
                                                                letterSpacing: 0.5,
                                                            }}
                                                            onPress={
                                                                handleAffiliationsPress
                                                            }
                                                            right={(props) => (
                                                                <Ionicons
                                                                    name={
                                                                        affiliationsAccordionIsOpen
                                                                            ? 'chevron-down-sharp'
                                                                            : 'chevron-up-sharp'
                                                                    }
                                                                    color={
                                                                        'black'
                                                                    }
                                                                    size={24}
                                                                />
                                                            )}
                                                        >
                                                            <Surface
                                                                style={
                                                                    styles.affiliatesSurfaceContainer
                                                                }
                                                            >
                                                                <View
                                                                    style={
                                                                        styles.instructionWrapper
                                                                    }
                                                                >
                                                                    <Text
                                                                        style={
                                                                            styles.instructionText
                                                                        }
                                                                    >
                                                                        Select
                                                                        one of
                                                                        your
                                                                        affilates.
                                                                    </Text>
                                                                </View>
                                                                <View
                                                                    style={
                                                                        styles.dropdownContainer
                                                                    }
                                                                >
                                                                    <DropDown
                                                                        label={
                                                                            'Affiliation'
                                                                        }
                                                                        mode={
                                                                            'outlined'
                                                                        }
                                                                        visible={
                                                                            showDropDown
                                                                        }
                                                                        showDropDown={() =>
                                                                            setShowDropDown(
                                                                                true
                                                                            )
                                                                        }
                                                                        onDismiss={() =>
                                                                            setShowDropDown(
                                                                                false
                                                                            )
                                                                        }
                                                                        value={
                                                                            affiliationSelected
                                                                        }
                                                                        setValue={
                                                                            setAffiliationSelected
                                                                        }
                                                                        list={
                                                                            user
                                                                                .affiliations
                                                                                .options
                                                                        }
                                                                    />
                                                                </View>
                                                                <FAB
                                                                    icon='check'
                                                                    style={
                                                                        styles.FABAffiliationChange
                                                                    }
                                                                    onPress={
                                                                        formikProps.handleSubmit
                                                                    }
                                                                />
                                                            </Surface>
                                                        </List.Accordion>
                                                    </List.Section>
                                                )}
                                                {/* <View
                                                    style={
                                                        styles.buttonContainer
                                                    }
                                                >
                                                    <CustomButton
                                                        title='Update'
                                                        graphic=''
                                                        cbStyles={{
                                                            backgroundColor:
                                                                'green',
                                                            color: 'white',
                                                            width: '50%',
                                                        }}
                                                        onPress={
                                                            formikProps.handleSubmit
                                                        }
                                                    />
                                                </View> */}
                                            </Surface>
                                        </>
                                    )}
                                    {/* this ends the formik execution */}
                                </Formik>
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </View>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={onDismissSnackBar}
                style={{ backgroundColor: 'green' }}
                action={{
                    label: 'OK',
                    onPress: () => {
                        // Do something
                    },
                }}
            >
                Profile information saved.
            </Snackbar>
        </>
    );
};
export default withTheme(ProfileForm);
const styles = StyleSheet.create({
    formHeader: {
        marginVertical: 10,
        alignItems: 'center',
    },
    FAB: {
        position: 'absolute',
        marginRight: 16,
        right: 0,
        bottom: 0,
        backgroundColor: 'green',
    },
    FABAffiliationChange: {
        position: 'absolute',
        marginRight: 16,
        // top: 100,
        right: 0,
        bottom: 10,
        backgroundColor: 'green',
    },
    personalSurface: {
        padding: 5,
        marginHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
        marginTop: 10,

        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    accordionHeader: {
        borderRadius: 10,
        marginHorizontal: 5,
    },
    inputContainer: {
        marginLeft: '10%',
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
    affiliateSurfaceContainer: {
        padding: 5,
        marginHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    affiliatesSurfaceContainer: {
        padding: 5,
        marginHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 75,
        marginBottom: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    affiliateTitle: {
        textAlign: 'center',
        fontSize: 24,
    },
    instructionWrapper: {
        marginVertical: 10,
    },
    instructionText: {
        fontSize: 18,
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
    modalContainer: {
        marginTop: 50,
        // alignSelf: 'flex-end',
    },
    modalSurface: {
        marginTop: 80,
        marginHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },

    modalTitle: {
        marginTop: 15,
        fontSize: 30,
        fontWeight: 'bold',
    },
    modalInfoWrapper: {
        marginTop: 15,
        paddingHorizontal: 20,
        width: '100%',
    },
    modalText: {
        fontSize: 24,
        textAlign: 'center',
        letterSpacing: 0.7,
    },
    modalButtonContainer: {
        marginVertical: 20,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalButtonWrapper: { flexDirection: 'row' },
    modalButton: {
        paddingHorizontal: 10,
    },
});
