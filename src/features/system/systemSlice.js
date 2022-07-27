import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    region: '',
    eventRegion: '',
    stateProv: '',
};

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        setRegion: (state, action) => {
            state.region = action.payload;
        },
        setEventRegion: (state, action) => {
            state.eventRegion = action.payload;
        },
        logout: (state) => {
            state.region = '';
            state.eventRegion = '';
            state.stateProv = '';
            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setRegion, setEventRegion, logout } = systemSlice.actions;

export default systemSlice.reducer;
