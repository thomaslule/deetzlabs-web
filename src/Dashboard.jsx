import React from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';
import LastAchievements from './LastAchievements';
import AllAchievements from './AllAchievements';
import TestButton from './TestButton';
import AlertVolume from './AlertVolume';
import MakeBenefactor from './MakeBenefactor';
import Logout from './Logout';

export default () => (
  <div>
    <PageHeader>deetzlabs <Logout className="pull-right" /></PageHeader>
    <Row>
      <Col md={6}>
        <LastAchievements />
        <TestButton />
        <AlertVolume />
        <MakeBenefactor />
      </Col>
      <Col md={6}>
        <AllAchievements />
      </Col>
    </Row>
  </div>);
