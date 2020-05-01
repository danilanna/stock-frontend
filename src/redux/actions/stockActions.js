import {STOCK} from './stockActionTypes';
import StockApi from "../api/stockApi";
import ProductApi from "../api/productApi";

function loadingStock() {
    return {type: STOCK.FETCH_STOCK};
}

function loadingStockDone(stock) {
    return {type: STOCK.FETCH_STOCK_DONE, stock: stock};
}

function saved(stock) {
    return {type: STOCK.SAVE_DONE, stock: stock};
}

function save(stock) {
    return {type: STOCK.SAVE, stock: stock};
}

function removed() {
    return {type: STOCK.DELETE_DONE};
}

function remove(deletedStock) {
    return {type: STOCK.DELETE, deletedStock: deletedStock};
}

export function reset() {
    return {type: STOCK.RESET};
}

export function openCloseDialog(open, data) {
    return {type: STOCK.OPEN_DIALOG, openDialog: open, dialogData: data};
}

export function openCloseAlert(open, data) {
    return {type: STOCK.OPEN_ALERT, openAlert: open, alertData: data};
}

export function setError(status) {
    return {type: STOCK.SET_ERROR, status: status};
}

function fetchProducts() {
    return {type: STOCK.FETCH_PRODUCT};
}

function fetchProductsDone(products) {
    return {type: STOCK.FETCH_PRODUCT_DONE, products: products};
}

export function setEntryDate(entryDate) {
    return {type: STOCK.SET_DATE, entryDate: entryDate};
}

export function setType(stockType) {
    return {type: STOCK.SET_TYPE, stockType: stockType};
}

export function setProduct(productId) {
    return {type: STOCK.SET_PRODUCT, productId: productId};
}

export function setPrice(price) {
    return {type: STOCK.SET_PRICE, price: price};
}

export function setQuantity(quantity) {
    return {type: STOCK.SET_QUANTITY, quantity: quantity};
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

export function loadStockById(id) {
    return dispatch => {
        dispatch(loadingStock());
        return StockApi.getStockById(id).then(stock => {
            dispatch(loadingStockDone(stock));
        }).catch(() => {
            const error = {
                message: "Ocorreu um erro ao buscar o estoque. Tente novamente mais tarde."
            };
            dispatch(setError(true));
            dispatch(openCloseAlert(true, error));
        });
    };
}

export function saveStock(stock) {
    return dispatch => {
        dispatch(save(stock));
        return StockApi.saveStock(stock).then(stock => {
            const message = `Estoque salvo com sucesso!`;
            dispatch(saved(stock));
            dispatch(openCloseAlert(true, {message}));
        }).catch(() => {
            const error = {
                message: "Ocorreu um erro ao salvar o estoque. Tente novamente mais tarde."
            };
            dispatch(setError(true));
            dispatch(openCloseAlert(true, error));
        });
    };
}

export function deleteStock(stock) {
    return dispatch => {
        dispatch(remove(stock));
        return StockApi.remove(stock).then(() => {
            const message = `Registro removido com sucesso!`;
            dispatch(removed());
            dispatch(openCloseAlert(true, {message}));
        }).catch(() => {
            const error = {
                message: "Ocorreu um erro ao deletar o estoque. Tente novamente mais tarde."
            };
            dispatch(setError(true));
            dispatch(openCloseAlert(true, error));
        });
    };
}