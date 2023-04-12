import { createSlice } from '@reduxjs/toolkit';
import { printObject } from '../../utils/helpers';
import { updateOrganization } from '../../pateGraphQL/mutations';

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
            // console.log('ININININININININ');
            // printObject('US:20-->state.currentUser:\n', state.currentUser);
            // printObject('US:21-->payload:', action.payload);
            const newValues = action.payload;
            const updates = { ...state.currentUser, ...newValues };
            state.currentUser = updates;
            // printObject('US:25-->state.currentUser:\n', state.currentUser);
            return state;
        },
        updateCurrentUserMembership: (state, action) => {
            console.log('ININININININININ');
            // printObject('US:20-->state.currentUser:\n', state.currentUser);
            printObject('US:32-->payload:', action.payload);
            //* get existing memberships push new
            let memberships = state.currentUser.memberships.items;

            let found = false;
            for (let i = 0; i < memberships.length; i++) {
                if (memberships[i].id === action.payload.id) {
                    Object.assign(memberships[i], action.payload);
                    found = true;
                    break;
                }
            }
            if (!found) {
                memberships.push(action.payload);
            }

            printObject('US:48-->memberships:', memberships);
            const updates = { ...state.currentUser, ...memberships };
            state.currentUser = updates;
            // printObject('US:25-->state.currentUser:\n', state.currentUser);
            return state;
        },
        updateAffiliateActiveAndReference: (state, action) => {
            //todo - update active references
            const newActive = {
                active: {
                    label: action.payload.label,
                    role: action.payload.role,
                    region: action.payload.region,
                    value: action.payload.value,
                },
            };
            let newAff = { ...state.currentUser.affiliations, ...newActive };
            let newUpdate = { affiliations: newAff };
            // printObject('slice newAff', newAff);
            const updates = { ...state.currentUser, ...newUpdate };
            // printObject('slice updates', updates);
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
        updateResidence: (state, action) => {
            const newResidenceValues = {
                residence: action.payload,
            };
            const updates = { ...state.currentUser, ...newResidenceValues };
            state.currentUser = updates;
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
        updateAffiliationActive: (state, action) => {
            const affiliations = {
                items: state.currentUser.affiliations.items,
                active: action.payload,
            };
            printObject('US:86==>affiliations:\n', affiliations);
            const currentSettings = state.currentUser;
            const newSettings = { ...currentSettings, affiliations };
            state.currentUser = newSettings;
            return state;
        },
        updateAffiliationActiveOLD: (state, action) => {
            //first get the selected
            const optionsList = state.currentUser.affiliations.options;
            const newAffiliateObject = optionsList.filter(
                (o) => o.value === action.payload
            );
            const newActiveValues = newAffiliateObject[0];
            const newActive = {
                label: newActiveValues.label,
                region: newActiveValues.region,
                role: newActiveValues.role,
                value: newActiveValues.value,
            };
            const affiliations = {
                options: optionsList,
                active: newActive,
            };

            const currentSettings = state.currentUser;
            const newSettings = { ...currentSettings, affiliations };
            state.currentUser = newSettings;
            return state;
        },
        logout: (state) => {
            state.currentUser = {};
            state.registrations = [];
            return state;
        },
        terminate: (state) => {
            // state.currentUser = {};
            state.currentUser.jwtToken = '';
            // state.registrations = [];
            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getCurrentUser,
    updateCurrentUser,
    updateCurrentUserMembership,
    saveCurrentUser,
    loadRegistrations,
    deleteRegistration,
    updateRegistration,
    addNewRegistration,
    updateResidence,
    updateAffiliationActive,
    updateAffiliateActiveAndReference,
    terminate,
    logout,
} = usersSlice.actions;

export default usersSlice.reducer;
