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
                deletedProduct: action.deletedProduct,
                deleted: false
            });
        case PRODUCT.DELETE_DONE:
            return Object.assign({}, state, {
                deletedProduct: {},
                deleted: true,
                isFetching: false,
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
        case PRODUCT.SET_ERROR:
            return Object.assign({}, state, {
                isError: action.status,
                isFetching: false,
            });
        default:
            return state;
    }
};