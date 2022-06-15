import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { Surface, Headline, Subheading, TextInput } from 'react-native-paper';
import CustomButton from '../ui/CustomButton';
import { printObject } from '../../utils/helpers';
const RegistrarAttendance = ({ attendance, mealCount, onEditPress }) => {
    const handleAttendeeCountChange = (e) => {
        onEditPress();
    };
    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View style={styles.formHeader}>
                        <Headline>Attendance Info</Headline>
                    </View>
                    <View style={styles.infoContainer}>
                        <View>
                            {attendance ? (
                                <>
                                    <Text style={styles.registrarText}>
                                        {attendance} attendee(s)
                                    </Text>
                                </>
                            ) : null}
                            {mealCount ? (
                                <Text style={styles.registrarText}>
                                    {mealCount} for meal
                                </Text>
                            ) : null}
                        </View>
                    </View>

                    <View>
                        <View style={styles.buttonContainer}>
                            <CustomButton
                                title='Edit these values'
                                graphic={null}
                                cbStyles={{
                                    backgroundColor: 'green',
                                    color: 'white',
                                    width: 200,
                                    textAlign: 'center',
                                }}
                                txtColor='white'
                                onPress={handleAttendeeCountChange}
                            />
                        </View>
                    </View>
                </Surface>
            </View>
        </>
    );
};

export default RegistrarAttendance;

const styles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
    },
    surface: {
        marginTop: 24,
        // height: 80,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    textWrapper: {
        alignItems: 'center',
    },
    infoContainer: {
        // marginLeft: '10%',
        marginBottom: 5,
    },
    registrarText: {
        fontSize: 18,
        textAlign: 'center',
    },
    registrarAddress: { marginTop: 10 },
    stateProvPostalCodeContainer: {
        flexDirection: 'row',
    },
    stateProvSectionContainer: {
        marginRight: 15,
    },

    stateContainer: {
        backgroundColor: 'yellow',

        borderWidth: 1,
        borderColor: 'black',
    },
    postalCodeContainer: {},
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
});
