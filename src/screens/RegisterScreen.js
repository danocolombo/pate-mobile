import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import RallyRegister from '../components/rallies/RallyRegister';
import { printObject } from '../utils/helpers';
const RegisterScreen = (props) => {
    let rally = props.route.params.rally;
    let registration = props.route.params.registration;
    const navigation = useNavigation();
    const feo = useSelector((state) => state.system);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.appName,
            headerBackTitle: 'Back',
        });
    }, [navigation, feo]);
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
