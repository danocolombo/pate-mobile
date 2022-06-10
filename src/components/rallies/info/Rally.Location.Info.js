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
                        <Subheading>{rally?.name}</Subheading>
                        <Subheading>{rally?.street}</Subheading>
                        <Subheading>{rally?.city}</Subheading>
                        <Subheading>
                            {rally?.stateProv}, {rally?.postalCode}
                        </Subheading>
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
    },
    textWrapper: {
        alignItems: 'center',
    },
});
