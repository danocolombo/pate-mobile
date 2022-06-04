import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Card } from 'react-native-paper';
import CardDate from './RallyCardDateStack';

function EventListCard({ date, locationName, city, stateProv }) {
    return (
        <>
            <View style={styles.cardBackground}>
                <View style={styles.cardRow}>
                    <View>
                        <CardDate date={date} />
                    </View>
                    <View style={styles.locationName}>
                        <Text style={styles.locationName}>{locationName}</Text>
                        <Text style={styles.geo}>
                            {city}, {stateProv}
                        </Text>
                    </View>
                </View>
            </View>
        </>
    );
}
export default EventListCard;

const styles = StyleSheet.create({
    cardBackground: {
        width: '100%',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: Colors.secondary,
    },
    cardRow: {
        flexDirection: 'row',
    },
    locationName: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        marginLeft: 10,
        justifyContent: 'center',
    },
    geo: {
        marginLeft: 10,
        color: 'white',
        fontSize: 16,
    },
});
