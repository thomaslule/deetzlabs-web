import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import { Form, FormGroup, Button, Panel } from 'react-bootstrap';
import Slider from 'rc-slider';
import api from './api';

const SliderWithToolitp = Slider.createSliderWithTooltip(Slider);

class AlertVolume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: undefined,
    };
  }

  componentWillMount() {
    api.getAlertVolume((err, res) => {
      if (!err) {
        this.setState({
          ...this.state,
          volume: Number(res.volume),
        });
      }
    });
  }

  handleChange(value) {
    this.setState({
      ...this.state,
      volume: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    api.postAlertVolume(this.state.volume);
  }

  render() {
    const content = (
      <Panel header="Volume de l'alerte">
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
      </Panel>
    );
    return this.state.volume === undefined ? null : content;
  }
}

export default AlertVolume;
