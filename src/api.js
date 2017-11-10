import jsCookie from 'js-cookie';
import request from 'superagent';

const Authorization = { Authorization: `Bearer ${jsCookie.get('token')}` };
const noop = res => res;

export const login = (username, password) =>
  request.post('/api/login')
    .send({ username, password })
    .then(res => res.text);

export const test = () =>
  request.post('/api/show_test_achievement')
    .set(Authorization)
    .then(noop);

export const giveAchievement = (displayName, achievement) =>
  request.post('/api/give_achievement')
    .set(Authorization)
    .send({
      achievement,
      viewer: displayName.toLowerCase(),
      displayName,
    })
    .then(noop);

export const getAchievements = () =>
  request.get('/api/all_achievements')
    .set(Authorization)
    .then(res =>
      Object.keys(res.body)
        .map(a => ({ code: a, name: res.body[a].name }))
        .sort((a, b) => a.name > b.name));

export const getViewers = () => (
  request.get('/api/viewers')
    .set(Authorization)
    .then(res => Object.values(res.body).sort())
);

export const getLastViewerAchievements = () =>
  Promise.all([
    request.get('/api/last_viewer_achievements').set(Authorization),
    request.get('/api/viewers').set(Authorization),
    request.get('/api/all_achievements').set(Authorization),
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
    request.get('/api/all_viewer_achievements').set(Authorization),
    request.get('/api/viewers').set(Authorization),
    request.get('/api/all_achievements').set(Authorization),
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
  }).set(Authorization)
    .then(noop);

export const getAlertVolume = () =>
  request.get('/api/achievement_volume')
    .set(Authorization)
    .then(res => res.body.volume);

export const postAlertVolume = volume =>
  request.post('/api/change_achievement_volume', { volume })
    .set(Authorization)
    .then(noop);
