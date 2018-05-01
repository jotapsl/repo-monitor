import React from 'react';
import ReactDOM from 'react-dom';
import { Components, Pages } from './app';
import { BrowserRouter, Route } from 'react-router-dom';

const title = 'It really does work! (this section is rendered by React, ' +
              "change the app's name below to test hot reloading)";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Components.NavBar></Components.NavBar>

            <div className="container p-3">
                <Route path="/login/" component={Pages.LoginPage} />
                <Route path="/app/" component={Pages.AppPage} />
                <Route path="/" component={Pages.LoginPage} exact />
            </div>
        </div>
    </BrowserRouter>
, document.getElementById('react-app'));