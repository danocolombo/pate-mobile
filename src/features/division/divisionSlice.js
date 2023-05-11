import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { printObject, getToday } from '../../utils/helpers';
import { getPateDate } from '../../utils/date';
import {
    updateGathering,
    newGathering,
    deleteGathering,
    // createGathering,
} from '../../providers/gatherings.provider';
//   this is url for all meetings

const initialState = {
    gatherings: [],
    info: {},
    allRallies: [],
    userRallies: [],
    displayRallies: [],
    tmpRally: {},
    isLoading: false,
};

export const divisionSlice = createSlice({
    name: 'division',
    initialState,
    reducers: {
        initializeDivision: (state, action) => {
            state.gatherings = action?.payload?.events?.items;
            state.info = {
                id: action?.payload?.id,
                code: action?.payload?.code,
                divCompKey: action?.payload?.divCompKey || '',
            };
            return state;
        },
        createTmp: (state, action) => {
            state.tmpRally = {};
            state.tmpRally = action.payload;
            //printObject('state.tmpRally AFTER create', state.tmpRally);
            return state;
        },
        updateTmp: (state, action) => {
            // printObject('RS:22-->action:', action);
            if (action?.payload?.geolocation) {
                // need to update latitude and longitude
                let newTmp1 = { ...state.tmpRally, ...action.payload };
                // printObject('RS:26-->newTmp1', newTmp1);
                state.tmpRally = newTmp1;
            } else {
                let newTmp2 = Object.assign(state.tmpRally, action.payload);
                state.tmpRally = newTmp2;
            }

            return state;
        },
        loadDisplayRallies: (state, action) => {
            state.displayRallies = action.payload;
        },
        // loadUserRallies: (state, action) => {
        //     state.userRallies = action.payload;
        // },
        loadDivisionInfo: (state, action) => {
            // state.publicRallies = action.payload;
            state.allRallies = action.payload;
            return state;
        },
        getRally: (state, action) => {
            let found = state.allRallies.filter(
                (r) => r.uid === action.payload
            );
            return found;
        },
        updateRegNumbers: (state, action) => {
            let regMealCount = action.payload.mealCount;
            let regRegistrationsCount = action.payload.registrationCount;
            printObject('RS:45-->action:', action);
            // console.log('regMealCount:', regMealCount);
            // console.log('regRegistrationsCount:', regRegistrationsCount);
            // console.log('HIT IT');
            // console.log('action.payload:', action.payload);
            //printObject('allRallies:', state.allRallies);
            const updates = state.allRallies.map((ral) => {
                // console.log('ral', ral.uid);
                if (ral.uid === action.payload.uid) {
                    // printObject('BINGO:', ral);
                    //deal with mealCount
                    let newMealInfo = {};
                    let newMealValue = 0;
                    try {
                        newMealValue =
                            parseInt(ral.meal.mealCount) +
                            parseInt(regMealCount);
                    } catch (error) {
                        newMealValue = 0;
                    }
                    newMealInfo = {
                        startTime: ral.meal.startTime,
                        cost: ral.meal.cost,
                        deadline: ral.meal.deadline,
                        offered: true,
                        mealsServed: ral.meal.mealsServed,
                        mealCount: newMealValue,
                    };
                    let newRal = {};
                    newRal = { ...ral, meal: newMealInfo };
                    // deal with registrations
                    let regCount = 0;
                    try {
                        regCount =
                            parseInt(ral.registrations) +
                            parseInt(regRegistrationsCount);
                    } catch (error) {
                        regCount = 0;
                    }

                    // console.log('rs:89-->regCount:', regCount);
                    newRal = { ...newRal, registrations: regCount };
                    // printObject('RS:87-->newRal:', newRal);

                    return newRal;
                } else {
                    return ral;
                }
            });
            // printObject('udpates:', updates);
            state.allRallies = updates;
            return state;
        },
        updateRegNumbersOLD: (state, action) => {
            // this receives object with CHANGES in registrations and meal count
            const { uid, registrationCount, mealCount } = action.payload;
            let allRallies = state.allRallies;
            // get existing registration
            const existingRally = allRallies.filter((ral) => {
                (ral) => ral.uid == uid;
            });
            let theRally = existingRally[0];
            let newMealValues = {
                startTime: theRally?.meal?.startTime,
                cost: theRally?.meal?.cost,
                deadline: theRally?.meal?.deadline,
                offered: theRally?.meal?.offered,
                mealCount: theRally?.meal?.mealCount,
                mealsServed: theRally?.meal?.mealsServed,
            };
            //adjust the mealCount value
            let newMealCount =
                parseInt(theRally?.meal?.mealCount) + parseInt(mealCount);
            newMealValues.mealCount = newMealCount;
            theRally.meal = newMealValues;
            //adjust the registration value
            theRally.registrations =
                parseInt(registrationCount) + parseInt(theRally?.registrations);

            const newRallies = state.allRallies.map((ral) =>
                ral.uid !== uid ? ral : theRally
            );
            state.allRallies = newRallies;
            // update reg in list and return
        },
        updateRally: (state, action) => {
            const newValue = action.payload;

            const newRallyList = state.gatherings.map((ral) => {
                // console.log('typeof ral:', typeof ral);
                // console.log('typeof action.payload', typeof action.payload);
                return ral.id === newValue.id ? newValue : ral;
            });
            // console.log('=========FEATURE START==============');
            // console.log('f.r.RS:82-->newRallyList', newRallyList);
            // console.log('=========FEATURE END==============');
            function asc_sort(a, b) {
                return a.eventDate - b.eventDate;
            }
            let newBigger = newRallyList.sort(asc_sort);
            state.gatherings = newBigger;
            // printObject('new allRallies', state.allRallies);
            return state;
        },
        addNewRally: (state, action) => {
            let allRallies = state.allRallies;
            allRallies.push(action.payload);
            // ascending sort
            function asc_sort(a, b) {
                return (
                    new Date(a.eventDate).getTime() -
                    new Date(b.eventDate).getTime()
                );
            }
            let newBigger = allRallies.sort(asc_sort);
            state.allRallies = newBigger;
            // return
            return state;
        },
        deleteRally: (state, action) => {
            const smaller = state.allRallies.filter(
                (ral) => ral.uid !== action.payload.uid
            );
            state.allRallies = smaller;
            return state;
        },
        getStateRallies: (state, action) => {
            // this takes the payload to get the stateProv
            // then sorts desc (latest first, then oldest last)
            return state.allRallies;
        },
        getAllRallies: (state, action) => {
            return state.allRallies;
        },
        getDivisionInfo: (state, action) => {
            return state.info;
        },
        logout: (state) => {
            state.allRallies = [];
            state.displayRallies = [];
            state.userRallies = [];
            state.tmpRally = {};
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateGathering.pending, (state) => {
            state.isLoading = true;
        }),
            builder.addCase(updateGathering.fulfilled, (state, action) => {
                const newValue = action.payload;
                // printObject('DS:233-->action:\n', action);
                const newGatheringList = state.gatherings.map((ral) => {
                    return ral.id === newValue.id ? newValue : ral;
                });

                function asc_sort(a, b) {
                    return a.eventDate - b.eventDate;
                }
                let newBigger = newGatheringList.sort(asc_sort);
                state.gatherings = newBigger;

                state.isLoading = false;
                return state;
            }),
            builder.addCase(updateGathering.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            }),
            builder.addCase(newGathering.pending, (state) => {
                state.isLoading = true;
            }),
            builder.addCase(newGathering.fulfilled, (state, action) => {
                const newValue = action.payload;
                const gatheringList = state.gatherings;
                gatheringList.push(newValue);

                function asc_sort(a, b) {
                    return a.eventDate - b.eventDate;
                }
                let newBigger = gatheringList.sort(asc_sort);
                state.gatherings = newBigger;

                state.isLoading = false;
                return state;
            }),
            builder.addCase(newGathering.rejected, (state, action) => {
                console.log(action);
                let DANO = true;
                if (DANO) {
                    console.log('DS:247-->createGathering.rejected');
                    state.isLoading = false;
                    return state;
                }
                state.isLoading = false;
            }),
            builder.addCase(deleteGathering.pending, (state) => {
                //console.log("delete...pending");
                state.isLoading = true;
            }),
            builder.addCase(deleteGathering.fulfilled, (state, action) => {
                const smaller = state.gatherings.filter(
                    (ral) => ral.uid !== action.payload.id
                );
                state.gatherings = smaller;

                state.isLoading = false;
                return state;
                // console.log('fulfilled.action', action);
                // if (action.payload) {
                //     console.log('DELETED:', action.payload.id);
                //     // handle successful delete in your UI
                // }
            }),
            builder.addCase(deleteGathering.rejected, (state, action) => {
                console.log('deleteItem.rejected');
                printObject('extraReducer deleteItem error:', action);
                state.isLoading = false;
                state.error = action.payload;
            });
        // builder.addCase(deleteGathering.pending, (state) => {
        //     state.isLoading = true;
        // }),
        // builder.addCase(deleteGathering.fulfilled, (state, action) => {
        //     const deleteValue = action.payload;
        //     printObject('DS:278-->remove from REDUX:\n', deleteValue);

        //     state.isLoading = false;
        //     return state;
        // }),
        // builder.addCase(deleteGathering.rejected, (state, action) => {
        //     printObject('DS:284-->deleteGathering.rejected', action);
        //     state.error = true;
        //     state.errorMessage = action.payload;
        //     state.isLoading = false;
        // });
    },
});

// Action creators are generated for each case reducer function
export const {
    initializeDivision,
    getDivisionInfo,
    loadDivisionInfo,
    getRally,
    addNewRally,
    updateRally,
    updateRegNumbers,
    deleteRally,
    loadDisplayRallies,
    createTmp,
    updateTmp,
    getStateRallies,
    getAllRallies,
    logout,
} = divisionSlice.actions;

export default divisionSlice.reducer;
