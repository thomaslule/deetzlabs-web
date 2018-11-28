import React from 'react';
import { Alert } from 'react-bootstrap';
import { withApi } from './ApiContext';

function FixedAlert({ api }) {
  if (api.alert === undefined) return null;
  return (
    <Alert bsStyle={api.alertLevel} style={{ position: 'fixed', bottom: '5px', left: '20px', minWidth: '100px' }}>
      {api.alert}
    </Alert>
  );
}

export default withApi(FixedAlert);
