import React from 'react';
import { Row, Col, ListGroup, ListGroupItem, ControlLabel } from 'react-bootstrap';
import api from './api';

class MakeBenefactor extends React.Component {
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
      <Row>
        <Col sm={4}>
          <ControlLabel>Derniers succès</ControlLabel>
          <ListGroup>
            {this.state.achievements.map((a, index) => (
              <ListGroupItem header={a.achievement.name} key={index}>
                {a.username}
              </ListGroupItem>))}
          </ListGroup>
        </Col>
      </Row>);
  }
}

export default MakeBenefactor;
