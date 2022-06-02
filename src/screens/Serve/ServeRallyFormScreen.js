import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ServeRallyForm from '../../components/serve/ServeRallyForm';
import { printObject } from '../../utils/helpers';
const ServeRallyFormScreen = ({ route, navigation }) => {
    const rally = route.params.rally;
    return (
        <View>
            <ServeRallyForm rally={rally} navigation />
        </View>
    );
};

export default ServeRallyFormScreen;

const styles = StyleSheet.create({});
