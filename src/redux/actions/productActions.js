import {PRODUCT} from './productActionTypes';
import ProductApi from "../api/productApi";

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

function remove(deletedProduct) {
    return {type: PRODUCT.DELETE, deletedProduct: deletedProduct};
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

export function setError(status) {
    return {type: PRODUCT.SET_ERROR, status: status};
}

export function loadProductById(id) {
    return dispatch => {
        dispatch(loadProductSuccess());
        return ProductApi.getProductById(id).then(product => {
            dispatch(loadingProduct(product));
        }).catch(() => {
            const error = {
                message: "Ocorreu um erro ao buscar o produto. Tente novamente mais tarde."
            };
            dispatch(setError(true));
            dispatch(openCloseAlert(true, error));
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
        }).catch(() => {
            const error = {
                message: "Ocorreu um erro ao salvar o produto. Tente novamente mais tarde."
            };
            dispatch(setError(true));
            dispatch(openCloseAlert(true, error));
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
        }).catch(() => {
            const error = {
                message: "Ocorreu um erro ao deletar o produto. Tente novamente mais tarde."
            };
            dispatch(setError(true));
            dispatch(openCloseAlert(true, error));
        });
    };
}