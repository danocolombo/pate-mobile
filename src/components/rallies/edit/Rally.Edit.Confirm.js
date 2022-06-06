import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import RallyLocationInfo from '../info/Rally.Location.Info';
import RallyLogisticsInfo from '../info/Rally.Logistics.Info';
import RallyContactInfo from '../info/Rally.Contact.Info';
import RallyMealInfo from '../info/Rally.Meal.Info';
import CustomButton from '../../ui/CustomButton';
import { Colors } from '../../../constants/colors';
import { printObject } from '../../../utils/helpers';

const RallyNewConfirmation = () => {
    const navigation = useNavigation();
    const tmp = useSelector((state) => state.rallies.tmpRally);
    const rally = useSelector((state) => state.rallies.tmpRally);
    printObject('CONFIRMING rally', rally);
    const handleConfirmation = () => {
        console.log('saving Tmp to Actual');
    };
    printObject('CONFIRMING tmpRally:', tmp);
    return (
        <>
            <RallyLocationInfo rallyId={'tmpRally'} />
            <RallyLogisticsInfo rallyId={'tmpRally'} />
            <RallyContactInfo rallyId={'tmpRally'} />
            <RallyMealInfo rallyId={'tmpRally'} />
            <View style={styles.buttonContainer}>
                <CustomButton
                    title='Edit Event'
                    graphic={null}
                    cbStyles={{ backgroundColor: 'green', color: 'white' }}
                    onPress={() =>
                        navigation.navigate('RallyEditFlow', {
                            rallyId: rallyId,
                            stage: 1,
                        })
                    }
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
