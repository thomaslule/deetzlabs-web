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
    const { loading, clientId, randomState } = this.state;

    if (loading) {
      return <></>;
    }

    // Authorization code grant flow
    const host = window.location.origin;
    const url = new URL("https://id.twitch.tv/oauth2/authorize");
    const scopes = [
      "channel:read:hype_train",
      "channel:read:redemptions",
      "channel:read:subscriptions",
      "moderation:read",
      "moderator:read:followers",
      "moderator:read:shield_mode",
      "chat:edit",
      "chat:read",
      "user:read:chat",
      "user:write:chat",
    ];
    url.searchParams.append("client_id", clientId);
    url.searchParams.append("force_verify", "true");
    url.searchParams.append("redirect_uri", `${host}/admin/login`);
    url.searchParams.append("response_type", "code");
    url.searchParams.append("state", randomState);
    url.searchParams.append("scope", scopes.join(" "));

    const twitchUrl = url.href;

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
