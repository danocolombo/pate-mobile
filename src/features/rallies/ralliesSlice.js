import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    publicRallies: [],
};

export const ralliesSlice = createSlice({
    name: 'rallies',
    initialState,
    reducers: {
        loadRallies: (state, action) => {
            state.publicRallies = action.payload;
        },
        getRally: (state, action) => {
            let found = state.publicRallies.filter(
                (r) => r.uid === action.payload
            );
            return found;
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
    increment,
    decrement,
    incrementByAmount,
} = ralliesSlice.actions;

export default ralliesSlice.reducer;
