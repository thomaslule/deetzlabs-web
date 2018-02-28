import React from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';
import LastAchievements from './LastAchievements';
import ViewersAchievements from './ViewersAchievements';
import TestButton from './TestButton';
import AlertVolume from './AlertVolume';
import AddDonation from './AddDonation';
import GiveAchievement from './GiveAchievement';
import FollowersGoal from './FollowersGoal';
import Logout from './Logout';
import * as api from './api';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    Promise.all([
      api.getAchievements(),
      api.getViewers(),
      api.getLastViewerAchievements(),
      api.getViewersAchievements(),
      api.getAlertVolume(),
      api.getFollowersGoal(),
    ]).then(([
      achievements,
      viewers,
      lastViewerAchievements,
      viewerAchievements,
      alertVolume,
      followersGoal,
    ]) => {
      this.setState({
        data: {
          achievements,
          viewers,
          lastViewerAchievements,
          viewerAchievements,
          alertVolume,
          followersGoal },
      });
    });
  }

  render() {
    return (
      <div>
        <PageHeader>deetzlabs <Logout className="pull-right" /></PageHeader>
        {
          this.state.data
            ? (
              <Row>
                <Col md={6}>
                  <LastAchievements data={this.state.data} />
                  <TestButton />
                  <AlertVolume data={this.state.data} />
                  <AddDonation data={this.state.data} />
                  <GiveAchievement data={this.state.data} />
                  <FollowersGoal data={this.state.data} />
                </Col>
                <Col md={6}>
                  <ViewersAchievements data={this.state.data} />
                </Col>
              </Row>
            )
            : <div />
        }
      </div>
    );
  }
}
