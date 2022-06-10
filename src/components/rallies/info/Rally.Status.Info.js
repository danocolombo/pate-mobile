import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Surface, Headline, Subheading } from 'react-native-paper';
import { Colors } from '../../../constants/colors';
import { printObject } from '../../../utils/helpers';
const RallyStatusInfo = ({ rally }) => {
    printObject('rally', rally);
    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View style={styles.statusOutline}>
                        <View style={styles.statusDataWrapper}>
                            <View style={styles.statusRow}>
                                <View style={styles.statusTitle}>
                                    <Text style={styles.statusTitleText}>
                                        Event Details
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.statusRow}>
                                <Text style={styles.textWrapper}>
                                    Status: {rally?.status}
                                </Text>
                                <Text style={styles.textWrapper}>
                                    Approved:{' '}
                                    {rally?.approved === true ? 'Yes' : 'No'}
                                </Text>
                            </View>
                            <View style={styles.statusRow}>
                                <Text style={styles.textWrapper}>
                                    Region:
                                    {rally.region}
                                </Text>
                                <Text style={styles.textWrapper}>
                                    EventRegion: {rally.eventRegion}
                                </Text>
                            </View>
                            <View style={styles.statusRow}>
                                <Text style={styles.textWrapper}>
                                    UID: {rally.uid}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Surface>
            </View>
        </>
    );
};

export default RallyStatusInfo;

const styles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    surface: {
        // margin: 24,
        // height: 80,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusOutline: {
        borderWidth: 1,
        borderColor: Colors.primary,
        padding: 10,
        width: '100%',
    },
    statusRow: {
        flexDirection: 'row',
        paddingHorizontal: 5,
    },
    statusTitle: {
        flex: 1,
    },
    statusTitleText: {
        textAlign: 'center',
        fontWeight: '600',
        fontStyle: 'italic',
    },
    statusDataWrapper: {},
    textWrapper: {
        paddingHorizontal: 10,
    },
});
