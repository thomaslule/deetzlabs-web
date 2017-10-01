import React from 'react';
import { Panel } from 'react-bootstrap';
import TestButton from './TestButton';
import MakeBenefactor from './MakeBenefactor';

export default () => (
  <div>
    <Panel>
      <TestButton />
    </Panel>
    <Panel>
      <MakeBenefactor />
    </Panel>
  </div>);
