import React from 'react';
import { View, Text } from 'react-native';
import { List, Badge } from 'react-native-paper';
import CardDate from '../components/ui/RallyCardDate';
import RegistrationDetails from '../components/registrations/Registration.Details';
function RegistrationScreen({ route }) {
    const reg = route.params.reg;
    return (
        <>
            <RegistrationDetails reg={reg} />
        </>
    );
}
export default RegistrationScreen;
