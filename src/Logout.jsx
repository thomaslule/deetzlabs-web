import React from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
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
    const { t, className } = this.props;
    const { authenticated } = this.state;
    const button = <Button onClick={() => this.handleClick()} bsStyle="warning" className={className}>{t('logout')}</Button>;
    const redirect = (<Redirect to="/login" />);
    return authenticated ? button : redirect;
  }
}

export default withNamespaces()(Logout);
