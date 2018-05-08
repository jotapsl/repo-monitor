import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class LandingPage extends Component {
    render() {
        const { isLogged } = this.props;

        if (isLogged)
            return (<Redirect to='app/' />);

        return (
            <div>
                <h3>Welcome to Repo Manager</h3>
                <hr />
                <p>
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
        );
    }
}

const mapStateToProps = state => {
    return {
        isLogged: state.auth.hasSession
    };
}

export default connect(mapStateToProps)(LandingPage);
