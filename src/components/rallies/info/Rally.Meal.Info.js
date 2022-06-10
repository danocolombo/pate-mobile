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
                        {rally?.meal?.startTime ? (
                            <Subheading>{rally?.meal?.startTime}</Subheading>
                        ) : null}
                        {rally?.meal?.cost ? (
                            <Subheading>{rally?.meal?.cost}</Subheading>
                        ) : null}
                        {rally?.meal?.deadline ? (
                            <Subheading>{rally?.meal?.deadline}</Subheading>
                        ) : null}
                        {rally?.meal?.message ? (
                            <Subheading>{rally?.meal?.message}</Subheading>
                        ) : null}
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
