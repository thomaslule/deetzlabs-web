import React from 'react';
import { PageHeader, Row, Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
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
      waiting: false,
    };
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { api } = this.props;
    const { username, password } = this.state;
    try {
      this.setState({ waiting: true });
      const { token, expiresAt } = await api.login(username, password);
      authenticate(token, expiresAt);
      this.setState({ waiting: false, authenticated: true });
    } catch (err) {
      this.setState({
        waiting: false,
        username: '',
        password: '',
      });
    }
  }

  render() {
    const { t } = this.props;
    const { authenticated, username, password, waiting } = this.state;
    if (authenticated) {
      return (<Redirect to="/" />);
    }

    return (
      <div>
        <PageHeader>{t('deetzlabs')}</PageHeader>
        <Row>
          <Col md={3}>
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
              <Button type="submit" disabled={waiting}>{t('login.signin')}</Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withNamespaces()(withApi(Login));
