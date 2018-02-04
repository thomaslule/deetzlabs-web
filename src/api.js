import jsCookie from 'js-cookie';
import request from 'superagent';

const getAuthorization = () => ({ Authorization: `Bearer ${jsCookie.get('token')}` });
const noop = res => res;

export const login = (username, password) =>
  request.post('/api/login')
    .send({ username, password })
    .then(res => res.text);

export const test = () =>
  request.post('/api/show_test_achievement')
    .set(getAuthorization())
    .then(noop);

export const giveAchievement = (displayName, achievement) =>
  request.post('/api/give_achievement')
    .set(getAuthorization())
    .send({
      achievement,
      viewer: displayName.toLowerCase(),
      displayName,
    })
    .then(noop);

export const getAchievements = () =>
  request.get('/api/all_achievements')
    .set(getAuthorization())
    .then(res =>
      Object.keys(res.body)
        .map(a => ({ code: a, name: res.body[a].name }))
        .sort((a, b) => a.name > b.name));

export const getViewers = () => (
  request.get('/api/viewers')
    .set(getAuthorization())
    .then(res => Object.values(res.body).sort())
);

export const getLastViewerAchievements = () =>
  Promise.all([
    request.get('/api/last_viewer_achievements').set(getAuthorization()),
    request.get('/api/viewers').set(getAuthorization()),
    request.get('/api/all_achievements').set(getAuthorization()),
  ],
  ).then((res) => {
    const viewerAchievements = res[0].body;
    const viewers = res[1].body;
    const achievements = res[2].body;
    return viewerAchievements.map(va => ({
      viewer: { id: va.viewer, displayName: viewers[va.viewer] },
      achievement: { id: va.achievement, name: achievements[va.achievement].name },
    }));
  });

export const getViewersAchievements = () =>
  Promise.all([
    request.get('/api/all_viewer_achievements').set(getAuthorization()),
    request.get('/api/viewers').set(getAuthorization()),
    request.get('/api/all_achievements').set(getAuthorization()),
  ]).then((res) => {
    const viewerAchievements = res[0].body;
    const viewers = res[1].body;
    const achievements = res[2].body;
    return viewerAchievements.map(va => ({
      viewer: { id: va.viewer, displayName: viewers[va.viewer] },
      achievement: { id: va.achievement, name: achievements[va.achievement].name },
    }));
  });

export const replayAchievement = (achievement, viewer) =>
  request.post('/api/replay_achievement', {
    achievement,
    viewer,
  }).set(getAuthorization())
    .then(noop);

export const getAlertVolume = () =>
  request.get('/api/achievement_volume')
    .set(getAuthorization())
    .then(res => res.body.volume);

export const postAlertVolume = volume =>
  request.post('/api/change_achievement_volume', { volume })
    .set(getAuthorization())
    .then(noop);

export const getFollowersGoal = () =>
  request.get('/api/followers_goal')
    .set(getAuthorization())
    .then(res => res.body);

export const changeFollowersGoal = (goal, html, css) =>
  request.post('/api/change_followers_goal')
    .set(getAuthorization())
    .send({ goal, html, css })
    .then(noop);
