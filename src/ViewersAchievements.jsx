import React from 'react';
import {
  Panel, ListGroup, ListGroupItem, Glyphicon,
} from 'react-bootstrap';

const sortStrings = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());

export default ({ data }) => {
  const { viewerAchievements, achievements } = data;
  const achievementsWithViewers = Object.entries(achievements)
    .map(([achievementId, achievement]) => ({
      achievement: { id: achievementId, ...achievement },
      viewers: viewerAchievements
        .filter(viewerAchievement => viewerAchievement.achievement === achievementId)
        .map(viewerAchievement => viewerAchievement.viewerName)
        .sort(sortStrings),
    }))
    .sort((a, b) => a.viewers.length - b.viewers.length);
  return (
    <Panel>
      <Panel.Heading>Tous les succès</Panel.Heading>
      <ListGroup>
        {achievementsWithViewers.map(a => (
          <AchievementItem achievement={a.achievement} viewers={a.viewers} key={a.achievement.id} />
        ))}
      </ListGroup>
    </Panel>
  );
};

class AchievementItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: true };
  }

  handleClickHeader() {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  }

  render() {
    const { viewers, achievement } = this.props;
    const { collapsed } = this.state;
    return (
      <ListGroupItem
        key={achievement.id}
        header={(
          <AchievementHeader
            achievement={achievement}
            collapsed={collapsed}
            onClick={() => this.handleClickHeader()}
          />
        )}
      >
        {collapsed
          ? <span />
          : (
            <span id={`achievement-${achievement.id}-viewers`}>
              {viewers.map(v => (
                <span key={v}>
                  {v}
                  <br />
                </span>
              ))}
            </span>
          )
        }
      </ListGroupItem>
    );
  }
}

const AchievementHeader = ({ achievement, collapsed, onClick }) => (
  <div
    style={{ cursor: 'pointer' }}
    onClick={() => onClick()}
    role="button"
    tabIndex={0}
    onKeyUp={() => onClick()}
  >
    {collapsed
      ? <Glyphicon glyph="chevron-right" style={{ marginRight: '5px' }} />
      : <Glyphicon glyph="chevron-down" style={{ marginRight: '5px' }} />
    }
    <h4 style={{ display: 'inline' }}>{achievement.name}</h4>
    <em style={{ color: 'grey', marginLeft: '10px' }}>{achievement.description}</em>
  </div>
);
