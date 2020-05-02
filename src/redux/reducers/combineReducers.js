import {combineReducers} from 'redux';
import productReducer from './productReducer';
import stockReducer from './stockReducer';
import balanceReducer from './balanceReducer';

const rootReducer = combineReducers({
    productReducer,
    stockReducer,
    balanceReducer,
});

export default rootReducer;