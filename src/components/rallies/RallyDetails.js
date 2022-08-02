import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
    Modal,
} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Surface } from 'react-native-paper';
import CustomButton from '../ui/CustomButton';
import RallyMap from './Rally.Map';
import CardDate from '../ui/RallyCardDate';
import LoadingOverly from '../../components/ui/LoadingOverlay';
import { Colors } from '../../constants/colors';
import { printObject } from '../../utils/helpers';
import {
    dateNumsToLongDayLongMondayDay,
    dateNumToDisplayTime,
} from '../../utils/date';

const RallyDetails = (rallyIn) => {
    // printObject('S.C.R.RD:23==>>>', rallyIn.rally);
    //always get the latest from allRallies
    const [showNoProfileModal, setShowNoProfileModal] = useState(false);
    const me = useSelector((state) => state.users.currentUser);
    let ral = useSelector((state) =>
        state.rallies.allRallies.filter((r) => r.uid === rallyIn.uid)
    );
    // printObject('S.C.R.RD:28==>>>REDUX', rallyIn.rally);
    const rally = rallyIn.rally;
    const navigation = useNavigation();
    // const dispatch = useDispatch();
    // let ral = useSelector((state) =>
    //     state.rallies.allRallies.filter((r) => r.uid === rally.rallyId)
    // );
    // let rally = ral[0];
    // printObject('rally', rally);
    const handleRegisterRequest = () => {
        // if the user has their profile done, they can register,
        // otherwise, we show modal informing them of profile requirement.
        if (me.profile !== true) {
            setShowNoProfileModal(true);
            return;
        } else {
            navigation.navigate('RallyRegister', {
                rally: rally,
            });
        }
    };
    const handleNoProfileClick = () => {
        // close the dialog
        setShowNoProfileModal(false);
        // go to profile.
        navigation.navigate('Profile');
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
                    <Modal visible={showNoProfileModal} animationStyle='slide'>
                        <Surface style={styles.modalSurface}>
                            <View>
                                <Text style={styles.modalTitle}>
                                    You cannot register for an event prior to
                                    completing your profile.
                                </Text>
                            </View>
                            <View style={styles.modalButtonWrapper}>
                                <View style={styles.modalButton}>
                                    <CustomButton
                                        title='OKAY'
                                        graphic={null}
                                        cbStyles={{
                                            backgroundColor: Colors.gray35,
                                            color: 'black',
                                        }}
                                        txtColor='white'
                                        onPress={() =>
                                            setShowNoProfileModal(false)
                                        }
                                    />
                                </View>
                            </View>
                        </Surface>
                    </Modal>
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
                                <View style={styles.mapContainer}>
                                    <View style={styles.mapImage}>
                                        <Text>WHOOP!!</Text>
                                        <RallyMap rally={rally} />
                                    </View>
                                </View>
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
    modalSurface: {
        marginTop: 200,
        marginHorizontal: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    modalButtonWrapper: {
        marginHorizontal: 10,
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
    mapContainer: {
        marginHorizontal: 20,

        justifyContent: 'center',
        // paddingHorizontal: 20,
    },
    mapImage: {
        flexDirection: 'column',
        // flex: 1,
        // maxWidth: '80%',
        // alignItems: 'center',
        // alignContent: 'center',
        // justifyContent: 'center',
    },
});
