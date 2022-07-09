import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CardDate from '../ui/RallyCardDate';
import LoadingOverly from '../../components/ui/LoadingOverlay';
import { Colors } from '../../constants/colors';
import { printObject } from '../../utils/helpers';
import {
    dateNumsToLongDayLongMondayDay,
    dateNumToDisplayTime,
} from '../../utils/date';

const RallyDetails = (rallyIn) => {
    printObject('S.C.R.RD:23==>>>', rallyIn.rally);
    //always get the latest from allRallies
    let ral = useSelector((state) =>
        state.rallies.allRallies.filter((r) => r.uid === rallyIn.uid)
    );
    printObject('S.C.R.RD:28==>>>REDUX', rallyIn.rally);
    const rally = rallyIn.rally;
    const navigation = useNavigation();
    // const dispatch = useDispatch();
    // let ral = useSelector((state) =>
    //     state.rallies.allRallies.filter((r) => r.uid === rally.rallyId)
    // );
    // let rally = ral[0];
    // printObject('rally', rally);
    const handleRegisterRequest = () => {
        navigation.navigate('RallyRegister', {
            rally: rally,
        });
    };
    //-----------------------------------
    // get long date and break apart to display better
    const lDate = dateNumsToLongDayLongMondayDay(rally.eventDate);
    //find the comma
    const cma = lDate.indexOf(',');
    const dow = lDate.substring(0, cma);
    const calDate = lDate.substring(cma + 2);
    if (!rally) {
        return <LoadingOverly />;
    } else {
        return (
            <>
                <ImageBackground
                    source={require('../../components/images/background.png')}
                    style={styles.bgImageContainer}
                >
                    <ScrollView>
                        <View style={styles.cardContainer}>
                            <Card style={styles.rallyCard}>
                                <View style={styles.nameContainer}>
                                    <Card.Title style={styles.nameText}>
                                        {rally.name}
                                    </Card.Title>
                                </View>
                                <Card.Divider />
                                <View style={styles.dateContainer}>
                                    <Text style={styles.dateValues}>{dow}</Text>
                                    <Text style={styles.dateValues}>
                                        {calDate}
                                    </Text>
                                </View>
                                <View style={styles.timeContainer}>
                                    <Text style={styles.timeValues}>
                                        {dateNumToDisplayTime(rally.startTime)}{' '}
                                        - {dateNumToDisplayTime(rally.endTime)}
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
                                {rally?.meal?.offered === true ? (
                                    <View style={styles.mealOfferRow}>
                                        <View style={styles.mealOfferWrapper}>
                                            <Text style={styles.mealOfferText}>
                                                MEAL AVAILABLE!!
                                            </Text>
                                        </View>
                                    </View>
                                ) : null}
                                {rally?.message.length > 0 ? (
                                    <View style={styles.notesContainer}>
                                        <Text style={styles.notesText}>
                                            {rally.message}
                                        </Text>
                                    </View>
                                ) : null}
                                <View style={styles.registerButtonWrapper}>
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
                                </View>
                            </Card>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </>
        );
    }
};
export default RallyDetails;
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
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
    notesContainer: { margin: 0, alignItems: 'center' },
    notesText: {
        color: 'black',
        marginVertical: 10,
    },
    location: {
        color: Colors.primary,
    },
    mealOfferRow: { alignItems: 'center', marginVertical: 10 },
    mealOfferWrapper: {
        backgroundColor: 'yellow',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
    },
    mealOfferText: {},
    registerButtonWrapper: { marginTop: 10 },
    graphicWrapper: {
        // justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        // width: '85%',
    },
});
