export default (
    state = {
        accessToken: null,
        userName: null,
        fetching: false,
        error: false
    },
    action
) => {
    let newState = state;

    switch (action.type) {
        case "FETCHING_ACCESS_TOKEN":
            newState = Object.assign({}, state, {fetching: true, error: false});
            break;
        case "SET_ACCESS_TOKEN":
            newState = Object.assign({}, state, {accessToken: action.payload.token, userName: 'John Doe', fetching: false})
            break;
        case "ERROR_ACCESS_TOKEN":
            newState = Object.assign({}, state, {accessToken: null, userName: null, fetching: false, error: true})
            break;
        case "CLEAR_ACCESS_TOKEN":
            newState = Object.assign({}, state, {accessToken: null, userName: null})
            break;
    }

    return newState;
};
