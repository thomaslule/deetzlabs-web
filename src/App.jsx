import React from 'react';
import { Grid } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import { ApiContextProvider } from './ApiContext';

const App = () => (
  <ApiContextProvider>
    <Router basename="/admin">
      <Grid>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Dashboard} />
      </Grid>
    </Router>
  </ApiContextProvider>
);

export default App;
