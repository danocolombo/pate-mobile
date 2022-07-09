import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NumberInput from '../ui/NumberInput/NumberInput';
import { Colors } from '../../constants/colors';
const RegisterMeal = ({ ral, mealCount, onPress }) => {
    return (
        <View style={styles.registrationCountContainer}>
            <Text style={styles.regisrationCountText}>
                There is a meal offered at the event.
            </Text>
            {ral?.meal?.cost ? (
                <View style={styles.mealTextWrapper}>
                    <Text style={styles.mealCostText}>
                        Cost: {ral.meal.cost}
                    </Text>
                    <Text style={styles.mealStartTime}>
                        Meal starts at {ral.meal.startTime}
                    </Text>
                    <Text style={styles.mealCostText}>
                        Will any of your group like to attend?
                    </Text>
                </View>
            ) : null}
            <View style={styles.registrationCountNumberContainer}>
                <NumberInput value={mealCount} onAction={onPress} />
            </View>
        </View>
    );
};

export default RegisterMeal;

const styles = StyleSheet.create({
    registrationCountContainer: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: Colors.primary,
        marginVertical: 10,
        backgroundColor: Colors.gray10,
    },
    regisrationCountText: {
        fontSize: 16,
        padding: 10,
    },
    mealTextWrapper: {
        paddingBottom: 10,
    },
    mealCostText: {
        textAlign: 'center',
    },
    mealStartTime: {
        textAlign: 'center',
        paddingVertical: 5,
    },
    registrationCountNumberContainer: {
        marginBottom: 10,
    },
});
