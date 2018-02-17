import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import homeReducer from './home';

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    home: homeReducer,
    routing: routerReducer
});
