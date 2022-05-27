import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import CardDate from '../ui/RallyCardDate';
import { Colors } from '../../constants/colors';

function RallyItem({ uid, eventDate, name, city, stateProv }) {
    const navigation = useNavigation();
    function rallyPressHandler() {
        navigation.navigate('Rally', {
            uid: uid,
            eventDate: eventDate,
        });
    }

    return (
        <>
            <Pressable
                onPress={rallyPressHandler}
                style={({ pressed }) => pressed && styles.pressed}
            >
                {/* <View style={styles.rallyItem}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View>
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                }}
                            >
                                <View>
                                    <CardDate date={eventDate} />
                                </View>
                                <Text style={styles.location}>
                                    {city}, {stateProv}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.textBase, styles.location]}>
                            {city}, {stateProv}
                        </Text>
                    </View>
                </View>
            </View> */}
            </Pressable>
            <Card style={styles.rallyCard}>
                <Card.Title>{name}</Card.Title>
                <Card.Divider />
                {/* <Card.Image source={require('../images/pic2.jpg')} /> */}

                <Image
                    source={{
                        uri: 'https://pate20213723ed06531948b6a5a0b14d1c3fb499175248-dev.s3.amazonaws.com/public/events/9262496f849827c155ca8865b7a39b65CORDELE.jpg',
                    }}
                    style={{ width: 400, height: 200 }}
                    PlaceholderContent={<CardDate />}
                />
                <Text style={{ marginBottom: 10 }}>Come check it out</Text>
                <Button
                    // icon={<Icon name='code' color='#ffffff' />}
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                    }}
                    title='VIEW MORE DETAILS'
                />
            </Card>
        </>
    );
}

export default RallyItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    rallyCard: {
        flex: 1,
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
    location: {
        color: Colors.primary100,
    },
    rallyDate: {
        color: 'white',
        fontSize: 20,
    },
    location: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
});
