import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Surface, Headline } from 'react-native-paper';
import { Colors } from '../../../constants/colors';
import { convertPateDate, convertPateTime } from '../../../utils/date';
const RallyLogisticsInfo = ({ rally }) => {
    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View>
                        <Headline
                            style={{
                                color: Colors.primary,
                                fontWeight: 'bold',
                            }}
                        >
                            Logistics Information
                        </Headline>
                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={styles.text}>
                            {convertPateDate(rally?.eventDate)}
                        </Text>

                        {rally?.startTime ? (
                            <Text style={styles.text}>
                                {convertPateTime(rally?.startTime)}
                                {' - '}
                                {convertPateTime(rally?.endTime)}
                            </Text>
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
    text: {
        fontSize: 16,
        fontWeight: '500',
    },
});
