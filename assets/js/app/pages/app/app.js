import React, { Component } from "react";
import { Components } from "../..";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// TODO: responsivity

class AppPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [
                {
                    id: 1,
                    message: "Commit 1",
                    repo: "repouser/repository",
                    author: "commit author"
                },
                {
                    id: 2,
                    message: "Commit 2",
                    repo: "repouser/repository",
                    author: "commit author"
                },
                {
                    id: 3,
                    message: "Commit 3",
                    repo: "repouser/repository",
                    author: "commit author"
                },
                {
                    id: 4,
                    message: "Commit 4",
                    repo: "repouser/repository",
                    author: "commit author"
                },
                {
                    id: 5,
                    message: "Commit 5",
                    repo: "repouser/repository",
                    author: "commit author"
                }
            ]
        };
    }

    render() {
        const { list } = this.state;
        const { isLogged } = this.props;

        if (!isLogged)
            return (<Redirect to="/landing" />);

        return (
            <div>
                <div className="d-flex justify-content-between">
                    <h4>All repositories</h4>

                    <div className="input-group input-group-sm w-auto">
                        <input className="form-control" placeholder="user/repo" />
                        <div className="input-group-append">
                            <button className="btn btn-success">
                                <i className="fas fa-plus" />
                                <span> Add repository</span>
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="p-3">
                    <Components.CommitList list={list} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLogged: state.auth.accessToken != null
    };
};

export default connect(mapStateToProps)(AppPage);
