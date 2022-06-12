import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Surface, Headline, Subheading } from 'react-native-paper';
import { printObject } from '../../../utils/helpers';
const RallyLocationInfo = ({ rally }) => {
    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View>
                        <Headline>Rally Location Information</Headline>
                    </View>
                    <View style={styles.textWrapper}>
                        {rally?.name ? (
                            <Subheading>{rally?.name}</Subheading>
                        ) : null}
                        {rally?.street ? (
                            <Subheading>{rally?.street}</Subheading>
                        ) : null}
                        {rally?.city ? (
                            <Subheading>{rally?.city}</Subheading>
                        ) : null}
                        {rally?.stateProv || rally?.postalCode ? (
                            <Subheading>
                                {rally?.stateProv}, {rally?.postalCode}
                            </Subheading>
                        ) : null}
                    </View>
                </Surface>
            </View>
        </>
    );
};

export default RallyLocationInfo;

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
});
