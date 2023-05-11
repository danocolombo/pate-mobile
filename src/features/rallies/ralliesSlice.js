import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { printObject, getToday } from '../../utils/helpers';
import { getPateDate } from '../../utils/date';
//   this is url for all meetings

const initialState = {
    allRallies: [],
    userRallies: [],
    displayRallies: [],
    tmpRally: {},
    rallyCopy: {},
    isLoading: false,
};
export const getAvailableEvents = createAsyncThunk(
    'rallies/getAvailableEvents',
    async ({ name, today }, thunkAPI) => {
        try {
            const getFilterDate = async () => {
                return today;
            };

            return getFilterDate()
                .then((d) => d)
                .catch((e) => console.error('oops'));

            // const resp = await axios(url);
            // return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('RS:36-->>> something went wrong');
        }
    }
);
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
            // printObject('RS:22-->action:', action);
            if (action?.payload?.geolocation) {
                printObject('RS:47--action:\n', action);
                printObject('RS:48-->state.tmpRally:\n', state.tmpRally);
                // need to update latitude and longitude
                let newTmp1 = { ...state.tmpRally, ...action.payload };
                // printObject('RS:26-->newTmp1', newTmp1);
                state.tmpRally = newTmp1;
            } else {
                printObject('RS:54--action:\n', action);
                printObject('RS:55-->state.tmpRally:\n', state.tmpRally);
                let newTmp2 = Object.assign(state.tmpRally, action.payload);
                state.tmpRally = newTmp2;
            }
            printObject('RS:59-->allRallies:', state.allRallies);
            printObject('RS:60-->state.tmpRally:', state.tmpRally);
            return state;
        },
        createRallyCopy: (state, action) => {
            state.rallyCopy = {};
            state.rallyCopy = action.payload;
            //printObject('state.tmpRally AFTER create', state.tmpRally);
            return state;
        },
        clearRallyCopy: (state) => {
            state.rallyCopy = {};
            state.tmpRally = {};
            return state;
        },
        loadDisplayRallies: (state, action) => {
            state.displayRallies = action.payload;
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
            console.log('RS:164-->newValue:', newValue);
            printObject('allRallies:', state.allRallies);
            printObject('RS:165-->state.allRallies:', state.allRallies);
            const newRallyList = state.allRallies.map((ral) => {
                // console.log('typeof ral:', typeof ral);
                // console.log('typeof action.payload', typeof action.payload);
                return ral.id === newValue.id ? newValue : ral;
            });
            // console.log('=========FEATURE START==============');
            console.log('f.r.RS:82-->newRallyList', newRallyList);
            // console.log('=========FEATURE END==============');
            function asc_sort(a, b) {
                return a.eventDate - b.eventDate;
            }
            let newBigger = newRallyList.sort(asc_sort);
            state.allRallies = newBigger;
            printObject('new allRallies', state.allRallies);
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

        logout: (state) => {
            state.allRallies = [];
            state.displayRallies = [];
            state.userRallies = [];
            state.tmpRally = {};
            return state;
        },
    },
    extraReducers: {
        [getAvailableEvents.pending]: (state) => {
            state.isLoading = true;
        },
        [getAvailableEvents.fulfilled]: (state, action) => {
            // console.log(action);
            state.isLoading = false;
            // printObject('RS:223--> action', action);
            state.displayRallies = state.allRallies.filter(
                (r) =>
                    r.eventDate >= action.payload &&
                    r.eventRegion === 'test' &&
                    r.approved === true
            );
        },
        [getAvailableEvents.rejected]: (state, action) => {
            console.log(action);
            state.isLoading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    loadRallies,
    getRally,
    createRallyCopy,
    clearRallyCopy,
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
} = ralliesSlice.actions;

export default ralliesSlice.reducer;
