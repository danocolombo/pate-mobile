import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
    allProfiles: [],
    leaders: [],
    guests: [],
    total: 0,
    isLoading: true,
};
export const getProfiles = createAsyncThunk(
    'profiles/getProfiles',
    async (_, thunkAPI) => {
        try {
            // we get the data here but will simulate for now
            const profiles = [
                { id: '23323-2323-888', name: 'One Thing', role: 'guest' },
                { id: '23323-2323-222', name: 'Two Thing', role: 'lead' },
                { id: '23323-2323-111', name: 'Three Thing', role: 'regp' },
                { id: '23323-2323-212', name: 'Four Thing', role: 'guest' },
            ];
            return profiles;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                'PS:16-->>> something went wrong in createAsyncThunk'
            );
        }
    }
);
const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        clearProfiles: (state) => {
            state.allProfiles = [];
            state.leaders = [];
            state.guests = [];
            total = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfiles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProfiles.fulfilled, (state, action) => {
                // console.log('CS:60-->action:\n', action);
                state.isLoading = false;
                state.allProfiles = action.payload;
            })
            .addCase(getProfiles.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            });
    },
});

//console.log(cartSlice);
export const { clearProfiles } = profilesSlice.actions;

export default profilesSlice.reducer;
