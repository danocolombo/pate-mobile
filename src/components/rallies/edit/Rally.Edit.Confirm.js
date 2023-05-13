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
import {
    getPhoneType,
    CONFIG,
    createPatePhone,
    objectsHaveTheSameValues,
} from '../../../utils/helpers';

import {
    printObject,
    createAWSUniqueID,
    createEventCompKey,
} from '../../../utils/helpers';
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
            //** ******************************************* */
            //* EXISTING EVENT
            //** ******************************************* */
            let derivedCompKey = createEventCompKey(
                newRally.id,
                newRally.eventDate,
                newRally.location.stateProv,
                user.id
            );
            const tmp = { ...newRally, eventCompKey: derivedCompKey };

            //if we have a new meal we need to get a new AWS id
            if (tmp?.meal?.id === '0') {
                let newMealId = createAWSUniqueID();
                const mealUpdate = {
                    ...tmp.meal,
                    id: newMealId,
                    mealEventId: tmp.id,
                };
                tmp = {
                    ...tmp,
                    meal: mealUpdate,
                };
            }
            printObject('REC:132-->resulting in:\n', tmp);

            dispatch(updateGathering(tmp));
            dispatch(updateRally(tmp));
            navigation.navigate('Serve', null);
        } else {
            //** ******************************************* */
            //* NEW EVENT
            //** ******************************************* */
            let derivedId = createAWSUniqueID();
            let derivedLocationId = createAWSUniqueID();
            let derivedCompKey = createEventCompKey(
                derivedId,
                newRally.eventDate,
                newRally.location.stateProv,
                user.id
            );
            newRally = {
                ...newRally,
                id: derivedId,
                eventCompKey: derivedCompKey,
                status: 'draft',
                message: '',
                graphic: '',
                plannedCount: 0,
                actualCount: 0,
                mealPlannedCount: 0,
                mealActualCount: 0,
                eventLocationEventsId: derivedLocationId,
                location: {
                    ...newRally.location,
                    id: derivedLocationId,
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
const WAScreateEventCompKey = (rally) => {
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
