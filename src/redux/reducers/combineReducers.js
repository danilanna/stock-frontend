import {combineReducers} from 'redux';
import productReducer from './productReducer';
import stockReducer from './stockReducer';
import balanceReducer from './balanceReducer';
import clientReducer from './clientReducer';
import saleReducer from './saleReducer';

const rootReducer = combineReducers({
    productReducer,
    stockReducer,
    balanceReducer,
    clientReducer,
    saleReducer,
});

export default rootReducer;