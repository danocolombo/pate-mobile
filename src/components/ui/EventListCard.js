import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Card } from 'react-native-paper';
import { useSelector } from 'react-redux';
import CardDate from './RallyCardDateStack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { printObject } from '../../utils/helpers';

// function EventListCard({ date, locationName, city, stateProv }) {
function EventListCard({ rally }) {
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
    printObject('rally', rally);
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
                    <View style={styles.indicatorContainer}>
                        <Text style={styles.indicators}>
                            {rally.approved ? (
                                <Ionicons
                                    name='checkmark-circle-outline'
                                    size={32}
                                    // color='blue'
                                />
                            ) : (
                                <Ionicons name='ellipse-outline' size={32} />
                            )}
                        </Text>
                        {rally.approved === false ? (
                            <Text style={styles.indicators}>
                                {rally.status}
                            </Text>
                        ) : (
                            <Text style={styles.indicators}>
                                {rally.status}
                            </Text>
                        )}
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
});
