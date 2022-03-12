import React from "react";
import { Button } from "react-bootstrap";
import { withNamespaces } from "react-i18next";
import { getClientId } from "./api";

class AuthorizeAppButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      clientId: undefined,
    };
  }

  async componentDidMount() {
    const { clientId } = await getClientId();
    this.setState({ clientId, loading: false });
  }

  render() {
    const { className, t } = this.props;
    const { loading, clientId } = this.state;

    if (loading) {
      return <></>;
    }

    const query = new URLSearchParams();
    query.append("client_id", clientId);
    query.append("redirect_uri", `${window.location.origin}/admin/login`);
    query.append("response_type", "token id_token");
    query.append(
      "scope",
      "openid channel:moderate channel:read:hype_train channel:read:redemptions channel:read:subscriptions"
    );
    const twitchUrl = `https://id.twitch.tv/oauth2/authorize?${query.toString()}`;

    return (
      <Button
        onClick={() => window.location.replace(twitchUrl)}
        bsStyle="info"
        className={className}
      >
        {t("authorize")}
      </Button>
    );
  }
}

export default withNamespaces()(AuthorizeAppButton);
