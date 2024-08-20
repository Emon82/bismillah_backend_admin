import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from '../src/redux/store'
import ReactNotification from "react-notifications-component";
import Admin from "layouts/Admin.js";
import Login from "components/admin/LogIn";
import "assets/css/bismillah_marrige.css?v=1.9.0";
import PrivetRoute from "./utlils/privetRoute";
import "react-notifications-component/dist/theme.css";

const hist = createBrowserHistory();
ReactDOM.render(
  <div>
     <Provider store={store}>
      <ReactNotification />
      <Router history={hist}>
        <Switch>
          <Route path="/" component={Login} exact />
          <PrivetRoute path="/admin" component={Admin} />
        </Switch>
      </Router>
      </Provider>
  </div>
  ,
  document.getElementById("root")
);
