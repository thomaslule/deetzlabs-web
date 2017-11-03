import React from 'react';
import { Panel, Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import api from './api';

class GiveAchievement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewer: '',
      viewers: [],
      achievement: '',
      achievements: [],
    };
  }

  componentWillMount() {
    api.getViewers((err, list) => {
      if (!err) {
        this.setState({
          ...this.state,
          viewers: list,
        });
      }
    });
    api.getAchievements((list) => {
      this.setState({
        ...this.state,
        achievements: list,
        achievement: list[0].code,
      });
    });
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
    api.giveAchievement(this.state.viewer, this.state.achievement);
    this.setState({
      ...this.state,
      viewer: '',
    });
  }

  render() {
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
                {this.state.viewers.map(v => <option value={v} key={v} />)}
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
                {this.state.achievements.map(a =>
                  <option key={a.code} value={a.code}>{a.name}</option>)}
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
