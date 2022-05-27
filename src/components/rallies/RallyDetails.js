import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import CardDate from '../ui/RallyCardDate';
import LoadingOverly from '../../components/ui/LoadingOverlay';
import { Colors } from '../../constants/colors';
import { printObject } from '../../utils/helpers';

const RallyDetails = ({ rallyId }) => {
    const dispatch = useDispatch();
    let ral = useSelector((state) =>
        state.rallies.publicRallies.filter((r) => r.uid === rallyId)
    );
    let rally = ral[0];

    if (!rally) {
        return <LoadingOverly />;
    } else {
        return (
            <>
                <View style={styles.cardContainer}>
                    <Card style={styles.rallyCard}>
                        <Card.Title style={styles.location}>
                            {rally.name}
                        </Card.Title>
                        <Card.Divider />
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
                        {/* <Card.Image source={require('../images/pic2.jpg')} /> */}

                        {/* <Image
                        source={{
                            uri: 'https://pate20213723ed06531948b6a5a0b14d1c3fb499175248-dev.s3.amazonaws.com/public/events/9262496f849827c155ca8865b7a39b65CORDELE.jpg',
                        }}
                        style={{ width: 400, height: 200 }}
                        PlaceholderContent={<CardDate />}
                    /> */}
                        <Text style={{ marginBottom: 10 }}>
                            Come check it out
                        </Text>
                        <Button
                            // icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{
                                borderRadius: 5,
                                marginLeft: 40,
                                marginRight: 40,
                                marginBottom: 0,
                            }}
                            title='REGISTER NOW'
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
    addressWrapper: {
        alignItems: 'center',
    },
    addressContainer: {
        marginTop: 5,
    },
    addressText: {
        fontSize: 20,
    },
    location: {
        color: Colors.primary,
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
