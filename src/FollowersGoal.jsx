import React from 'react';
import { Panel, Modal, Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import * as api from './api';

const codeStyle = { fontFamily: 'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace' };

class FollowersGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: 1,
      showModal: false,
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

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleShowModal() {
    this.setState({ showModal: true });
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
    api.changeFollowersGoal(this.state.goal, this.state.html, this.state.css)
      .then(() => this.handleCloseModal());
  }

  render() {
    return (
      <Panel header="Modifier l'objectif de followers">
        <Button onClick={() => this.handleShowModal()}>Modifier…</Button>
        <Modal show={this.state.showModal} onHide={() => this.handleCloseModal()} bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>Modifier l'objectif de followers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                <Col md={3} style={{ textAlign: 'right' }}>
                  <ControlLabel>Html</ControlLabel><br />
                  <em>#current_amount</em> : follows actuels<br />
                  <em>#goal</em> : objectif<br />
                  <em>#current_bar</em> : barre de largeur n%
                </Col>
                <Col md={9}>
                  <FormControl
                    componentClass="textarea"
                    value={this.state.html}
                    onChange={e => this.handleChangeHtml(e.target.value)}
                    rows={10}
                    style={codeStyle}
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
                    rows={10}
                    style={codeStyle}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col mdOffset={3} md={9}>
                  <Button type="submit">Appliquer</Button>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
        </Modal>
      </Panel>
    );
  }
}

export default FollowersGoal;
