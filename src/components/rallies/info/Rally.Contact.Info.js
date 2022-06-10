import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Surface, Headline, Subheading } from 'react-native-paper';
const RallyContactInfo = ({ rally }) => {
    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View>
                        <Headline>Contact Information</Headline>
                    </View>
                    <View style={styles.textWrapper}>
                        {rally?.contact?.name ? (
                            <Subheading>{rally?.contact?.name}</Subheading>
                        ) : null}
                        {rally?.contact?.phone ? (
                            <Subheading>{rally?.contact?.phone}</Subheading>
                        ) : null}
                        {rally?.contact?.email ? (
                            <Subheading>{rally?.contact?.email}</Subheading>
                        ) : null}
                    </View>
                </Surface>
            </View>
        </>
    );
};

export default RallyContactInfo;

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
