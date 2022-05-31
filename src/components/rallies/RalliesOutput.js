import { StyleSheet, Text, View, Image } from 'react-native';
import RalliesList from './RalliesList';

function RalliesOutput(rallies) {
    return (
        <View style={styles.rootContainer}>
            {/* <Image
                style={styles.image}
                source={require('../../../assets/mobile_bg.png')}
            /> */}
            <RalliesList rallies={rallies} />
        </View>
    );
}
export default RalliesOutput;
const styles = StyleSheet.create({
    rootContainer: {
        width: '100%',
    },
    image: {
        height: '100%',
    },
});
