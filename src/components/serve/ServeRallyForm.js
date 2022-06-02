import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RallyForm from './RallyForm';
import { printObject } from '../../utils/helpers';
const ServeRallyForm = (props) => {
    return (
        <>
            <View>
                <Text>Rally Form</Text>
            </View>
            <View>
                <RallyForm rally={props.rally} />
            </View>
        </>
    );
};

export default ServeRallyForm;

const styles = StyleSheet.create({});
