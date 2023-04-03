import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    ScrollView,
    Pressable,
    Modal,
    Platform,
} from 'react-native';
import {
    List,
    Surface,
    Button,
    withTheme,
    Snackbar,
    FAB,
} from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from 'expo-checkbox';
import { FontAwesome5 } from '@expo/vector-icons';
import DropDown from 'react-native-paper-dropdown';
// import PhoneInput from '../ui/PhoneInput';
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
import PhoneInput from '../ui/PhoneInput';
import Affiliations from './Affiliations';
import Membership from './Membership';
import UserSection from './User';
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
import { setMilliseconds } from 'date-fns';

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
    const [membershipAccordionIsOpen, setMembershipAccordionIsOpen] =
        useState(false);

    const [affiliationsAccordionIsOpen, setAffiliationsAccordionIsOpen] =
        useState(false);
    const { colors } = props.theme;
    const dispatch = useDispatch();
    const feo = useSelector((state) => state.division);
    const originalUser = useSelector((state) => state.users.currentUser);
    let user = useSelector((state) => state.users.currentUser);
    const [hasProfileChanged, setHasProfileChanged] = useState(false);
    const [affiliationSelected, setAffiliationSelected] = useState(
        user?.affiliations?.active.organizationName
    );

    const onDismissSnackBar = () => setSnackbarVisible(false);
    useEffect(() => {
        console.log('Screen moved to stack');

        return () => {
            console.log('Screen removed from stack');
        };
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            console.log('Screen focused');

            return () => {
                console.log('Screen unfocused');
                setContactAccordionIsOpen(false);
                setMembershipAccordionIsOpen(false);
                setAffiliationSelected(false);
            };
        }, [])
    );
    useLayoutEffect(() => {
        setContactAccordionIsOpen(false);
        setMembershipAccordionIsOpen(false);
        setAffiliationsAccordionIsOpen(false);
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.appName,
        });
    }, [navigation, feo]);

    let rally;
    const handleContactAccordPress = () => {
        setContactAccordionIsOpen(!contactAccordionIsOpen);
        setMembershipAccordionIsOpen(false);
        setAffiliationsAccordionIsOpen(false);
    };
    const handleMembershipAccordPress = () => {
        setContactAccordionIsOpen(false);
        setMembershipAccordionIsOpen(!membershipAccordionIsOpen);
        setAffiliationsAccordionIsOpen(false);
    };
    const handleAffiliationsAccordPress = () => {
        setContactAccordionIsOpen(false);
        setMembershipAccordionIsOpen(false);
        setAffiliationsAccordionIsOpen(!affiliationsAccordionIsOpen);
    };

    const handleErrorReset = () => {
        setAffiliationSelected(originalUser.affiliations.active.value);
        // values.affiliateName = originalUser.affiliate.name;
        // values.affiliateCity = originalUser.affiliate.city;
        // values.affiliateStateProv = originalUser.affiliate.stateProv;
        setShowUnsupportedChange(false);
    };

    const handleDeleteRequest = () => {
        console.log('PF:461--> DELETE REQUESTED');
        navigation.navigate('DeleteAccount', null);
        return;
    };
    const checkSegregation = () => {
        setRegistrationSegregation(!registrationSegregation);
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
                                this same time.
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

            <View style={{ flex: 1 }}>
                <ScrollView>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <ScrollView>
                                <Surface style={{ marginHorizontal: 0 }}>
                                    <List.Section>
                                        <List.Accordion
                                            title='Contact Information'
                                            expanded={contactAccordionIsOpen}
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
                                            onPress={handleContactAccordPress}
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
                                            <UserSection />
                                        </List.Accordion>
                                    </List.Section>

                                    <List.Section>
                                        <List.Accordion
                                            title={`${capitalize(
                                                originalUser?.affiliations
                                                    ?.active
                                                    ?.organizationLabel ||
                                                    'Member'
                                            )} Information`}
                                            expanded={membershipAccordionIsOpen}
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
                                                handleMembershipAccordPress
                                            }
                                            right={(props) => (
                                                <Ionicons
                                                    name={
                                                        affiliationsAccordionIsOpen
                                                            ? 'chevron-down-sharp'
                                                            : 'chevron-up-sharp'
                                                    }
                                                    color={'black'}
                                                    size={24}
                                                />
                                            )}
                                        >
                                            <Membership
                                                profile={user}
                                                // colors={colors}
                                            />
                                        </List.Accordion>
                                    </List.Section>

                                    {user?.affiliations?.items.length && (
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
                                                    fontWeight: '400',
                                                    letterSpacing: 0.5,
                                                }}
                                                onPress={
                                                    handleAffiliationsAccordPress
                                                }
                                                right={(props) => (
                                                    <Ionicons
                                                        name={
                                                            affiliationsAccordionIsOpen
                                                                ? 'chevron-down-sharp'
                                                                : 'chevron-up-sharp'
                                                        }
                                                        color={'black'}
                                                        size={24}
                                                    />
                                                )}
                                            >
                                                <Affiliations
                                                    affiliations={
                                                        user.affiliations
                                                    }
                                                    colors={colors}
                                                />
                                            </List.Accordion>
                                        </List.Section>
                                    )}
                                </Surface>
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </View>
            <View style={{ marginHorizontal: 10, alignItems: 'center' }}>
                <TouchableOpacity
                    key={1}
                    onPress={() => navigation.navigate('DeleteAccount', null)}
                    style={({ pressed }) => pressed && styles.pressed}
                >
                    <CustomButton
                        title='DELETE ACCOUNT'
                        graphic={null}
                        cbStyles={{
                            backgroundColor: Colors.critical,
                            width: '80%',
                            paddingVertical: 3,
                            color: 'white',
                        }}
                        txtColor='white'
                        onPress={() => handleDeleteRequest()}
                    />
                </TouchableOpacity>
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
    segregateRow: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    segregateTextWrapper: { paddingHorizontal: 5 },
    segregateText: { fontSize: 18 },
    segregateCheckboxWrapper: {},
    segregationTipWrapper: { marginLeft: 10 },
});
