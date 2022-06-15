import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import RegistrationLocation from './Registration.Location';

const RegistrationDetails = ({ reg }) => {
    const rallyEntry = useSelector((state) =>
        state.rallies.publicRallies.filter((r) => r.eid === rallyId)
    );

    return (
        <>
            <View>
                <Text>Registration.Details</Text>
            </View>
            <RegistrationLocation rally={rallyEntry} />
        </>
    );
};

export default RegistrationDetails;

const styles = StyleSheet.create({});
