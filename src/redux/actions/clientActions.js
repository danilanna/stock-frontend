import {CLIENT} from './clientActionTypes';
import ClientApi from "../api/clientApi";

function loadClientSuccess() {
    return {type: CLIENT.FETCH_CLIENT};
}

function loadingClient(client) {
    return {type: CLIENT.FETCH_CLIENT_DONE, client: client};
}

function saved(client) {
    return {type: CLIENT.SAVE_DONE, client: client};
}

function save(client) {
    return {type: CLIENT.SAVE, client: client};
}

function removed() {
    return {type: CLIENT.DELETE_DONE};
}

function remove(deletedClient) {
    return {type: CLIENT.DELETE, deletedClient: deletedClient};
}

export function reset() {
    return {type: CLIENT.RESET};
}

export function openCloseDialog(open, data) {
    return {type: CLIENT.OPEN_DIALOG, openDialog: open, dialogData: data};
}

export function openCloseAlert(open, data) {
    return {type: CLIENT.OPEN_ALERT, openAlert: open, alertData: data};
}

export function setError(status) {
    return {type: CLIENT.SET_ERROR, status: status};
}

export function loadClientById(id) {
    return dispatch => {
        dispatch(loadClientSuccess());
        return ClientApi.getClientById(id).then(client => {
            dispatch(loadingClient(client));
        }).catch(() => {
            const error = {
                message: "Ocorreu um erro ao buscar o cliente. Tente novamente mais tarde."
            };
            dispatch(setError(true));
            dispatch(openCloseAlert(true, error));
        });
    };
}

export function saveClient(client) {
    return dispatch => {
        dispatch(save(client));
        return ClientApi.saveClient(client).then(client => {
            const message = `Cliente ${client.name} salvo com sucesso!`;
            dispatch(saved(client));
            dispatch(openCloseAlert(true, {message}));
        }).catch(() => {
            const error = {
                message: "Ocorreu um erro ao salvar o cliente. Tente novamente mais tarde."
            };
            dispatch(setError(true));
            dispatch(openCloseAlert(true, error));
        });
    };
}

export function deleteClient(client) {
    return dispatch => {
        dispatch(remove(client));
        return ClientApi.remove(client).then(() => {
            const message = `Cliente ${client.name} removido com sucesso!`;
            dispatch(removed());
            dispatch(openCloseAlert(true, {message}));
        }).catch(() => {
            const error = {
                message: "Ocorreu um erro ao deletar o cliente. Tente novamente mais tarde."
            };
            dispatch(setError(true));
            dispatch(openCloseAlert(true, error));
        });
    };
}