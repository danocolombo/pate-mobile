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
const RallyMealInfo = ({ rallyId }) => {
    let rallyEntry;
    let rally;
    if (rallyId.id === '') {
        //rally = useSelector((state) => state.rallies.tmpRally);
        rally = rallyId;
    } else {
        rallyEntry = useSelector((state) =>
            state.rallies.publicRallies.filter((r) => r.uid === rallyId)
        );
        rally = rallyEntry[0];
    }
    printObject('MEAL rally', rally);
    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View>
                        <Headline>Meal Information</Headline>
                    </View>
                    <View style={styles.textWrapper}>
                        <Subheading>{rally?.meal?.startTime}</Subheading>
                        <Subheading>{rally?.meal?.cost}</Subheading>
                        <Subheading>{rally?.meal?.deadline}</Subheading>
                        <Subheading>{rally?.meal?.message}</Subheading>
                    </View>
                </Surface>
            </View>
        </>
    );
};

export default RallyMealInfo;

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
