import { configureStore } from '@reduxjs/toolkit';
import ralliesReducer from '../features/rallies/ralliesSlice';
import usersReducer from '../features/users/usersSlice';
export const store = configureStore({
    reducer: {
        rallies: ralliesReducer,
        users: usersReducer,
    },
});
