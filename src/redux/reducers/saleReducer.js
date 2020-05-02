import { SALE } from '../actions/saleActionTypes';
import initialState from './initialStateSale';

export default function saleReducer(state = initialState, action) {
    switch(action.type) {
        case SALE.SAVE:
            return Object.assign({}, state, {
                isFetching: true,
                sale: action.sale,
                saved: false
            });
        case SALE.SAVE_DONE:
            return Object.assign({}, state, {
                sale: action.sale,
                saved: true
            });
        case SALE.DELETE:
            return Object.assign({}, state, {
                isFetching: true,
                deletedSale: action.deletedSale,
                deleted: false
            });
        case SALE.DELETE_DONE:
            return Object.assign({}, state, {
                deletedSale: {},
                deleted: true,
                isFetching: false,
            });
        case SALE.FETCH_SALE:
            return Object.assign({}, state, {
                isFetching: true,
                sale: {},
            });
        case SALE.FETCH_SALE_DONE:
            const date = action.sale.entryDate;
            action.sale.entryDate = new Date(date.split("/")[1] + '-' + date.split("/")[0] + '-' + date.split("/")[2]);
            return Object.assign({}, state, {
                isFetching: false,
                sale: action.sale,
                productsSet: false,
            });
        case SALE.RESET:
            return initialState;
        case SALE.OPEN_DIALOG:
            return Object.assign({}, state, {
                openDialog: action.openDialog,
                dialogData: action.dialogData
            });
        case SALE.OPEN_ALERT:
            return Object.assign({}, state, {
                openAlert: action.openAlert,
                alertData: action.alertData
            });
        case SALE.SET_ERROR:
            return Object.assign({}, state, {
                isError: action.status,
                isFetching: false,
            });
        case SALE.FETCH_PRODUCT:
            return Object.assign({}, state, {
                isFetchingProducts: true
            });
        case SALE.FETCH_PRODUCT_DONE:
            return Object.assign({}, state, {
                isFetchingProducts: false,
                products: action.products
            });
        case SALE.FETCH_CLIENT:
            return Object.assign({}, state, {
                isFetchingClients: true
            });
        case SALE.FETCH_CLIENT_DONE:
            return Object.assign({}, state, {
                isFetchingClients: false,
                clients: action.clients
            });
        case SALE.SET_PRODUCT:
            return Object.assign({}, state, {
                sale: {...state.sale, product: {id: action.productId}}
            });
        case SALE.SET_CLIENT:
            return Object.assign({}, state, {
                sale: {...state.sale, client: {id: action.clientId}}
            });
        case SALE.SET_DATE:
            return Object.assign({}, state, {
                sale: {...state.sale, entryDate: action.entryDate}
            });
        case SALE.SET_PRODUCT_QUANTITY:
            const productsQuantity = JSON.parse(JSON.stringify(state.products));
            const productQuantity = productsQuantity[action.index];
            productQuantity.quantity = action.quantity;
            return Object.assign({}, state, {
                products: productsQuantity,
            });
        case SALE.SET_PRODUCT_PRICE:
            const productsPrice = JSON.parse(JSON.stringify(state.products));
            const productPrice = productsPrice[action.index];
            productPrice.price = action.price;
            return Object.assign({}, state, {
                products: productsPrice,
            });
        case SALE.SET_PRODUCTS:
            return Object.assign({}, state, {
                productsSet: true
            });
        case SALE.SET_TOTAL_VALUE:
            let sum = 0;
            state.products.forEach((value) => {
                if (value.quantity !== undefined  && value.quantity !== "" && value.price !== undefined && value.price !== "") {
                    sum += Number(value.quantity) * Number(value.price);
                }
            });
            return Object.assign({}, state, {
                totalValue: sum
            });
        default:
            return state;
    }
};