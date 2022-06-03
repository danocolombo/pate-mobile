import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    publicRallies: [],
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
