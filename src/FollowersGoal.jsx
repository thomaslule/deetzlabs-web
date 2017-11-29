import React from 'react';
import { Panel, Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import * as api from './api';

class FollowersGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: 1,
      html: '',
      css: '',
    };
  }

  componentWillMount() {
    api.getFollowersGoal()
      .then((settings) => {
        this.setState({
          ...this.state,
          ...settings,
        });
      });
  }

  handleChangeGoal(goal) {
    this.setState({ ...this.state, goal });
  }

  handleChangeHtml(html) {
    this.setState({ ...this.state, html });
  }

  handleChangeCss(css) {
    this.setState({ ...this.state, css });
  }

  handleSubmit(e) {
    e.preventDefault();
    api.changeFollowersGoal(this.state.goal, this.state.html, this.state.css);
  }

  render() {
    return (
      <Panel header="Modifier l'objectif de followers">
        <Form onSubmit={e => this.handleSubmit(e)} horizontal>
          <FormGroup controlId="goal">
            <Col componentClass={ControlLabel} md={3}>Objectif</Col>
            <Col md={9}>
              <FormControl
                type="number"
                value={this.state.goal}
                onChange={e => this.handleChangeGoal(Number(e.target.value))}
                required
                min={1}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="html">
            <Col componentClass={ControlLabel} md={3}>Html</Col>
            <Col md={9}>
              <FormControl
                componentClass="textarea"
                value={this.state.html}
                onChange={e => this.handleChangeHtml(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="Css">
            <Col componentClass={ControlLabel} md={3}>Css</Col>
            <Col md={9}>
              <FormControl
                componentClass="textarea"
                value={this.state.css}
                onChange={e => this.handleChangeCss(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col mdOffset={3} md={9}>
              <Button type="submit">Appliquer</Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

export default FollowersGoal;
