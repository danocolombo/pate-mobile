import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    region: 'us#east#test',
    eventRegion: 'test',
    stateProv: 'TT',
    affiliateTitle: 'P8 Rally',
    today: '2022-08-08',
    affiliationEntity: 'Church',
    affiliation: 'CelebrateRecoveryP8Rally',
    isLoading: true,
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
        setStateProv: (state, action) => {
            state.stateProv = action.payload;
        },
        setSystemDate: (state, action) => {
            state.today = action.payload;
        },
        logout: (state) => {
            state.region = '';
            state.eventRegion = '';
            state.stateProv = '';
            state.affiliateTitle = '';
            state.today = '';
            state.affiliation = '';
            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setRegion,
    setEventRegion,
    logout,
    setStateProv,
    setSystemDate,
} = systemSlice.actions;

export default systemSlice.reducer;
