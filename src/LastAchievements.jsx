import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
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
      <Panel header="Derniers succès">
        <ListGroup fill>
          {this.state.achievements.map((a, index) => (
            <AchievementItem key={index} achievement={a.achievement} username={a.username} />
          ))}
        </ListGroup>
      </Panel>);
  }
}

export default LastAchievements;
