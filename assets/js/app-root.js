import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { NavBar, Startup } from "./components";
import { LandingPage, AppPage, LoginCallbackPage } from "./pages";
import store from "./store";
import { axiosConfig } from "./constants/axios-config";

ReactDOM.render(
    <Provider store={store}>
        <Startup>
            <BrowserRouter>
                <div>
                    <NavBar />

                    <div className="container p-3">
                        <Switch>
                            <Route path="/landing/" component={LandingPage} />
                            <Route path="/app/" component={AppPage} />
                            <Route
                                path="/logincallback/"
                                component={LoginCallbackPage}
                            />
                            <Redirect to="/landing/" />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </Startup>
    </Provider>,
    document.getElementById("react-app")
);
