import React from 'react';
import { ListGroup, ControlLabel, ListGroupItem } from 'react-bootstrap';
import api from './api';

class AllAchievements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      achievements: [],
    };
  }

  componentWillMount() {
    api.getAllAchievements((list) => {
      this.setState({
        ...this.state,
        achievements: list,
      });
    });
  }

  render() {
    const sortStrings = (a, b) => a.toLowerCase() > b.toLowerCase();
    const unique = (v, i, a) => a.indexOf(v) === i;
    const achievementsWithViewers = this.state.achievements
      .map(a => a.achievement.name)
      .filter(unique)
      .map(achievement => ({
        achievement,
        viewers: this.state.achievements
          .filter(a => a.achievement.name === achievement)
          .map(a => a.username)
          .sort(sortStrings),
      }))
      .sort((a, b) => a.viewers.length > b.viewers.length);
    return (
      <div>
        <ControlLabel>Tous les succès</ControlLabel>
        <ListGroup>
          {achievementsWithViewers.map(a => (
            <ListGroupItem key={a.achievement} header={a.achievement}>
              {a.viewers.map(v => <span key={v}>{v}<br /></span>)}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>);
  }
}

export default AllAchievements;
