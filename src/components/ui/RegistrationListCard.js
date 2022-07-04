import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Chip } from '@react-native-material/core';
import { Card } from 'react-native-paper';
import { useSelector } from 'react-redux';

import CardDate from './RallyCardDateStack';
import { printObject } from '../../utils/helpers';
import { isDateDashBeforeToday, dateNumToDateDash } from '../../utils/date';
// function EventListCard({ date, locationName, city, stateProv }) {
function RegListCard({ registration, onDeletePress, oldStyle = {} }) {
    // printObject('RLC:12 ', registration);

    return (
        <>
            <View style={[styles.cardBackground, oldStyle]}>
                <View style={styles.cardRow}>
                    <View style={styles.firstRow}>
                        <View style={styles.dateWrapper}>
                            <CardDate date={registration.eventDate} />
                        </View>
                        <View style={styles.nameGeoContainer}>
                            <View style={styles.nameWrapper}>
                                <Text style={styles.locationName}>
                                    {registration.location.name}
                                </Text>
                            </View>
                            <View style={styles.geoWrapper}>
                                <View>
                                    <Text style={styles.text}>
                                        {registration.location.street}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.text}>
                                        {registration.location.city},{' '}
                                        {registration.location.stateProv}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.cardRow}>
                    <View style={styles.numberSpread}>
                        <View style={styles.numberItem}>
                            <Text style={styles.text}>
                                Attendance: {registration.attendeeCount}
                            </Text>
                        </View>
                        <View style={styles.numberItem}>
                            <Text style={styles.text}>
                                Meal: {registration.mealCount}
                            </Text>
                        </View>
                        {!isDateDashBeforeToday(
                            dateNumToDateDash(registration.eventDate)
                        ) ? (
                            <View style={styles.deleteIcon}>
                                <Ionicons
                                    name='trash'
                                    color={Colors.gray10}
                                    size={20}
                                    onPress={() => onDeletePress(registration)}
                                />
                            </View>
                        ) : null}
                    </View>
                </View>
            </View>
        </>
    );
}
export default RegListCard;

const styles = StyleSheet.create({
    cardBackground: {
        flexDirection: 'column',
        width: '100%',
        borderRadius: 10,
        // borderColor: 'blue',
        //borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginVertical: 5,
        backgroundColor: Colors.primary,
    },

    cardRow: {
        // borderWidth: 1,
        // borderColor: 'red',

        flexDirection: 'row',

        // borderRadius: 10,
    },
    firstRow: {
        flexDirection: 'row',
        flex: 1,
        // borderWidth: 1,
        // borderColor: 'white',
    },
    numberSpread: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    numberItem: {
        marginTop: 5,
        // borderWidth: 1,
        // borderColor: 'blue',
    },
    dateWrapper: {
        borderWidth: 0,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: Colors.secondary2,
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: 'green',
    },
    nameWrapper: {},
    geoWrapper: {
        width: '100%',
        // backgroundColor: 'yellow',
    },

    nameGeoContainer: {
        flex: 1,
        // backgroundColor: 'blue',
    },
    locationName: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        marginLeft: 10,
        justifyContent: 'center',
    },
    text: {
        marginLeft: 10,
        color: 'white',
        fontSize: 16,
    },
    deleteIcon: {
        flex: 1,
        alignItems: 'flex-end',
    },
});
