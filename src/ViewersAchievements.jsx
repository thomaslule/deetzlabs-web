import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

const sortStrings = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());
const unique = (v, i, a) => a.indexOf(v) === i;

export default ({ data }) => {
  if (!data) {
    return <div />;
  }
  const achievementsWithViewers = data.viewerAchievements
    .map(a => a.achievement.name)
    .filter(unique)
    .map(achievement => ({
      achievement,
      viewers: data.viewerAchievements
        .filter(a => a.achievement.name === achievement)
        .map(a => a.viewer.displayName)
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
