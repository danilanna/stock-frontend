import { PRODUCT } from './actionTypes';
import ProductApi from "../api/productApi";

function loadProductsSuccess(products) {
    return {type: PRODUCT.DONE, products: products};
}

function loadingProducts() {
    return {type: PRODUCT.FETCH_ALL};
}

function loadProductSuccess() {
    return {type: PRODUCT.FETCH_PRODUCT};
}

function loadingProduct(product) {
    return {type: PRODUCT.FETCH_PRODUCT_DONE, product: product};
}

function saved(product) {
    return {type: PRODUCT.SAVE_DONE, product: product};
}

function save(product) {
    return {type: PRODUCT.SAVE, product: product};
}

function removed() {
    return {type: PRODUCT.DELETE_DONE};
}

function remove(product) {
    return {type: PRODUCT.DELETE, product: product};
}

export function reset() {
    return {type: PRODUCT.RESET};
}

export function openCloseDialog(open, data) {
    return {type: PRODUCT.OPEN_DIALOG, openDialog: open, dialogData: data};
}

export function openCloseAlert(open, data) {
    return {type: PRODUCT.OPEN_ALERT, openAlert: open, alertData: data};
}

export function loadProducts(name) {
    return dispatch => {
        dispatch(loadingProducts());
        return ProductApi.getAllProducts(name).then(products => {
            dispatch(loadProductsSuccess(products));
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadProductById(id) {
    return dispatch => {
        dispatch(loadProductSuccess());
        return ProductApi.getProductById(id).then(product => {
            dispatch(loadingProduct(product));
        }).catch(error => {
            throw(error);
        });
    };
}

export function saveProduct(product) {
    return dispatch => {
        dispatch(save(product));
        return ProductApi.saveProduct(product).then(product => {
            const message = `Produto ${product.name} salvo com sucesso!`;
            dispatch(saved(product));
            dispatch(openCloseAlert(true, {message}));
        }).catch(error => {
            throw(error);
        });
    };
}

export function deleteProduct(product) {
    return dispatch => {
        dispatch(remove(product));
        return ProductApi.remove(product).then(() => {
            const message = `Produto ${product.name} removido com sucesso!`;
            dispatch(removed());
            dispatch(openCloseAlert(true, {message}));
        }).catch(error => {
            throw(error);
        });
    };
}