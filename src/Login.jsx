import React from 'react';
import { PageHeader, Row, Col, Form, FormGroup, ControlLabel, FormControl, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import { isAuthenticated, authenticate } from './auth';
import { withApi } from './ApiContext';

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
    const { t, api } = this.props;
    const { username, password } = this.state;
    api.login(username, password)
      .then(({ token, expiresAt }) => {
        authenticate(token, expiresAt);
        this.setState({ authenticated: true });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          username: '',
          password: '',
          message: t('login.error'),
        });
      });
  }

  render() {
    const { t } = this.props;
    const { authenticated, message, username, password } = this.state;
    if (authenticated) {
      return (<Redirect to="/" />);
    }

    return (
      <div>
        <PageHeader>{t('deetzlabs')}</PageHeader>
        <Row>
          <Col md={3}>
            {message ? <Alert bsStyle="danger">{message}</Alert> : null}
            <Form onSubmit={e => this.handleSubmit(e)}>
              <FormGroup controlId="username">
                <ControlLabel>{t('login.login')}</ControlLabel>
                <FormControl
                  type="text"
                  value={username}
                  onChange={e => this.handleUsernameChange(e)}
                />
              </FormGroup>
              <FormGroup controlId="password">
                <ControlLabel>{t('login.password')}</ControlLabel>
                <FormControl
                  type="password"
                  value={password}
                  onChange={e => this.handlePasswordChange(e)}
                />
              </FormGroup>
              <Button type="submit">{t('login.signin')}</Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withNamespaces()(withApi(Login));
