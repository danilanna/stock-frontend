import { STOCK } from '../actions/stockActionTypes';
import initialState from './initialStateStock';

export default function stockReducer(state = initialState, action) {
    switch(action.type) {
        case STOCK.SAVE:
            return Object.assign({}, state, {
                isFetching: true,
                stock: action.stock,
                saved: false
            });
        case STOCK.SAVE_DONE:
            return Object.assign({}, state, {
                stock: action.stock,
                saved: true
            });
        case STOCK.DELETE:
            return Object.assign({}, state, {
                isFetching: true,
                deletedStock: action.deletedStock,
                deleted: false
            });
        case STOCK.DELETE_DONE:
            return Object.assign({}, state, {
                deletedStock: {},
                deleted: true,
                isFetching: false,
            });
        case STOCK.FETCH_STOCK:
            return Object.assign({}, state, {
                isFetching: true,
                stock: {}
            });
        case STOCK.FETCH_STOCK_DONE:
            const date = action.stock.entryDate;
            action.stock.entryDate = new Date(date.split("/")[1] + '-' + date.split("/")[0] + '-' + date.split("/")[2]);
            action.stock.price = action.stock.price.replace(",", "");
            return Object.assign({}, state, {
                isFetching: false,
                stock: action.stock,
            });
        case STOCK.RESET:
            return initialState;
        case STOCK.OPEN_DIALOG:
            return Object.assign({}, state, {
                openDialog: action.openDialog,
                dialogData: action.dialogData
            });
        case STOCK.OPEN_ALERT:
            return Object.assign({}, state, {
                openAlert: action.openAlert,
                alertData: action.alertData
            });
        case STOCK.SET_ERROR:
            return Object.assign({}, state, {
                isError: action.status,
                isFetching: false,
                isFetchingProducts: false
            });
        case STOCK.FETCH_PRODUCT:
            return Object.assign({}, state, {
                isFetchingProducts: true
            });
        case STOCK.FETCH_PRODUCT_DONE:
            return Object.assign({}, state, {
                isFetchingProducts: false,
                products: action.products
            });
        case STOCK.SET_DATE:
            return Object.assign({}, state, {
                stock: {...state.stock, entryDate: action.entryDate}
            });
        case STOCK.SET_TYPE:
            return Object.assign({}, state, {
                stock: {...state.stock, type: action.stockType}
            });
        case STOCK.SET_PRODUCT:
            return Object.assign({}, state, {
                stock: {...state.stock, product: {id: action.productId}}
            });
        case STOCK.SET_PRICE:
            return Object.assign({}, state, {
                stock: {...state.stock, price: action.price}
            });
        case STOCK.SET_QUANTITY:
            return Object.assign({}, state, {
                stock: {...state.stock, quantity: action.quantity}
            });
        default:
            return state;
    }
};