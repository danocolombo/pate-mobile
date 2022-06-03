import React from 'react';
import RallyInfo from '../components/rallies/info/Rally.Info';
const RallyInfoScreen = ({ route, navigation }) => {
    const rallyId = route.params.rallyId;
    return <RallyInfo rallyId={rallyId} navigation />;
};

export default RallyInfoScreen;
