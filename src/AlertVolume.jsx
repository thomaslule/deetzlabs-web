import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import React from "react";
import { Form, FormGroup, Button, Panel } from "react-bootstrap";
import Slider from "rc-slider";
import { withNamespaces } from "react-i18next";
import { withApi } from "./ApiContext";

const SliderWithToolitp = Slider.createSliderWithTooltip(Slider);

class AlertVolume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: false
    };
  }

  componentDidMount() {
    const { api } = this.props;
    api.alertVolume().subscribe(res => {
      this.setState({ volume: res ? res.volume : undefined });
    });
  }

  handleChange(value) {
    this.setState({ volume: value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { api } = this.props;
    const { volume } = this.state;
    try {
      this.setState({ waiting: true });
      await api.changeAlertVolume(volume);
      this.setState({ waiting: false });
    } catch (err) {
      this.setState({ waiting: false });
    }
  }

  render() {
    const { t } = this.props;
    const { volume, waiting } = this.state;
    if (volume === undefined) {
      return null;
    }
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>{t("volume.volume")}</Panel.Heading>
        <Panel.Body>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <FormGroup controlId="name">
              <SliderWithToolitp
                min={0.1}
                max={1}
                step={0.1}
                onChange={val => this.handleChange(val)}
                defaultValue={volume}
              />
            </FormGroup>
            <Button type="submit" disabled={waiting} bsStyle="primary">
              {t("shared.apply")}
            </Button>
          </Form>
        </Panel.Body>
      </Panel>
    );
  }
}

export default withNamespaces()(withApi(AlertVolume));
