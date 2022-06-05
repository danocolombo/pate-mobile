import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import RallyLocationInfo from '../info/Rally.Location.Info';
import RallyLogisticsInfo from '../info/Rally.Logistics.Info';
import RallyContactInfo from '../info/Rally.Contact.Info';
import RallyMealInfo from '../info/Rally.Meal.Info';
import CustomButton from '../../ui/CustomButton';
import { Colors } from '../../../constants/colors';
import { printObject } from '../../../utils/helpers';

const RallyNewConfirmation = ({ rallyId }) => {
    const navigation = useNavigation();
    const handleConfirmation = () => {
        console.log('saving Tmp to Actual');
    };
    return (
        <>
            <RallyLocationInfo rallyId={rallyId} />
            <RallyLogisticsInfo rallyId={rallyId} />
            <RallyContactInfo rallyId={rallyId} />
            <RallyMealInfo rallyId={rallyId} />
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
