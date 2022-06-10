import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Surface, Headline, Subheading } from 'react-native-paper';
const RallyLogisticsInfo = ({ rally }) => {
    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View>
                        <Headline>Logistics Information</Headline>
                    </View>
                    <View style={styles.textWrapper}>
                        {rally?.eventDate ? (
                            <Subheading>{rally?.eventDate}</Subheading>
                        ) : null}
                        {rally?.startTime ? (
                            <Subheading>{rally?.startTime}</Subheading>
                        ) : null}
                        {rally?.endTime ? (
                            <Subheading>{rally?.endTime}</Subheading>
                        ) : null}
                    </View>
                </Surface>
            </View>
        </>
    );
};

export default RallyLogisticsInfo;

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
