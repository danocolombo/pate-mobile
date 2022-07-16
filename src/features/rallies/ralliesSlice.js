import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { printObject } from '../../utils/helpers';
// export const loadUserRallies = createAsyncThunk(
//     'rallies/loadUserRallies',
//     async (userId, thunkAPI) => {
//         try {
//             let response;
//             console.log('userId', userId);
//             const fetchRepEvents = async (userId) => {
//                 response = await fetch(
//                     process.env.AWS_API_ENDPOINT + '/events',
//                     {
//                         method: 'POST',
//                         body: JSON.stringify({
//                             operation: 'getEventsForRep',
//                             payload: {
//                                 uid: userId,
//                             },
//                         }),
//                         headers: {
//                             'Content-type': 'application/json; charset=UTF-8',
//                         },
//                     }
//                 );
//             };
//             await fetchRepEvents(userId);
//             printObject('fetchResponse', response);
//             //const resp = await axios(url);
//             // printObject('meetings(1)', resp);
//             console.log('before return');
//             return response;
//         } catch (error) {
//             return thunkAPI.rejectWithValue('something went wrong');
//         }
//     }
// );
const initialState = {
    value: 0,
    // publicRallies: [],
    allRallies: [],
    userRallies: [],
    tmpRally: {},
    ratchet: 0,
    gagle: [],
};

export const ralliesSlice = createSlice({
    name: 'rallies',
    initialState,
    reducers: {
        createTmp: (state, action) => {
            state.tmpRally = {};
            state.tmpRally = action.payload;
            //printObject('state.tmpRally AFTER create', state.tmpRally);
            return state;
        },
        updateTmp: (state, action) => {
            const newTmp = Object.assign(state.tmpRally, action.payload);
            //const newTmp2 = { ...state.tmpRally, ...action.payload };
            //printObject('state.tmpRally AFTER updateTmp', state.tmpRally);
            state.tmpRally = newTmp;
            return state;
        },
        // loadUserRallies: (state, action) => {
        //     state.userRallies = action.payload;
        // },
        loadRallies: (state, action) => {
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
                    newMealInfo = {
                        startTime: ral.meal.startTime,
                        cost: ral.meal.cost,
                        deadline: ral.meal.deadline,
                        offered: true,
                        mealsServed: ral?.meal?.mealsServed
                            ? parseInt(ral.meal.mealsServed)
                            : 0,
                    };
                    let mCount = ral?.meal?.mealCount
                        ? parseInt(ral.meal.mealCount)
                        : 0;
                    mCount = mCount + parseInt(action.payload.mealCount);
                    newMealInfo = { ...newMealInfo, mealsServed: mCount };
                    let newRal = {};
                    newRal = { ...ral, meal: newMealInfo };
                    // deal with registrations
                    let regCount = 0;
                    regCount = ral?.registrations
                        ? parseInt(ral.registrations)
                        : 0;
                    regCount =
                        regCount + parseInt(action.payload.registrationCount);
                    newRal = { ...newRal, registrations: regCount };
                    // printObject('newRal:', newRal);

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
            // console.log('newValue:', newValue);
            const newRallyList = state.allRallies.map((ral) => {
                // console.log('typeof ral:', typeof ral);
                // console.log('typeof action.payload', typeof action.payload);
                return ral.uid === newValue.uid ? newValue : ral;
            });
            // console.log('=========FEATURE START==============');
            // console.log('f.r.RS:82-->newRallyList', newRallyList);
            // console.log('=========FEATURE END==============');
            function asc_sort(a, b) {
                return a.eventDate - b.eventDate;
            }
            let newBigger = newRallyList.sort(asc_sort);
            state.allRallies = newBigger;
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
        // loadUserRallies: (state, action) => {
        //     state.userRallies = action.payload;
        // },
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
    // extraReducers: {
    //     [loadUserRallies.pending]: (state) => {
    //         state.isLoading = true;
    //     },
    //     [loadUserRallies.fulfilled]: (state, action) => {
    //         state.isLoading = false;
    //         printObject('Extra action:', action);
    //         // printObject('Extra state', state);
    //         // state.userRallies = action.payload;
    //     },
    //     [loadUserRallies.rejected]: (state, action) => {
    //         console.log('yep, we got rejected...');
    //         state.isLoading = false;
    //     },
    // },
});

// Action creators are generated for each case reducer function
export const {
    loadRallies,
    getRally,
    addNewRally,
    updateRally,
    updateRegNumbers,
    deleteRally,
    // loadUserRallies,
    createTmp,
    updateTmp,
    getStateRallies,
    increment,
    decrement,
    incrementByAmount,
} = ralliesSlice.actions;

export default ralliesSlice.reducer;
