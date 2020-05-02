import { CLIENT } from '../actions/clientActionTypes';
import initialState from './initialStateClient';

export default function clientReducer(state = initialState, action) {
    switch(action.type) {
        case CLIENT.SAVE:
            return Object.assign({}, state, {
                isFetching: true,
                client: action.client,
                saved: false
            });
        case CLIENT.SAVE_DONE:
            return Object.assign({}, state, {
                client: action.client,
                saved: true
            });
        case CLIENT.DELETE:
            return Object.assign({}, state, {
                isFetching: true,
                deletedClient: action.deletedClient,
                deleted: false
            });
        case CLIENT.DELETE_DONE:
            return Object.assign({}, state, {
                deletedClient: {},
                deleted: true,
                isFetching: false,
            });
        case CLIENT.FETCH_CLIENT:
            return Object.assign({}, state, {
                isFetching: true,
                client: {}
            });
        case CLIENT.FETCH_CLIENT_DONE:
            return Object.assign({}, state, {
                isFetching: false,
                client: action.client,
            });
        case CLIENT.RESET:
            return initialState;
        case CLIENT.OPEN_DIALOG:
            return Object.assign({}, state, {
                openDialog: action.openDialog,
                dialogData: action.dialogData
            });
        case CLIENT.OPEN_ALERT:
            return Object.assign({}, state, {
                openAlert: action.openAlert,
                alertData: action.alertData
            });
        case CLIENT.SET_ERROR:
            return Object.assign({}, state, {
                isError: action.status,
                isFetching: false,
            });
        default:
            return state;
    }
};