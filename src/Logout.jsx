import React from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { logout } from './auth';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
    };
  }

  handleClick() {
    logout();
    this.setState({ authenticated: false });
  }

  render() {
    const button = <Button onClick={() => this.handleClick()} {...this.props}>Logout</Button>;
    const redirect = (<Redirect to="/login" />);
    return this.state.authenticated ? button : redirect;
  }
}

export default Logout;
