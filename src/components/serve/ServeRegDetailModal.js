import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { printObject } from '../../utils/helpers';

const ServeRegDetailModal = (reg) => {
    // printObject('SRDM:6-->reg', reg);
    return (
        <View>
            <Text>WHAT??</Text>
            <Text>{reg?.registrar?.firstName}</Text>
        </View>
    );
};

export default ServeRegDetailModal;

const styles = StyleSheet.create({});
