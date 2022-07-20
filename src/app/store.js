import { configureStore } from '@reduxjs/toolkit';
import ralliesReducer from '../features/rallies/ralliesSlice';
import usersReducer from '../features/users/usersSlice';
import profilesReducer from '../features/profiles/profilesSlice';
export const store = configureStore({
    reducer: {
        rallies: ralliesReducer,
        users: usersReducer,
        profiles: profilesReducer,
    },
});
