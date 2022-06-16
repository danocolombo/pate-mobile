import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { ALL_EVENTS } from '../../data/getRegionalEvents';
import {
    loadRallies,
    loadUserRallies,
    loadRepRallies,
} from '../features/rallies/ralliesSlice';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import RalliesOutput from '../components/rallies/RalliesOutput';
import { UserInterfaceIdiom } from 'expo-constants';
import { printObject } from '../utils/helpers';
import { ScrollView } from 'react-native';
export default function MainScreen() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [rallies, setRallies] = useState([]);
    const [approvedRallies, setApprovedRallies] = useState([]);
    async function loadStateRallies(dbRallies) {
        setRallies(dbRallies);
    }
    useEffect(() => {
        if (process.env.ENV === 'DEV') {
            const fileRallies = ALL_EVENTS.body.Items;
            let response = {
                body: fileRallies,
            };
            dispatch(loadRallies(fileRallies));
            loadStateRallies(response).then(() => {
                console.log('rallies loaded');
            });

            const publicRallies = fileRallies.filter(
                (r) => r.approved === true && r.eventDate >= '20220616'
            );
            setApprovedRallies(publicRallies);
            setIsLoading(false);
        } else {
            const config = {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            };
            let obj = {
                operation: 'getRegionalEvents',
                payload: {
                    region: process.env.EVENT_REGION,
                },
            };
            let body = JSON.stringify(obj);

            let api2use = process.env.AWS_API_ENDPOINT + '/events';
            //let dbRallies = await axios.post(api2use, body, config);
            axios
                .post(api2use, body, config)
                .then((response) => {
                    dispatch(loadRallies(response.data.body.Items));
                    loadStateRallies(response.data.body.Items).then(() => {
                        console.log('rallies loaded');
                    });

                    let dbRallies = response.data.body.Items;
                    const publicRallies = dbRallies.filter(
                        (r) => r.approved === true && r.eventDate >= '20220616'
                    );
                    setApprovedRallies(publicRallies);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('MS-60: error:', err);
                });
        }
    }, []);
    console.log('ENV:', process.env.ENV);
    const stateRallies = useSelector((state) => state.rallies.allRallies);
    return isLoading ? (
        <LoadingOverlay />
    ) : (
        <RalliesOutput rallies={approvedRallies} />
    );
}
