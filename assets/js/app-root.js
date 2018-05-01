import React from 'react';
import ReactDOM from 'react-dom';
import { Components, Pages } from './app';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthConfig } from './constants';

// TODO: use <Redirect> at route '/'

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Components.Auth />
            <Components.NavBar />

            <div className="container p-3">
                <Route path="/login/" component={Pages.LoginPage} />
                <Route path="/app/" component={Pages.AppPage} />
                <Route path="/logincallback/" component={Pages.LoginCallbackPage} />
                <Route path="/" component={Pages.LoginPage} exact />
            </div>
        </div>
    </BrowserRouter>
, document.getElementById('react-app'));