import React from "react";
import { Col, PageHeader, Row } from "react-bootstrap";
import { withNamespaces } from "react-i18next";
import { Redirect } from "react-router-dom";
import { get, getClientId } from "./api";
import { withApi } from "./ApiContext";
import {
  authenticate,
  generateAndSaveRandomState,
  isAuthenticated,
  isRandomStateEqualTo,
} from "./auth";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authenticated: isAuthenticated(),
      clientId: undefined,
      randomState: undefined,
    };
  }

  async componentDidMount() {
    const token = this.getHashParam("access_token");
    if (!token) {
      console.log("No token found in hash");
      this.prepareAuthLink();
      return;
    }
    const randomState = this.getHashParam("state");
    if (!isRandomStateEqualTo(randomState)) {
      console.error("Invalid state param received in hash");
      this.prepareAuthLink();
      return;
    }
    authenticate(token);
    // if the token is invalid, it will auto-logout
    const { isBroadcaster } = await get("check_token");
    authenticate(token, isBroadcaster);
    this.setState({ authenticated: true });
  }

  getHashParam(paramName) {
    const tokenMatch = window.location.hash.match(
      new RegExp(`[&#]${paramName}=([^&]+)`)
    );
    return tokenMatch ? tokenMatch[1] : undefined;
  }

  getTwitchUrl() {
    const { clientId, randomState } = this.state;
    const host = window.location.origin;
    return `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${host}/admin/login&response_type=token&scope=&force_verify=true&state=${randomState}`;
  }

  async prepareAuthLink() {
    const { clientId } = await getClientId();
    this.setState({
      clientId,
      loading: false,
      randomState: generateAndSaveRandomState(),
    });
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
            <a href={this.getTwitchUrl()} className="login-link">
              Login with twitch
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withNamespaces()(withApi(Login));
