import { configureStore } from '@reduxjs/toolkit';
import ralliesReducer from '../features/rallies/ralliesSlice';

export const store = configureStore({
    reducer: {
        rallies: ralliesReducer,
    },
});
