import React from 'react';
import { Row, Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import jsCookie from 'js-cookie';
import api from './api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: jsCookie.get('secret') !== undefined,
      secret: '',
    };
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      secret: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    api.checkSecret(this.state.secret, (err) => {
      if (!err) {
        jsCookie.set('secret', this.state.secret);
        this.setState({
          authenticated: true,
          secret: this.state.secret,
        });
      }
    });
  }

  render() {
    if (this.state.authenticated) {
      return (<Redirect to="/" />);
    }

    return (
      <Row>
        <Col xs={3}>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <FormGroup controlId="secret">
              <ControlLabel>Secret</ControlLabel>
              <FormControl
                type="password"
                value={this.state.secret}
                onChange={e => this.handleChange(e)}
              />
            </FormGroup>
            <Button type="submit">Login</Button>
          </Form>
        </Col>
      </Row>);
  }
}

export default Login;
