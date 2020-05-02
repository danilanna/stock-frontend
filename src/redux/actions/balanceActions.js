import {BALANCE} from './balanceActionTypes';
import BalanceApi from "../api/balanceApi";

function loadBalance() {
    return {type: BALANCE.FETCH};
}

function loaded(balance) {
    return {type: BALANCE.FETCH_DONE, balance: balance};
}

export function openCloseAlert(open, data) {
    return {type: BALANCE.OPEN_ALERT, openAlert: open, alertData: data};
}

export function setError(status) {
    return {type: BALANCE.SET_ERROR, status: status};
}

export function setStart(start) {
    return {type: BALANCE.SET_START, start: start};
}

export function setEnd(end) {
    return {type: BALANCE.SET_END, end: end};
}

export function fetchBalance(start, end) {
    return dispatch => {
        dispatch(loadBalance());
        return BalanceApi.getBalance(start, end).then(balance => {
            dispatch(loaded(balance));
        }).catch(() => {
            const error = {
                message: "Ocorreu um erro ao buscar o balanço. Tente novamente mais tarde."
            };
            dispatch(setError(true));
            dispatch(openCloseAlert(true, error));
        });
    };
}