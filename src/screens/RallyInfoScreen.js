import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import RallyInfo from '../components/rallies/info/Rally.Info';
const RallyInfoScreen = ({ route, navigation }) => {
    const rallyId = route.params.rallyId;
    const feo = useSelector((state) => state.division);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.appName,
        });
    }, [navigation, feo]);
    return <RallyInfo rallyId={rallyId} navigation />;
};

export default RallyInfoScreen;
