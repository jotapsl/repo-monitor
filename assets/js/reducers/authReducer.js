import { ENETUNREACH } from "constants";

export default (
    state = {
        hasSession: false,
        fetchingSession: true,
        username: null,
        loggingIn: false,
        error: false
    },
    action
) => {
    let newState = state;

    switch (action.type) {
        case "LOGIN_START":
            newState = Object.assign({}, state, {loggingIn: true, error: false});
            break;
        case "LOGIN_SUCCESSFUL":
            newState = Object.assign({}, state, {hasSession: true, username: action.payload.username, loggingIn: false})
            break;
        case "LOGIN_FAILED":
            newState = Object.assign({}, state, {hasSession: false, username: null, loggingIn: false, error: true})
            break;
        case "LOGOUT":
            newState = Object.assign({}, state, {hasSession: false, username: null})
            break;

        case "FETCHING_SESSION_SUCCESS":
            newState = Object.assign({}, state, {hasSession: true, username: action.payload.username, fetchingSession: false});
            break;
        case "FETCHING_SESSION_FAILED":
            newState = Object.assign({}, state, {fetchingSession: false});
            break;
    }

    return newState;
};
