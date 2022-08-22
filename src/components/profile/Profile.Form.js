import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';
import { List, Surface, withTheme, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from 'react-native-paper-dropdown';
import PhoneInput from '../ui/PhoneInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomButton from '../ui/CustomButton';
import { updateCurrentUser } from '../../features/users/usersSlice';
import {
    updateRegion,
    updateEventRegion,
    updateAffiliate,
    updateAffiliateTitle,
    updateStateProv,
    updateAffiliation,
} from '../../features/system/systemSlice';
import PersonalHeader from './personalHeader';
import { updateProfile } from '../../providers/users';
import { getAffiliate } from '../../providers/system';
import { Colors } from '../../constants/colors';
import {
    printObject,
    capitalize,
    getPhoneType,
    createPatePhone,
} from '../../utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import { select } from '@react-native-material/core';

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
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [contactAccordionIsOpen, setContactAccordionIsOpen] = useState(false);
    const [affiliationAccordionIsOpen, setAffiliationAccordionIsOpen] =
        useState(false);
    const [affiliationsAccordionIsOpen, setAffiliationsAccordionIsOpen] =
        useState(false);
    const { colors } = props.theme;
    const dispatch = useDispatch();
    const originalUser = useSelector((state) => state.users.currentUser);
    let user = useSelector((state) => state.users.currentUser);
    const [affiliationSelected, setAffiliationSelected] = useState(
        user?.affiliations?.active.value
    );
    //-------------------------------------------
    // need to create affiliate dropdown data
    //-------------------------------------------
    // const definedAffiliationList = user?.affiliations?.options.map((a) => {
    //     return {
    //         label: a,
    //         value: a,
    //     };
    // });
    let feo = useSelector((state) => state.system);

    const onDismissSnackBar = () => setSnackbarVisible(false);
    const [showPhoneError, setShowPhoneError] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
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
        // printObject('PF:136------------------>original:', originalUser);
        if (affiliationSelected !== originalUser.affiliations.active.value) {
            //    get the label of the affiliation selected
            let selectedReference = originalUser.affiliations.options.filter(
                (a) => a.value === affiliationSelected
            );

            let activeData = {
                value: selectedReference[0].value,
                label: selectedReference[0].label,
            };

            let updatedAffiliateData = {
                options: originalUser.affiliations.options,
                active: activeData,
            };

            values.affiliations = updatedAffiliateData;
            // printObject('PF:156______values', values);
            let newAffiliateInfo = originalUser.userAffiliates.filter(
                (a) => a.value === affiliationSelected
            );
            values.affiliate = newAffiliateInfo[0];
        }
        // printObject('PF:156=======>values:', values);
        console.log('\n\n');
        //   UPDATE REDUX SYSTEM
        getAffiliate(affiliationSelected).then((response) => {
            dispatch(updateAffiliate(response.body[0]));
        });
        dispatch(updateRegion(originalUser.region));
        dispatch(updateStateProv(originalUser.residence.stateProv));
        dispatch(updateAffiliation(affiliationSelected));

        //   UPDATE REDUX CURRENTUSER
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
            affiliations: originalUser.affiliations,
            userAffiliates: originalUser.userAffiliates,
            isLoggedIn: true,
        };
        //   check the updates to affilations
        if (affiliationSelected != originalUser.affiliations.active.value) {
            //    get the label of the affiliation selected
            let selectedReference = originalUser.affiliations.options.filter(
                (a) => a.value === affiliationSelected
            );
            let activeValues = {
                value: selectedReference[0].value,
                label: selectedReference[0].labelContainer,
            };
            let updatedAffiliateData = {
                options: originalUser.affiliations.options,
                active: activeValues,
            };
            dbProfile = {
                ...dbProfile,
                affiliations: updatedAffiliateData,
            };
        } else {
            // console.log('PF:165-->same, no need to update');
            dbProfile = {
                ...dbProfile,
                affiliations: originalUser.affiliations,
            };
        }
        if (originalUser?.stateRep) {
            // now conditionally add the rep and lead info if applicable
            dbProfile = { ...dbProfile, stateRep: originalUser.stateRep };
            dbProfile = { ...dbProfile, profile: originalUser.profile };
        }
        if (originalUser?.stateLead) {
            dbProfile = { ...dbProfile, stateLead: originalUser.stateLead };
            dbProfile = { ...dbProfile, profile: originalUser.profile };
        }
        dbProfile = { ...dbProfile, username: originalUser.username };
        dbProfile = { ...dbProfile, role: originalUser.role };
        dbProfile = { ...dbProfile, region: originalUser.region };
        // printObject('PF:156-->originalUser', originalUser);
        // printObject('PF:157-->dbProfile', dbProfile);

        updateProfile(dbProfile)
            .then((response) => {
                setSnackbarVisible(true);
            })
            .catch((err) =>
                console.log('error saving profile to database\n', err)
            );
        return;
    };
    const handleAffiliationsSelectClick = () => {
        console.log('PF:187-->affiliationSelected:', affiliationSelected);
    };
    // const dispatch = useDispatch();
    return (
        <>
            <PersonalHeader user={user} />
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
                                        handleSubmit(values);
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
                                                                    {formikProps
                                                                        .errors
                                                                        .email &&
                                                                    formikProps
                                                                        .touched
                                                                        .email ? (
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
                                                            </Surface>
                                                        </List.Accordion>
                                                    </List.Section>
                                                )}
                                                <View
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
                                                </View>
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
        paddingVertical: 10,
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
});
