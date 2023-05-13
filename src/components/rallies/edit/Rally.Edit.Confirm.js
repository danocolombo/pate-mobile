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
    //addNewRally,
    updateRally,
} from '../../../features/division/divisionSlice';
import {
    updateGathering,
    newGathering,
} from '../../../providers/gatherings.provider';
import { getPhoneType, CONFIG, createPatePhone } from '../../../utils/helpers';

import { printObject, createAWSUniqueID } from '../../../utils/helpers';
import { Analytics } from 'aws-amplify';
import { or } from 'react-native-reanimated';

const RallyNewConfirmation = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const REGION = useSelector((state) => state.system.region);
    const feo = useSelector((state) => state.division);
    const user = useSelector((state) => state.users.currentUser);
    const tmp = useSelector((state) => state.rallies.tmpRally);
    const originalGathering = useSelector((state) => state.rallies.rallyCopy);
    const systemRegion = useSelector((state) => state.system.region);
    // let rally = useSelector((state) => state.rallies.tmpRally);

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
    rallyBasic.eventRegion =
        user.affiliations.active.organizationCode +
        ':' +
        user.affiliations.active.divisionCode;

    let strippedPhone;
    // printObject('REC:52 tmp:', tmp);
    // console.log('REC:53 tmp?.contact?.phone', tmp?.contact?.phone);
    if (tmp?.contact?.phone !== '') {
        strippedPhone = createPatePhone(tmp?.contact?.phone);
    }
    // create new eventCompKey in case date changed

    let newRally = { ...tmp };
    // printObject('CONFIRMING tmpRally:', rally);
    // printObject('newRally', newRally);
    function handleConfirmation(newRally) {
        printObject('HANDLE_CONFIRMATION-->newRally:\n', newRally);
        // return;
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
                ...newRally.contact,
                phone: valueToUse,
            };
            newRally.contact = newContact;
            // printObject('updatedRally', newRally);
        }
        const coordinator = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
        };
        const division = {
            id: user.affiliations.active.divisionId,
            code: user.affiliations.active.region,
            organization: {
                id: user.affiliations.active.organizationId,
                code: user.affiliations.active.organizationCode,
                description: user.affiliations.active.organizationDescription,
            },
        };
        newRally = {
            ...newRally,
            coordinator: { ...coordinator },
            division: { ...division },
        };

        if (newRally?.id) {
            let eckRally = createEventCompKey(newRally);
            printObject('REC:125-->eckRally:\n', eckRally);
            newRally = eckRally;

            printObject('REC:123-->starting tmp:\n', tmp);

            let updatedGathering = tmp;
            //if we have a new meal we need to get a new AWS id
            if (tmp?.meal?.id === '0') {
                let newMealId = createAWSUniqueID();
                const mealUpdate = {
                    ...tmp.meal,
                    id: newMealId,
                    mealEventId: tmp.id,
                };
                updatedGathering = {
                    ...updatedGathering,
                    meal: mealUpdate,
                };
            }
            printObject('REC:132-->resulting in:\n', updatedGathering);

            dispatch(updateGathering(tmp));
            dispatch(updateRally(tmp));
            navigation.navigate('Serve', null);

            // // DEV - UPDATE RALLY
            // let OLDDANO = false;
            // if (OLDDANO) {
            //     //* *************************************************
            //     //      TEST START
            //     //* *************************************************
            //     //      locationInfo
            //     const locationInfo = {
            //         id: newRally?.location?.id,
            //         street: newRally?.location?.street,
            //         city: newRally?.location?.city,
            //         stateProv: newRally?.location?.stateProv,
            //         postalCode: newRally?.location?.postalCode,
            //         latitude: newRally?.geolocation?.lat,
            //         longitude: newRally?.geolocation?.lng,
            //     };
            //     //      contact
            //     const contactInfo = {
            //         id: '', //      NEED THIS VALUE
            //         firstName: '', //      NEED THIS VALUE
            //         lastName: '', //      NEED THIS VALUE
            //         email: newRally?.contact?.email,
            //         phone: newRally?.contact?.phone,
            //     };
            //     //      meal
            //     const mealInfo = {
            //         id: '', //      NEED THIS VALUE
            //         startTime: newRally?.meal?.startTime,
            //         deadline: newRally?.meal?.deadline,
            //         cost: newRally?.meal?.cost,
            //         plannedCount: newRally?.meal?.plannedCount,
            //         actualCount: newRally?.meal?.actualCount,
            //         message: newRally?.meal?.message,
            //         mealEventId: newRally?.id,
            //     };
            //     const eventInfo = {
            //         id: newRally?.id,
            //         eventCompKey: newRally?.eventCompKey,
            //         eventDate: newRally?.eventDate,
            //         startTime: newRally?.startTime,
            //         endTime: newRally?.endTime,
            //         name: newRally?.name,
            //         plannedCount: newRally?.plannedCount,
            //         actualCount: newRally?.actualCount,
            //         mealPlannedCount: newRally?.mealPlannedCount,
            //         mealActualCount: newRally?.mealActualCount,
            //         graphic: newRally?.graphic,
            //         //      message: ???
            //         eventLocationEventsId: newRally?.location?.id,
            //         eventContactEventsId: '', //      NEED THIS VALUE
            //         eventMealId: '', //      NEED THIS VALUE
            //     };

            //     console.log('newRally.id:', newRally.id);
            //     printObject('eventInfo:\n', eventInfo);
            //     printObject('locationInfo:\n', locationInfo);
            //     printObject('contactInfo:\n', contactInfo);
            //     printObject('mealInfo:\n', mealInfo);
            //     //* *************************************************
            //     //      TEST END
            //     //* *************************************************
            // }
        } else {
            let eckRally = createEventCompKey(newRally);
            newRally = eckRally;
            let newLocationId = createAWSUniqueID();
            newRally = {
                ...newRally,
                status: 'draft',
                message: '',
                graphic: '',
                plannedCount: 0,
                actualCount: 0,
                mealPlannedCount: 0,
                mealActualCount: 0,
                eventLocationEventsId: newLocationId,
                location: {
                    ...newRally.location,
                    id: newLocationId,
                },
                userEventsId: user.id,
                divisionEventsId: newRally.division.id,
            };

            if (Object.keys(newRally.meal).length === 0) {
                newRally.meal = null;
            } else {
                const theId = createAWSUniqueID();
                newRally = {
                    ...newRally,
                    meal: {
                        ...newRally.meal,
                        id: theId,
                        mealEventsId: newRally.id,
                    },
                };
            }
            if (Object.keys(newRally.contact).length === 0) {
                newRally.contact = null;
            } else {
                if (!newRally?.contact.id) {
                    let newId = createAWSUniqueID();
                    newRally = {
                        ...newRally,
                        eventContactEventsId: newId,
                        contact: {
                            ...newRally.contact,
                            id: newId,
                        },
                    };
                }
            }
            printObject('GATHERING_INFO-->newRally:\n', newRally);
            // return;
            let DANO = true;
            if (DANO) {
                const gatheringInfo = {
                    originalEvent: originalGathering,
                    newEvent: newRally,
                };
                dispatch(newGathering(gatheringInfo));
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
const createEventCompKey = (rally) => {
    let rallyToUse = rally;
    const yr = rallyToUse.eventDate.substr(0, 4);
    const mo = rallyToUse.eventDate.substr(5, 2);
    const da = rallyToUse.eventDate.substr(8);
    if (!rallyToUse?.id) {
        const newId = createAWSUniqueID();
        rallyToUse.id = newId;
    }
    let eventCompKey =
        yr +
        '#' +
        mo +
        '#' +
        da +
        '#' +
        rally.location.stateProv +
        '#' +
        rallyToUse.id +
        '#' +
        rallyToUse.coordinator.id;
    rallyToUse.eventCompKey = eventCompKey;
    return rallyToUse;
};
