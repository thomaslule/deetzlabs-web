import React from "react";
import { Panel } from "react-bootstrap";
import { withNamespaces } from "react-i18next";
import Switch from "react-switch";
import { withApi } from "./ApiContext";

class Active extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: false,
    };
  }

  componentDidMount() {
    const { api } = this.props;
    api.started().subscribe((res) => {
      this.setState({ started: res ? res.started : undefined });
    });
  }

  async handleSwitch() {
    const { api } = this.props;
    const wasStarted = this.state.started;
    this.setState({ started: !wasStarted });
    try {
      this.setState({ waiting: true });
      if (wasStarted) {
        await api.stop();
      } else {
        await api.start();
      }
      this.setState({ waiting: false });
    } catch (err) {
      this.setState({ waiting: false });
    }
  }

  render() {
    const { t } = this.props;
    const { started, waiting } = this.state;
    if (started === undefined) {
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
              checked={started}
              disabled={waiting}
            />
          </label>
        </Panel.Body>
      </Panel>
    );
  }
}

export default withNamespaces()(withApi(Active));
