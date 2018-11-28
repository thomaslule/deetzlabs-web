import React from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';
import LastAchievements from './LastAchievements';
import AchievementsList from './AchievementsList';
import TestButton from './TestButton';
import AlertVolume from './AlertVolume';
import GiveAchievement from './GiveAchievement';
import FollowersGoal from './FollowersGoal';
import LangSelector from './LangSelector';
import Logout from './Logout';

const Dashboard = ({ t }) => (
  <div>
    <PageHeader>{t('deetzlabs')} <Logout className="pull-right" /><LangSelector className="pull-right" /></PageHeader>
    <Row>
      <Col md={6}>
        <LastAchievements />
        <TestButton />
        <AlertVolume />
        <GiveAchievement />
        <FollowersGoal />
      </Col>
      <Col md={6}>
        <AchievementsList />
      </Col>
    </Row>
  </div>
);

export default withNamespaces()(Dashboard);
