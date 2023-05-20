import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import * as queries from '../pateGraphQL/queries';
import * as coreMutations from '../graphql/mutations';
import * as mutations from '../pateGraphQL/mutations';
// import { updateGQLEvent } from '../pateGraphQL/pateGraphql.provider';
import {
    printObject,
    createAWSUniqueID,
    compareObjects,
} from '../utils/helpers';

export const updateGathering = createAsyncThunk(
    'division/updateGathering',
    async (updateEvent, thunkAPI) => {
        try {
            const oldEvent = updateEvent?.oldEvent;
            const newEvent = updateEvent?.newEvent;
            printObject('GP:20-->oldEvent:\n', oldEvent);
            printObject('GP:21-->newEvent:\n', newEvent);
            // return;
            const {
                meal: mealObj,
                location: locationObj,
                contact: contactObj,
                coordinator: coordinatorObj,
                division: divisionObj,
                ...strippedEventObj
            } = newEvent;
            //******************************************* */
            //      updateEventLocation
            //******************************************* */
            printObject('STRIPPED_EVENTS_OBJ:\n', strippedEventObj);
            if (!strippedEventObj.eventMealId) {
                console.log('NO ORIGINAL MEAL');
                if (mealObj && Object.keys(mealObj).length === 0) {
                    console.log('keys:', Object.keys(mealObj).length);
                    console.log('NO NEW MEAL');
                } else {
                    console.log('NEW MEAL FOUND');
                }
            } else {
                console.log('ORIGINAL MEAL FOUND');
                if (mealObj && Object.keys(mealObj).length === 0) {
                    console.log('DELETE MEAL');
                } else {
                    //check if they are the same
                    //if different, update
                    const oldMeal = { ...oldEvent.meal };
                    const newMeal = { ...newEvent.meal };
                    printObject('OLD', oldMeal);
                    printObject('NEW', newMeal);
                    let updateNeededRemote = compareObjects(oldMeal, newMeal);
                    let updateNeededLocal = compareObjectsLocal(
                        oldMeal,
                        newMeal
                    );
                    console.log('updateNeededRemote:', updateNeededRemote);
                    // console.log('updateNeededLocal:', updateNeededLocal);
                    if (updateNeededRemote) {
                        console.log('NO UPDATE NECESSARY');
                    } else {
                        console.log('UPDATE NEEDED');
                    }
                }
            }
            return;
            API.graphql({
                query: coreMutations.updateEventLocation,
                variables: { input: locationObj },
            })
                .then((response) => {
                    if (response.data.updateEventLocation.id) {
                        updateRedux = true;
                    } else {
                        updateRedux = false;
                        errorMessage = {
                            message: 'catch error updating location',
                            error: error,
                        };
                    }
                })
                .catch((error) => {
                    updateRedux = false;
                    errorMessage = {
                        message: 'catch error updating location',
                        error: error,
                    };
                });
            //******************************************* */
            //      updateEventContact
            //******************************************* */
            if (
                updateEvent?.contact &&
                Object.keys(updateEvent?.contact).length > 0
            ) {
                try {
                    //      check if the contact already exists
                    const variables = {
                        id: contactObj.id,
                    };
                    const contactSearchResponse = await API.graphql(
                        graphqlOperation(queries.getEventContact, variables)
                    ).then((response) => {
                        if (response?.data?.getEventContact?.id) {
                            //      update existing contact
                            try {
                                API.graphql({
                                    query: coreMutations.updateEventContact,
                                    variables: { input: contactObj },
                                })
                                    .then((response) => {
                                        if (
                                            response.data.updateEventContact.id
                                        ) {
                                            updateRedux = true;
                                        } else {
                                            updateRedux = false;
                                            errorMessage = {
                                                message:
                                                    'GP:86-->catch error updating contact',
                                                error: error,
                                            };
                                        }
                                    })
                                    .catch((error) => {
                                        printObject(
                                            'GP:93-->contact CATCH:\n',
                                            error
                                        );
                                        updateRedux = false;
                                        errorMessage = {
                                            message:
                                                'GP:99-->catch error updating contact',
                                            error: error,
                                        };
                                    });
                            } catch (error) {
                                printObject('GP:104-->catch error:\n', error);
                            }
                        } else {
                            // add new contact
                            try {
                                API.graphql({
                                    query: coreMutations.createEventContact,
                                    variables: { input: contactObj },
                                })
                                    .then((response) => {
                                        if (
                                            response.data.createEventContact.id
                                        ) {
                                            updateRedux = true;
                                        } else {
                                            updateRedux = false;
                                            errorMessage = {
                                                message:
                                                    'GP:126-->catch error creating contact',
                                                error: error,
                                            };
                                        }
                                    })
                                    .catch((error) => {
                                        printObject(
                                            'GP:133-->contact creating CATCH:\n',
                                            error
                                        );
                                        updateRedux = false;
                                        errorMessage = {
                                            message:
                                                'GP:139-->catch error creating contact',
                                            error: error,
                                        };
                                    });
                            } catch (error) {
                                printObject('GP:144-->catch error:\n', error);
                            }
                        }
                    });
                } catch (error) {
                    printObject('GP:149-->CATCH  ERROR:\n', error);
                }
            }
            //******************************************* */
            //      updateMeal
            //************************  ******************* */
            // does meal exist?
            if (mealObj && Object.keys(mealObj?.contact).length > 0) {
                //      still have a meal, update
                API.graphql({
                    query: coreMutations.updateMeal,
                    variables: { input: mealObj },
                })
                    .then((response) => {
                        if (response.data.updateMeal.id) {
                            updateRedux = true;
                        } else {
                            updateRedux = false;
                            errorMessage = {
                                message: 'catch error updating meal',
                                error: error,
                            };
                        }
                    })
                    .catch((error) => {
                        updateRedux = false;
                        errorMessage = {
                            message: 'catch error updating meal',
                            error: error,
                        };
                    });
            } else {
                // no meal create one...
                API.graphql({
                    query: coreMutations.createMeal,
                    variables: { input: mealObj },
                })
                    .then((response) => {
                        if (response.data.createMeal.id) {
                            updateRedux = true;
                        } else {
                            updateRedux = false;
                            errorMessage = {
                                message: 'catch error creating meal',
                                error: error,
                            };
                        }
                    })
                    .catch((error) => {
                        updateRedux = false;
                        errorMessage = {
                            message: 'catch error creating meal',
                            error: error,
                        };
                    });
            }

            //******************************************* */
            //      updateEvent
            //******************************************* */

            printObject('GP:14-->updateEvent:\n', updateEvent);
            let theEvent = updateEvent;

            printObject('GP:32-->mealObj:\n', mealObj);
            printObject('GP:33-->locationObj:\n', locationObj);
            printObject('GP:34-->coordinatorObj:\n', coordinatorObj);
            printObject('GP:35-->divisionObj:\n', divisionObj);
            printObject('GP:36-->strippedEventObj:\n', strippedEventObj);
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

            // //* ********************************************
            // //      update event location
            // //* ********************************************
            // API.graphql({
            //     query: coreMutations.updateEventLocation,
            //     variables: { input: locationObj },
            // })
            //     .then((response) => {
            //         if (response.data.updateEventLocation.id) {
            //             updateRedux = true;
            //         } else {
            //             updateRedux = false;
            //             errorMessage = {
            //                 message: 'catch error updating location',
            //                 error: error,
            //             };
            //         }
            //     })
            //     .catch((error) => {
            //         updateRedux = false;
            //         errorMessage = {
            //             message: 'catch error updating location',
            //             error: error,
            //         };
            //     });
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

            let errorMessage = {};

            //      +++++++++++++++++++
            //* CREATE LOCATION
            //      +++++++++++++++++++
            try {
                if (!locationObj?.street) {
                    delete locationObj.street;
                }
                if (!locationObj?.postalCode) {
                    delete locationObj.postalCode;
                }
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
            if (mealObj) {
                //if (Object.keys(mealObj).length !== 0)
                strippedEventObj = {
                    ...strippedEventObj,
                    eventMealId: mealObj.id,
                };
                //      +++++++++++++++++++
                //*  CREATE MEAL
                //      +++++++++++++++++++
                try {
                    console.log('CREATE MEAL');
                    await API.graphql({
                        query: mutations.createMeal,
                        variables: { input: mealObj },
                    })
                        .then((mealResponse) => {
                            printObject(
                                'GP:409-->mealResponse:\n',
                                mealResponse
                            );
                        })
                        .catch((error) => {
                            printObject('GP:411-->meal catch error:\n', error);
                        });
                } catch (error) {
                    console.log('GP:380-->error adding createMeal');
                    errorMessage = {
                        message: 'catch error creating location',
                        error: error,
                    };
                }
            }
            if (contactObj) {
                strippedEventObj = {
                    ...strippedEventObj,
                    eventContactEventsId: contactObj.id,
                };
                //      +++++++++++++++++++
                //*  CREATE EVENT CONTACT
                //      +++++++++++++++++++
                try {
                    console.log('CREATE EVENT CONTACT');
                    await API.graphql({
                        query: mutations.createEventContact,
                        variables: { input: contactObj },
                    })
                        .then((contactResponse) => {
                            printObject(
                                'GP:443-->contactResponse:\n',
                                contactResponse
                            );
                        })
                        .catch((error) => {
                            printObject(
                                'GP:447-->contact catch error:\n',
                                error
                            );
                        });
                } catch (error) {
                    console.log('GP:450-->error createContact');
                    errorMessage = {
                        message: 'catch error creating contact',
                        error: error,
                    };
                }
            }

            //      +++++++++++++++++++++++++++
            //*  CREATE EVENT
            //      +++++++++++++++++++++++++++
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
        printObject('GP:277-->gathering:\n', gathering);
        try {
            if (
                parseInt(gathering.plannedCount) > 0 ||
                parseInt(gathering.mealPlannedCount) > 0
            ) {
                throw new Error(
                    'Delete not supported for events with registrations'
                );
            }
            // no registrations move forward with deleting gql
            //      meal deletion
            if (gathering?.meal && Object.keys(gathering?.meal).length > 0) {
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
            printObject('GP:306', 'past gathering.meal check');
            //      eventContact deletion
            if (
                gathering?.contact &&
                Object.keys(gathering?.contact).length > 0
            ) {
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

            if (Object.keys(gathering?.location).length > 0) {
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
function compareObjectsLocal(obj1, obj2) {
    // Check if both inputs are objects
    if (
        typeof obj1 !== 'object' ||
        typeof obj2 !== 'object' ||
        obj1 === null ||
        obj2 === null
    ) {
        return obj1 === obj2; // Compare primitive values directly
    }

    // Get the keys of both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if the number of keys is the same
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Check if the keys are the same (order doesn't matter)
    if (!keys1.every((key) => keys2.includes(key))) {
        return false;
    }

    // Recursively compare the values of each key
    return keys1.every((key) => compareObjects(obj1[key], obj2[key]));
}
