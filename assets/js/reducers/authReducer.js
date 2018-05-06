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
    switch (action.type) {
        case "LOGIN_START":
            return Object.assign({}, state, {loggingIn: true, error: false});
        case "LOGIN_SUCCESSFUL":
            return Object.assign({}, state, {hasSession: true, username: action.payload.username, loggingIn: false})
        case "LOGIN_FAILED":
            return Object.assign({}, state, {hasSession: false, username: null, loggingIn: false, error: true})
        case "LOGOUT":
            return Object.assign({}, state, {hasSession: false, username: null})

        case "FETCHING_SESSION_SUCCESS":
            return Object.assign({}, state, {hasSession: true, username: action.payload.username, fetchingSession: false});
        case "FETCHING_SESSION_FAILED":
            return Object.assign({}, state, {fetchingSession: false});
        }
        
    return state;
};
