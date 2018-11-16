import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

const sortStrings = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());

const AchievementHeader = ({ achievement }) => (
  <div className="list-group-item-heading">
    <h4 style={{ display: 'inline' }}>{achievement.name}</h4>
    <em style={{ color: 'grey', marginLeft: '10px' }}>{achievement.description}</em>
  </div>
);

export default ({ data }) => {
  const { viewerAchievements, achievements } = data;
  const achievementsWithViewers = Object.entries(achievements)
    .map(([achievementId, achievement]) => ({
      achievement,
      viewers: viewerAchievements
        .filter(viewerAchievement => viewerAchievement.achievement === achievementId)
        .map(viewerAchievement => viewerAchievement.viewerName)
        .sort(sortStrings),
    }))
    .sort((a, b) => a.viewers.length - b.viewers.length);
  return (
    <Panel header="Tous les succès">
      <ListGroup fill>
        {achievementsWithViewers.map(a => (
          <ListGroupItem
            key={a.achievement.name}
            header={<AchievementHeader achievement={a.achievement} />}
          >
            {a.viewers.map(v => <span key={v}>{v}<br /></span>)}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Panel>
  );
};
