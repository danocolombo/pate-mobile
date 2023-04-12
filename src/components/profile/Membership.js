import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { Surface, ActivityIndicator, FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import CustomButton from '../ui/CustomButton';
import { Colors } from '../../constants/colors';
import { STATELABELVALUES } from '../../constants/pate';
import SimpleDropDown from '../ui/DropDown/SimpleDropDown';
import {
    updateCurrentUser,
    updateCurrentUserMembership,
} from '../../features/users/usersSlice';
import {
    createGQLMembership,
    updateGQLMembership,
} from '../../providers/membership.provider';
import { printObject, capitalize } from '../../utils/helpers';
const Membership = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.users.currentUser);
    const [showCompleteModal, setShowCompleteModal] = useState(false);
    const [membershipId, setMembershipId] = useState(null);
    const [membershipName, setMembershipName] = useState('');
    const [savedMembershipName, setSavedMembershipName] = useState('');
    const [membershipNameError, setMembershipNameError] = useState();
    const [membershipStreet, setMembershipStreet] = useState('');
    const [savedMembershipStreet, setSavedMembershipStreet] = useState('');
    const [membershipStreetError, setMembershipStreetError] = useState();

    const [membershipCity, setMembershipCity] = useState('');
    const [savedMembershipCity, setSavedMembershipCity] = useState('');
    const [membershipCityError, setMembershipCityError] = useState();
    const [membershipStateProv, setMembershipStateProv] = useState('AL');
    const [savedMembershipStateProv, setSavedMembershipStateProv] =
        useState('AL');
    const [membershipStateProvError, setMembershipStateProvError] = useState();
    const [membershipPostalCode, setMembershipPostalCode] = useState('');
    const [savedMembershipPostalCode, setSavedMembershipPostalCode] =
        useState('');
    const [membershipPostalCodeError, setMembershipPostalCodeError] =
        useState();
    const [test, setTest] = useState(currentUser);
    const [testError, setTestError] = useState('');
    const [canSave, setCanSave] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    useLayoutEffect(() => {
        printObject('M:15==>currentUser:\n', currentUser);
        setTest('');
        if (currentUser?.memberships?.items.length > 0) {
            //we have memberships, see if there are any for the current division
            const membership = currentUser.memberships.items.find((m) => {
                return m.division.id === currentUser.defaultDivision.id;
            });
            setMembershipId(membership.id);
            setTest(membership?.name || '');
            setMembershipName(membership?.name || '');
            setSavedMembershipName(membership?.name || '');
            setMembershipStreet(membership?.street || '');
            setSavedMembershipStreet(membership?.street || '');
            setMembershipCity(membership?.city || '');
            setSavedMembershipCity(membership?.city || '');
            console.log('stateProv:#' + membership?.stateProv + '#');
            setMembershipStateProv(membership?.stateProv || 'AL');
            setSavedMembershipStateProv(membership?.stateProv || 'AL');
            setMembershipPostalCode(membership?.postalCode?.toString() || '');
            setSavedMembershipPostalCode(
                membership?.postalCode?.toString() || ''
            );
        }
    }, []);
    useEffect(() => {
        if (
            membershipName !== savedMembershipName ||
            membershipStreet !== savedMembershipStreet ||
            membershipCity !== savedMembershipCity ||
            membershipStateProv !== savedMembershipStateProv ||
            membershipPostalCode !== savedMembershipPostalCode
        ) {
            //there is a change is the values, are there errors?
            if (
                membershipNameError ||
                membershipStreetError ||
                membershipCityError ||
                membershipPostalCodeError
            ) {
                // console.log('CHANGES/FALSE');
                // return;
                setCanSave(false);
            } else {
                // console.log('CHANGES/TRUE');
                // return;
                setCanSave(true);
            }
        } else {
            // console.log('CHANGES/FALSE 2');
            // return;
            setCanSave(false);
        }
    }, [
        membershipName,
        membershipStreet,
        membershipCity,
        membershipStateProv,
        membershipPostalCode,
    ]);
    const validateMembershipName = (value) => {
        // 2-20 chars, apostrophe with alpha permitted
        if (value.length < 1) {
            return '';
        }
        const testRegex = /^[0-9a-zA-Z.\- ]{2,30}$/;
        if (!testRegex.test(value)) {
            return '2-30 length required';
        } else {
            return '';
        }
    };
    const validateMembershipStreet = (value) => {
        if (value.length === 0) {
            return '';
        }
        // 2-20 chars, apostrophe with alpha permitted
        const testRegex = /^[0-9a-zA-Z.\- ]{2,20}$/;
        if (!testRegex.test(value)) {
            return '2-20 characters [OPTIONAL]';
        } else {
            return '';
        }
    };

    const validateMembershipCity = (value) => {
        if (value.length === 0) {
            return '';
        }
        // 2-15 chars, apostrophe with alpha permitted
        const testRegex = /^[a-zA-Z.\- ]{2,15}$/;
        if (!testRegex.test(value)) {
            return '2-15 characters';
        } else {
            return '';
        }
    };
    const validateMembershipPostalCode = (value) => {
        if (value.length === 0) {
            return '';
        }
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
        let membershipUpdate = {};
        //*  1. check if we have membershipId
        if (currentUser?.memberships?.items?.length !== 0) {
            membershipUpdate = { ...membershipUpdate, id: membershipId };
        }
        //*  2. check other values
        if (membershipName !== savedMembershipName) {
            membershipUpdate = { ...membershipUpdate, name: membershipName };
        }
        if (membershipStreet !== savedMembershipStreet) {
            membershipUpdate = {
                ...membershipUpdate,
                street: membershipStreet,
            };
        }
        if (membershipCity !== savedMembershipCity) {
            membershipUpdate = { ...membershipUpdate, city: membershipCity };
        }
        if (membershipStateProv !== savedMembershipStateProv) {
            membershipUpdate = {
                ...membershipUpdate,
                stateProv: membershipStateProv,
            };
        }
        if (membershipPostalCode !== savedMembershipPostalCode) {
            membershipUpdate = {
                ...membershipUpdate,
                postalCode: parseInt(membershipPostalCode),
            };
        }

        //      ----------------------------------------------------
        //      ===== common function used to update REDUX below...
        //      ----------------------------------------------------
        const updateReduxMembership = async (membershipToUpdate) => {
            // membershipToUpdate is whole GQL response, pluck what
            // is needed for redux and send object to slice
            let membershipObject = {
                id: membershipToUpdate.id,
                name: membershipToUpdate.name,
                street: membershipToUpdate.street,
                city: membershipToUpdate.city,
                stateProv: membershipToUpdate.stateProv,
                postalCode: membershipToUpdate.postalCode,
                division: {
                    id: membershipToUpdate.division.id,
                    code: membershipToUpdate.division.code,
                    organization: {
                        id: membershipToUpdate.division.organization.id,
                        code: membershipToUpdate.division.organization.code,
                    },
                },
            };
            let DANO = false;
            if (DANO) {
                console.log('updateReduxMembership common function');
                printObject('membershipToUpdate:\n', membershipToUpdate);
                printObject('membershipObject:\n', membershipObject);
                return;
            }

            //* 6. need to update the savedValues to proceed in good way..
            if (membershipName !== savedMembershipName) {
                setSavedMembershipName(membershipName);
            }
            if (membershipStreet !== savedMembershipStreet) {
                setSavedMembershipStreet(membershipStreet);
            }
            if (membershipCity !== savedMembershipCity) {
                setSavedMembershipCity(membershipCity);
            }
            if (membershipStateProv !== savedMembershipStateProv) {
                setSavedMembershipStateProv(membershipStateProv);
            }
            if (membershipPostalCode !== savedMembershipPostalCode) {
                setSavedMembershipPostalCode(membershipPostalCode);
            }
            dispatch(updateCurrentUserMembership(membershipObject));
            setCanSave(false);
            setShowCompleteModal(true);

            //* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //* END OF COMMON FUNCTION
            //* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        };
        let userMembershipResults = {};
        if (currentUser?.memberships?.items?.length === 0) {
            //      new membership entry
            //      add userMembershipId & divisionMembershipsId & stateProv
            membershipUpdate.userMembershipsId = currentUser.id;
            membershipUpdate.divisionMembershipsId =
                currentUser.affiliations.active.divisionId;
            membershipUpdate.stateProv = membershipStateProv;
            userMembershipResults = await createGQLMembership(membershipUpdate);
            if (userMembershipResults.status === 200) {
                await updateReduxMembership(userMembershipResults.data);
            } else {
                //      GQL create fail, notify & exit
                console.log('GQL create failed.');
                printObject('userMembershipResults:\n', userMembershipResults);
            }
        } else {
            //      Update existing membership
            userMembershipResults = await updateGQLMembership(membershipUpdate);
            //==========================================
            // check results of the GQL update
            //==========================================
            if (userMembershipResults.status === 200) {
                //      GQL updated, update REDUX
                await updateReduxMembership(userMembershipResults.data);
                setIsUpdating(false);
            } else {
                //      GQL update fail, notify & exit
                console.log('GQL update failed.');
                printObject('userMemebershipResults:\n', userMembershipResults);
            }
        }

        setIsUpdating(false);
    };
    if (isUpdating) {
        return <ActivityIndicator />;
    }
    // console.log('#' + membershipName + '#' + savedMembershipName + '#');
    // console.log('#' + membershipStreet + '#' + savedMembershipStreet + '#');
    // console.log('#' + membershipCity + '#' + savedMembershipCity + '#');
    // console.log(
    //     '#' + membershipStateProv + '#' + savedMembershipStateProv + '#'
    // );
    // console.log(
    //     '#' + membershipPostalCode + '#' + savedMembershipPostalCode + '#'
    // );
    return (
        <>
            <Modal visible={showCompleteModal} animationStyle='slide'>
                <Surface style={styles.modalSurface}>
                    <View>
                        <View style={{ marginTop: 5, alignItems: 'center' }}>
                            <Text style={styles.modalTitle}>Success</Text>
                        </View>
                        <View style={styles.modalInfoWrapper}>
                            <Text style={styles.modalText}>
                                Your changes have been made.
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
                                    onPress={() => setShowCompleteModal(false)}
                                />
                            </View>
                        </View>
                    </View>
                </Surface>
            </Modal>
            <Surface style={styles.affiliateSurfaceContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        label='Name'
                        placeholder={
                            capitalize(
                                currentUser?.affiliations?.active
                                    ?.organizationLabel
                            ) + ' Name'
                        }
                        autoCapitalize='words'
                        autoCorrect={false}
                        type='text'
                        required
                        size='small'
                        dense='true'
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
                            setMembershipCity(inputText);
                            setMembershipCityError(
                                validateMembershipCity(inputText)
                            );
                        }}
                        value={membershipCity}
                        error={membershipCityError !== ''}
                        helperText={membershipCityError}
                    />
                    {membershipCityError && (
                        <View
                            style={{
                                color: 'red',
                                fontSize: 12,
                                fontWeight: 'bold',
                            }}
                        >
                            <Text>{membershipCityError}</Text>
                        </View>
                    )}

                    <View style={{ maxWidth: '85%' }}>
                        <View>
                            <SimpleDropDown
                                list={STATELABELVALUES}
                                activeValue={membershipStateProv}
                                setValue={setMembershipStateProv}
                            />
                        </View>
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
                        maxLength={5}
                        style={styles.input}
                        onChange={(e) => {
                            const inputText = e.nativeEvent.text;
                            setMembershipPostalCode(inputText);
                            setMembershipPostalCodeError(
                                validateMembershipPostalCode(inputText)
                            );
                        }}
                        value={membershipPostalCode}
                        error={membershipPostalCodeError !== ''}
                        helperText={membershipPostalCodeError}
                    />
                    {membershipPostalCodeError && (
                        <View
                            style={{
                                color: 'red',
                                fontSize: 12,
                                fontWeight: 'bold',
                            }}
                        >
                            <Text>{membershipPostalCodeError}</Text>
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
