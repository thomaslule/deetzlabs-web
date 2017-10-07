import React from 'react';
import { Button } from 'react-bootstrap';
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
    return this.state.authenticated ?
      <Button onClick={() => this.handleClick()}>Logout</Button> :
      <Redirect to="/login" />;
  }
}

export default Logout;
