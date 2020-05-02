import {BALANCE} from '../actions/balanceActionTypes';
import initialState from './initialStateBalance';

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case BALANCE.FETCH:
            return Object.assign({}, state, {
                isFetching: true,
                balance: {},
                hasBeenFetched: false,
            });
        case BALANCE.FETCH_DONE:
            return Object.assign({}, state, {
                isFetching: false,
                balance: action.balance,
                hasBeenFetched: true,
            });
        case BALANCE.OPEN_ALERT:
            return Object.assign({}, state, {
                openAlert: action.openAlert,
                alertData: action.alertData
            });
        case BALANCE.SET_ERROR:
            return Object.assign({}, state, {
                isError: action.status,
                isFetching: false,
            });
        case BALANCE.SET_START:
            return Object.assign({}, state, {
                start: action.start,
            });
        case BALANCE.SET_END:
            return Object.assign({}, state, {
                end: action.end,
            });
        default:
            return state;
    }
};