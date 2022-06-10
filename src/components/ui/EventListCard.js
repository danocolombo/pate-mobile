import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import { useSelector } from 'react-redux';
import CardDate from './RallyCardDateStack';
import { printObject } from '../../utils/helpers';

// function EventListCard({ date, locationName, city, stateProv }) {
function EventListCard({ rally, deletePress }) {
    const user = useSelector((state) => state.users.currentUser);
    let bgStyle;
    if (user.uid === rally.coordinator.id) {
        bgStyle = 'styles.cardBackGroundMine';
    } else {
        bgStyle = 'styles.cardBackGroundNotMine';
    }
    let mine;
    if (rally.coordinator.id === user.uid) {
        mine = true;
    } else {
        mine = false;
    }
    // printObject('rally', rally);
    return (
        <>
            <View
                style={[
                    styles.cardBackground,
                    mine
                        ? styles.cardBackGroundMine
                        : styles.cardBackGroundNotMine,
                ]}
            >
                <View style={styles.cardRow}>
                    <View>
                        <CardDate date={rally.eventDate} />
                    </View>
                    <View style={styles.locationName}>
                        <Text style={styles.locationName}>{rally.name}</Text>
                        <Text style={styles.geo}>
                            {rally.city}, {rally.stateProv}
                        </Text>
                    </View>
                    <View style={styles.deleteIcon}>
                        <Ionicons
                            name='trash'
                            color='black'
                            size={24}
                            onPress={() => deletePress(rally)}
                        />
                    </View>
                </View>
                <View style={styles.cardStatusRow}>
                    {rally.approved === true ? (
                        <Ionicons
                            name='checkmark-circle-outline'
                            size={32}
                            color='gold'
                        />
                    ) : (
                        <>
                            <Text style={styles.rallyStatus}>
                                {rally.status}
                            </Text>
                        </>
                    )}
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
    },
    cardBackGroundMine: {
        backgroundColor: Colors.secondary,
    },
    cardBackGroundNotMine: {
        backgroundColor: Colors.gray35,
    },
    cardRow: {
        flexDirection: 'row',
    },
    cardStatusRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
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
    indicatorContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    indicators: {
        color: 'white',
    },
    rallyStatus: {
        color: 'white',
        fontWeight: 'bold',
    },
    deleteIcon: {
        flex: 1,
        alignItems: 'flex-end',
    },
});
