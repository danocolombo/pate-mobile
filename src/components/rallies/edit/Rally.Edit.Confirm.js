import { View, Text, StyleSheet, Image } from 'react-native';
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
import { Colors } from '../../../constants/colors';
import { printObject } from '../../../utils/helpers';

const RallyNewConfirmation = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    // const tmp = useSelector((state) => state.rallies.tmpRally);
    let rally = useSelector((state) => state.rallies.tmpRally);
    // printObject('CONFIRMING rally ++++++++++++++++++++++++', rally);
    let rallyBasic = {};
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
    // create new eventCompKey in case date changed
    const yr = rally.eventDate.substr(0, 4);
    const mo = rally.eventDate.substr(4, 2);
    const da = rally.eventDate.substr(6, 2);
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
        if (process.env.ENV === 'DEBUG') {
            if (newRally?.uid) {
                // DEBUG - UPDATE RALLY
                dispatch(updateRally(newRally));
                navigation.navigate('Serve', null);
            } else {
                // DEBUG - NEW RALLY
                dispatch(addNewRally(response.Item));
                navigation.navigate('Serve', null);
            }
        } else {
            if (newRally?.uid) {
                putRally(newRally).then((response) => {
                    console.log('submitted rally', newRally);
                    dispatch(updateRally(response.Item));
                    navigation.navigate('Serve', null);
                });
            } else {
                putRally(newRally, user).then((response) => {
                    console.log('submitted rally', newRally);
                    dispatch(addNewRally(response.Item));
                    navigation.navigate('Serve', null);
                });
            }
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
                    cbStyles={{ backgroundColor: 'yellow', color: 'black' }}
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
