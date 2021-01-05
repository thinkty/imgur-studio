import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import MainPage from './MainPage';
import UploadPage from './UploadPage';
import ViewPage from './ViewPage';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            component={MainPage}
          />
          <Route
            path="/upload"
            component={UploadPage}
          />
          <Route
            path="/view"
            component={ViewPage}
          />
          <Route
            path="/404"
            component={ErrorPage}
          />
          <Redirect
            to="/404"
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
