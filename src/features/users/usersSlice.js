import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    currentUser: {
        isLoggedIn: true,
        phone: '7066042494',
        firstName: 'TTRep',
        lastName: 'Account',
        uid1: '6b5f1019-0776-42e2-8cce-d7a2fc8bb93e',
        uid: 'bb3aa10a-0956-41ba-bcba-51e9ffd80985',
        login: 'ttrep',
        email: 'danocolombo@gmail.com',
        jwt: 'eyJraWQiOiJNY1JOSmNUXC9pemxpTW1LOXJhbUl1TGNqSHZhbTlnUjNKZlFYcTZDZW5QTT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzYTllZGUwYS03OTUxLTQ3NGMtOWU2ZS1lMDQzNzYxM2U1MGYiLCJjb2duaXRvOmdyb3VwcyI6WyJwYXRlTGVhZHMiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xXzJBRDRhUFd4dCIsImNvZ25pdG86dXNlcm5hbWUiOiJ0dGxlYWQiLCJhdWQiOiJxYjIxYWxrZDdoNmRxdmo1dnMzdHFmZHYwIiwiZXZlbnRfaWQiOiI5YjMxMjM0YS05ZWNmLTQzNWItOWMxYy1iMmY5MzdlZTMyZTEiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY1NDEzNzY2NywiZXhwIjoxNjU0MTQxMjY2LCJpYXQiOjE2NTQxMzc2NjcsImVtYWlsIjoiZGFub2NvbG9tYm9AZ21haWwuY29tIn0.vj_K4SemFTVnu6WL-pQG5kf-UJ9icqeRK1rHxc160hSOPRwr-wOZMdmNK1eIGxekdISaIIrHMzsR2qElutX21Zk3onE0FN3o9e5_utLD0hfqVXp1W9eRcIgRakLdfaGt9kCo_3BDPNHd-0fDO699x62PyYZd2Ae48eU_3XY0aF3HmFYLUTEODnUVAkFLxxWLqqJKUiyg0zhA72dxUeQigE5LTgcmgRB6VlVNUDH3BC9bZM8_obE2_wF3ov6t_m_zlKGfe0r_1ULPGkLQDrwYCiIMCM5pZR4wj-aBmYuHW9hh-zLw7kH9VnSMOW_gFDkD2ANcjEJYh_59WfQVn-IFQA',
        stateRep: 'TT',
    },
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getCurrentUser: (state, action) => {
            return state.currentUser;
        },
    },
});

// Action creators are generated for each case reducer function
export const { getCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
