import React from 'react';
import { Panel, Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';
import { giveAchievement } from './api';

class GiveAchievement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewer: '',
      achievement: Object.keys(props.data.achievements)[0],
    };
  }

  handleChangeViewer(viewer) {
    this.setState({ viewer });
  }

  handleChangeAchievement(achievement) {
    this.setState({ achievement });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { achievement, viewer } = this.state;
    giveAchievement(achievement, viewer);
    this.setState({ viewer: '' });
  }

  render() {
    const { data, t } = this.props;
    const { achievement, viewer } = this.state;
    return (
      <Panel>
        <Panel.Heading>{t('give_achievement.header')}</Panel.Heading>
        <Panel.Body>
          <Form onSubmit={e => this.handleSubmit(e)} horizontal>
            <FormGroup controlId="name">
              <Col componentClass={ControlLabel} md={3}>{t('give_achievement.name')}</Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  value={viewer}
                  onChange={e => this.handleChangeViewer(e.target.value)}
                  list="viewers"
                  required
                />
                <datalist id="viewers">
                  {Object.values(data.viewerNames).map(v => <option value={v} key={v} />)}
                </datalist>
              </Col>
            </FormGroup>
            <FormGroup controlId="achievement">
              <Col componentClass={ControlLabel} md={3}>{t('give_achievement.achievement')}</Col>
              <Col md={9}>
                <FormControl
                  componentClass="select"
                  value={achievement}
                  onChange={e => this.handleChangeAchievement(e.target.value)}
                  list="viewers"
                  required
                >
                  {Object.keys(data.achievements).map(a =>
                    <option key={a} value={a}>{data.achievements[a].name}</option>)
                  }
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col mdOffset={3} md={9}>
                <Button type="submit">{t('give_achievement.apply')}</Button>
              </Col>
            </FormGroup>
          </Form>
        </Panel.Body>
      </Panel>
    );
  }
}

export default withNamespaces()(GiveAchievement);
