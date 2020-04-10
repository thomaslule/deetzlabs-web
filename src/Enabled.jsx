import React from "react";
import { Panel } from "react-bootstrap";
import { withNamespaces } from "react-i18next";
import Switch from "react-switch";
import { withApi } from "./ApiContext";

class Active extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: false
    };
  }

  componentDidMount() {
    const { api } = this.props;
    api.muted().subscribe(res => {
      this.setState({ muted: res ? res.muted : undefined });
    });
  }

  async handleSwitch() {
    const { api } = this.props;
    const wasMuted = this.state.muted;
    this.setState({ muted: !wasMuted });
    try {
      this.setState({ waiting: true });
      if (wasMuted) {
        await api.unmute();
      } else {
        await api.mute();
      }
      this.setState({ waiting: false });
    } catch (err) {
      this.setState({ waiting: false });
    }
  }

  render() {
    const { t } = this.props;
    const { muted, waiting } = this.state;
    if (muted === undefined) {
      return null;
    }
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>{t("enabled.title")}</Panel.Heading>
        <Panel.Body>
          <label>
            <p>{t("enabled.enabled")}</p>
            <Switch
              onChange={() => this.handleSwitch()}
              checked={!muted}
              disabled={waiting}
            />
          </label>
        </Panel.Body>
      </Panel>
    );
  }
}

export default withNamespaces()(withApi(Active));
