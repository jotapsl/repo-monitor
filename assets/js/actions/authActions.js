import axios from "axios";
import Cookies from "js-cookie";
import { Urls } from "../utils";

/* Actions */

export const getSessionInfoAction = () => {
    return dispatch => {
        const hasSession = Cookies.get("hassession");

        if (hasSession) {
            axios
                .get(Urls.login())
                .then(
                    res =>
                        dispatch(
                            fetchingSessionSuccessAction(res.data["username"])
                        ),
                    err => dispatch(fetchingSessionFailedAction())
                );
        } else {
            dispatch(fetchingSessionFailedAction());
        }
    };
};

export const loginAction = code => {
    if (!code) throw new Error("No code to fetch token!");

    return dispatch => {
        dispatch(loginStartAction());
        axios
            .post(Urls.login(), { code })
            .then(
                res => dispatch(loginSuccessfulAction(res.data["username"])),
                err => dispatch(loginFailedAction())
            );
    };
};

export const logoutAction = () => {
    return dispatch =>
        axios.post(Urls.logout()).then(res => dispatch({ type: "LOGOUT" }));
};

/* Event functions */

const loginStartAction = () => {
    return {
        type: "LOGIN_START"
    };
};

const loginSuccessfulAction = username => {
    return {
        type: "LOGIN_SUCCESSFUL",
        payload: {
            username
        }
    };
};

const loginFailedAction = token => {
    return {
        type: "LOGIN_FAILED"
    };
};

const fetchingSessionSuccessAction = username => {
    return {
        type: "FETCHING_SESSION_SUCCESS",
        payload: {
            username
        }
    };
};
const fetchingSessionFailedAction = () => {
    return {
        type: "FETCHING_SESSION_FAILED"
    };
};
