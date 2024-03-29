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
import { systemm } from '../../../features/system/systemSlice';
import { getPhoneType, CONFIG, createPatePhone } from '../../../utils/helpers';
import { Colors } from '../../../constants/colors';

import { printObject, getUniqueId } from '../../../utils/helpers';
import { faCropSimple } from '@fortawesome/free-solid-svg-icons';
import { Analytics } from 'aws-amplify';

const RallyNewConfirmation = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    const tmp = useSelector((state) => state.rallies.tmpRally);
    const systemRegion = useSelector((state) => state.system.region);
    // let rally = useSelector((state) => state.rallies.tmpRally);
    // printObject('CONFIRMING rally ++++++++++++++++++++++++', rally);
    let rallyBasic = {};
    // printObject('REC:29 rally', rally);
    // need to determine if this is new or edit
    if (!tmp.uid) {
        // this is new entry
        rallyBasic.status = 'draft';
        rallyBasic.id = '';
    }
    // we will always update with latest rep info
    const me = {
        name: user.firstName + ' ' + user.lastName,
        id: user.uid,
        phone: user.phone,
        email: user.email,
    };
    rallyBasic.coordinator = me;

    // rallyBasic.region = process.env.REGION;
    rallyBasic.region = systemRegion;
    if (tmp.stateProv === 'TT') {
        rallyBasic.eventRegion = 'test';
    } else {
        //EVENT_REGION
        const parts = systemRegion.split('#');
        //rallyBasic.eventRegion = process.env.EVENT_REGION;
        rallyBasic.eventRegion = parts[1];
    }
    let strippedPhone;
    // printObject('REC:52 tmp:', tmp);
    // console.log('REC:53 tmp?.contact?.phone', tmp?.contact?.phone);
    if (tmp?.contact?.phone !== '') {
        strippedPhone = createPatePhone(tmp?.contact?.phone);
    }
    // create new eventCompKey in case date changed
    const yr = tmp.eventDate.substr(0, 4);
    const mo = tmp.eventDate.substr(4, 6);
    const da = tmp.eventDate.substr(6);
    let keyToUse;
    tmp?.uid ? (keyToUse = tmp.uid) : (keyToUse = 'TBD');
    let eventCompKey =
        yr +
        '#' +
        mo +
        '#' +
        tmp.stateProv +
        '#' +
        da +
        '#' +
        keyToUse +
        '#' +
        rallyBasic.coordinator.id;
    rallyBasic.eventCompKey = eventCompKey;

    let newRally = { ...tmp, ...rallyBasic };
    // printObject('CONFIRMING tmpRally:', rally);
    // printObject('newRally', newRally);
    function handleConfirmation(newRally) {
        printObject('S.R.E.REC:82-->newRally', newRally);
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
        if (process.env.ENV === 'DEV') {
            if (newRally?.uid) {
                // DEV - UPDATE RALLY
                dispatch(updateRally(newRally));
                navigation.navigate('Serve', null);
            } else {
                // for DEV mode you need something in id;
                getUniqueId().then((new_id) => {
                    let tmpId = { uid: new_id };
                    let newRallyToSave = { ...newRally, ...tmpId };
                    dispatch(addNewRally(newRallyToSave));
                });
                navigation.navigate('Serve', null);
            }
        } else {
            if (newRally?.uid) {
                //   UPDATE EXISTING EVENT
                let obj = {
                    operation: 'updateEvent',
                    payload: {
                        Item: newRally,
                    },
                };
                let body = JSON.stringify(obj);

                let api2use = process.env.AWS_API_ENDPOINT + '/events';
                axios
                    .post(api2use, body, CONFIG)
                    .then((response) => {
                        //dispatch(updateRally(response.data.Item));
                        dispatch(updateRally(newRally));
                    })
                    .catch((err) => {
                        console.log('REC-106: error:', err);
                    });
                Analytics.record({
                    name: 'eventUpdated',
                    attributes: { userId: user.uid, body: body },
                    metrics: { eventUpdated: 1 },
                });
            } else {
                //todo: need DDB call
                putRally(newRally, user).then((response) => {
                    console.log('submitted rally', newRally);
                    dispatch(addNewRally(response.Item));
                });
                Analytics.record({
                    name: 'eventAdded',
                    attributes: { userId: user.uid, body: newRally },
                    metrics: {
                        eventAdded: 1,
                    },
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
                <RallyLocationInfo rally={newRally} />
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
