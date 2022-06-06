import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { ALL_EVENTS } from '../../data/allEvents';
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
    //   -!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const DEBUG = true;
    const dispatch = useDispatch();
    const fetchApprovedPublicEvents = async () => {
        if (DEBUG) {
            console.log('DEBUG SET !!');

            const rallies = ALL_EVENTS.body.Items;
            let response = {
                body: rallies,
            };

            return response;
        } else {
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
        }
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
        // now get the approved rallies to display
        const theRallies = data.body;

        const approvals = theRallies.filter(
            (r) => r.approved === true && r.eventDate >= '20220605'
        );

        return (
            <>
                <RalliesOutput rallies={approvals} />
            </>
        );
    }
}
