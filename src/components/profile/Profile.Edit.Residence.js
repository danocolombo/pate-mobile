import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Surface, Text, List, TextInput, Button } from 'react-native-paper';
import CustomButton from '../ui/CustomButton';
const ProfileEditResidence = () => {
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [stateProv, setStateProv] = useState();
    const [postalCode, setPostalCode] = useState();
    return (
        <Surface style={styles.surface}>
            <View style={styles.heading}>
                <Text style={styles.headerText}>Edit Residence Info</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput label='Address' mode='outlined' value={street} />
            </View>

            <View style={styles.inputContainer}>
                <TextInput label='City' mode='outlined' value={city} />
            </View>

            <View style={styles.stateProvPostalCodeContainerRow}>
                <View style={styles.stateProvPostalCodeContainer}>
                    <View style={styles.stateProvSectionContainer}>
                        <View style={styles.stateProvInputContainer}>
                            <TextInput
                                label='State'
                                style={[styles.input, styles.inputStateProv]}
                                placeholder='State'
                                mode='outlined'
                                onChangeText={(x) => setStateProv(x)}
                                value={stateProv}
                            />
                        </View>
                    </View>
                    <View style={styles.postalCodeSectionContainer}>
                        <View style={styles.postalCodeInputContainer}>
                            <TextInput
                                style={[styles.input, styles.inputPostalCode]}
                                label='Postal Code'
                                placeholder='Postal Code'
                                mode='outlined'
                                onChangeText={(x) => setPostalCode(x)}
                                keyboardType='numeric'
                                value={postalCode}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title='Update'
                        graphic=''
                        cbStyles={{
                            backgroundColor: 'green',
                            color: 'white',
                            width: '50%',
                        }}
                        onPress={() => {}}
                    />
                </View>
            </View>
        </Surface>
    );
};
export default ProfileEditResidence;

const styles = StyleSheet.create({
    surface: {
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
    inputContainer: { marginHorizontal: 10, backgroundColor: 'white' },
    inputText: {},
    input: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 0,
        marginTop: 0,
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
    stateProvPostalCodeContainerRow: {
        marginHorizontal: 10,
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
    buttonContainer: { alignItems: 'center', marginTop: 20, marginBottom: 20 },
});
