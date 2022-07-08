import { View, Text, StyleSheet, Image } from 'react-native';
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
import { Colors } from '../../../constants/colors';

import { printObject, getUniqueId } from '../../../utils/helpers';
import { faCropSimple } from '@fortawesome/free-solid-svg-icons';

const RallyNewConfirmation = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    // const tmp = useSelector((state) => state.rallies.tmpRally);
    let rally = useSelector((state) => state.rallies.tmpRally);
    // printObject('CONFIRMING rally ++++++++++++++++++++++++', rally);
    let rallyBasic = {};
    // printObject('REC:29 rally', rally);
    // need to determine if this is new or edit
    if (!rally.uid) {
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

    rallyBasic.region = process.env.REGION;
    if (rally.stateProv === 'TT') {
        rallyBasic.eventRegion = 'test';
    } else {
        //EVENT_REGION
        rallyBasic.eventRegion = process.env.EVENT_REGION;
    }
    let strippedPhone;
    // printObject('REC:52 rally:', rally);
    // console.log('REC:53 rally?.contact?.phone', rally?.contact?.phone);
    if (rally?.contact?.phone !== '') {
        strippedPhone = createPatePhone(rally?.contact?.phone);
    }
    // create new eventCompKey in case date changed
    const yr = rally.eventDate.substr(0, 4);
    const mo = rally.eventDate.substr(4, 6);
    const da = rally.eventDate.substr(6);
    let keyToUse;
    rally?.uid ? (keyToUse = rally.uid) : (keyToUse = 'TBD');
    let eventCompKey =
        yr +
        '#' +
        mo +
        '#' +
        rally.stateProv +
        '#' +
        da +
        '#' +
        keyToUse +
        '#' +
        rallyBasic.coordinator.id;
    rallyBasic.eventCompKey = eventCompKey;

    let newRally = { ...rally, ...rallyBasic };
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
                    valueToUse = newRally.contact.phone;
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
            } else {
                //todo: need DDB call
                putRally(newRally, user).then((response) => {
                    console.log('submitted rally', newRally);
                    dispatch(addNewRally(response.Item));
                });
            }
            navigation.navigate('Serve', null);
        }
    }
    return (
        <>
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
        </>
    );
};

export default RallyNewConfirmation;
const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
});
