import { StyleSheet, Text, View } from 'react-native';
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
