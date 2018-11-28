import React from 'react';
import { Panel, Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';
import { withApi } from './ApiContext';

class GiveAchievement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewer: '',
      waiting: false,
    };
  }

  componentDidMount() {
    const { api } = this.props;
    api.viewerNames().subscribe((viewerNames) => {
      this.setState({ viewerNames });
    });
    api.achievements().subscribe((achievements) => {
      this.setState({
        achievements,
        achievement: achievements ? Object.keys(achievements)[0] : undefined,
      });
    });
  }

  handleChangeViewer(viewer) {
    this.setState({ viewer });
  }

  handleChangeAchievement(achievement) {
    this.setState({ achievement });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { api } = this.props;
    const { achievement, viewer } = this.state;
    try {
      this.setState({ waiting: true });
      await api.giveAchievement(achievement, viewer);
      this.setState({ viewer: '', waiting: false });
    } catch (err) {
      this.setState({ waiting: false });
    }
  }

  render() {
    const { t } = this.props;
    const { achievement, viewer, viewerNames, achievements, waiting } = this.state;
    if (viewerNames === undefined || achievements === undefined) { return null; }
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
                  {Object.values(viewerNames).map(v => <option value={v} key={v} />)}
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
                  {Object.keys(achievements).map(a =>
                    <option key={a} value={a}>{achievements[a].name}</option>)
                  }
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col mdOffset={3} md={9}>
                <Button type="submit" disabled={waiting}>{t('give_achievement.apply')}</Button>
              </Col>
            </FormGroup>
          </Form>
        </Panel.Body>
      </Panel>
    );
  }
}

export default withNamespaces()(withApi(GiveAchievement));
