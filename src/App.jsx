import React from 'react';
import { Grid } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';
import Login from './Login';

const App = () => (
  <Router basename="/admin">
    <Grid>
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/" component={Dashboard} />
    </Grid>
  </Router>
);

export default App;
