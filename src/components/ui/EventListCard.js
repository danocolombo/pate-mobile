import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Chip } from '@react-native-material/core';
import { Card } from 'react-native-paper';
import { useSelector } from 'react-redux';
import CardDate from './RallyCardDateStack';
import { printObject, prettyTime } from '../../utils/helpers';
import { convertPateTime } from '../../utils/date';

// function EventListCard({ date, locationName, city, stateProv, eventTime }) {
function EventListCard({ rally, deletePress }) {
    // printObject('C.U.RLC:13==>rally', rally);
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
                    <View style={styles.dateWrapper}>
                        <CardDate date={rally.eventDate} />
                    </View>
                    <View style={styles.nameGeoContainer}>
                        <View style={styles.nameWrapper}>
                            <Text style={styles.locationName}>
                                {rally.name}
                            </Text>
                        </View>
                        <View style={styles.geoWrapper}>
                            <Text style={styles.geo}>
                                {rally.location.city},{' '}
                                {rally.location.stateProv}
                            </Text>
                        </View>
                    </View>
                    {user.affiliations.active.role === 'director' && (
                        <View>
                            <View style={styles.stateToken}>
                                <Text style={styles.stateTokenText}>
                                    {rally.location.stateProv}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
                <View style={styles.cardRow}>
                    <View style={styles.timeWrapper}>
                        <Text style={styles.timeText}>
                            {prettyTime(rally.startTime)}
                            {' - '}
                            {prettyTime(rally.endTime)}
                        </Text>
                    </View>
                    {rally.meal.id ? (
                        <View style={styles.mealOfferedWrapper}>
                            <Text style={styles.mealOfferedText}>
                                Meal offered
                            </Text>
                        </View>
                    ) : null}
                </View>
                <View style={styles.cardStatusRow}>
                    <View>
                        {rally.status === 'approved' ||
                        rally.status === 'done' ? (
                            <Ionicons
                                name='checkmark-circle-outline'
                                size={32}
                                color='gold'
                            />
                        ) : (
                            <>
                                <Text style={styles.rallyStatus}>
                                    <Chip
                                        variant={
                                            rally.status === 'pending'
                                                ? 'filled'
                                                : 'outlined'
                                        }
                                        backgroundColor={
                                            rally.status === 'pending'
                                                ? 'yellow'
                                                : Colors.gray50
                                        }
                                        color={
                                            rally.status === 'pending'
                                                ? 'black'
                                                : 'white'
                                        }
                                        label={rally.status}
                                    />
                                </Text>
                            </>
                        )}
                    </View>
                    {rally.status === 'approved' || rally.status === 'done' ? (
                        <View style={styles.registrationsWrapper}>
                            <Text style={styles.registrationsText}>
                                Registrations: {rally?.plannedCount}
                            </Text>
                        </View>
                    ) : null}
                    {(rally.status === 'approved' || rally.status === 'done') &&
                    rally?.meal?.id ? (
                        <View style={styles.mealsWrapper}>
                            <Text style={styles.mealsText}>
                                Meals:{' '}
                                {rally?.mealPlannedCount
                                    ? rally?.mealPlannedCount
                                    : 0}
                            </Text>
                        </View>
                    ) : null}
                    <View style={styles.deleteIcon}>
                        <Ionicons
                            name='trash'
                            color='white'
                            size={20}
                            onPress={() => deletePress(rally)}
                        />
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
        backgroundColor: Colors.primary,
    },
    cardBackGroundNotMine: {
        backgroundColor: Colors.primary500,
    },
    cardRow: {
        flexDirection: 'row',
        flex: 1,
    },
    dateWrapper: {},
    nameWrapper: {},
    geoWrapper: {},
    cardStatusRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginTop: 10,
        marginLeft: 0,
    },
    nameGeoContainer: {
        flex: 1,
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
    timeWrapper: {
        marginTop: 5,
        marginBottom: 5,
        // borderWidth: 1,
        // borderColor: 'white',
    },
    timeText: {
        paddingHorizontal: 10,
        // paddingVertical: 5,
        color: 'white',
    },
    mealOfferedWrapper: {
        // borderWidth: 1,
        backgroundColor: 'yellow',
        borderRadius: 5,
        // borderColor: 'yellow',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    mealOfferedText: {
        // paddingLeft: 5,
        color: 'black',
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
    registrationsWrapper: { paddingLeft: 15 },
    registrationsText: { color: 'white' },
    mealsWrapper: {
        paddingLeft: 15,
    },
    mealsText: {
        color: 'white',
    },
    deleteIcon: {
        flex: 1,
        alignItems: 'flex-end',
    },
    stateToken: { backgroundColor: 'black', borderRadius: 20, padding: 2 },
    stateTokenText: { color: 'white' },
});
