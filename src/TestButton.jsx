import React from 'react';
import { Panel, Button } from 'react-bootstrap';
import api from './api';

const handleClick = () => {
  api.test();
};

const TestButton = () => (
  <Panel>
    <Button onClick={handleClick}>Test succès</Button>
  </Panel>);

export default TestButton;
