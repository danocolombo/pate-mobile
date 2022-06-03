import React from 'react';
import RallyEdit from '../components/rallies/edit/Rally.Edit';
const RallyEditFlow = ({ route, navigation }) => {
    const rallyId = route.params.rallyId;
    const stage = route.params.stage;
    return <RallyEdit rallyId={rallyId} stage={stage} navigation />;
};

export default RallyEditFlow;
