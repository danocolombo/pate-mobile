import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import RallyLocationInfo from '../info/Rally.Location.Info';
import RallyLogisticsInfo from '../info/Rally.Logistics.Info';
import RallyContactInfo from '../info/Rally.Contact.Info';
import RallyMealInfo from '../info/Rally.Meal.Info';
import CustomButton from '../../ui/CustomButton';
import { putRally } from '../../../providers/rallies';
import {
    addNewRally,
    updateRally,
} from '../../../features/rallies/ralliesSlice';
import { getPhoneType, CONFIG, createPatePhone } from '../../../utils/helpers';

import { printObject, getUniqueId } from '../../../utils/helpers';
import { Analytics } from 'aws-amplify';

const RallyNewConfirmation = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const REGION = useSelector((state) => state.system.region);
    const feo = useSelector((state) => state.division);
    const user = useSelector((state) => state.users.currentUser);
    const tmp = useSelector((state) => state.rallies.tmpRally);
    const systemRegion = useSelector((state) => state.system.region);
    // let rally = useSelector((state) => state.rallies.tmpRally);
    printObject('CONFIRMING rally ++++++++++++++++++++++++', tmp);
    let rallyBasic = {};
    // printObject('REC:29 rally', rally);
    // need to determine if this is new or edit
    if (!tmp.id) {
        // this is new entry
        rallyBasic.status = 'draft';
        rallyBasic.id = '';
    }
    // we will always update with latest rep info
    const me = {
        name: user.firstName + ' ' + user.lastName,
        id: user.id,
        phone: user.phone,
        email: user.email,
    };
    rallyBasic.coordinator = me;

    // rallyBasic.region = process.env.REGION;
    rallyBasic.region = feo.region;
    rallyBasic.eventRegion = feo.appName;

    let strippedPhone;
    // printObject('REC:52 tmp:', tmp);
    // console.log('REC:53 tmp?.contact?.phone', tmp?.contact?.phone);
    if (tmp?.contact?.phone !== '') {
        strippedPhone = createPatePhone(tmp?.contact?.phone);
    }
    // create new eventCompKey in case date changed
    const yr = tmp.eventDate.substr(0, 4);
    const mo = tmp.eventDate.substr(4, 2);
    const da = tmp.eventDate.substr(6);
    let keyToUse;
    tmp?.uid ? (keyToUse = tmp.uid) : (keyToUse = 'TBD');
    let eventCompKey =
        yr +
        '#' +
        mo +
        '#' +
        da +
        '#' +
        tmp.stateProv +
        '#' +
        keyToUse +
        '#' +
        rallyBasic.coordinator.id;
    rallyBasic.eventCompKey = eventCompKey;

    let newRally = { ...tmp, ...rallyBasic };
    // printObject('CONFIRMING tmpRally:', rally);
    // printObject('newRally', newRally);
    function handleConfirmation(newRally) {
        // printObject('S.R.E.REC:82-->newRally', newRally);
        if (newRally?.contact?.phone) {
            // need value either blank or pateDate
            let valueToUse;
            let pType = getPhoneType(newRally.contact.phone);
            switch (pType) {
                case 'PATE':
                    valueToUse = newRally?.contact?.phone;
                    break;
                case 'MASKED':
                    // console.log(
                    //     'REC:90 newRally.contact.phone',
                    //     newRally.contact.phone
                    // );
                    valueToUse = createPatePhone(newRally.contact.phone);
                    break;
                default:
                    valueToUse = '';
                    break;
            }
            let newContact = {
                name: newRally?.contact?.name,
                phone: valueToUse,
                email: newRally?.contact?.email,
            };
            newRally.contact = newContact;
            // printObject('updatedRally', newRally);
        }

        if (newRally?.id) {
            // DEV - UPDATE RALLY
            let DANO = true;
            if (DANO) {
                //* *************************************************
                //      TEST START
                //* *************************************************
                //      locationInfo
                const locationInfo = {
                    id: newRally?.location?.id,
                    street: newRally?.location?.street,
                    city: newRally?.location?.city,
                    stateProv: newRally?.location?.stateProv,
                    postalCode: newRally?.location?.postalCode,
                    latitude: newRally?.geolocation?.lat,
                    longitude: newRally?.geolocation?.lng,
                };
                //      contact
                const contactInfo = {
                    id: '', //      NEED THIS VALUE
                    firstName: '', //      NEED THIS VALUE
                    lastName: '', //      NEED THIS VALUE
                    email: newRally?.contact?.email,
                    phone: newRally?.contact?.phone,
                };
                //      meal
                const mealInfo = {
                    id: '', //      NEED THIS VALUE
                    startTime: newRally?.meal?.startTime,
                    deadline: newRally?.meal?.deadline,
                    cost: newRally?.meal?.cost,
                    plannedCount: newRally?.meal?.plannedCount,
                    actualCount: newRally?.meal?.actualCount,
                    message: newRally?.meal?.message,
                    mealEventId: newRally?.id,
                };
                const eventInfo = {
                    id: newRally?.id,
                    eventCompKey: newRally?.eventCompKey,
                    eventDate: newRally?.eventDate,
                    startTime: newRally?.startTime,
                    endTime: newRally?.endTime,
                    name: newRally?.name,
                    plannedCount: newRally?.plannedCount,
                    actualCount: newRally?.actualCount,
                    mealPlannedCount: newRally?.mealPlannedCount,
                    mealActualCount: newRally?.mealActualCount,
                    graphic: newRally?.graphic,
                    //      message: ???
                    eventLocationEventsId: newRally?.location?.id,
                    eventContactEventsId: '', //      NEED THIS VALUE
                    eventMealId: '', //      NEED THIS VALUE
                };
                console.log('newRally.id:', newRally.id);
                printObject('eventInfo:\n', eventInfo);
                printObject('locationInfo:\n', locationInfo);
                printObject('contactInfo:\n', contactInfo);
                printObject('mealInfo:\n', mealInfo);
                //* *************************************************
                //      TEST END
                //* *************************************************
            } else {
                dispatch(updateRally(newRally));
            }
            navigation.navigate('Serve', null);
        } else {
            let DANO = true;
            if (DANO) {
                console.log('FALSE: newRally:\n', newRally);
            } else {
                // for DEV mode you need something in id;
                getUniqueId().then((new_id) => {
                    let tmpId = { uid: new_id };
                    let newRallyToSave = { ...newRally, ...tmpId };
                    dispatch(addNewRally(newRallyToSave));
                });
            }
            navigation.navigate('Serve', null);
        }

        // } else {
        //     if (newRally?.id) {
        //         // printObject('REC:128-->update(DDB):', newRally);
        //         //   UPDATE EXISTING EVENT
        //         let obj = {
        //             operation: 'updateEvent',
        //             payload: {
        //                 Item: newRally,
        //             },
        //         };
        //         let body = JSON.stringify(obj);

        //         let api2use = process.env.AWS_API_ENDPOINT + '/events';
        //         axios
        //             .post(api2use, body, CONFIG)
        //             .then((response) => {
        //                 // printObject('REC:142-->update(REDUX):', newRally);
        //                 dispatch(updateRally(newRally));
        //             })
        //             .catch((err) => {
        //                 console.log('REC-106: error:', err);
        //             });
        //         Analytics.record({
        //             name: 'eventUpdated',
        //             attributes: { userId: user.uid, body: body },
        //             metrics: { eventUpdated: 1 },
        //         });
        // } else {
        //     // printObject('REC:154-->new(DDB):', newRally);
        //     //todo: need DDB call
        //     putRally(newRally, user, feo.appName, feo.eventRegion)
        //         .then((response) => {
        //             //need to pass response.Item because we get UID back.
        //             // printObject('REC:158-->update(REDUX):', response.Item);
        //             dispatch(addNewRally(response.Item));
        //         })
        //         .catch((error) => {
        //             console.log('REC:162--->putRally error\n', error);
        //         });
        //     try {
        //         Analytics.record({
        //             name: 'eventAdded',
        //             attributes: { userId: user.uid, body: newRally },
        //             metrics: {
        //                 eventAdded: 1,
        //             },
        //         });
        //     } catch (error) {
        //         console.log('Analytics error:\n', error);
        //     }
        // }

        // }
    }
    return (
        <>
            <ImageBackground
                source={require('../../../components/images/background.png')}
                style={styles.bgImageContainer}
            >
                <RallyLocationInfo rally={newRally} title='Event Information' />
                <RallyLogisticsInfo rally={newRally} />
                <RallyContactInfo rally={newRally} />
                <RallyMealInfo rally={newRally} />
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title='Confirm & Save'
                        graphic={null}
                        cbStyles={{
                            backgroundColor: 'yellow',
                            color: 'black',
                            width: 200,
                            textAlign: 'center',
                        }}
                        onPress={() => handleConfirmation(newRally)}
                    />
                </View>
            </ImageBackground>
        </>
    );
};

export default RallyNewConfirmation;
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
});
