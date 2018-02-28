import React from 'react';
import { Panel, Row, Modal, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button, Col } from 'react-bootstrap';
import { changeFollowersGoal } from './api';

const codeStyle = {
  fontFamily: 'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace',
  fontSize: 12,
};

const getIfExists = (element, selector) => {
  const arr = element.querySelectorAll(selector);
  return arr.length > 0
    ? arr[0]
    : {};
};

const getHtmlPreview = (html) => {
  const preview = document.createElement('div');
  preview.innerHTML = html;
  getIfExists(preview, '#current_amount').innerHTML = '33';
  getIfExists(preview, '#goal').innerHTML = '100';
  getIfExists(preview, '#current_bar').style = 'width: 33%;';
  return preview.innerHTML;
};

const HtmlExplain = ({ tag, definition }) => (
  <Row>
    <Col mdOffset={3} md={3} style={codeStyle}>{tag}</Col>
    <Col md={6}>{definition}</Col>
  </Row>
);

export default class FollowersGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: 1,
      showModal: false,
      ...props.data.followersGoal,
      htmlPreview: getHtmlPreview(props.data.followersGoal.html),
    };
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
    this.setState({
      ...this.state,
      html,
      htmlPreview: getHtmlPreview(html),
    });
  }

  handleChangeCss(css) {
    this.setState({ ...this.state, css });
  }

  handlePreview() {
    this.jsFiddleForm.submit();
  }

  handleSubmit(e) {
    e.preventDefault();
    changeFollowersGoal(this.state.goal, this.state.html, this.state.css)
      .then(() => this.handleCloseModal());
  }

  render() {
    if (!this.state.html) {
      return <div />;
    }
    return (
      <Panel header="Modifier l'objectif de followers">
        <Button onClick={() => this.handleShowModal()}>Modifier…</Button>
        <Modal show={this.state.showModal} onHide={() => this.handleCloseModal()} bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>Modifier l{"'"}objectif de followers</Modal.Title>
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
              <HtmlExplain tag={'<div id="current_amount" />'} definition="Nombre actuel de followers" />
              <HtmlExplain tag={'<div id="goal" />'} definition="Objectif" />
              <HtmlExplain tag={'<div id="current_bar" />'} definition="Barre de largeur n%" />
              <FormGroup controlId="html">
                <Col componentClass={ControlLabel} md={3}>Html</Col>
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
                  <ButtonToolbar>
                    <Button onClick={() => this.handlePreview()}>Prévisualisation</Button>
                    <Button type="submit">Appliquer</Button>
                  </ButtonToolbar>
                </Col>
              </FormGroup>
            </Form>
            <form
              ref={(form) => { this.jsFiddleForm = form; }}
              method="post"
              action="http://jsfiddle.net/api/post/library/pure/"
              target="_blank"
            >
              <input type="hidden" name="html" value={this.state.htmlPreview} />
              <input type="hidden" name="css" value={this.state.css} />
            </form>
          </Modal.Body>
        </Modal>
      </Panel>
    );
  }
}
