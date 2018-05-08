import axios from "axios";
import { Urls } from "../utils";

/* Add repository action */

export const repoAddAction = reponame => {
    return dispatch => {
        dispatch(repoAddStart());
        dispatch(clearAlertAction());

        axios.post(Urls.add_repository(), { reponame }).then(
            res => {
                dispatch(repoAddFinish());
                dispatch(clearRepoFilter());
                dispatch(setAlertAction(res.data["message"], "SUCCESS"));
                dispatch(fetchCommitsAction());
            },
            err => {
                dispatch(repoAddFinish());
                dispatch(setAlertAction(err.response.data["error"], "ERROR"));
            }
        );
    };
};

/* Fetch commits action */

export const fetchCommitsAction = () => {
    return (dispatch, getState) => {
        dispatch(fetchCommitsStart());

        const { page } = getState().commit.pageConfig;
        const reponame = getState().commit.repoFilter;

        const params = { page: page };
        if (reponame) params.reponame = reponame;

        axios.get(Urls.list_commits(), { params }).then(res => {
            const list = res.data.list.map(item => {
                return {
                    id: item.id,
                    author: item.author,
                    message: item.message,
                    repo: item.repo__full_name,
                    date: new Date(item.timestamp).toDateString()
                };
            });

            const { hasNext, hasPrev, page } = res.data;
            const pageConfig = { hasNext, hasPrev, page };

            dispatch(fetchCommitsFinish(list));
            dispatch(setPageConfig(pageConfig));
        });
    };
};

/* Set page action */

export const setPageAction = page => {
    return dispatch => {
        dispatch(setPage(page));
        dispatch(fetchCommitsAction());
    };
};

/* Repository filter actions */

export const setRepoFilterAction = reponame => {
    return dispatch => {
        dispatch(setRepoFilter(reponame));
        dispatch(setPage(1));
        dispatch(fetchCommitsAction());
    };
};

export const clearRepoFilterAction = () => {
    return dispatch => {
        dispatch(clearRepoFilter());
        dispatch(setPage(1));
        dispatch(fetchCommitsAction());
    };
};

/* Event functions */

const setPage = page => {
    return {
        type: "SET_PAGE",
        payload: { page }
    };
};

const setPageConfig = pageConfig => {
    return {
        type: "SET_PAGE_CONFIG",
        payload: { pageConfig }
    };
};

const fetchCommitsStart = () => {
    return {
        type: "FETCH_COMMITS_START"
    };
};

const fetchCommitsFinish = list => {
    return {
        type: "FETCH_COMMITS_FINISH",
        payload: { list }
    };
};

const repoAddStart = () => {
    return {
        type: "REPO_ADD_START"
    };
};

const repoAddFinish = () => {
    return {
        type: "REPO_ADD_FINISH"
    };
};

const setRepoFilter = reponame => {
    return {
        type: "SET_REPO_FILTER",
        payload: { reponame }
    };
};

const clearRepoFilter = () => {
    return {
        type: "CLEAR_REPO_FILTER"
    };
};

export const setAlertAction = (message, type) => {
    return {
        type: "ADD_ALERT",
        payload: { message, type }
    };
};

export const clearAlertAction = () => {
    return {
        type: "CLEAR_ALERT"
    };
};
