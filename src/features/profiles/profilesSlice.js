import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { printObject } from '../../utils/helpers';

const initialState = {
    allProfiles: [],
};

export const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        loadProfiles: (state, action) => {
            // state.publicRallies = action.payload;
            state.allProfiles = action.payload;
            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loadProfiles } = profilesSlice.actions;

export default profilesSlice.reducer;
