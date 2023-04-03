import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Surface, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { printObject } from '../../utils/helpers';
import DropDown from 'react-native-paper-dropdown';
import { STATELABELVALUES } from '../../constants/pate';

const UserSection = (affiliations, colors) => {
    const currentUser = useSelector((state) => state.users.currentUser);
    const [affiliationAccordionIsOpen, setAffiliationAccordionIsOpen] =
        useState(false);
    const [showStateProvDropdown, setShowStateProvDropdown] = useState(false);
    const [residence, setResidence] = useState({
        id: '0',
        street: '',
        city: '',
        stateProv: 'AL',
        postalCode: '',
    });
    useLayoutEffect(() => {
        if (currentUser?.residence) {
            setResidence({
                ...residence,
                id: currentUser?.residence?.id || '',
                street: currentUser?.residence?.street || '',
                city: currentUser?.residence?.city || '',
                stateProv: currentUser?.residence?.stateProv || 'GA',
                postalCode: currentUser?.residence?.postalCode.toString() || '',
            });
        }
    }, []),
        printObject('A:5-->affiliations:', affiliations);
    const handleAffiliationPress = () => {
        setAffiliationAccordionIsOpen(!affiliationAccordionIsOpen);
    };
    const setStateProv = (stateProv) => {
        const newResidence = { ...residence, stateProv: stateProv };
        setResidence(newResidence);
    };
    printObject('STATES:\n', STATELABELVALUES);
    return (
        <>
            <Surface style={styles.affiliateSurfaceContainer}>
                <View style={styles.inputContainer}>
                    <View style={{ padding: 10 }}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.labelText}>First Name</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder='First Name'
                            dense='true'
                            // onChangeText={formikProps.handleChange('affiliateCity')}
                            value={currentUser.firstName}
                            // onBlur={formikProps.handleBlur('affiliateCity')}
                        />
                        <View style={styles.labelContainer}>
                            <Text style={styles.labelText}>Last Name</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder='Last Name'
                            dense='true'
                            // onChangeText={formikProps.handleChange('affiliateCity')}
                            value={currentUser.lastName}
                            // onBlur={formikProps.handleBlur('affiliateCity')}
                        />
                        <View style={styles.labelContainer}>
                            <Text style={styles.labelText}>Street</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder='Street'
                            dense='true'
                            // onChangeText={formikProps.handleChange('affiliateCity')}
                            value={residence?.street}
                            // onBlur={formikProps.handleBlur('affiliateCity')}
                        />
                        <View style={styles.labelContainer}>
                            <Text style={styles.labelText}>City</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder='City'
                            dense='true'
                            // onChangeText={formikProps.handleChange('affiliateCity')}
                            value={residence?.city}
                            // onBlur={formikProps.handleBlur('affiliateCity')}
                        />
                        <View style={styles.labelContainer}>
                            <Text style={styles.labelText}>State</Text>
                        </View>
                        <View>
                            <DropDown
                                // label={'Gender'}
                                mode={'outlined'}
                                dense='true'
                                visible={showStateProvDropdown}
                                showDropDown={() =>
                                    setShowStateProvDropdown(true)
                                }
                                onDismiss={() =>
                                    setShowStateProvDropdown(false)
                                }
                                value={residence?.stateProv}
                                setValue={setStateProv}
                                list={STATELABELVALUES}
                            />
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={styles.labelText}>Postal Code</Text>
                        </View>
                        <TextInput
                            style={styles.inputPostalCode}
                            placeholder='Postal Code'
                            dense='true'
                            // onChangeText={formikProps.handleChange('affiliateCity')}
                            value={residence?.postalCode}
                            // onBlur={formikProps.handleBlur('affiliateCity')}
                        />
                    </View>
                </View>
            </Surface>
        </>
    );
};

export default UserSection;
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
    inputA: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 1,
        marginTop: 1,
        fontSize: 18,
        borderRadius: 6,
        width: '90%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 0,
        marginTop: 1,
        fontSize: 18,
        borderRadius: 6,
        width: '90%',
    },
    inputStateProv: {
        width: 75,
    },
    inputPostalCode: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 0,
        marginTop: 1,
        fontSize: 18,
        borderRadius: 6,
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
