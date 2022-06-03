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
const RallyLogisticsInfo = ({ rallyId }) => {
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
                        <Headline>Logistics Information</Headline>
                    </View>
                    <View style={styles.textWrapper}>
                        <Subheading>{rally.eventDate}</Subheading>
                        <Subheading>{rally.startTime}</Subheading>
                        <Subheading>{rally.endTime}</Subheading>
                    </View>
                </Surface>
            </View>
        </>
    );
};

export default RallyLogisticsInfo;

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
