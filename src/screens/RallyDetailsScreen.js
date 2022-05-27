import React from 'react';
import RallyDetails from '../components/rallies/RallyDetails';
const RallyDetailsScreen = ({ route, navigation }) => {
    const rallyId = route.params.rallyId;
    return <RallyDetails rallyId={rallyId} navigation />;
};

export default RallyDetailsScreen;
