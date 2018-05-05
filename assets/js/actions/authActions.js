import axios from 'axios';

export const getSessionInfo = () => {
    return (dispatch) => {
        const hasSession = document.cookie.split(';').map(s => s.trim().split('=')[0]).includes('hassession');
        
        if (hasSession) {
            axios.get(Urls.get_session()).then(
                res => dispatch(fetchingSessionSuccessAction(res.data['username'])),
                err => dispatch(fetchingSessionFailedAction())
            );
        } else {
            dispatch(fetchingSessionFailedAction());
        }
    }
}

export const loginAction = (code) => {
    if (!code)
        throw new Error("No code to fetch token!");

    return (dispatch) => {
        dispatch(loginStartAction());

        axios.get(Urls.login(), {
            params: {
                code
            }
        }).then(
            (res) => {
                dispatch(loginSuccessfulAction(res.data['username']));
            },
            (err) => {
                dispatch(loginFailedAction());
            }
        );
    };
}

export const logoutAction = () => {
    return (dispatch) => {
        axios.get(Urls.logout()).then(
            res => dispatch({type: 'LOGOUT'})
        );
    }
};

const loginStartAction = () => {
    return {
        type: "LOGIN_START"
    };
};

const loginSuccessfulAction = (username) => {    
    return {
        type: "LOGIN_SUCCESSFUL",
        payload: {
            username
        }
    };
};

const loginFailedAction = (token) => {
    return {
        type: "LOGIN_FAILED"
    };
};

const fetchingSessionSuccessAction = (username) => {
    return {
        type: "FETCHING_SESSION_SUCCESS",
        payload: {
            username
        }
    };
}
const fetchingSessionFailedAction = () => {
    return {
        type: "FETCHING_SESSION_FAILED"
    };
}