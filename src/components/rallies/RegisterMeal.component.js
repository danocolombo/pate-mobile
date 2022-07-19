import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NumberInput from '../ui/NumberInput/NumberInput';
import { dateNumToDisplayTime } from '../../utils/date';
import { Colors } from '../../constants/colors';
const RegisterMeal = ({ ral, mealCount, onPress }) => {
    return (
        <View style={styles.registrationCountContainer}>
            <Text style={styles.regisrationCountText}>
                There is a meal offered at the event.
            </Text>
            <View style={styles.mealTextWrapper}>
                <View>
                    <Text style={styles.mealCostText}>
                        Cost:{' '}
                        {ral.meal.cost === 0
                            ? 'FREE'
                            : [
                                  '$',
                                  (
                                      Math.round(ral.meal.cost * 100) / 100
                                  ).toFixed(2),
                              ]}
                    </Text>
                </View>
                <View>
                    <Text style={styles.mealStartTime}>
                        Meal starts at{' '}
                        {dateNumToDisplayTime(ral.meal.startTime)}
                    </Text>
                </View>
                <View>
                    <Text style={styles.mealCostText}>
                        Will any of your group like to attend?
                    </Text>
                </View>
            </View>

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
        backgroundColor: Colors.primary400,
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
