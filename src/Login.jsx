import React from "react";
import { Col, PageHeader, Row } from "react-bootstrap";
import { withNamespaces } from "react-i18next";
import { Redirect } from "react-router-dom";
import { get, getClientId } from "./api";
import { withApi } from "./ApiContext";
import { authenticate, isAuthenticated } from "./auth";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authenticated: isAuthenticated(),
      clientId: undefined
    };
  }

  async componentDidMount() {
    const tokenMatch = window.location.hash.match(/access_token=([^&]+)/);
    if (tokenMatch) {
      const token = tokenMatch[1];
      authenticate(token);
      // if the token is invalid, it will auto-logout
      await get("validate_token");
      this.setState({ authenticated: true });
    } else {
      const { clientId } = await getClientId();
      this.setState({ clientId, loading: false });
    }
  }

  getTwitchUrl() {
    const { clientId } = this.state;
    const host = window.location.origin;
    return `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${host}/admin/login&response_type=token&scope=&force_verify=true`;
  }

  render() {
    const { t } = this.props;
    const { authenticated, loading } = this.state;
    if (authenticated) {
      return <Redirect to="/" />;
    }
    if (loading) {
      return null;
    }

    return (
      <div>
        <PageHeader>{t("deetzlabs")}</PageHeader>
        <Row>
          <Col md={3}>
            <a href={this.getTwitchUrl()}>Login with twitch</a>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withNamespaces()(withApi(Login));
