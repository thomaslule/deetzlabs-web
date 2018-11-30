import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';
import AchievementItem from './AchievementItem';
import { withApi } from './ApiContext';

class LastAchievements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { api } = this.props;
    api.lastAchievements().subscribe((lastAchievements) => {
      this.setState({ lastAchievements });
    });
    api.achievements().subscribe((achievements) => {
      this.setState({ achievements });
    });
  }

  render() {
    const { t } = this.props;
    const { lastAchievements, achievements } = this.state;

    if (lastAchievements === undefined || achievements === undefined) {
      return null;
    }

    return (
      <Panel bsStyle="primary">
        <Panel.Heading>{t('last_achievements.header')}</Panel.Heading>
        <ListGroup>
          {lastAchievements.map((a, index) => (
            <AchievementItem
              key={index}
              achievement={a.achievement}
              achievementName={achievements[a.achievement].name}
              viewerId={a.viewerId}
              viewerName={a.viewerName}
            />
          ))}
        </ListGroup>
      </Panel>
    );
  }
}

export default withNamespaces()(withApi(LastAchievements));
