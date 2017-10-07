import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import { Row, Col, Form, FormGroup, ControlLabel, Button } from 'react-bootstrap';
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
      <Row>
        <Col xs={3}>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <FormGroup controlId="name">
              <ControlLabel>Volume de l&apos;alerte</ControlLabel>
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
        </Col>
      </Row>
    );
    return this.state.volume === undefined ? null : content;
  }
}

export default AlertVolume;
