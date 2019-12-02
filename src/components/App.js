import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Auth from './Auth';
import HomePage from '../pages/home';
import DashboardPage from '../pages/dashboard';
import CallbackPage from '../pages/callback';

const App = () => (
  <div className="App container">
    <Auth>
      <div className="jumbotron">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/callback" component={CallbackPage} />
          </Switch>
        </Router>
      </div>
    </Auth>
  </div>
);

export default hot(App);
