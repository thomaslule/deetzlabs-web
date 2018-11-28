import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';
import AchievementItem from './AchievementItem';

const LastAchievements = ({ data, t }) => {
  const { lastAchievements, achievements } = data;

  return (
    <Panel>
      <Panel.Heading>{t('last_achievements.header')}</Panel.Heading>
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

export default withNamespaces()(LastAchievements);
