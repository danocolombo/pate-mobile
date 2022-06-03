import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import {
    Text,
    Surface,
    Headline,
    Title,
    Subheading,
    useTheme,
} from 'react-native-paper';
import { printObject } from '../../../utils/helpers';
const RallyLocationInfo = ({ rallyId }) => {
    const rallyEntry = useSelector((state) =>
        state.rallies.publicRallies.filter((r) => r.uid === rallyId)
    );
    const rally = rallyEntry[0];
    printObject('rallyInfo', rally);
    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View>
                        <Headline>Rally Location Information</Headline>
                    </View>
                    <View style={styles.textWrapper}>
                        <Subheading>{rally.name}</Subheading>
                        <Subheading>{rally.street}</Subheading>
                        <Subheading>{rally.city}</Subheading>
                        <Subheading>
                            {rally.stateProv}, {rally.postalCode}
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
