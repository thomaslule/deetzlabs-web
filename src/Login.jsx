import React from 'react';
import { PageHeader, Row, Col, Form, FormGroup, ControlLabel, FormControl, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import jsCookie from 'js-cookie';
import * as api from './api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: jsCookie.get('token') !== undefined,
      username: '',
      password: '',
      error: null,
    };
  }

  handleUsernameChange(e) {
    this.setState({
      ...this.state,
      username: e.target.value,
    });
  }

  handlePasswordChange(e) {
    this.setState({
      ...this.state,
      password: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      jsCookie.set('token', 'DUMMY');
      this.setState({
        authenticated: true,
      });
      return;
    }
    api.login(this.state.username, this.state.password)
      .then((token) => {
        jsCookie.set('token', token, { expires: 1 });
        this.setState({
          ...this.state,
          authenticated: true,
        });
      })
      .catch(() => {
        this.setState({
          ...this.state,
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
