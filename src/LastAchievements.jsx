import React from 'react';
import { ListGroup, ControlLabel } from 'react-bootstrap';
import api from './api';
import AchievementItem from './AchievementItem';

class LastAchievements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      achievements: [],
    };
  }

  componentWillMount() {
    api.getLastAchievements((list) => {
      this.setState({
        ...this.state,
        achievements: list,
      });
    });
  }

  render() {
    return (
      <div>
        <ControlLabel>Derniers succès</ControlLabel>
        <ListGroup>
          {this.state.achievements.map((a, index) => (
            <AchievementItem key={index} achievement={a.achievement} username={a.username} />
          ))}
        </ListGroup>
      </div>);
  }
}

export default LastAchievements;
