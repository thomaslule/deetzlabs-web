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

export const post = (path) => {
  checkAuthenticated();
  return request.post(`/api/${path}`)
    .set(getAuthorization());
};

export const test = () => post('show_test_achievement').then(noop);

export const giveAchievement = (achievement, viewerName) =>
  post('give_achievement')
    .send({ achievement, viewerName })
    .then(noop);

export const replayAchievement = (achievement, viewerId) =>
  post('replay_achievement')
    .send({ achievement, viewerId })
    .then(noop);

export const postAlertVolume = volume =>
  post('achievement_alert_volume')
    .send({ volume })
    .then(noop);

export const changeFollowersGoal = (goal, html, css) =>
  post('change_followers_goal')
    .send({ goal, html, css })
    .then(noop);
