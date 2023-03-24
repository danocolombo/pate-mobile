import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { prettyName } from '../../utils/helpers';

const RegScrollItem = ({ reg }) => {
    return (
        <View style={styles.container}>
            <View style={styles.itemBox}>
                <View style={{ flex: 1 }}>
                    <Text>
                        {prettyName(reg?.attendeeFirstName)}{' '}
                        {prettyName(reg?.attendeeLastName)}
                    </Text>
                </View>
                <View>
                    <Text>
                        {reg?.attendanceCount}/{reg?.mealCount}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default RegScrollItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemBox: {
        flexDirection: 'row',

        borderWidth: 1,
        padding: 3,
        marginVertical: 1,
    },
});
