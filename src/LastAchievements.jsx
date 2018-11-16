import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import AchievementItem from './AchievementItem';

export default ({ data }) => {
  const { lastAchievements, achievements } = data;

  return (
    <Panel header="Derniers succès">
      <ListGroup fill>
        {lastAchievements.map((a, index) => (
          <AchievementItem
            key={index}
            achievement={a.achievement}
            achievementName={achievements[a.achievement]}
            viewerId={a.viewerId}
            viewerName={a.viewerName}
          />
        ))}
      </ListGroup>
    </Panel>
  );
};
