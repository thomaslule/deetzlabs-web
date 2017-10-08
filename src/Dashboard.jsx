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
        <Panel>
          <LastAchievements />
        </Panel>
        <Panel>
          <TestButton />
        </Panel>
        <Panel>
          <AlertVolume />
        </Panel>
        <Panel>
          <MakeBenefactor />
        </Panel>
        <Panel>
          <Logout />
        </Panel>
      </Col>
      <Col md={6}>
        <Panel>
          <AllAchievements />
        </Panel>
      </Col>
    </Row>
  </div>);
