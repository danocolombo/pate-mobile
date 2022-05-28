import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CardDate from '../ui/RallyCardDate';
import LoadingOverly from '../../components/ui/LoadingOverlay';
import { Colors } from '../../constants/colors';
import { printObject } from '../../utils/helpers';
import {
    dateNumsToLongDayLongMondayDay,
    numTimeToDisplayTime,
} from '../../utils/date';

const RallyDetails = ({ rallyId }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    let ral = useSelector((state) =>
        state.rallies.publicRallies.filter((r) => r.uid === rallyId)
    );
    let rally = ral[0];
    printObject('rally', rally);
    const handleRegisterRequest = () => {
        navigation.navigate('RallyRegister', {
            rallyId: rally.uid,
        });
    };
    if (!rally) {
        return <LoadingOverly />;
    } else {
        return (
            <>
                <View style={styles.cardContainer}>
                    <Card style={styles.rallyCard}>
                        <View style={styles.nameContainer}>
                            <Card.Title style={styles.nameText}>
                                {rally.name}
                            </Card.Title>
                        </View>
                        <Card.Divider />
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateValues}>
                                {dateNumsToLongDayLongMondayDay(
                                    rally.eventDate
                                )}
                            </Text>
                        </View>
                        <View style={styles.timeContainer}>
                            <Text style={styles.timeValues}>
                                {numTimeToDisplayTime(rally.startTime)} -{' '}
                                {numTimeToDisplayTime(rally.endTime)}
                            </Text>
                        </View>
                        <View style={styles.addressWrapper}>
                            <View style={styles.addressContainer}>
                                <Text style={styles.addressText}>
                                    {rally.street}
                                </Text>
                                <Text style={styles.addressText}>
                                    {rally.city}, {rally.stateProv}{' '}
                                    {rally.postalCode}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.graphicWrapper}>
                            <Image
                                style={styles.image}
                                resizeMode='cover'
                                source={{
                                    uri: 'https://pate20213723ed06531948b6a5a0b14d1c3fb499175248-dev.s3.amazonaws.com/public/events/9262496f849827c155ca8865b7a39b65CORDELE.jpg',
                                }}
                            />
                        </View>
                        <View style={styles.notesContainer}>
                            <Text style={styles.notesText}>
                                Come check it out
                            </Text>
                        </View>
                        <Button
                            // icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{
                                borderRadius: 5,
                                marginLeft: 40,
                                marginRight: 40,
                                marginBottom: 0,
                            }}
                            title='REGISTER NOW'
                            onPress={handleRegisterRequest}
                        />
                    </Card>
                </View>
            </>
        );
    }
};
export default RallyDetails;
const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    cardContainer: {
        marginTop: 30,
    },
    rallyCard: {
        flex: 1,
        marginTop: 10,
    },
    rallyItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: Colors.primary,
        // flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        elevation: 3,
        shadowColor: Colors.primary500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    nameContainer: {},
    nameText: { fontSize: 28, fontWeight: 'bold' },
    dateContainer: { alignItems: 'center' },
    dateValues: { fontSize: 30, fontWeight: 'bold' },
    timeContainer: { alignItems: 'center', marginVertical: 10 },
    timeValues: { fontSize: 28, fontWeight: 'bold' },
    addressWrapper: {
        alignItems: 'center',
    },
    addressContainer: {
        marginTop: 15,
    },
    addressText: {
        fontSize: 24,
    },
    notesContainer: { margin: 15, alignItems: 'center' },
    notesText: {},
    location: {
        color: Colors.primary,
    },
});
