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

export const get = (path) => {
  checkAuthenticated();
  return request.get(`/api/${path}`)
    .set(getAuthorization())
    .then(res => res.body);
};

export const test = () => {
  checkAuthenticated();
  return request.post('/api/show_test_achievement')
    .set(getAuthorization())
    .then(noop);
};

export const giveAchievement = (achievement, viewerName) => {
  checkAuthenticated();
  return request.post('/api/give_achievement')
    .set(getAuthorization())
    .send({ achievement, viewerName })
    .then(noop);
};

export const replayAchievement = (achievement, viewerId) => {
  checkAuthenticated();
  return request.post('/api/replay_achievement', {
    achievement,
    viewerId,
  }).set(getAuthorization())
    .then(noop);
};

export const postAlertVolume = (volume) => {
  checkAuthenticated();
  return request.post('/api/achievement_alert_volume', { volume })
    .set(getAuthorization())
    .then(noop);
};

export const changeFollowersGoal = (goal, html, css) => {
  checkAuthenticated();
  return request.post('/api/change_followers_goal')
    .set(getAuthorization())
    .send({ goal, html, css })
    .then(noop);
};
