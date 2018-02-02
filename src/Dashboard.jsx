import React from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';
import LastAchievements from './LastAchievements';
import ViewersAchievements from './ViewersAchievements';
import TestButton from './TestButton';
import AlertVolume from './AlertVolume';
import GiveAchievement from './GiveAchievement';
import CreditsButton from './CreditsButton';
import FollowersGoal from './FollowersGoal';
import Logout from './Logout';

export default () => (
  <div>
    <PageHeader>deetzlabs <Logout className="pull-right" /></PageHeader>
    <Row>
      <Col md={6}>
        <LastAchievements />
        <TestButton />
        <AlertVolume />
        <GiveAchievement />
        <CreditsButton />
        <FollowersGoal />
      </Col>
      <Col md={6}>
        <ViewersAchievements />
      </Col>
    </Row>
  </div>);
