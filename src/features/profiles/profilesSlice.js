import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { printObject } from '../../utils/helpers';

const initialState = {
    allProfiles: [],
    leaders: [],
    guests: [],
    isLoading: false,
};
export const getProfiles = createAsyncThunk(
    'rallies/getProfiles',
    async (affiliateCode, thunkAPI) => {
        try {
            console.log('trying...');
            console.log('affiliate:', affiliateCode);
            return affiliateCode;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                'PS:16-->>> something went wrong in createAsyncThunk'
            );
        }
    }
);
export const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        loadProfiles: (state, action) => {
            // state.publicRallies = action.payload;
            state.allProfiles = action.payload;
            return state;
        },
        updateProfile: (state, action) => {
            const updates = state.allProfiles.map((pro) => {
                if (pro.uid === action.payload.uid) {
                    return action.payload;
                } else {
                    return pro;
                }
            });
            state.allProfiles = updates;
            return state;
        },
        loadLeaders: (state, action) => {
            state.leaders = action.payload;
            return state;
        },
        loadGuests: (state, action) => {
            state.guests = action.payload;
            return state;
        },
        clearLeadersAndGuests: (state) => {
            state.leaders = [];
            state.guests = [];
        },
        logout: (state) => {
            state.allProfiles = [];
            state.leaders = [];
            state.guests = [];
            return state;
        },
    },
    extraReducers: {
        [getProfiles.pending]: (state) => {
            state.isLoading = true;
        },
        [getProfiles.fulfilled]: (state, action) => {
            // console.log(action);
            // printObject('RS:70-->results...affiliate:', action);
            state.isLoading = false;
            // printObject('RS:223--> action', action);
            // state.displayRallies = state.allRallies.filter(
            //     (r) =>
            //         r.eventDate >= action.payload &&
            //         r.eventRegion === 'test' &&
            //         r.approved === true
            // );
        },
        [getProfiles.rejected]: (state, action) => {
            console.log(action);
            state.isLoading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    clearLeadersAndGuests,
    loadGuests,
    loadLeaders,
    loadProfiles,
    updateProfile,
    logout,
} = profilesSlice.actions;

export default profilesSlice.reducer;
