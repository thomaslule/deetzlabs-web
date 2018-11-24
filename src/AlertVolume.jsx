import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import { Form, FormGroup, Button, Panel } from 'react-bootstrap';
import Slider from 'rc-slider';
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
    this.setState({
      ...this.state,
      volume: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    postAlertVolume(this.state.volume);
  }

  render() {
    return (
      <Panel>
        <Panel.Heading>Volume de l'alerte</Panel.Heading>
        <Panel.Body>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <FormGroup controlId="name">
              <SliderWithToolitp
                min={0.1}
                max={1}
                step={0.1}
                onChange={val => this.handleChange(val)}
                defaultValue={this.state.volume}
              />
            </FormGroup>
            <Button type="submit">Appliquer</Button>
          </Form>
        </Panel.Body>
      </Panel>
    );
  }
}

export default AlertVolume;
