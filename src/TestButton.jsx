import React from 'react';
import { Button } from 'react-bootstrap';
import api from './api';

const handleClick = () => {
  api.test();
};

const TestButton = () => <Button onClick={handleClick}>Test succès</Button>;

export default TestButton;
