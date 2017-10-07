import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import api from './api';

const handleClick = () => {
  api.test();
};

const TestButton = () => (
  <Row>
    <Col sm={12}>
      <Button onClick={handleClick}>Test succès</Button>
    </Col>
  </Row>);

export default TestButton;
