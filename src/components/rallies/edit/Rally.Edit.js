import { View, Text, StyleSheet, Image } from 'react-native';
import RallyLocationForm from './Rally.Edit.Location';
const RallyEdit = ({ rallyId, stage }) => {
    return (
        <>
            <Text>RallyEdit</Text>
            <RallyLocationForm />
        </>
    );
};

export default RallyEdit;
const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
});
