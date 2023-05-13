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
            printObject('GP:14-->updateEvent:\n', updateEvent);
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
            printObject('GP:149-->divisionObj:\n', divisionObj);
            printObject('GP:150-->strippedEventObj:\n', strippedEventObj);

            if (mealObj) {
                //if (Object.keys(mealObj).length !== 0)
                try {
                    console.log('CREATE MEAL');
                    const MealResults = await API.graphql({
                        query: mutations.createMeal,
                        variables: { input: mealObj },
                    });
                    if (!MealResults.data.createMeal.id) {
                        errorMessage = {
                            message: 'else error creating meal',
                            error: error,
                        };
                    }
                } catch (error) {
                    errorMessage = {
                        message: 'catch error creating location',
                        error: error,
                    };
                }
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
export const deleteGathering = createAsyncThunk(
    'division/deleteGathering',
    async (gathering, thunkAPI) => {
        // printObject('GP:256-->gathering:\n', gathering);
        try {
            if (
                parseInt(gathering.plannedCount) > 0 ||
                parseInt(gathering.plannedMealCount) > 0
            ) {
                throw new Error(
                    'Delete not supported for events with registrations'
                );
            }
            // no registrations move forward with deleting gql
            //      meal deletion
            if (gathering?.meal?.id) {
                try {
                    printObject('GP:271-->delete meal:\n', gathering.meal);
                    const deleteInput = {
                        id: gathering.meal.id,
                    };
                    const DeleteMealResults = await API.graphql({
                        query: coreMutations.deleteMeal,
                        variables: { input: deleteInput },
                    });
                    if (!DeleteMealResults.data.deleteMeal.id) {
                        throw new Error('Delete Meal Failed');
                    }
                } catch (error) {
                    throw new Error('Delete Meal Failed (CATCH)');
                }
            }

            //      eventContact deletion
            if (gathering?.contact?.id) {
                try {
                    printObject(
                        'GP:275-->delete contact:\n',
                        gathering.contact
                    );
                    const deleteInput = {
                        id: gathering.contact.id,
                    };
                    const DeleteContactResults = await API.graphql({
                        query: coreMutations.deleteEventContact,
                        variables: { input: deleteInput },
                    });
                    printObject(
                        'GP:297-->DeleteContactResults:\n',
                        DeleteContactResults
                    );
                    if (!DeleteContactResults.data.deleteEventContact.id) {
                        throw new Error('Delete Event Contact Failed');
                    }
                } catch (error) {
                    throw new Error('Delete Event Contact Failed (CATCH)');
                }
            }

            //      eventLocation delete

            if (gathering.location.id) {
                try {
                    printObject(
                        'GP:299-->delete location:\n',
                        gathering.location.id
                    );
                    const deleteInput = {
                        id: gathering.location.id,
                    };
                    const DeleteLocationResults = await API.graphql({
                        query: coreMutations.deleteEventLocation,
                        variables: { input: deleteInput },
                    });
                    printObject(
                        'DeleteLocationResults:\n',
                        DeleteLocationResults
                    );
                    if (!DeleteLocationResults?.data?.deleteEventLocation?.id) {
                        console.log('throw1');

                        throw new Error(
                            `ID(${gathering.location.id}) not found`
                        );
                    }
                } catch (error) {
                    printObject('throw2-error:', error);

                    throw new Error(
                        error?.errors[0]?.message ||
                            'DeleteLocation Catch Error'
                    );
                }
            }

            //      event delete

            try {
                printObject('GP:317-->delete gathering:\n', gathering.id);
                const deleteInput = {
                    id: gathering.id,
                };
                const DeleteGatheringResults = await API.graphql({
                    query: coreMutations.deleteEvent,
                    variables: { input: deleteInput },
                });
                if (!DeleteGatheringResults.data.deleteEvent.id) {
                    throw new Error('Delete Event Failed');
                }
            } catch (error) {
                throw new Error('Delete Event Failed (CATCH)');
            }
            return gathering;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const deleteGatheringOne = createAsyncThunk(
    'division/deleteGathering',
    async (gathering, thunkAPI) => {
        console.log('GP:256--> DELETE REQUEST received.');
        try {
            // we don't support deleting event that has registrations at this time.
            if (
                parseInt(gathering.plannedCount) > 0 ||
                parseInt(gathering.plannedMealCount) > 0
            ) {
                return thunkAPI.rejectWithValue({
                    status: 400,
                    message:
                        'Delete not supported for events with registrations',
                });
            }

            const payload = {
                gathering: gathering,
            };
            return payload;
        } catch (error) {
            console.log('ERROR:', error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
