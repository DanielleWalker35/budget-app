import React from 'react';
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/index.js";
import Budget from './Budget/budget';

import App from "./App";
import "./index.css";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/Budget/:budgetId' component={Budget} />
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
