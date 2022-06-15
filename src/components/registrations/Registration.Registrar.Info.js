import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Surface, Headline, Subheading } from 'react-native-paper';
import { printObject } from '../../utils/helpers';
const RegistrarInfo = ({ reg }) => {
    //printObject('RI-reg:', reg);
    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View style={styles.formHeader}>
                        <Headline>Registrar</Headline>
                    </View>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.registrarText}>
                                {reg?.registrar?.firstName}{' '}
                                {reg?.registrar?.lastName}
                            </Text>
                            <Text style={styles.registrarText}>
                                {reg?.registrar?.phone}
                            </Text>
                            <Text style={styles.registrarText}>
                                {reg?.registrar?.email}
                            </Text>
                            <View style={styles.registrarAddress}>
                                <Text style={styles.registrarText}>
                                    {reg?.registrar?.residence?.street}
                                </Text>
                                <Text style={styles.registrarText}>
                                    {reg?.registrar?.residence?.city}
                                </Text>

                                <View
                                    style={
                                        styles.stateProvPostalCodeContainerRow
                                    }
                                >
                                    <View
                                        style={
                                            styles.stateProvPostalCodeContainer
                                        }
                                    >
                                        <View
                                            style={
                                                styles.stateProvSectionContainer
                                            }
                                        >
                                            <View
                                                style={
                                                    styles.stateProvInputContainer
                                                }
                                            >
                                                <Text
                                                    style={styles.registrarText}
                                                >
                                                    {
                                                        reg?.registrar
                                                            ?.residence
                                                            ?.stateProv
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                        <View
                                            style={
                                                styles.postalCodeSectionContainer
                                            }
                                        >
                                            <View
                                                style={
                                                    styles.postalCodeInputContainer
                                                }
                                            >
                                                <Text
                                                    style={styles.registrarText}
                                                >
                                                    {
                                                        reg?.registrar
                                                            ?.residence
                                                            ?.postalCode
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Surface>
            </View>
        </>
    );
};

export default RegistrarInfo;

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
