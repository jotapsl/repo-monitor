import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthConfig } from '../../../constants';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            githubHref: '#'
        };
    }

    componentDidMount() {
        let { CLIENT_ID, SCOPE, CALLBACK_URL } = AuthConfig;

        this.setState({
            githubHref: `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${CALLBACK_URL}`
        });
    }

    render() {
        let { githubHref } = this.state;

        return (
            <div className="login-container row">
                <div className="col-12 col-lg-8">
                    <div className="card p-3">
                        <div className="card-body">
                            <h4 className="card-title">Repo Manager</h4>
                            <p className="card-text">
                                Repo Manager is a React/Django application where you
                                can track commits made on your repositories at
                                GitHub. You first log in using GitHub OAuth
                                protocol. Then you add your repos so we can track
                                your changes. When adding a repository, Repo Manager
                                will automatically add the commits from the past 30
                                days, and then will start tracking new changes for
                                you.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <div className="card p-3">
                        <a href={githubHref} className="btn btn-success btn-block" aria-label="Login">
                            <i className="fab fa-github fa-lg" />
                            <span> Login using GitHub </span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
