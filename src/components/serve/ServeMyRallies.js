import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import React from 'react';
import { Badge, List, Surface } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import CardDate from '../ui/RallyCardDate';
import EventListCard from '../ui/EventListCard';
const ServeMyRallies = () => {
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
                <View style={{ alignItems: 'center' }}>
                    <Surface style={styles.eventListSurface}>
                        <ScrollView>
                            <View>
                                <List.Item
                                    title='First Item'
                                    description='Item description'
                                    left={(props) => (
                                        <List.Icon {...props} icon='folder' />
                                    )}
                                />
                            </View>
                            <List.Item
                                title='First Item'
                                description='Item description'
                                left={(props) => (
                                    <List.Icon {...props} icon='folder' />
                                )}
                            />
                            <List.Item
                                title='First Item'
                                description='Item description'
                                left={(props) => (
                                    <List.Icon {...props} icon='folder' />
                                )}
                            />
                            <List.Item
                                title='First Item'
                                description='Item description'
                                left={(props) => (
                                    <List.Icon {...props} icon='folder' />
                                )}
                            />
                        </ScrollView>
                    </Surface>
                </View>
            </View>
            <View>
                <CardDate date='20220601' />
            </View>
            <View>
                <EventListCard
                    date='20220201'
                    locationName='Church'
                    city='Marron'
                    stateProv='TT'
                />
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
