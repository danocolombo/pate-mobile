import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { loadRallies, loadRepRallies } from '../features/rallies/ralliesSlice';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import RalliesOutput from '../components/rallies/RalliesOutput';
import { UserInterfaceIdiom } from 'expo-constants';
export default function MainScreen() {
    const dispatch = useDispatch();
    //todo - remove when auth is implemented
    const user = useSelector((state) => state.users.currentUser);
    const fetchCharacters = async () => {
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
    const fetchUserEvents = async () => {
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
    const { data, status } = useQuery('characters', fetchCharacters);

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
