import React from 'react';
import { Panel } from 'react-bootstrap';
import TestButton from './TestButton';
import MakeBenefactor from './MakeBenefactor';
import Logout from './Logout';

export default () => (
  <div>
    <Panel>
      <TestButton />
    </Panel>
    <Panel>
      <MakeBenefactor />
    </Panel>
    <Panel>
      <Logout />
    </Panel>
  </div>);
