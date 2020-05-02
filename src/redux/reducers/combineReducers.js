import {combineReducers} from 'redux';
import productReducer from './productReducer';
import stockReducer from './stockReducer';
import balanceReducer from './balanceReducer';
import clientReducer from './clientReducer';

const rootReducer = combineReducers({
    productReducer,
    stockReducer,
    balanceReducer,
    clientReducer,
});

export default rootReducer;