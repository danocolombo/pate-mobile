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
const RallyContactInfo = ({ rallyId }) => {
    const rallyEntry = useSelector((state) =>
        state.rallies.publicRallies.filter((r) => r.uid === rallyId)
    );
    const rally = rallyEntry[0];
    // printObject('rallyInfo', rally);
    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View>
                        <Headline>Contact Information</Headline>
                    </View>
                    <View style={styles.textWrapper}>
                        <Subheading>{rally.contact.name}</Subheading>
                        <Subheading>{rally.contact.phone}</Subheading>
                        <Subheading>{rally.contact.email}</Subheading>
                    </View>
                </Surface>
            </View>
        </>
    );
};

export default RallyContactInfo;

const styles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
    },
    surface: {
        // margin: 24,
        // height: 80,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWrapper: {
        alignItems: 'center',
    },
});
