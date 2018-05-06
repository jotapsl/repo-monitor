import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';

class LoginCallbackPage extends Component {
    componentDidMount() {
        const { login, isLogged, location} = this.props;

        if (isLogged)
            return;

        // TODO helper function getUrlParam

        const code =
            location.search.match(/\?code=(.*)/) &&
            location.search.match(/\?code=(.*)/)[1];

        login(code);
    }

    render() {
        const { isLogged, authError } = this.props;
        
        if (isLogged)
            return (<Redirect to='/app' />);

        if (authError)
            return (<div>Error! Try to login using the login button!</div>);

        return (
            <div className="m-3 text-center">
                <i className="fas fa-3x fa-sync fa-spin"></i>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLogged: state.auth.hasSession,
        authError: state.auth.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (code) => dispatch(loginAction(code))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginCallbackPage);