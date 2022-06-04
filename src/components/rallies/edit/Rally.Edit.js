import { View, Text, StyleSheet, Image } from 'react-native';
import RallyLocationForm from './Rally.Edit.Location';
import RallyLogisticsForm from './Rally.Edit.Logistics';
const RallyEdit = ({ rallyId, stage }) => {
    console.log('stage', stage);
    console.log('rallyId', rallyId);
    stage = 2;
    if (stage === 1) {
        return (
            <>
                <RallyLocationForm rallyId={rallyId} />
            </>
        );
    } else if (stage === 2) {
        return (
            <>
                <RallyLogisticsForm rallyId={rallyId} />
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
