import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jsCookie from 'js-cookie';

const isAuthenticated = () => jsCookie.get('secret') !== undefined;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location },
        }}
        />
      )
    )}
  />
);

export default PrivateRoute;
