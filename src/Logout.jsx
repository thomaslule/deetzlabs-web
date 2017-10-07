import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import jsCookie from 'js-cookie';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
    };
  }

  handleClick() {
    jsCookie.remove('token');
    this.setState({ authenticated: false });
  }

  render() {
    const button = (
      <Row>
        <Col sm={12}>
          <Button onClick={() => this.handleClick()}>Logout</Button>
        </Col>
      </Row>);
    const redirect = (<Redirect to="/login" />);
    return this.state.authenticated ? button : redirect;
  }
}

export default Logout;
