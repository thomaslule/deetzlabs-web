import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import AchievementItem from './AchievementItem';

export default ({ data }) => (
  <Panel header="Derniers succès">
    <ListGroup fill>
      {data.lastViewerAchievements.map((a, index) => (
        <AchievementItem key={index} achievement={a.achievement} viewer={a.viewer} />
      ))}
    </ListGroup>
  </Panel>
);
