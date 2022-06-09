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

const RallyDetails = ({ rallyId }) => {
    const navigation = useNavigation();
    const rallyEntry = useSelector((state) =>
        state.rallies.publicRallies.filter((r) => r.uid === rallyId)
    );
    const rally = rallyEntry[0];
    return (
        <>
            <RallyLocationInfo rally={rally} />
            <RallyLogisticsInfo rallyId={rallyId} />
            <RallyContactInfo rallyId={rallyId} />
            <RallyMealInfo rallyId={rallyId} />
            <View style={styles.buttonContainer}>
                {/* <CustomButton
                    title='Edit Event'
                    graphic={null}
                    cbStyles={{ backgroundColor: 'green', color: 'white' }}
                    onPress={() =>
                        navigation.navigate('RallyEditFlow', {
                            rallyId: rallyId,
                            stage: 1,
                        })
                    }
                /> */}
            </View>
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
