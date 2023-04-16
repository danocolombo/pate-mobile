import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { printObject, getToday } from '../../utils/helpers';
import { getPateDate } from '../../utils/date';
import { getDivisionProfiles } from '../../providers/profiles.provider';
//   this is url for all meetings

const initialState = {
    actives: [],
    team: [],
    guests: [],
    nonActives: [],
    profileCount: 0,
    isLoading: false,
};

export const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        clearProfiles: (state) => {
            state.actives = [];
            state.team = [];
            state.guests = [];
            state.nonActives = [];
            state.count = 0;
            state.isLoading = false;
        },
        logout: (state) => {
            state.actives = [];
            state.team = [];
            state.guests = [];
            state.nonActives = [];
            state.count = 0;
            state.isLoading = false;
        },
    },
    extraReducers: {
        [getDivisionProfiles.pending]: (state) => {
            state.isLoading = true;
        },
        [getDivisionProfiles.fulfilled]: (state, action) => {
            console.log(action);
            state.isLoading = false;
            state.actives = action.payload?.actives || [];
            state.team = action.payload?.team || [];
            state.guests = action.payload?.guests || [];
            state.nonActives = action.payload?.nonActives || [];
        },
        [getDivisionProfiles.rejected]: (state, action) => {
            console.log(action);
            state.isLoading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { clearProfiles, logout } = profilesSlice.actions;

export default profilesSlice.reducer;
