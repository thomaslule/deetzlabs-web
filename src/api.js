import request from 'superagent';
import { getToken, isAuthenticated } from './auth';

const checkAuthenticated = () => {
  if (!isAuthenticated()) {
    window.location.replace('/admin/login');
  }
};
const getAuthorization = () => ({ Authorization: `Bearer ${getToken()}` });
const noop = res => res;

export const login = (username, password) =>
  request.post('/api/login')
    .send({ username, password })
    .then(res => res.body);

export const test = () => {
  checkAuthenticated();
  return request.post('/api/show_test_achievement')
    .set(getAuthorization())
    .then(noop);
};

export const giveAchievement = (displayName, achievement) => {
  checkAuthenticated();
  return request.post('/api/give_achievement')
    .set(getAuthorization())
    .send({
      achievement,
      viewer: displayName.toLowerCase(),
      displayName,
    })
    .then(noop);
};

export const addDonation = (viewer, amount) => {
  checkAuthenticated();
  return request.post('/api/donate')
    .set(getAuthorization())
    .send({
      viewer,
      amount,
    })
    .then(noop);
};

export const getAchievements = () => {
  checkAuthenticated();
  return request.get('/api/all_achievements')
    .set(getAuthorization())
    .then(res =>
      Object.keys(res.body)
        .map(a => ({ code: a, name: res.body[a].name }))
        .sort((a, b) => a.name > b.name));
};

export const getViewers = () => {
  checkAuthenticated();
  return request.get('/api/viewers')
    .set(getAuthorization())
    .then(res => Object.values(res.body).sort());
};

export const getLastViewerAchievements = () => {
  checkAuthenticated();
  return Promise.all([
    request.get('/api/last_viewer_achievements').set(getAuthorization()),
    request.get('/api/viewers').set(getAuthorization()),
    request.get('/api/all_achievements').set(getAuthorization()),
  ],
  ).then((res) => {
    const viewerAchievements = res[0].body;
    const viewers = res[1].body;
    const achievements = res[2].body;
    return viewerAchievements.map(va => ({
      viewer: { id: va.viewer, displayName: viewers[va.viewer] || va.viewer },
      achievement: { id: va.achievement, name: achievements[va.achievement].name },
    }));
  });
};

export const getViewersAchievements = () => {
  checkAuthenticated();
  return Promise.all([
    request.get('/api/all_viewer_achievements').set(getAuthorization()),
    request.get('/api/viewers').set(getAuthorization()),
    request.get('/api/all_achievements').set(getAuthorization()),
  ]).then((res) => {
    const viewerAchievements = res[0].body;
    const viewers = res[1].body;
    const achievements = res[2].body;
    return viewerAchievements.map(va => ({
      viewer: { id: va.viewer, displayName: viewers[va.viewer] || va.viewer },
      achievement: { id: va.achievement, name: achievements[va.achievement].name },
    }));
  });
};

export const replayAchievement = (achievement, viewer) => {
  checkAuthenticated();
  return request.post('/api/replay_achievement', {
    achievement,
    viewer,
  }).set(getAuthorization())
    .then(noop);
};

export const getAlertVolume = () => {
  checkAuthenticated();
  return request.get('/api/achievement_volume')
    .set(getAuthorization())
    .then(res => res.body.volume);
};

export const postAlertVolume = (volume) => {
  checkAuthenticated();
  return request.post('/api/change_achievement_volume', { volume })
    .set(getAuthorization())
    .then(noop);
};

export const getFollowersGoal = () => {
  checkAuthenticated();
  return request.get('/api/followers_goal')
    .set(getAuthorization())
    .then(res => res.body);
};

export const changeFollowersGoal = (goal, html, css) => {
  checkAuthenticated();
  return request.post('/api/change_followers_goal')
    .set(getAuthorization())
    .send({ goal, html, css })
    .then(noop);
};
