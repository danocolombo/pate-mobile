import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RallyRegister from '../components/rallies/RallyRegister';
import { printObject } from '../utils/helpers';
const RegisterScreen = (props) => {
    printObject('props', props);
    let rallyId = props.route.params.rallyId;
    return (
        <>
            <RallyRegister rallyId={rallyId} />
        </>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
