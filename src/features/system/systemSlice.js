import { createSlice } from '@reduxjs/toolkit';
const makeToday = () => {
    var d = new Date();
    const dminusone = d.toLocaleString(); //  M/DD/YYYY, H:MM:SS PM
    let datetime = dminusone.split(', '); // M/DD/YYYY
    const dateparts = datetime[0].split('/');
    const yr = dateparts[2];
    const mn = dateparts[0] < 10 ? '0' + dateparts[0] : dateparts[0];
    const da = dateparts[1] < 10 ? '0' + dateparts[1] : dateparts[1];
    const target = yr + mn + da;
    return target; // returns YYYYMMDD
};
let today = makeToday();
let AFF = {
    ownerEmail: 'owner@feo.com',
    code: 'FEO',
    ownerContact: 'Affiliate Owner',
    label: 'department',
    status: 'active',
    category: 'development',
    description: 'FEO System Testing Affiliate',
    ownerPhone: '1234567890',
    title: 'FEO Testing',
};

const initialState = {
    region: 'us#east#test',
    eventRegion: 'test',
    stateProv: 'TT',
    affiliateTitle: 'FEO title',
    today: today,
    affiliationEntity: '',
    affiliation: 'FEO',
    isLoading: true,
    affiliate: AFF,
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
        updateAffiliate: (state, action) => {
            state.affiliate = action.payload;
        },
        clearToday: (state) => {
            state.today = '';
        },
        setSystemDate: (state, action) => {
            state.today = action.payload;
        },
        logout: (state) => {
            state.region = '';
            state.eventRegion = '';
            state.stateProv = '';
            state.affiliateTitle = '';
            state.affiliationEntity = '';
            // state.today = '';
            state.affiliation = '';
            state.affiliate = {};
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
    updateAffiliate,
    clearToday,
} = systemSlice.actions;

export default systemSlice.reducer;
