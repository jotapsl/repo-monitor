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

export const fetchCommitsAction = () => {
    return dispatch => {
        dispatch(fetchCommitsStart());

        axios.get(Urls.list_commits()).then(
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

