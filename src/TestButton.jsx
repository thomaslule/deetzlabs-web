import React from 'react';
import { Panel, Button } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';
import * as api from './api';

const handleClick = () => {
  api.test();
};

const TestButton = ({ t }) => (
  <Panel>
    <Panel.Body>
      <Button onClick={handleClick}>{t('test_alert.test_alert')}</Button>
    </Panel.Body>
  </Panel>
);

export default withNamespaces()(TestButton);
