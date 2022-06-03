import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const loadUserRallies = createAsyncThunk(
    'rallies/loadUserRallies',
    async (rallies, thunkAPI) => {
        try {
            // console.log('inside getActiveMeetings');
            const config = {
                headers: {
                    'Access-Control-Allow-Headers':
                        'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                    'Content-Type': 'application/json',
                },
            };

            let obj = {
                operation: 'getEventsForRep',
                payload: {
                    uid: user.uid,
                },
            };
            let body = JSON.stringify(obj);
            // printObject('body', body);
            let api2use =
                'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events';

            const resp = await axios.post(api2use, body, config);

            //const resp = await axios(url);
            // printObject('meetings(1)', resp);
            return resp.data.body.Items;
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
            state.tmpRally = action.payload;
        },
        updateTmp: (state, action) => {
            state.tmpRally = [...state.tmpRally, action.payload];
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
            state.userRallies = action.payload;
        },
        [loadUserRallies.rejected]: (state, action) => {
            printObject('action', action);
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
    createTmp,
    updateTmp,
    increment,
    decrement,
    incrementByAmount,
} = ralliesSlice.actions;

export default ralliesSlice.reducer;
