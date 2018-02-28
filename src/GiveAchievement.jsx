import React from 'react';
import { Panel, Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import { giveAchievement } from './api';

class GiveAchievement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewer: '',
      achievement: props.data.achievements[0].code,
    };
  }

  handleChangeViewer(viewer) {
    this.setState({
      ...this.state,
      viewer,
    });
  }

  handleChangeAchievement(achievement) {
    this.setState({
      ...this.state,
      achievement,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    giveAchievement(this.state.viewer, this.state.achievement);
    this.setState({
      ...this.state,
      viewer: '',
    });
  }

  render() {
    const { data } = this.props;
    return (
      <Panel header="Donner un succès">
        <Form onSubmit={e => this.handleSubmit(e)} horizontal>
          <FormGroup controlId="name">
            <Col componentClass={ControlLabel} md={3}>Pseudo</Col>
            <Col md={9}>
              <FormControl
                type="text"
                value={this.state.viewer}
                onChange={e => this.handleChangeViewer(e.target.value)}
                list="viewers"
                required
              />
              <datalist id="viewers">
                {data.viewers.map(v => <option value={v} key={v} />)}
              </datalist>
            </Col>
          </FormGroup>
          <FormGroup controlId="achievement">
            <Col componentClass={ControlLabel} md={3}>Succès</Col>
            <Col md={9}>
              <FormControl
                componentClass="select"
                value={this.state.achievement}
                onChange={e => this.handleChangeAchievement(e.target.value)}
                list="viewers"
                required
              >
                {data.achievements.map(a =>
                  <option key={a.code} value={a.code}>{a.name}</option>,
                )}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col mdOffset={3} md={9}>
              <Button type="submit">Donner le succès</Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

export default GiveAchievement;
