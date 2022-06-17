import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    currentUser: {
        lastName: 'Colombo',
        stateProv: 'GA',
        city: 'Columbus',
        street: '2304 Leah Dr',
        postalCode: '31909',
        region: 'us#east#south#ga',
        stateRep: 'GA',
        email: 'gacrleader@gmail.com',
        phone: '7066042494',
        stateLead: 'GA',
        uid: 'b3f192ff-7dbf-4dae-a46d-ef7b0662f70d',
        churchName: 'Wynnbrook Baptist Church',
        churchStateProv: 'GA',
        churchCity: 'Columbus',
        firstName: 'Dano',
        isLoggedIn: true,
    },
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getCurrentUser: (state, action) => {
            return state.currentUser;
        },
        updateCurrentUser: (state, action) => {
            const newValues = action.payload;
            const updates = { ...state.currentUser, newValues };
            state.currentUser = updates;
            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const { getCurrentUser, updateCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
