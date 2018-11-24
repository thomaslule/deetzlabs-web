import React from 'react';
import { Panel, Button } from 'react-bootstrap';
import * as api from './api';

const handleClick = () => {
  api.test();
};

const TestButton = () => (
  <Panel>
    <Panel.Body>
      <Button onClick={handleClick}>Test succès</Button>
    </Panel.Body>
  </Panel>
);

export default TestButton;
