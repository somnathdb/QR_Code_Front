
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Login from "layouts/Login";
import ProtectedRoute from "./auth/ProtectedRoute.js";
import "assets/css/material-dashboard-react.css?v=1.10.0";

ReactDOM.render(
  <BrowserRouter>
  <Switch>
    <Route exact path="/" component={Login} />
    <ProtectedRoute path="/admin" component={Admin} />
    <ProtectedRoute path="/rtl" component={RTL} />
    <Redirect from="/dashboard" to="/admin/dashboard" />
  </Switch>
</BrowserRouter>,
  document.getElementById("root")
);
