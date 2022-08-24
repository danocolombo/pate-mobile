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
    ownerEmail: 'dflt@init.com',
    code: 'DFLT',
    ownerContact: 'Affiliate Owner',
    label: 'DEFAULT',
    status: 'active',
    category: 'default',
    description: 'default desc. value',
    ownerPhone: '1234567890',
    title: 'Default Title',
};

const initialState = {
    appName: 'P8 Rallies',
    region: 'us#east#dflt',
    eventRegion: 'dflt',
    stateProv: 'TT',
    affiliateTitle: 'default affTitle',
    today: today,
    affiliation: 'DFLT',
    isLoading: true,
    affiliate: AFF,
    userRole: '',
};

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        updateAppName: (state, action) => {
            state.appName = action.payload;
        },
        setRegion: (state, action) => {
            state.region = action.payload;
        },
        updateRegion: (state, action) => {
            state.region = action.payload;
        },
        setEventRegion: (state, action) => {
            state.eventRegion = action.payload;
        },
        updateEventRegion: (state, action) => {
            state.eventRegion = action.payload;
        },
        updateStateProv: (state, action) => {
            state.stateProv = action.payload;
        },
        updateAffiliate: (state, action) => {
            state.affiliate = action.payload;
        },
        updateAffiliation: (state, action) => {
            state.affiliation = action.payload;
        },

        updateAffiliateTitle: (state, action) => {
            state.affiliateTitle = action.payload;
        },
        updateUserRole: (state, action) => {
            state.userRole = action.payload;
        },
        clearToday: (state) => {
            state.today = '';
        },
        setSystemDate: (state, action) => {
            state.today = action.payload;
        },
        logout: (state) => {
            state.appName = '';
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
    updateAppName,
    setRegion,
    setEventRegion,
    updateRegion,
    updateEventRegion,
    logout,
    updateStateProv,
    setSystemDate,
    updateAffiliate,
    updateUserRole,
    updateAffiliateTitle,
    updateAffiliation,
    clearToday,
} = systemSlice.actions;

export default systemSlice.reducer;
