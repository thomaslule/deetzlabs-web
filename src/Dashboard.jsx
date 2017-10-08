import React from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import LastAchievements from './LastAchievements';
import AllAchievements from './AllAchievements';
import TestButton from './TestButton';
import AlertVolume from './AlertVolume';
import MakeBenefactor from './MakeBenefactor';
import Logout from './Logout';

export default () => (
  <div>
    <Row>
      <Col md={6}>
        <LastAchievements />
        <TestButton />
        <AlertVolume />
        <MakeBenefactor />
        <Panel>
          <Logout />
        </Panel>
      </Col>
      <Col md={6}>
        <AllAchievements />
      </Col>
    </Row>
  </div>);
