import React from 'react';
import { View, Text } from 'react-native';
import { List, Badge } from 'react-native-paper';
import CardDate from '../components/ui/RallyCardDate';
import RegistrationDetails from '../components/registrations/Registration.Details';
function RegistrationScreen() {
    return (
        <>
            <RegistrationDetails />
        </>
    );
}
export default RegistrationScreen;
