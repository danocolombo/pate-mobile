import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { Surface, Headline, Subheading, TextInput } from 'react-native-paper';
import { printObject } from '../../utils/helpers';
import NumberInput from '../ui/NumberInput/NumberInput';
const RegistrarAttendance = ({ reg }) => {
    const [attendance, setAttendance] = useState(parseInt(reg.attendeeCount));

    const handleAttendeeCountChange = (e) => {
        setAttendance(parseInt(e));
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
                            {reg?.attendeeCount ? (
                                <>
                                    <NumberInput
                                        value={attendance}
                                        onAction={handleAttendeeCountChange}
                                    />
                                </>
                            ) : null}
                            {reg?.mealCount ? (
                                <Text style={styles.registrarText}>
                                    {reg?.mealCount} for meal
                                </Text>
                            ) : null}
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
