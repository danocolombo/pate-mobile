import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RallyRegister from '../components/rallies/RallyRegister';
import { printObject } from '../utils/helpers';
const RegisterScreen = (props) => {
    let rally = props.route.params.rally;
    return (
        <>
            <RallyRegister rally={rally} />
        </>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
