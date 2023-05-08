import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import * as queries from '../pateGraphQL/queries';
import * as coreMutations from '../graphql/mutations';
import * as mutations from '../pateGraphQL/mutations';
// import { updateGQLEvent } from '../pateGraphQL/pateGraphql.provider';
import { printObject, createAWSUniqueID } from '../utils/helpers';

export const updateGathering = createAsyncThunk(
    'division/updateGathering',
    async (updateEvent, thunkAPI) => {
        try {
            let theEvent = updateEvent;
            // remove the containers for the user
            /*
            use destructuring assignment with the spread 
            syntax to create a new object called 
            onlyEvent that contains all the properties 
            of event except for containers. 
            */
            const {
                meal: mealObj,
                location: locationObj,
                contact: contactObj,
                coordinator: coordinatorObj,
                division: divisionObj,
                ...strippedEventObj
            } = theEvent;

            printObject('GP:31-->mealObj:\n', mealObj);
            printObject('GP:32-->locationObj:\n', locationObj);
            printObject('GP:32-->coordinatorObj:\n', coordinatorObj);
            printObject('GP:32-->divisionObj:\n', divisionObj);
            printObject('GP:32-->strippedEventObj:\n', strippedEventObj);
            let updateRedux = false;
            let errorMessage = {};
            API.graphql({
                query: coreMutations.updateEvent,
                variables: { input: strippedEventObj },
            })
                .then((response) => {
                    if (response.data.updateEvent.id) {
                        updateRedux = true;
                    } else {
                        updateRedux = false;
                        errorMessage = {
                            message: 'catch error updating event',
                            error: error,
                        };
                    }
                })
                .catch((error) => {
                    updateRedux = false;
                    errorMessage = {
                        message: 'catch error updating event',
                        error: error,
                    };
                });
            // precondition meal input
            let mealUpdate = {
                ...mealObj,
                cost: parseInt(mealObj.cost),
                plannedCount: parseInt(mealObj.plannedCount),
                actualCount: parseInt(mealObj.actualCount),
            };

            if (isNaN(mealUpdate.cost)) {
                mealUpdate.cost = 0;
            }

            if (isNaN(mealUpdate.plannedCount)) {
                mealUpdate.plannedCount = 0;
            }

            if (isNaN(mealUpdate.actualCount)) {
                mealUpdate.actualCount = 0;
            }
            // Convert startTime to AWSTime object
            const startTime = moment(
                mealUpdate.startTime,
                'HH:mm:ss.SSS'
            ).format('HH:mm:ss');

            // Create AWSDate object with current date
            const date = moment().format('YYYY-MM-DD');
            const awsDate = new Date(`${date}T00:00:00.000Z`);

            // Update meal object with formatted properties
            mealUpdate.startTime = {
                hour: Number(startTime.split(':')[0]),
                minute: Number(startTime.split(':')[1]),
                second: Number(startTime.split(':')[2]),
            };
            // mealUpdate.startTime = awsDate;
            // const mealResponse = mealObj.id
            //     ? await API.graphql(
            //           graphqlOperation(mutations.updateMeal, mealObj)
            //       )
            //     : await API.graphql(
            //           graphqlOperation(mutations.createMeal, mealObj)
            //       );

            // const locationPromise = API.graphql(
            //     graphqlOperation(mutations.updateLocation, locationObj)
            // );
            // const contactPromise = API.graphql(
            //     graphqlOperation(mutations.updateContact, contactObj)
            // );
            // const coordinatorPromise = API.graphql(
            //     graphqlOperation(mutations.updateCoordinator, coordinatorObj)
            // );

            const payload = {
                ...theEvent,
            };
            return payload;
        } catch (error) {
            console.log('ERROR:', error);
            return thunkAPI.rejectWithValue(
                'GP:55-->>> something went wrong in remote createAsyncThunk'
            );
        }
    }
);
export const newGathering = createAsyncThunk(
    'division/newGathering',
    async (gatheringInfo, thunkAPI) => {
        try {
            let { originalEvent, newEvent } = gatheringInfo;
            /*
            use destructuring assignment with the spread 
            syntax to create a new object called 
            onlyEvent that contains all the properties 
            of event except for containers. 
            */
            let {
                meal: mealObj,
                location: locationObj,
                contact: contactObj,
                coordinator: coordinatorObj,
                division: divisionObj,
                ...strippedEventObj
            } = newEvent;
            printObject('GP:145-->gatheringInfo:\n', gatheringInfo);
            printObject('GP:146-->mealObj:\n', mealObj);
            printObject('GP:147-->locationObj:\n', locationObj);
            printObject('GP:148-->coordinatorObj:\n', coordinatorObj);
            printObject('<GP:149-->divisionObj:\n', divisionObj);
            printObject('GP:150-->strippedEventObj:\n', strippedEventObj);
            if (mealObj?.id) {
                console.log('CREATE MEAL');
            }
            let errorMessage = {};
            if (!locationObj?.street) {
                delete locationObj.street;
            }
            if (!locationObj?.postalCode) {
                delete locationObj.postalCode;
            }
            try {
                const LocationResults = await API.graphql({
                    query: mutations.createEventLocation,
                    variables: { input: locationObj },
                });
                if (!LocationResults.data.createEventLocation.id) {
                    errorMessage = {
                        message: 'else error creating location',
                        error: error,
                    };
                }
            } catch (error) {
                errorMessage = {
                    message: 'catch error creating location',
                    error: error,
                };
            }
            if (errorMessage?.message?.length > 0) {
                printObject('GP:174-->locationObj:\n', locationObj);
                printObject('GP:175-->error createLocation:\n', errorMessage);
                return;
            }
            try {
                printObject('GP:184-->strippedEventsObj:\n', strippedEventObj);
                const EventResults = await API.graphql({
                    query: mutations.createEvent,
                    variables: { input: strippedEventObj },
                });
                if (!EventResults.data.createEvent.id) {
                    errorMessage = {
                        message: 'else error creating event',
                        error: error,
                    };
                }
            } catch (error) {
                errorMessage = {
                    message: 'catch error creating event',
                    error: error,
                };
            }

            if (errorMessage?.message?.length > 0) {
                printObject('GP:198-->error createEvent:\n', errorMessage);
                return;
            }
            console.log('DONE ADDING NEW LOCATION AND EVENT');
            const payload = {
                ...newEvent,
            };
            return payload;

            // if (isNaN(mealUpdate.cost)) {
            //     mealUpdate.cost = 0;
            // }

            // if (isNaN(mealUpdate.plannedCount)) {
            //     mealUpdate.plannedCount = 0;
            // }

            // if (isNaN(mealUpdate.actualCount)) {
            //     mealUpdate.actualCount = 0;
            // }
            // // Convert startTime to AWSTime object
            // const startTime = moment(
            //     mealUpdate.startTime,
            //     'HH:mm:ss.SSS'
            // ).format('HH:mm:ss');

            // // Create AWSDate object with current date
            // const date = moment().format('YYYY-MM-DD');
            // const awsDate = new Date(`${date}T00:00:00.000Z`);

            // // Update meal object with formatted properties
            // mealUpdate.startTime = {
            //     hour: Number(startTime.split(':')[0]),
            //     minute: Number(startTime.split(':')[1]),
            //     second: Number(startTime.split(':')[2]),
            // };
            // // mealUpdate.startTime = awsDate;

            // const payload = {
            //     ...theEvent,
            // };
            // return payload;
        } catch (error) {
            console.log('ERROR:', error);
            return thunkAPI.rejectWithValue(
                'GP:55-->>> something went wrong in remote createAsyncThunk'
            );
        }
    }
);
export const deleteGatheriing = createAsyncThunk(
    'division/deleteGathering',
    async (gathering, thunkAPI) => {
        try {
            const payload = {
                gathering: gathering,
            };
            return payload;
        } catch (error) {
            console.log('ERROR:', error);
            return thunkAPI.rejectWithValue(
                'GP:261-->>> something went wrong in remote createAsyncThunk deleteGathering'
            );
        }
    }
);
