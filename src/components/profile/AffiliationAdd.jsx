import React, { useState } from 'react';
import { View, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { Text, TextInput, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../constants/colors';
import CustomButton from '../ui/CustomButton';
import { printObject } from '../../utils/helpers';

const AffiliationAdd = () => {
    const currentUser = useSelector((state) => state.users.currentUser);
    const [affCode, setAffCode] = useState('');
    const [affCodeError, setAffCodeError] = useState('');
    const [showCheckingModal, setShowCheckingModal] = useState(false);
    const [showExistingModal, setShowExistingModal] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    const validateAffCode = (value) => {
        //only allow ORG#DIV definitions. This can be 3 or 4 characters for org and 2 - 4 for div
        //      CRP8#SE
        const regex = /^[A-Za-z0-9]{3,4}#[A-Za-z0-9]{2,4}$/; // regex for 4 digit alpha-numeric
        if (regex.test(value)) {
            return '';
        } else {
            return 'invalid code format';
        }
        return '';
    };
    const submitCodeRequest = () => {
        // should have a code of 3-4 chars # 3-4 chars
        //      sample:     CRP8#SE  or FEO#SE
        //check for formatting before proceeding...
        const regex = /^[A-Za-z0-9]{3,4}#[A-Za-z0-9]{2,4}$/; // regex for 4 digit alpha-numeric
        if (!regex.test(affCode)) {
            return 'invalid code format';
        }
        //split the values to use
        const [orgCode, divCode] = affCode.split('#');

        setAffCode('');
        setIsChecking(true);
        // check if the code is already allowed
        try {
            console.log('orgCode:', orgCode);
            printObject('affs...]\n', currentUser.affiliations.items);
            const foundAffs = currentUser.affiliations.items.filter((a) => {
                console.log(
                    'a.division.organization.code:',
                    a.division.organization.code
                );
                return a.division.organization.code === orgCode;
            });
            console.log('foundAffs:', foundAffs);
            if (foundAffs) {
                //there is matching org, now check for division requested.
                const bingo = foundAffs.find((a) => {
                    return a.division.code === divCode;
                });
                setShowExistingModal(true);
                setIsChecking(false);
                return;
            } else {
                setIsChecking(false);
                window.alert('Org not found');
                return;
            }
            setIsChecking(false);
            window.alert('GO ON!!');
        } catch (error) {
            console.error('Cannnot check existing affiliations');
            setIsChecking(false);
            return;
        }
        setShowCheckingModal(true);
    };
    printObject(
        'AA:71-->currentUser:\n',
        currentUser.affiliations.items.length
    );
    if (isChecking) {
        <View>
            <ActivityIndicator />
        </View>;
    }
    return (
        <>
            <Modal visible={showCheckingModal} animationStyle='slide'>
                <Surface style={styles.modalSurface}>
                    <View>
                        <View style={{ marginTop: 5, alignItems: 'center' }}>
                            <Text style={styles.modalTitle}>
                                Checking access permissions
                            </Text>
                        </View>
                        <View style={styles.modalInfoWrapper}>
                            <Text style={styles.modalText}>Hold on...</Text>
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
                                    onPress={() => setShowCheckingModal(false)}
                                />
                            </View>
                        </View>
                    </View>
                </Surface>
            </Modal>
            <Modal visible={showExistingModal} animationStyle='slide'>
                <Surface style={styles.modalSurface}>
                    <View>
                        <View style={{ marginTop: 5, alignItems: 'center' }}>
                            <Text style={styles.modalTitle}>
                                Access Already Exists
                            </Text>
                        </View>
                        <View style={styles.modalInfoWrapper}>
                            <Text style={styles.modalText}>
                                You already have access to the requested
                                affiliate.
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
                                    onPress={() => setShowExistingModal(false)}
                                />
                            </View>
                        </View>
                    </View>
                </Surface>
            </Modal>
            <View style={styles.instructionWrapper}>
                <Text style={styles.sectionHeader}>Add Affiliation</Text>
                <Text style={styles.instructionText}>
                    If you have been provided a code to join another
                    affiliation, enter it below and access will be attempted.
                </Text>
            </View>
            <View style={styles.wrapper}>
                <View style={styles.inputContainer}>
                    <TextInput
                        label='Code'
                        placeholder=''
                        autoCapitalize='words'
                        autoCorrect={false}
                        type='text'
                        maxLength={9}
                        required
                        size='small'
                        dense='true'
                        style={styles.codeInput}
                        onChange={(e) => {
                            const textInput = e.nativeEvent.text.toUpperCase();
                            setAffCode(textInput);
                            setAffCodeError(validateAffCode(textInput));
                        }}
                        value={affCode}
                        error={affCodeError !== ''}
                        helperText={affCodeError}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title='Add'
                        graphic={null}
                        cbStyles={{
                            backgroundColor: 'green',
                            color: 'white',
                        }}
                        txtColor='white'
                        onPress={submitCodeRequest}
                    />
                </View>
            </View>
        </>
    );
};

export default AffiliationAdd;
const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    instructionWrapper: {
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    sectionHeader: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    instructionText: {
        fontSize: 18,
        textAlign: 'center',
    },
    inputContainer: {
        marginTop: 0,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 0,
        marginTop: 1,
        fontSize: 18,
        borderRadius: 6,
        minWidth: 70,
        width: '90%',
    },
    codeInput: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 0,
        marginTop: 1,
        fontSize: 18,
        borderRadius: 6,
        minWidth: 90,
        width: '90%',
    },

    buttonContainer: {
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 10,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,
        // textAlign: 'center',
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
