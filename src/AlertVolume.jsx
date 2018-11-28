import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import { Form, FormGroup, Button, Panel } from 'react-bootstrap';
import Slider from 'rc-slider';
import { withNamespaces } from 'react-i18next';
import { postAlertVolume } from './api';

const SliderWithToolitp = Slider.createSliderWithTooltip(Slider);

class AlertVolume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: props.data.alertVolume,
    };
  }

  handleChange(value) {
    this.setState({ volume: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { volume } = this.state;
    postAlertVolume(volume);
  }

  render() {
    const { t } = this.props;
    const { volume } = this.state;
    return (
      <Panel>
        <Panel.Heading>{t('volume.volume')}</Panel.Heading>
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
            <Button type="submit">{t('shared.apply')}</Button>
          </Form>
        </Panel.Body>
      </Panel>
    );
  }
}

export default withNamespaces()(AlertVolume);
