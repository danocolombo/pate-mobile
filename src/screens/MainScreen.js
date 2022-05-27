import React from 'react';
import { useQuery } from 'react-query';
import RalliesOutput from '../components/rallies/RalliesOutput';
export default function MainScreen() {
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
    // characters is just a unique key for the query.
    const { data, status } = useQuery('characters', fetchCharacters);

    if (status === 'loading') {
        return <div>LOADING</div>;
    }
    if (status === 'error') {
        return <div>ERROR received....</div>;
    }

    return (
        <>
            <RalliesOutput rallies={data.body} />
        </>
    );
}
