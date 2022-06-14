import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const RegistrarListItem = ({ reg }) => {
    return (
        <View>
            <Text>
                {reg.registrar.firstName} {reg.registrar.lastName}
            </Text>
            <View>
                <Text>{reg.attendeeCount}</Text>
            </View>
            <View>
                <Text>{reg.mealCount}</Text>
            </View>
        </View>
    );
};

export default RegistrarListItem;

const styles = StyleSheet.create({});
