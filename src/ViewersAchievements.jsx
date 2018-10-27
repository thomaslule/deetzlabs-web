import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

const sortStrings = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());

export default ({ data }) => {
  const { viewers, achievements } = data;
  const achievementsWithViewers = Object.entries(achievements)
    .map(([achievement, achievementName]) => ({
      achievement: achievementName,
      viewers: Object.keys(viewers)
        .filter(viewerId => viewers[viewerId].achievements.includes(achievement))
        .map(viewerId => viewers[viewerId].name)
        .sort(sortStrings),
    }))
    .sort((a, b) => a.viewers.length - b.viewers.length);
  return (
    <Panel header="Tous les succès">
      <ListGroup fill>
        {achievementsWithViewers.map(a => (
          <ListGroupItem key={a.achievement} header={a.achievement}>
            {a.viewers.map(v => <span key={v}>{v}<br /></span>)}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Panel>
  );
};
