import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import RegistrationLocation from './Registration.Location';
import { printObject } from '../../utils/helpers';
const RegistrationDetails = ({ reg }) => {
    printObject('reg:', reg);
    const rallyEntry = useSelector((state) =>
        state.rallies.publicRallies.filter((r) => r.uid === reg.eid)
    );
    printObject('rallyEntry:', rallyEntry);
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
