import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadRallies,
    loadUserRallies,
    loadRepRallies,
} from '../features/rallies/ralliesSlice';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import RalliesOutput from '../components/rallies/RalliesOutput';
import { UserInterfaceIdiom } from 'expo-constants';
import { printObject } from '../utils/helpers';
export default function MainScreen() {
    const dispatch = useDispatch();
    const [repRallies, setRepRallies] = useState();
    const [repRalliesChecked, setRepRalliesChecked] = useState(false);
    //todo - remove when auth is implemented
    const user = useSelector((state) => state.users.currentUser);
    useEffect(() => {
        dispatch(loadUserRallies(user.uid));
    }, []);

    // const fetchUserEvents = async () => {
    //     const response = await fetch(
    //         'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
    //         {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 operation: 'getEventsForRep',
    //                 payload: {
    //                     uid: user.uid,
    //                 },
    //             }),
    //             headers: {
    //                 'Content-type': 'application/json; charset=UTF-8',
    //             },
    //         }
    //     );
    //     // printObject('data', data);
    //     // dispatch(loadUserRallies(data.body));
    // };
    // if (repRalliesChecked === false) {
    //     const { userResponseData, userReqStatus } = useQuery(
    //         'userEvents',
    //         fetchUserEvents
    //     );

    //     if (userReqStatus === 'loading') {
    //         return <LoadingOverlay />;
    //     }
    //     if (userReqStatus === 'error') {
    //         setRepRalliesChecked(true);
    //         return (
    //             <View>
    //                 <Text>ERROR received....</Text>
    //             </View>
    //         );
    //     } else {
    //         // dispatch(loadRallies(userResponseData.body));
    //         setRepRallies(userResponseData.body);
    //         setRepRalliesChecked(true);
    //         console.log('we would dispatch results to redux');
    //     }
    // }
    //   --------------------------
    //   display public events
    //   --------------------------
    const fetchApprovedPublicEvents = async () => {
        const response = await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'getAllActiveApprovedEvents',
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        );
        return response.json();
    };
    // characters is just a unique key for the query.
    const { data, status } = useQuery(
        'publicEvents',
        fetchApprovedPublicEvents
    );

    if (status === 'loading') {
        return <LoadingOverlay />;
    }
    if (status === 'error') {
        return (
            <View>
                <Text>ERROR received....</Text>
            </View>
        );
    } else {
        dispatch(loadRallies(data.body));
        //todo - these will be done during login when auth added
        if (user?.stateRep) {
            // dispatch(loadRepRallies(user.uid));
        }

        return (
            <>
                <RalliesOutput rallies={data.body} />
            </>
        );
    }
}
