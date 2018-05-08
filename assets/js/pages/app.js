import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { RepoAdd, CommitList, Alert, Paginator } from "../components";

import {
    setAlertAction,
    clearAlertAction,
    repoAddAction,
    fetchCommitsAction,
    setRepoFilterAction,
    clearRepoFilterAction,
    setPageAction
} from "../actions/commitActions";

class AppPage extends Component {

    componentDidMount() {
        this.props.fetchCommits();
    }

    handleRepoAdd(reponame) {
        this.props.repoAdd(reponame);
    }

    handleRepoAddError(error) {
        this.props.setAlertError(error);
    }

    handleAlertDismiss() {
        this.props.clearAlert();
    }

    handleRepoSelect(reponame) {
        this.props.setRepoFilter(reponame);
    }

    handleRepoClear() {
        this.props.clearRepoFilter();
    }

    handlePaginatorAction(page) {
        this.props.setPage(page);
    }

    render() {
        const {
            isLogged,
            repoAddLoading,
            alertMessage,
            alertType,
            commitList,
            commitsLoading,
            repoFilter,
            pageConfig
        } = this.props;

        if (!isLogged) return <Redirect to="/landing/" />;

        const loadingIcon = commitsLoading ? (
            <div className="m-3 text-center">
                <i className="fas fa-3x fa-sync fa-spin"></i>
            </div>
        ) : (null);

        const header = repoFilter ? (
            <h4>Filtering by {repoFilter}
                <div className="btn btn-dark ml-2 py-0 px-1 cursor-pointer" title="Clear filter" onClick={() => this.handleRepoClear()}>
                    <i className="fas fa-fw fa-sm fa-times"></i>
                </div>
            </h4>
        ) : (<h4>All repositories</h4>)

        return (
            <div>
                <div>
                    <Alert
                        msg={alertMessage}
                        type={alertType}
                        onDismiss={() => this.handleAlertDismiss()}
                    />
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        {header}
                    </div>

                    <div className="col-12 col-md-6 offset-lg-2 col-lg-4">
                        <RepoAdd
                            onAdd={reponame => this.handleRepoAdd(reponame)}
                            onError={error => this.handleRepoAddError(error)}
                            loading={repoAddLoading}
                            />
                    </div>
                </div>
                <div className="mt-3">
                    <CommitList list={commitList} onRepoSelect={(reponame) => this.handleRepoSelect(reponame)}/>
                    <Paginator show={!commitsLoading} config={pageConfig} onAction={(newPage) => this.handlePaginatorAction(newPage)}/>
                </div>
                {loadingIcon}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLogged: state.auth.hasSession,

        alertMessage: state.commit.alertMessage,
        alertType: state.commit.alertType,
        repoAddLoading: state.commit.repoAddLoading,

        commitList: state.commit.commitList,
        commitsLoading: state.commit.commitsLoading,

        repoFilter: state.commit.repoFilter,
        pageConfig: state.commit.pageConfig
    };
};

const mapDispatchToProps = dispatch => {
    return {
        repoAdd: (reponame) => dispatch(repoAddAction(reponame)),
        fetchCommits: () => dispatch(fetchCommitsAction()),

        setAlertError: error => dispatch(setAlertAction(error, 'ERROR')),
        clearAlert: () => dispatch(clearAlertAction()),

        setRepoFilter: reponame => dispatch(setRepoFilterAction(reponame)),
        clearRepoFilter: () => dispatch(clearRepoFilterAction()),

        setPage: page => dispatch(setPageAction(page))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
