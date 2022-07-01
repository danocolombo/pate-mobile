import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RallyRegister from '../components/rallies/RallyRegister';
import { printObject } from '../utils/helpers';
const RegisterScreen = (props) => {
    let rally = props.route.params.rally;
    let registration = props.route.params.registration;
    // printObject('RS:8-->props', props);
    // printObject('RS:9-->registration', registration);
    return (
        <>
            <RallyRegister rally={rally} registration={registration} />
        </>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
