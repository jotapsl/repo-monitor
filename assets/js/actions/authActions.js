import axios from 'axios';

export const getAccessToken = (code) => {
    if (!code)
        throw new Error("No code to fetch token!");

    return (dispatch) => {
        dispatch(fetchingAccessToken());

        axios.get(Urls.get_github_access_token(), {
            params: {
                code: code
            }
        }).then(
            (res) => {
                if (res.data['error'])
                    dispatch(errorAccessToken());
                else 
                    dispatch(setAccessToken(res.data['access_token']));
            },
        );
    }
}

const fetchingAccessToken = () => {
    return {
        type: "FETCHING_ACCESS_TOKEN"
    }
};

const setAccessToken = (token) => {
    return {
        type: "SET_ACCESS_TOKEN",
        payload: {
            token: token
        }
    }
};

const errorAccessToken = (token) => {
    return {
        type: "ERROR_ACCESS_TOKEN"
    }
};

export const clearAccessToken = () => {
    return {
        type: "CLEAR_ACCESS_TOKEN"
    }
}