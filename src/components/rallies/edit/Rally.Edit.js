import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import RallyLocationForm from './Rally.Edit.Location';
import RallyLocationConfirm from './Rally.Edit.Location.Confirm';
import RallyLogisticsForm from './Rally.Edit.Logistics';
import RallyContactForm from './Rally.Edit.Contact';
import RallyMealForm from './Rally.Edit.Meal';
import RallyNewConfirmation from './Rally.Edit.Confirm';
const RallyEdit = ({ rallyId, stage }) => {
    const navigation = useNavigation();
    const feo = useSelector((state) => state.system);
    // console.log('stage', stage);
    // console.log('rallyId', rallyId);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.appName,
        });
    }, [navigation, feo]);

    if (stage === 1) {
        return (
            <>
                <RallyLocationForm rallyId={rallyId} />
            </>
        );
    } else if (stage === 2) {
        return (
            <>
                <RallyLocationConfirm rallyId={rallyId} />
            </>
        );
    } else if (stage === 3) {
        return (
            <>
                <RallyLogisticsForm rallyId={rallyId} />
            </>
        );
    } else if (stage === 4) {
        return (
            <>
                <RallyContactForm rallyId={rallyId} />
            </>
        );
    } else if (stage === 5) {
        return (
            <>
                <RallyMealForm rallyId={rallyId} />
            </>
        );
    } else if (stage === 6) {
        return (
            <>
                <RallyNewConfirmation rallyId={rallyId} />
            </>
        );
    } else {
        return (
            <View>
                <Text>Undefined Edit Stage</Text>
            </View>
        );
    }
};

export default RallyEdit;
const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
});
