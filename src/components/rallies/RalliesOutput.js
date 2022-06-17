import { StyleSheet, Text, View, Image } from 'react-native';
import { printObject } from '../../utils/helpers';
import RalliesList from './RalliesList';

function RalliesOutput(rallies) {
    return (
        <View style={styles.rootContainer}>
            <RalliesList rallies={rallies} />
        </View>
    );
}
export default RalliesOutput;
const styles = StyleSheet.create({
    rootContainer: {
        width: '100%',
    },
});
