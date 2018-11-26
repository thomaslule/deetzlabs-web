import React from 'react';
import { ListGroupItem, Glyphicon } from 'react-bootstrap';

export default class AchievementWithViewers extends React.Component {
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
          ? null
          : (
            <span id={`achievement-${achievement.id}-viewers`}>
              {
                viewers.length > 0
                  ? viewers.map(v => (<span key={v}>{v}<br /></span>))
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
