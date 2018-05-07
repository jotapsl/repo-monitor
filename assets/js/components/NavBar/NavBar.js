import React, { Component } from "react";
import { AuthConfig } from '../../constants';
import { connect } from 'react-redux';
import { logoutAction } from '../../actions/authActions';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            githubHref: '#'
        };

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        let { CLIENT_ID, SCOPE, CALLBACK_URL } = AuthConfig;

        this.setState({
            githubHref: `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${CALLBACK_URL}`
        });
    }

    logout() {
        const { logout } = this.props;

        logout();
    }
   
    render() {
        const { githubHref } = this.state;
        const { isLogged, username, loggingIn } = this.props;

        const loginButton = (
            <div><a href={githubHref} className="btn btn-success btn-block" aria-label="Login">
                <i className="fab fa-github fa-lg" />
                <span> Login using GitHub </span>
            </a></div>
        );

        const usernameLogoutButton = (
            <div>
                <span className="mx-2 text-white">{username}</span>
                <button onClick={this.logout} type="button" title="Log out" className="btn btn-outline-light">
                    <i className="fas fa-sign-out-alt" />
                </button>
            </div>
        );

        const menu = loggingIn ? (null) : (isLogged ? usernameLogoutButton : loginButton);

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <div className="navbar-brand">Repo Manager</div>
                    
                    {menu}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.auth.hasSession,
        username: state.auth.username,
        loggingIn: state.auth.loggingIn
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logoutAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
