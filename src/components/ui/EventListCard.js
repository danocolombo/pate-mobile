import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Surface, Badge } from 'react-native-paper';
import CardDate from './RallyCardDateStack';
function EventListCard({ date, locationName, city, stateProv }) {
    return (
        <>
            <View>
                <Surface styles={styles.surface}>
                    <View style={styles.eventContainer}>
                        <View>
                            <CardDate date={date} />
                            <Text>{locationName}</Text>
                            <Text>
                                {city}, {stateProv}
                            </Text>
                        </View>
                    </View>
                </Surface>
            </View>
        </>
    );
}
export default EventListCard;

const styles = StyleSheet.create({
    surface: {
        marginTop: 10,
        elevation: 5,
    },
    eventContainer: {
        // flex: 1,
    },
});
