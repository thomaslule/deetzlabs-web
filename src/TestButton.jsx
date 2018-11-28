import React from 'react';
import { Panel, Button } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';
import { withApi } from './ApiContext';

const handleClick = (api) => {
  api.testAlert().catch(() => {});
};

const TestButton = ({ t, api }) => (
  <Panel>
    <Panel.Body>
      <Button onClick={() => handleClick(api)}>{t('test_alert.test_alert')}</Button>
    </Panel.Body>
  </Panel>
);

export default withNamespaces()(withApi(TestButton));
