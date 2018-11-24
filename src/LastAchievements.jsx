import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import AchievementItem from './AchievementItem';

export default ({ data }) => {
  const { lastAchievements, achievements } = data;

  return (
    <Panel>
      <Panel.Heading>Derniers succès</Panel.Heading>
      <ListGroup>
        {lastAchievements.map((a, index) => (
          <AchievementItem
            key={index}
            achievement={a.achievement}
            achievementName={achievements[a.achievement].name}
            viewerId={a.viewerId}
            viewerName={a.viewerName}
          />
        ))}
      </ListGroup>
    </Panel>
  );
};
