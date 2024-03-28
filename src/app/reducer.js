import authReducer from './features/auth/authSlice';

import { combineReducers } from 'redux';

const reducer = combineReducers({
    auth: authReducer,
});

export default reducer;
