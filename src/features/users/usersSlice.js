import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    currentUser: {},
    registrations: [],
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
            const updates = { ...state.currentUser, ...newValues };
            state.currentUser = updates;
            return state;
        },
        saveCurrentUser: (state, action) => {
            state.currentUser = action.payload;
            return state;
        },
        loadRegistrations: (state, action) => {
            state.registrations = action.payload;
            return state;
        },
        updateRegistration: (state, action) => {
            const newRegList = state.registrations.map((reg) => {
                return reg.uid === action.payload.uid ? action.payload : reg;
            });

            function asc_sort(a, b) {
                return b.eventDate - a.eventDate;
            }
            let newBigger = newRegList.sort(asc_sort);
            state.registrations = newBigger;
            return state;
        },
        addNewRegistration: (state, action) => {
            let allRegs = state.registrations;
            allRegs.push(action.payload);
            // ascending sort
            function asc_sort(a, b) {
                return b.eventDate - a.eventDate;
            }
            let newBigger = allRegs.sort(asc_sort);
            state.registrations = newBigger;
            return state;
        },
        deleteRegistration: (state, action) => {
            const smaller = state.registrations.filter(
                (reg) => reg.uid !== action.payload.uid
            );
            state.registrations = smaller;
            return state;
        },
        logout: (state) => {
            state.currentUser = {};
            state.registrations = [];
            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getCurrentUser,
    updateCurrentUser,
    saveCurrentUser,
    loadRegistrations,
    deleteRegistration,
    updateRegistration,
    addNewRegistration,
    logout,
} = usersSlice.actions;

export default usersSlice.reducer;
