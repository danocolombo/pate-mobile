import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import RegistrationLocation from './Registration.Location.Info';
import RegistrarInfo from './Registration.Registrar.Info';
import RegistrarChurchInfo from './Registration.Registrar.Church.Info';
import RegistrarAttendance from './Registration.Attendance.Info';

import { printObject } from '../../utils/helpers';
const RegistrationDetails = ({ reg }) => {
    printObject('reg:', reg);
    const rallyArray = useSelector((state) =>
        state.rallies.publicRallies.filter((r) => r.uid === reg.eid)
    );
    let rallyEntry = rallyArray[0];
    printObject('rallyEntry:', rallyEntry);
    return (
        <>
            <RegistrationLocation rally={rallyEntry} />
            <RegistrarInfo reg={reg} />
            <RegistrarChurchInfo reg={reg} />
            <RegistrarAttendance reg={reg} />
        </>
    );
};

export default RegistrationDetails;

const styles = StyleSheet.create({});
