export default (
    state = {
        alertMessage: null,
        alertType: null,
        repoAddLoading: false,

        commitsLoading: false,
        commitList: [],

        repoFilter: null,
        pageConfig: {
            page: 1,
            hasNext: true,
            hasPrev: true
        }
    },
    action
) => {
    switch (action.type) {
        case "REPO_ADD_START":
            return Object.assign({}, state, {repoAddLoading: true});
        case "REPO_ADD_FINISH":
            return Object.assign({}, state, {repoAddLoading: false});

        case "ADD_ALERT":
            return Object.assign({}, state, {alertMessage: action.payload.message, alertType: action.payload.type});
        case "CLEAR_ALERT":
            return Object.assign({}, state, {alertMessage: null, alertType: null});

        case "FETCH_COMMITS_START":
            return Object.assign({}, state, {commitsLoading: true, commitList: []});
        case "FETCH_COMMITS_FINISH":
            return Object.assign({}, state, {commitsLoading: false, commitList: action.payload.list});
            
        case "SET_REPO_FILTER":
            return Object.assign({}, state, {repoFilter: action.payload.reponame});
        case "CLEAR_REPO_FILTER":
            return Object.assign({}, state, {repoFilter: null});

        case "SET_PAGE_CONFIG":
            return Object.assign({}, state, {pageConfig: Object.assign({}, action.payload.pageConfig)});
    }

    return state;
};
