import {SALE} from './saleActionTypes';
import SaleApi from "../api/saleApi";
import ProductApi from "../api/productApi";
import ClientApi from "../api/clientApi";

function loadSaleSuccess() {
    return {type: SALE.FETCH_SALE};
}

function loadingSale(sale) {
    return {type: SALE.FETCH_SALE_DONE, sale: sale};
}

function saved(sale) {
    return {type: SALE.SAVE_DONE, sale: sale};
}

function save(sale) {
    return {type: SALE.SAVE, sale: sale};
}

function removed() {
    return {type: SALE.DELETE_DONE};
}

function remove(deletedSale) {
    return {type: SALE.DELETE, deletedSale: deletedSale};
}

export function reset() {
    return {type: SALE.RESET};
}

export function openCloseDialog(open, data) {
    return {type: SALE.OPEN_DIALOG, openDialog: open, dialogData: data};
}

export function openCloseAlert(open, data) {
    return {type: SALE.OPEN_ALERT, openAlert: open, alertData: data};
}

export function setError(status) {
    return {type: SALE.SET_ERROR, status: status};
}

function fetchProducts() {
    return {type: SALE.FETCH_PRODUCT};
}

function fetchProductsDone(products) {
    return {type: SALE.FETCH_PRODUCT_DONE, products: products};
}

function fetchClients() {
    return {type: SALE.FETCH_CLIENT};
}

function fetchClientsDone(clients) {
    return {type: SALE.FETCH_CLIENT_DONE, clients: clients};
}

export function setProductQuantity(quantity, index) {
    return {type: SALE.SET_PRODUCT_QUANTITY, quantity: quantity, index: index};
}

export function setProductPrice(price, index) {
    return {type: SALE.SET_PRODUCT_PRICE, price: price, index: index};
}

export function setClient(clientId) {
    return {type: SALE.SET_CLIENT, clientId: clientId};
}

export function setEntryDate(entryDate) {
    return {type: SALE.SET_DATE, entryDate: entryDate};
}

export function setProducts(products) {
    return {type: SALE.SET_PRODUCTS, products: products};
}

export function setTotal() {
    return {type: SALE.SET_TOTAL_VALUE};
}

export function loadProducts() {
    return dispatch => {
        dispatch(fetchProducts());
        const query = {pageSize: null, page: null, orderDirection: null, search: "unpaged"};
        return ProductApi.getAllProducts(query).then(products => {
            dispatch(fetchProductsDone(products.data));
        }).catch(() => {
            const error = {
                message: "Ocorreu um erro ao buscar os produtos. Tente novamente mais tarde."
            };
            dispatch(setError(true));
            dispatch(openCloseAlert(true, error));
        });
    };
}

export function loadClients() {
    return dispatch => {
        dispatch(fetchClients());
        const query = {pageSize: null, page: null, orderDirection: null, search: "unpaged"};
        return ClientApi.getAllClients(query).then(clients => {
            dispatch(fetchClientsDone(clients.data));
        }).catch(() => {
            const error = {
                message: "Ocorreu um erro ao buscar os clientes. Tente novamente mais tarde."
            };
            dispatch(setError(true));
            dispatch(openCloseAlert(true, error));
        });
    };
}

export function loadSaleById(id) {
    return dispatch => {
        dispatch(loadSaleSuccess());
        return SaleApi.getSaleById(id).then(sale => {
            dispatch(loadingSale(sale));
        }).catch(() => {
            const error = {
                message: "Ocorreu um erro ao buscar a venda. Tente novamente mais tarde."
            };
            dispatch(setError(true));
            dispatch(openCloseAlert(true, error));
        });
    };
}

export function saveSale(sale) {
    return dispatch => {
        dispatch(save(sale));
        return SaleApi.saveSale(sale).then(sale => {
            const message = `Venda salva com sucesso!`;
            dispatch(saved(sale));
            dispatch(openCloseAlert(true, {message}));
        }).catch(() => {
            const error = {
                message: "Ocorreu um erro ao salvar a venda. Tente novamente mais tarde."
            };
            dispatch(setError(true));
            dispatch(openCloseAlert(true, error));
        });
    };
}

export function deleteSale(sale) {
    return dispatch => {
        dispatch(remove(sale));
        return SaleApi.remove(sale).then(() => {
            const message = `Venda removida com sucesso!`;
            dispatch(removed());
            dispatch(openCloseAlert(true, {message}));
        }).catch(() => {
            const error = {
                message: "Ocorreu um erro ao deletar a venda. Tente novamente mais tarde."
            };
            dispatch(setError(true));
            dispatch(openCloseAlert(true, error));
        });
    };
}