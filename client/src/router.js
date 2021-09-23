import React from "react";
import { Route, Switch } from "react-router-dom";

// Component Imports
import LoginPage from "./components/LoginPage";
import GaragePage from "./components/GaragePage";
import RecordPage from "./components/RecordPage";


export default (
  <Switch>
    <Route component={LoginPage} exact path="/"></Route>
    <Route component={GaragePage} path="/garages"></Route>
    <Route component={RecordPage} path="/garage-records/:id"></Route>
  </Switch>
);
