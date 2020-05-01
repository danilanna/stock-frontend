import {combineReducers} from 'redux';
import productReducer from './productReducer';
import stockReducer from './stockReducer';

const rootReducer = combineReducers({
    productReducer,
    stockReducer
});

export default rootReducer;