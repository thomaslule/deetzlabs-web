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
    const button = <Button onClick={() => this.handleClick()}>Logout</Button>;
    const redirect = (<Redirect to="/login" />);
    return this.state.authenticated ? button : redirect;
  }
}

export default Logout;
