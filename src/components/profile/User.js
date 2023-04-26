import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    List,
    Surface,
    Text,
    TextInput,
    FAB,
    ActivityIndicator,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { printObject } from '../../utils/helpers';
import { FontAwesome5 } from '@expo/vector-icons';
import { updateGQLUser } from '../../providers/users';
import {
    updateGQLResidence,
    createGQLResidence,
} from '../../providers/residence.provider';
import { STATELABELVALUES } from '../../constants/pate';
import {
    updateCurrentUser,
    updateResidence,
} from '../../features/users/usersSlice';

import SimpleDropDown from '../ui/DropDown/SimpleDropDown';

const UserSection = (affiliations, colors) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.users.currentUser);
    const [isUpdating, setIsUpdating] = useState(false);
    const [firstName, setFirstName] = useState(currentUser?.firstName || '');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastName, setLastName] = useState(currentUser?.lastName || '');
    const [lastNameError, setLastNameError] = useState('');
    const [street, setStreet] = useState(currentUser?.residence?.street || '');
    const [streetError, setStreetError] = useState('');
    const [city, setCity] = useState(currentUser?.residence?.city || '');
    const [cityError, setCityError] = useState('');
    const [postalCode, setPostalCode] = useState(
        currentUser?.residence?.postalCode?.toString() || ''
    );
    const [stateProv, setStateProv] = useState(
        currentUser?.residence?.stateProv?.toString() || 'AL'
    );
    const [postalCodeError, setPostalCodeError] = useState('');
    const [canSave, setCanSave] = useState(false);
    useLayoutEffect(() => {}, []),
        useEffect(() => {
            if (
                firstName !== currentUser?.firstName ||
                lastName !== currentUser?.lastName ||
                street !== currentUser?.residence?.street ||
                city !== currentUser?.residence?.city ||
                stateProv !== currentUser?.residence?.stateProv ||
                postalCode !== currentUser?.residence?.postalCode?.toString()
            ) {
                //there is a change is the values, are there errors?
                if (
                    firstNameError ||
                    lastNameError ||
                    streetError ||
                    cityError ||
                    postalCodeError
                ) {
                    setCanSave(false);
                } else {
                    setCanSave(true);
                }
            } else {
                setCanSave(false);
            }
        }, [firstName, lastName, street, city, stateProv, postalCode]);

    const validateFirstName = (value) => {
        // 2-50 chars, apostrophe with alpha permitted
        const testRegex = /^[a-zA-Z]{2,20}$/;
        if (!testRegex.test(value)) {
            return '2-20 characters';
        } else {
            return '';
        }
    };
    const validateLastName = (value) => {
        // 2-20 chars, apostrophe with alpha permitted
        const testRegex = /^[a-zA-Z.\- ]{2,20}$/;
        if (!testRegex.test(value)) {
            return '2-20 characters';
        } else {
            return '';
        }
    };
    const validateStreet = (value) => {
        // 2-20 chars, apostrophe with alpha permitted
        const testRegex = /^[0-9a-zA-Z.\- ]{2,20}$/;
        if (!testRegex.test(value)) {
            return '2-20 characters';
        } else {
            return '';
        }
    };
    const validateCity = (value) => {
        // 2-15 chars, apostrophe with alpha permitted
        const testRegex = /^[a-zA-Z.\- ]{2,15}$/;
        if (!testRegex.test(value)) {
            return '2-15 characters';
        } else {
            return '';
        }
    };
    const validatePostalCode = (value) => {
        // string with 00000-99999
        const testRegex = /^[0-9]{5}$/;
        if (!testRegex.test(value)) {
            return '5 digits required';
        } else {
            return '';
        }
    };
    const handleSavePress = async () => {
        setIsUpdating(true);
        const DANO = true;

        //update graphQL, if successful, update redux
        try {
            //check user values
            if (
                firstName !== currentUser.firstName ||
                lastName !== currentUser.lastName
            ) {
                //update the user
                const userUpdate = {
                    id: currentUser.id,
                    firstName,
                    lastName,
                };

                const userUpdateResults = await updateGQLUser(userUpdate);
                if (!userUpdateResults?.status) {
                    console.log('Cannot update profile at this time');
                    setIsUpdating(false);
                    return;
                }
                if (userUpdateResults.status === 200) {
                    // gql updated, update redux

                    dispatch(updateCurrentUser(userUpdate));
                } else {
                    // non-200 on user update
                    console.log('Error updating User profile.Try again later.');
                    console.log({
                        status: userUpdateResults.status,
                        data: userUpdateResults.data,
                    });
                    setIsUpdating(false);

                    return;
                }
            }
            if (
                street !== currentUser?.residence?.street ||
                city !== currentUser?.residence?.city ||
                stateProv !== currentUser?.residence?.stateProv ||
                postalCode !== currentUser?.residence?.postalCode.toString()
            ) {
                if (currentUser?.residence) {
                    //update residence
                    const residenceUpdate = {
                        id: currentUser.residence.id,
                        street,
                        city,
                        stateProv,
                        postalCode,
                    };

                    const residenceUpdateResults = await updateGQLResidence(
                        residenceUpdate
                    );
                    if (!residenceUpdateResults?.status) {
                        console.log('Cannot update residence at this time');
                        setIsUpdating(false);
                        return;
                    }
                    if (residenceUpdateResults.status === 200) {
                        //residence updated...
                        dispatch(updateResidence(residenceUpdate));
                        // console.warn('Residence updated');
                    } else {
                        // non-200 on user update
                        console.log(
                            'Error updating User residence.Try again later.'
                        );
                        console.log({
                            status: residenceUpdateResults.status,
                            data: residenceUpdateResults.data,
                        });
                        setIsUpdating(false);
                        return;
                    }
                    setIsUpdating(false);
                } else {
                    //      need to insert new residence
                    let newResidence = {};
                    if (street) {
                        newResidence = { ...newResidence, street: street };
                    }
                    if (city) {
                        newResidence = { ...newResidence, city: city };
                    }
                    if (stateProv) {
                        newResidence = {
                            ...newResidence,
                            stateProv: stateProv,
                        };
                    }
                    if (postalCode) {
                        newResidence = {
                            ...newResidence,
                            postalCode: parseInt(stateProv),
                        };
                    }

                    console.log('333333333333333333333333333333333');
                    printObject('newResidence:\n', newResidence);
                    console.log('333333333333333333333333333333333');
                    const residenceCreateResults = await createGQLResidence(
                        newResidence,
                        currentUser.id
                    );
                    console.log('#########################');
                    printObject(
                        'residenceCreateResults:\n',
                        residenceCreateResults
                    );
                    console.log('#########################');
                    if (!residenceCreateResults?.status) {
                        console.log('Cannot create residence at this time');
                        setIsUpdating(false);
                        return;
                    }
                    if (residenceCreateResults.status === 200) {
                        //residence updated...
                        newResidence = {
                            ...newResidence,
                            id: residenceCreateResults.data.id,
                        };
                        dispatch(updateResidence(newResidence));
                        // console.warn('Residence updated');
                    } else {
                        // non-200 on user update
                        console.log(
                            'Error creating User residence.Try again later.'
                        );
                        console.log({
                            status: residenceCreateResults.status,
                            data: residenceCreateResults.data,
                        });
                        setIsUpdating(false);
                        return;
                    }
                    setIsUpdating(false);
                }
            }
        } catch (error) {
            window.alert('ERROR trying to update..\n', error);
        }
        setCanSave(false);
    };
    printObject('U:229-->currentUser', currentUser);
    if (isUpdating) {
        <View>
            <ActivityIndicator />
        </View>;
    }
    return (
        <>
            <Surface style={styles.affiliateSurfaceContainer}>
                <View style={styles.inputContainer}>
                    <View style={{ padding: 10 }}>
                        <TextInput
                            label='First Name'
                            placeholder='First Name'
                            autoCapitalize='words'
                            autoCorrect={false}
                            type='text'
                            required
                            size='small'
                            dense='true'
                            style={styles.input}
                            onChange={(e) => {
                                const inputText = e.nativeEvent.text;
                                setFirstName(inputText);
                                setFirstNameError(validateFirstName(inputText));
                            }}
                            value={firstName}
                            error={firstNameError !== ''}
                            helperText={firstNameError}
                        />
                        {firstNameError && (
                            <View
                                style={{
                                    color: 'red',
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                }}
                            >
                                <Text>{firstNameError}</Text>
                            </View>
                        )}
                        <TextInput
                            label='Last Name'
                            placeholder='Last Name'
                            autoCapitalize='words'
                            autoCorrect={false}
                            type='text'
                            required
                            size='small'
                            dense='true'
                            style={styles.input}
                            onChange={(e) => {
                                const inputText = e.nativeEvent.text;
                                setLastName(inputText);
                                setLastNameError(validateLastName(inputText));
                            }}
                            value={lastName}
                            error={lastNameError !== ''}
                            helperText={lastNameError}
                        />
                        {lastNameError && (
                            <View
                                style={{
                                    color: 'red',
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                }}
                            >
                                <Text>{lastNameError}</Text>
                            </View>
                        )}
                        <TextInput
                            label='Street'
                            placeholder='Street'
                            autoCapitalize='words'
                            autoCorrect={false}
                            type='text'
                            dense='true'
                            required
                            size='small'
                            style={styles.input}
                            onChange={(e) => {
                                const inputText = e.nativeEvent.text;
                                setStreet(inputText);
                                setStreetError(validateStreet(inputText));
                            }}
                            value={street}
                            error={streetError !== ''}
                            helperText={streetError}
                        />
                        {streetError && (
                            <View
                                style={{
                                    color: 'red',
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                }}
                            >
                                <Text>{streetError}</Text>
                            </View>
                        )}
                        <TextInput
                            label='City'
                            placeholder='City'
                            autoCapitalize='words'
                            autoCorrect={false}
                            type='text'
                            required
                            size='small'
                            dense='true'
                            style={styles.input}
                            onChange={(e) => {
                                const inputText = e.nativeEvent.text;
                                setCity(inputText);
                                setCityError(validateCity(inputText));
                            }}
                            value={city}
                            error={cityError !== ''}
                            helperText={cityError}
                        />
                        {cityError && (
                            <View
                                style={{
                                    color: 'red',
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                }}
                            >
                                <Text>{cityError}</Text>
                            </View>
                        )}
                        <View>
                            <SimpleDropDown
                                list={STATELABELVALUES}
                                activeValue={stateProv}
                                setValue={setStateProv}
                            />
                        </View>
                        <TextInput
                            label='Postal Code'
                            placeholder='Postal Code'
                            autoCapitalize='words'
                            autoCorrect={false}
                            type='text'
                            dense='true'
                            required
                            size='small'
                            style={styles.input}
                            onChange={(e) => {
                                const inputText = e.nativeEvent.text;
                                setPostalCode(inputText);
                                setPostalCodeError(
                                    validatePostalCode(inputText)
                                );
                            }}
                            value={postalCode}
                            error={postalCodeError !== ''}
                            helperText={postalCodeError}
                        />
                        {postalCodeError && (
                            <View
                                style={{
                                    color: 'red',
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                }}
                            >
                                <Text>{postalCodeError}</Text>
                            </View>
                        )}
                    </View>
                    <View>
                        {canSave && (
                            <FAB
                                icon={() => (
                                    <FontAwesome5
                                        name='save'
                                        size={24}
                                        color='black'
                                    />
                                )}
                                style={{
                                    position: 'absolute',
                                    marginRight: 16,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'yellow',
                                }}
                                onPress={handleSavePress}
                            />
                        )}
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
