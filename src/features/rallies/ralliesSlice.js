import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { printObject } from '../../utils/helpers';
export const loadUserRallies = createAsyncThunk(
    'rallies/loadUserRallies',
    async (userId, thunkAPI) => {
        try {
            let response;
            console.log('userId', userId);
            const fetchRepEvents = async (userId) => {
                response = await fetch(
                    'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            operation: 'getEventsForRep',
                            payload: {
                                uid: userId,
                            },
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    }
                );
            };
            await fetchRepEvents(userId);
            printObject('fetchResponse', response);
            //const resp = await axios(url);
            // printObject('meetings(1)', resp);
            console.log('before return');
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);
const initialState = {
    value: 0,
    publicRallies: [],
    userRallies: [],
    tmpRally: {},
};

export const ralliesSlice = createSlice({
    name: 'rallies',
    initialState,
    reducers: {
        createTmp: (state, action) => {
            state.tmpRally = {};
            state.tmpRally = action.payload;
        },
        updateTmp: (state, action) => {
            const newTmp = Object.assign(state.tmpRally, action.payload);
            state.tmpRally = newTmp;
            return state;
        },
        // loadUserRallies: (state, action) => {
        //     state.userRallies = action.payload;
        // },
        loadRallies: (state, action) => {
            state.publicRallies = action.payload;
        },
        getRally: (state, action) => {
            let found = state.publicRallies.filter(
                (r) => r.uid === action.payload
            );
            return found;
        },
        addNewRally: (state, action) => {
            const bigger = [...state.publicRallies, action.payload];

            // ascending sort
            function asc_sort(a, b) {
                return (
                    new Date(a.eventDate).getTime() -
                    new Date(b.eventDate).getTime()
                );
            }
            let newBigger = bigger.sort(asc_sort);
            state.activeMeetings = newBigger;
            // return
            return state;
        },
        getStateRallies: (state, action) => {
            // this takes the payload to get the stateProv
            // then sorts desc (latest first, then oldest last)
            return state.publicRallies;
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
    extraReducers: {
        [loadUserRallies.pending]: (state) => {
            state.isLoading = true;
        },
        [loadUserRallies.fulfilled]: (state, action) => {
            state.isLoading = false;
            printObject('Extra action:', action);
            // printObject('Extra state', state);
            // state.userRallies = action.payload;
        },
        [loadUserRallies.rejected]: (state, action) => {
            console.log('yep, we got rejected...');
            state.isLoading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    loadRallies,
    getRally,
    addNewRally,
    // loadUserRallies,
    createTmp,
    updateTmp,
    getStateRallies,
    increment,
    decrement,
    incrementByAmount,
} = ralliesSlice.actions;

export default ralliesSlice.reducer;
