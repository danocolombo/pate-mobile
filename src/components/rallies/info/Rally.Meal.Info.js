import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { convertPateDate, convertPateTime } from '../../../utils/date';
import { Surface, Headline, Subheading } from 'react-native-paper';
const RallyMealInfo = ({ rally }) => {
    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View>
                        <Headline>Meal Information</Headline>
                    </View>
                    {rally?.meal?.offered ? (
                        <View style={styles.textWrapper}>
                            <View style={styles.timeCostWrapper}>
                                <Text style={styles.mealTimeText}>
                                    {convertPateTime(rally?.meal?.startTime)}
                                </Text>
                                <Text style={styles.costText}>
                                    $
                                    {(
                                        Math.round(rally?.meal?.cost * 100) /
                                        100
                                    ).toFixed(2)}
                                </Text>
                            </View>
                            {rally?.meal?.deadline ? (
                                <View style={styles.mealDeadlineWrapper}>
                                    <Text>
                                        DEADLINE:{' '}
                                        {convertPateDate(rally?.meal?.deadline)}
                                    </Text>
                                </View>
                            ) : null}
                            <View style={styles.messageWrapper}>
                                <Text style={styles.messageText}>
                                    {rally?.meal?.message}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.noMealWrapper}>
                            <Text style={styles.noMealText}>
                                No Meal Offered
                            </Text>
                        </View>
                    )}
                </Surface>
            </View>
        </>
    );
};

export default RallyMealInfo;

const styles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
    },
    surface: {
        // margin: 24,
        // height: 80,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWrapper: {
        alignItems: 'center',
    },
    timeCostWrapper: {
        flexDirection: 'row',
        width: '100%',
    },
    mealTimeText: {
        marginRight: 10,
    },
    costText: {
        marginLeft: 10,
    },
    mealDeadlineWrapper: {
        marginTop: 5,
    },
    noMealWrapper: {
        marginVertical: 5,
    },
    noMealText: {
        fontSize: 18,
        paddingBottom: 10,
    },
    messageWrapper: { marginVertical: 2 },
    messageText: {},
});
