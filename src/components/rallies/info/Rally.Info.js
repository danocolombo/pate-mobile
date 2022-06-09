import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import RallyLocationInfo from './Rally.Location.Info';
import RallyLogisticsInfo from './Rally.Logistics.Info';
import RallyContactInfo from './Rally.Contact.Info';
import RallyMealInfo from './Rally.Meal.Info';
import CustomButton from '../../ui/CustomButton';
import { Colors } from '../../../constants/colors';
import { printObject } from '../../../utils/helpers';
import { faCropSimple } from '@fortawesome/free-solid-svg-icons';

const RallyDetails = ({ rallyId }) => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.users.currentUser);
    const rallyEntry = useSelector((state) =>
        state.rallies.publicRallies.filter((r) => r.uid === rallyId)
    );
    const rally = rallyEntry[0];
    printObject('User------', user);
    printObject('rally---!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', rally);
    return (
        <>
            <RallyLocationInfo rally={rally} />
            <RallyLogisticsInfo rally={rally} />
            <RallyContactInfo rally={rally} />
            <RallyMealInfo rally={rally} />
            <View style={styles.buttonContainer}></View>
            {user.uid === rally.coordinator.id ? (
                <View>
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            title='Edit This Event'
                            graphic={null}
                            cbStyles={{
                                backgroundColor: 'green',
                                color: 'white',
                            }}
                            txtColor='white'
                            onPress={() =>
                                navigation.navigate('RallyEditFlow', {
                                    rallyId: rally.uid,
                                    stage: 1,
                                })
                            }
                        />
                    </View>
                </View>
            ) : null}
        </>
    );
};

export default RallyDetails;
const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
});
