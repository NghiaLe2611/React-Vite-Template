import { configureStore } from '@reduxjs/toolkit';
import reducer from '../app/reducer';

const store = configureStore({
    reducer,
});



export default store;