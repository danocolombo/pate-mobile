import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import RallyLocationInfo from '../info/Rally.Location.Info';
import RallyLogisticsInfo from '../info/Rally.Logistics.Info';
import RallyContactInfo from '../info/Rally.Contact.Info';
import RallyMealInfo from '../info/Rally.Meal.Info';
import CustomButton from '../../ui/CustomButton';
import { putRally } from '../../../providers/rallies';
import { addNewRally } from '../../../features/rallies/ralliesSlice';
import { Colors } from '../../../constants/colors';
import { printObject } from '../../../utils/helpers';

const RallyNewConfirmation = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    // const tmp = useSelector((state) => state.rallies.tmpRally);
    let rally = useSelector((state) => state.rallies.tmpRally);
    printObject('CONFIRMING rally ++++++++++++++++++++++++', rally);
    let rallyBasic = {};
    //--- need to add the basics for an add ----
    rallyBasic.status = 'draft';
    rallyBasic.id = '';

    const me = {
        name: user.firstName + ' ' + user.lastName,
        id: user.uid,
        phone: user.phone,
        email: user.email,
    };
    rallyBasic.coordinator = me;
    rallyBasic.region = 'us#east';
    if (rally.stateProv === 'TT') {
        rallyBasic.eventRegion = 'test';
    } else {
        rallyBasic.eventRegion = 'east';
    }

    const yr = rally.eventDate.substr(0, 4);
    const mo = rally.eventDate.substr(4, 2);
    const da = rally.eventDate.substr(6, 2);
    let eventCompKey =
        yr +
        '#' +
        mo +
        '#' +
        rally.stateProv +
        '#' +
        da +
        '#' +
        'TBD' +
        '#' +
        rallyBasic.coordinator.id;
    rallyBasic.eventCompKey = eventCompKey;

    let newRally = { ...rally, ...rallyBasic };
    printObject('CONFIRMING tmpRally:', rally);
    printObject('newRally', newRally);
    function handleConfirmation(newRally) {
        //printObject('SAVING', newRally);
        putRally(newRally, user).then((response) => {
            console.log('response: \n', response);
            console.log('submitted rally', newRally);
            dispatch(addNewRally(response));
            navigation.navigate('Serve', null);
        });
    }
    return (
        <>
            <RallyLocationInfo rallyId={newRally} />
            <RallyLogisticsInfo rallyId={newRally} />
            <RallyContactInfo rallyId={newRally} />
            <RallyMealInfo rallyId={newRally} />
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
