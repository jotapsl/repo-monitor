import React from 'react';
import ReactDOM from 'react-dom';
import { Components, Pages } from './app';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthConfig } from './constants';
import { Provider } from 'react-redux';
import { Redirect } from 'react-router-dom';
import store from './store';

// TODO: use <Redirect> at route '/'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Components.Auth />
                <Components.NavBar />

                <div className="container p-3">

                    <Switch>
                        <Route path="/landing/" component={Pages.LandingPage} />
                        <Route path="/app/" component={Pages.AppPage} />
                        <Route path="/logincallback/" component={Pages.LoginCallbackPage} />
                        <Route render={() => (<Redirect to="/landing"/>)}/>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    </Provider>
, document.getElementById('react-app'));