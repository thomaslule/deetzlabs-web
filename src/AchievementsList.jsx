import React from 'react';
import { Panel, ListGroup, Glyphicon } from 'react-bootstrap';
import AchievementWithViewers from './AchievementWithViewers';

const sortStrings = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());

export default class AchievementsList extends React.Component {
  constructor(props) {
    super(props);
    const { viewerAchievements, achievements } = props.data;
    const achievementsWithViewers = Object.entries(achievements)
      .map(([achievementId, achievement]) => ({
        achievement: { id: achievementId, ...achievement },
        viewers: viewerAchievements
          .filter(viewerAchievement => viewerAchievement.achievement === achievementId)
          .map(viewerAchievement => viewerAchievement.viewerName)
          .sort(sortStrings),
      }))
      .sort((a, b) => a.viewers.length - b.viewers.length);
    this.state = { achievementsWithViewers, collapsed: true };
  }

  toggleCollapse() {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  }

  render() {
    const { collapsed } = this.state;
    return (
      <Panel>
        <Panel.Heading onClick={() => this.toggleCollapse()} style={{ cursor: 'pointer' }}>
          {collapsed
            ? <Glyphicon glyph="chevron-right" style={{ marginRight: '5px' }} />
            : <Glyphicon glyph="chevron-down" style={{ marginRight: '5px' }} />
          }
          Tous les succès
        </Panel.Heading>
        <ListGroup>
          {this.state.achievementsWithViewers.map(a => (
            <AchievementWithViewers
              achievement={a.achievement}
              viewers={a.viewers}
              collapsed={this.state.collapsed}
              key={a.achievement.id}
            />
          ))}
        </ListGroup>
      </Panel>
    );
  }
}