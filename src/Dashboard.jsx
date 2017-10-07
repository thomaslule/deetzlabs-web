import React from 'react';
import { Panel } from 'react-bootstrap';
import LastAchievements from './LastAchievements';
import TestButton from './TestButton';
import AlertVolume from './AlertVolume';
import MakeBenefactor from './MakeBenefactor';
import Logout from './Logout';

export default () => (
  <div>
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
  </div>);
