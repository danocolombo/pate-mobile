import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Surface, Headline, Subheading } from 'react-native-paper';
const RallyMealInfo = ({ rally }) => {
    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View>
                        <Headline>Meal Information</Headline>
                    </View>
                    <View style={styles.textWrapper}>
                        <Subheading>{rally?.meal?.startTime}</Subheading>
                        <Subheading>{rally?.meal?.cost}</Subheading>
                        <Subheading>{rally?.meal?.deadline}</Subheading>
                        <Subheading>{rally?.meal?.message}</Subheading>
                    </View>
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
});
