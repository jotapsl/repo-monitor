import axios from 'axios';
import { Urls } from '../utils';

export const repoAddAction = (reponame) => {
    return dispatch => {
        dispatch(repoAddStart());
        dispatch(clearAlertAction());

        axios.post(Urls.add_repository(), { reponame }).then(
            (res) => {
                dispatch(repoAddFinish());
                dispatch(setAlertAction(res.data['message'], 'SUCCESS'));
                dispatch(fetchCommitsAction())
            },
            (err) => {
                dispatch(repoAddFinish());
                dispatch(setAlertAction(err.response.data['error'], 'ERROR'));
            }
        );
    }
}

export const fetchCommitsAction = (reponame) => {
    return dispatch => {
        dispatch(fetchCommitsStart());
        let params = {};
        
        if (reponame)
            params = {reponame};

        axios.get(Urls.list_commits(), {params}).then(
            (res) => {
                const list = res.data.map(item => {
                    return {
                        id: item.id,
                        author: item.author,
                        message: item.message,
                        repo: item.repo__full_name,
                        date: (new Date(item.timestamp)).toDateString()
                    }
                })
                dispatch(fetchCommitsFinish(list));
            }
        );
    }
}

export const setRepoFilterAction = (reponame) => {
    return dispatch => {
        dispatch(setRepoFilter(reponame));
        dispatch(fetchCommitsAction(reponame));
    };
}

export const clearRepoFilterAction = (reponame) => {
    return dispatch => {
        dispatch(clearRepoFilter());
        dispatch(fetchCommitsAction(null));
    };
}

const fetchCommitsStart = () => {
    return {
        type: 'FETCH_COMMITS_START'
    };
}

const fetchCommitsFinish = (list) => {
    return {
        type: 'FETCH_COMMITS_FINISH',
        payload: {list}
    };
}

const repoAddStart = () => {
    return {
        type: 'REPO_ADD_START'
    };
}

const repoAddFinish = () => {
    return {
        type: 'REPO_ADD_FINISH'
    };
}

const setRepoFilter = (reponame) => {
    return {
        type: 'SET_REPO_FILTER',
        payload: { reponame }
    };
}

const clearRepoFilter = () => {
    return {
        type: 'CLEAR_REPO_FILTER'
    };
}

export const setAlertAction = (message, type) => {
    return {
        type: 'ADD_ALERT',
        payload: { message, type }
    }
}

export const clearAlertAction = () => {
    return {
        type:'CLEAR_ALERT'
    }
}

