import React from 'react';
import { Panel, Row, Modal, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button, Col } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';
import { withApi } from './ApiContext';

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

class FollowersGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    const { api } = this.props;
    api.followersGoal().subscribe((res) => {
      if (res) {
        const { goal, html, css } = res;
        this.setState({ goal, html, css, htmlPreview: getHtmlPreview(html) });
      }
    });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleShowModal() {
    this.setState({ showModal: true });
  }

  handleChangeGoal(goal) {
    this.setState({ goal });
  }

  handleChangeHtml(html) {
    this.setState({
      html,
      htmlPreview: getHtmlPreview(html),
    });
  }

  handleChangeCss(css) {
    this.setState({ css });
  }

  handlePreview() {
    this.jsFiddleForm.submit();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { api } = this.props;
    const { goal, html, css } = this.state;
    api.changeFollowersGoal(goal, html, css)
      .then(() => this.handleCloseModal());
  }

  render() {
    const { t } = this.props;
    const { goal, html, css, showModal, htmlPreview } = this.state;
    if (goal === undefined) return null;
    return (
      <Panel>
        <Panel.Heading>{t('followers_goal.header')}</Panel.Heading>
        <Panel.Body>
          <Button onClick={() => this.handleShowModal()}>{t('followers_goal.edit_button')}</Button>
          <Modal show={showModal} onHide={() => this.handleCloseModal()} bsSize="large">
            <Modal.Header closeButton>
              <Modal.Title>{t('followers_goal.header')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={e => this.handleSubmit(e)} horizontal>
                <FormGroup controlId="goal">
                  <Col componentClass={ControlLabel} md={3}>{t('followers_goal.goal')}</Col>
                  <Col md={9}>
                    <FormControl
                      type="number"
                      value={goal}
                      onChange={e => this.handleChangeGoal(Number(e.target.value))}
                      required
                      min={1}
                    />
                  </Col>
                </FormGroup>
                <HtmlExplain tag={'<div id="current_amount" />'} definition={t('followers_goal.current_follows')} />
                <HtmlExplain tag={'<div id="goal" />'} definition={t('followers_goal.goal')} />
                <HtmlExplain tag={'<div id="current_bar" />'} definition={t('followers_goal.bar_width')} />
                <FormGroup controlId="html">
                  <Col componentClass={ControlLabel} md={3}>{t('followers_goal.html')}</Col>
                  <Col md={9}>
                    <FormControl
                      componentClass="textarea"
                      value={html}
                      onChange={e => this.handleChangeHtml(e.target.value)}
                      rows={10}
                      style={codeStyle}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="Css">
                  <Col componentClass={ControlLabel} md={3}>{t('followers_goal.css')}</Col>
                  <Col md={9}>
                    <FormControl
                      componentClass="textarea"
                      value={css}
                      onChange={e => this.handleChangeCss(e.target.value)}
                      rows={10}
                      style={codeStyle}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col mdOffset={3} md={9}>
                    <ButtonToolbar>
                      <Button onClick={() => this.handlePreview()}>{t('followers_goal.preview')}</Button>
                      <Button type="submit">{t('shared.apply')}</Button>
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
                <input type="hidden" name="html" value={htmlPreview} />
                <input type="hidden" name="css" value={css} />
              </form>
            </Modal.Body>
          </Modal>
        </Panel.Body>
      </Panel>
    );
  }
}

export default withNamespaces()(withApi(FollowersGoal));
