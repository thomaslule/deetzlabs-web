import React from 'react';
import {
  Panel, ListGroup, ListGroupItem, Glyphicon,
} from 'react-bootstrap';

const sortStrings = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());

export default class ViewersAchievements extends React.Component {
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
            <AchievementItem
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

class AchievementItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: props.collapsed };
  }

  componentWillReceiveProps({ collapsed }) {
    if (collapsed !== this.state.collapsed) {
      this.setState({ collapsed });
    }
  }

  toggleCollapse() {
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
            onClick={() => this.toggleCollapse()}
          />
        )}
      >
        {collapsed
          ? <span />
          : (
            <span id={`achievement-${achievement.id}-viewers`}>
              {
                viewers.length > 0
                  ? viewers.map(v => (
                    <span key={v}>
                      {v}
                      <br />
                    </span>
                  ))
                  : <em>Personne n&#39;a encore ce succès</em>
              }
            </span>
          )
        }
      </ListGroupItem>
    );
  }
}

const AchievementHeader = ({ achievement, collapsed, onClick }) => (
  <div
    className="achievement-header"
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
