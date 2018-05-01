import React, { Component } from 'react';

class LoginCallbackPage extends Component {
    componentDidMount() {
        const code =
            window.location.href.match(/\?code=(.*)/) &&
            window.location.href.match(/\?code=(.*)/)[1];
        
        
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default LoginCallbackPage;