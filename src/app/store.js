import { configureStore } from '@reduxjs/toolkit';

import userSlice from '../../features/users/userSlice';
export const store = configureStore({
    reducer: {
        rallies: rallyReducer,
        user: userSlice,
    },
});
