import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Surface, Headline, Subheading } from 'react-native-paper';
import { printObject } from '../../utils/helpers';
const RegistrationLocation = ({ rally }) => {
    //printObject('RL-rally:', rally);
    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View>
                        <Text style={styles.inputLabelText}>
                            Location Information
                        </Text>
                    </View>
                    <View style={styles.textWrapper}>
                        {rally?.name ? (
                            <Text style={styles.locationText}>
                                {rally?.name}
                            </Text>
                        ) : null}
                        {rally?.street ? (
                            <Text style={styles.locationText}>
                                {rally?.street}
                            </Text>
                        ) : null}
                        {rally?.city ? (
                            <Text style={styles.locationText}>
                                {rally?.city}
                            </Text>
                        ) : null}
                        {rally?.stateProv || rally?.postalCode ? (
                            <Text style={styles.locationText}>
                                {rally?.stateProv}, {rally?.postalCode}
                            </Text>
                        ) : null}
                    </View>
                </Surface>
            </View>
        </>
    );
};

export default RegistrationLocation;

const styles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
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
        // alignItems: 'center',
        marginBottom: 5,
    },
    locationText: {
        fontSize: 18,
    },
});
