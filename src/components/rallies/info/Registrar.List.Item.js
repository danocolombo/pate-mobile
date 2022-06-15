import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { blue } from '@material-ui/core/colors';
import { Colors } from '../../../constants/colors';

const RegistrarListItem = ({ reg }) => {
    return (
        <View style={styles.row}>
            <Text style={styles.regName}>
                {reg.registrar.firstName} {reg.registrar.lastName}
            </Text>
            <View style={styles.attendance}>
                <View style={styles.textWrapper}>
                    <Text style={styles.attenandanceText}>
                        {reg.attendeeCount}
                    </Text>
                </View>
            </View>
            <View>
                <Text style={styles.mealCount}>{reg.mealCount}</Text>
            </View>
        </View>
    );
};

export default RegistrarListItem;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 5,
        borderBottomColor: Colors.gray20,
        borderBottomWidth: 1,
    },
    regName: {
        flex: 1,
        fontSize: 18,
    },
    attendance: {
        paddingHorizontal: 10,

        width: 50,
    },
    textWrapper: {
        textAlign: 'center',
    },
    attenandanceText: {
        justifyContent: 'center',
    },
    mealCount: {
        paddingHorizontal: 5,
        marginRight: 5,
        textAlign: 'center',
        width: 50,
    },
});
