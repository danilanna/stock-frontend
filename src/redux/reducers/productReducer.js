import { PRODUCT } from '../actions/actionTypes';
import initialState from './initialState';

export default function productReducer(state = initialState, action) {
    switch(action.type) {
        case PRODUCT.SAVE:
            return Object.assign({}, state, {
                isFetching: true,
                product: action.product,
                saved: false
            });
        case PRODUCT.SAVE_DONE:
            return Object.assign({}, state, {
                product: action.product,
                saved: true
            });
        case PRODUCT.DELETE:
            return Object.assign({}, state, {
                isFetching: true,
                product: action.product,
                deleted: false
            });
        case PRODUCT.DELETE_DONE:
            return Object.assign({}, state, {
                product: {},
                deleted: true,
                isFetching: false,
            });
        case PRODUCT.FETCH_ALL:
            return Object.assign({}, state, {
                isFetching: true,
                products: [],
                product: {},
                deleted: false,
                saved: false
            });
        case PRODUCT.DONE:
            return Object.assign({}, state, {
                isFetching: false,
                products: action.products,
            });
        case PRODUCT.FETCH_PRODUCT:
            return Object.assign({}, state, {
                isFetching: true,
                product: {}
            });
        case PRODUCT.FETCH_PRODUCT_DONE:
            return Object.assign({}, state, {
                isFetching: false,
                product: action.product,
            });
        case PRODUCT.RESET:
            return initialState;
        case PRODUCT.OPEN_DIALOG:
            return Object.assign({}, state, {
                openDialog: action.openDialog,
                dialogData: action.dialogData
            });
        case PRODUCT.OPEN_ALERT:
            return Object.assign({}, state, {
                openAlert: action.openAlert,
                alertData: action.alertData
            });
        default:
            return state;
    }
};