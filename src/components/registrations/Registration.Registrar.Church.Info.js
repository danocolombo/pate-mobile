import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Surface, Headline, Subheading } from 'react-native-paper';
import { printObject } from '../../utils/helpers';
const RegistrarChurchInfo = ({ reg }) => {
    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View style={styles.formHeader}>
                        <Headline>Registrar Church</Headline>
                    </View>
                    <View style={styles.infoContainer}>
                        <View>
                            {reg?.church?.city ? (
                                <Text style={styles.registrarText}>
                                    {reg?.church?.name}
                                </Text>
                            ) : null}
                            {reg?.church?.city ? (
                                <Text style={styles.registrarText}>
                                    {reg?.church?.city}
                                </Text>
                            ) : null}
                            {reg?.church?.stateProv ? (
                                <Text style={styles.registrarText}>
                                    {reg?.church?.stateProv}
                                </Text>
                            ) : null}
                        </View>
                    </View>
                </Surface>
            </View>
        </>
    );
};

export default RegistrarChurchInfo;

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
