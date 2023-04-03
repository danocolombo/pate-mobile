import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FAB,
    TouchableOpacity,
} from 'react-native';
import { Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from 'react-native-paper-dropdown';
import { STATELABELVALUES } from '../../constants/pate';
import { printObject, capitalize } from '../../utils/helpers';
const Membership = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.users.currentUser);
    const [showStateProvDropdown, setShowStateProvDropdown] = useState(false);
    const [membershipId, setMembershipId] = useState();
    const [membershipName, setMembershipName] = useState();
    const [membershipNameError, setMembershipNameError] = useState();
    const [membershipStreet, setMembershipStreet] = useState();
    const [membershipStreetError, setMembershipStreetError] = useState();

    const [membershipCity, setMembershipCity] = useState();
    const [membershipCityError, setMembershipCityError] = useState();
    const [membershipStateProv, setMembershipStateProv] = useState();
    const [membershipStateProvError, setMembershipStateProvError] = useState();
    const [membershipPostalCode, setMembershipPostalCode] = useState();
    const [membershipPostalCodeError, setMembershipPostalCodeError] =
        useState();
    const [formChanged, setFormChanged] = useState();

    useLayoutEffect(() => {
        printObject('M:15==>currentUser:\n', currentUser);
        if (currentUser?.memberships?.items.length > 0) {
            //we have memberships, see if there are any for the current division
            const membership = currentUser.memberships.items.find((m) => {
                return m.division.id === currentUser.defaultDivision.id;
            });
            setMembershipId(membership.id);
            setMembershipName(membership?.name || '');
            setMembershipStreet(membership?.street || '');
            setMembershipCity(membership?.city || '');
            setMembershipStateProv(membership?.stateProv || '');
            setMembershipPostalCode(membership?.postalCode || '');
        }
    }, []);

    const handleMembershipNameChange = (value) => {
        setMembershipName(value);
    };
    const handleMembershipStreetChange = (value) => {
        setMembershipStreet(value);
    };
    const handleStateProvChange = (stateProv) => {
        //const newResidence = { ...residence, stateProv: stateProv };
        //setResidence(newResidence);
        setMembershipStateProv(stateProv);
    };
    const validateMembershipStreet = (street) => {
        // 2-50 chars, apostrophe with alpha permitted
        const testRegex =
            /^(?=.{2,50}$)(?!')[A-Za-z0-9' -]+(?:[ .,!?][A-Za-z0-9' -]+)*\.?$/;
        if (!testRegex.test(street)) {
            return '2-50 characters (optional)';
        } else {
            return '';
        }
    };
    const validateMembershipName = (value) => {
        if (value.length > 25) {
            return 'max length 25 characters';
        }
        if (value.length > 0 && value.length < 3) {
            return 'minimum length 3 characters';
        }
        if (value.length > 2) {
            const testRegex = /^[a-zA-Z\s-]{5,50}\d?$/;
            if (!testRegex.test(value)) {
                return 'letters and numbers only';
            }
        }
        return '';
    };
    const validateMembershipPostalCode = (value) => {
        const regex = /^\d{5}$/; // regex for 5 digit number
        if (regex.test(value)) {
            return '';
        } else {
            return 'Five digit number only';
        }
        return '';
    };

    const handleSubmit = () => {
        console.log('M:29==>handleSubmit');
    };
    return (
        <>
            <Surface style={styles.affiliateSurfaceContainer}>
                <View style={styles.inputContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>
                            {capitalize(
                                currentUser?.affiliations?.active
                                    ?.organizationLabel
                            ) + ' '}
                            Name
                        </Text>
                    </View>
                    <TextInput
                        label='Name'
                        placeholder='Location Name'
                        autoCapitalize='words'
                        autoCorrect={false}
                        type='text'
                        required
                        size='small'
                        style={styles.input}
                        onChange={(e) => {
                            const inputText = e.nativeEvent.text;
                            setMembershipName(inputText);
                            setMembershipNameError(
                                validateMembershipName(inputText)
                            );
                        }}
                        value={membershipName}
                        error={membershipNameError !== ''}
                        helperText={membershipNameError}
                    />
                    {membershipNameError && (
                        <View
                            style={{
                                color: 'red',
                                fontSize: 12,
                                fontWeight: 'bold',
                            }}
                        >
                            <Text>{membershipNameError}</Text>
                        </View>
                    )}

                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>Street</Text>
                    </View>
                    <TextInput
                        label='Street'
                        placeholder='Street'
                        autoCapitalize='words'
                        autoCorrect={false}
                        type='text'
                        required
                        size='small'
                        style={styles.input}
                        onChange={(e) => {
                            const textInput = e.nativeEvent.text;
                            setMembershipStreet(textInput);
                            setMembershipStreetError(
                                validateMembershipStreet(textInput)
                            );
                        }}
                        value={membershipStreet}
                        error={membershipStreetError !== ''}
                        helperText={membershipStreetError}
                    />
                    {membershipStreetError && (
                        <View
                            style={{
                                color: 'red',
                                fontSize: 12,
                                fontWeight: 'bold',
                            }}
                        >
                            <Text>{membershipStreetError}</Text>
                        </View>
                    )}

                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>City</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder='City'
                        // onChangeText={formikProps.handleChange('affiliateCity')}
                        value={membershipCity}
                        // onBlur={formikProps.handleBlur('affiliateCity')}
                    />
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>State</Text>
                    </View>
                    <View style={{ maxWidth: '85%' }}>
                        <DropDown
                            //label={'State'}
                            mode={'outlined'}
                            visible={showStateProvDropdown}
                            showDropDown={() => setShowStateProvDropdown(true)}
                            onDismiss={() => setShowStateProvDropdown(false)}
                            value={membershipStateProv}
                            setValue={handleStateProvChange}
                            list={STATELABELVALUES}
                            inputProps={{
                                backgroundColor: 'white',
                                fontSize: '22',
                                margin: 1,
                                padding: 1,
                            }}
                            dropDownStyle={{ fontSize: '22' }}
                            dropDownItemSelectedTextStyle={{
                                //backgroundColor: 'green',
                                fontWeight: 'bold',
                                color: 'black',
                                margin: 0,
                                padding: 0,
                            }}
                            dropDownItemSelectedStyle={{
                                backgroundColor: 'lightgreen',
                                color: 'black',
                            }}
                            dropDownItemStyle={{
                                backgroundColor: 'lightgrey',
                            }}
                            dropDownItemTextStyle={{ color: 'black' }}
                        />
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>Postal Code</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder='Postal Code'
                        onChange={(e) => {
                            const textInput = e.nativeEvent.text;
                            setMembershipPostalCode(textInput);
                            setMembershipPostalCodeError(
                                validateMembershipPostalCode(textInput)
                            );
                        }}
                        value={membershipPostalCode}
                        // onBlur={formikProps.handleBlur('affiliateCity')}
                    />
                </View>
                {/* <FAB icon='check' style={styles.FAB} onPress={handleSubmit} /> */}
            </Surface>
        </>
    );
};

export default Membership;
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
