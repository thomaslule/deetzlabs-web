import React from 'react';
import { PageHeader, Row, Col, Form, FormGroup, ControlLabel, FormControl, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { isAuthenticated, authenticate } from './auth';
import * as api from './api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: isAuthenticated(),
      username: '',
      password: '',
    };
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    api.login(this.state.username, this.state.password)
      .then(({ token, expiresAt }) => {
        authenticate(token, expiresAt);
        this.setState({ authenticated: true });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          username: '',
          password: '',
          message: 'Échec de l\'authentification',
        });
      });
  }

  render() {
    if (this.state.authenticated) {
      return (<Redirect to="/" />);
    }

    return (
      <div>
        <PageHeader>deetzlabs</PageHeader>
        <Row>
          <Col md={3}>
            {this.state.message ? <Alert bsStyle="danger">{this.state.message}</Alert> : null}
            <Form onSubmit={e => this.handleSubmit(e)}>
              <FormGroup controlId="username">
                <ControlLabel>Login</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.username}
                  onChange={e => this.handleUsernameChange(e)}
                />
              </FormGroup>
              <FormGroup controlId="password">
                <ControlLabel>Mot de passe</ControlLabel>
                <FormControl
                  type="password"
                  value={this.state.password}
                  onChange={e => this.handlePasswordChange(e)}
                />
              </FormGroup>
              <Button type="submit">Login</Button>
            </Form>
          </Col>
        </Row>
      </div>);
  }
}

export default Login;
