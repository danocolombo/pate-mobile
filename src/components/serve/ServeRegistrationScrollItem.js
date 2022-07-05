import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const RegScrollItem = ({ reg }) => {
    return (
        <View style={styles.container}>
            <View style={styles.itemBox}>
                <View style={{ flex: 1 }}>
                    <Text>
                        {reg?.registrar?.firstName} {reg?.registrar?.lastName}
                    </Text>
                </View>
                <View>
                    <Text>
                        {reg?.attendeeCount}/{reg?.mealCount}
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
