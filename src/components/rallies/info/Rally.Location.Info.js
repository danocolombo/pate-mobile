import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Surface, Headline, Subheading } from 'react-native-paper';
import { Colors } from '../../../constants/colors';
import { printObject } from '../../../utils/helpers';
const RallyLocationInfo = ({ rally, title }) => {
    // printObject('RLI:07-->rally:', rally);
    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View style={{ marginHorizontal: 5 }}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                    <View style={styles.textWrapper}>
                        {rally?.name ? (
                            <Text style={styles.text}>{rally?.name}</Text>
                        ) : null}
                        {rally?.street ? (
                            <Text style={styles.text}>
                                {rally?.location?.street}
                            </Text>
                        ) : null}
                        {rally?.location?.city ? (
                            <Text style={styles.text}>
                                {rally?.location?.city}
                            </Text>
                        ) : null}
                        {rally?.stateProv || rally?.location?.postalCode ? (
                            <Text style={styles.text}>
                                {rally?.location?.stateProv},{' '}
                                {rally?.location?.postalCode}
                            </Text>
                        ) : null}
                    </View>
                </Surface>
            </View>
        </>
    );
};

export default RallyLocationInfo;

const styles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        width: '100%',
    },
    surface: {
        marginTop: 0,
        // padding: 20,
        paddingBottom: 20,
        // height: 80,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingHorizontal: 5,
    },
    titleText: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    textWrapper: {
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
    },
});
