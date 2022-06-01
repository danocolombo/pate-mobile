import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import EventListCard from '../ui/EventListCard';
const ServeMyRallies = () => {
    let rallies = useSelector((state) => state.rallies.publicRallies);
    const navigation = useNavigation();
    return (
        <View style={styles.rootContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>Your Events</Text>
                <View>
                    <Button
                        title='NEW'
                        onPress={() => navigation.navigate('ServeRallyForm')}
                    />
                </View>
            </View>
            <View>
                <View style={styles.infoArea}>
                    <Text>This is where your events will be listed.</Text>
                </View>
            </View>

            <View>
                {rallies.map((ral) => (
                    <EventListCard
                        key={ral.uid}
                        date={ral.eventDate}
                        locationName={ral.name}
                        city={ral.city}
                        stateProv={ral.stateProv}
                    />
                ))}
            </View>
        </View>
    );
};

export default ServeMyRallies;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    screenHeader: {
        alignItems: 'center',
    },
    screenHeaderText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    infoArea: {
        alignItems: 'center',
    },
    eventListSurface: {
        marginTop: 10,
        padding: 8,
        width: '80%',
        height: 200,
        justifyContent: 'center',
        elevation: 5,
    },
});
