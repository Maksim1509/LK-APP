/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import authContext from '../context';
import LogInFrom from './LogInForm';
import PrivatePage from './PrivatePage';

const renderPrivate = (auth, children) => ({ location }) => (
  auth.user ? children
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
  const { children } = props;
  const auth = useContext(authContext);
  return (
    <Route
      render={renderPrivate(auth, children)}
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
