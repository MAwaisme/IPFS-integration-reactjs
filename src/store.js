import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/rootReducer';

const store = configureStore({
    reducer: {
        counter: rootReducer,
    },
});

export default store;
