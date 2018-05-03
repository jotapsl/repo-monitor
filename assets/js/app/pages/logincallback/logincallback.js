import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAccessToken } from '../../../actions/authActions';
import { Redirect } from 'react-router-dom';

class LoginCallbackPage extends Component {
    componentDidMount() {
        const { dispatch, isLogged } = this.props;

        if (isLogged)
            return;

        const code =
            window.location.href.match(/\?code=(.*)/) &&
            window.location.href.match(/\?code=(.*)/)[1];

        dispatch(getAccessToken(code));
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
        isLogged: state.auth.accessToken != null,
        authError: state.auth.error
    };
}

export default connect(mapStateToProps)(LoginCallbackPage);