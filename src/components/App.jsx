/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LogInFrom from './LogInForm';
import PrivatePage from './PrivatePage';

const renderPrivate = (user, children) => ({ location }) => (
  user ? children
    : (
      <Redirect
        to={{
          pathname: '/',
          state: { from: location },
        }}
      />
    )
);

const PrivateRoute = (props) => {
  const { userName } = useSelector(({ userInfo }) => userInfo);
  const { children } = props;
  return (
    <Route
      render={renderPrivate(userName, children)}
    />
  );
};

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <LogInFrom />
      </Route>
      <PrivateRoute path="/private">
        <PrivatePage />
      </PrivateRoute>
    </Switch>
  </Router>
);

export default App;
