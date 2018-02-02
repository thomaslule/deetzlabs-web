import React from 'react';
import { Panel, Button } from 'react-bootstrap';
import * as api from './api';

const handleClick = () => {
  api.credits();
};

const CreditsButton = () => (
  <Panel>
    <Button onClick={handleClick}>Lancer les crédits</Button>
  </Panel>);

export default CreditsButton;
