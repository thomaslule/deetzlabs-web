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

export const loadData = () => {
  checkAuthenticated();

  return Promise.all([
    request.get('/api/all_achievements').set(getAuthorization()),
    request.get('/api/viewers').set(getAuthorization()),
    request.get('/api/last_viewer_achievements').set(getAuthorization()),
    request.get('/api/all_viewer_achievements').set(getAuthorization()),
    request.get('/api/achievement_volume').set(getAuthorization()),
    request.get('/api/followers_goal').set(getAuthorization()),
  ]).then((res) => {
    const [
      allAchievementsData,
      viewersData,
      lastViewerAchievementsData,
      allViewerAchievementsData,
      alertVolumeData,
      followersGoalData,
    ] = res.map(obj => obj.body);

    const achievements = Object.keys(allAchievementsData)
      .map(a => ({ code: a, name: allAchievementsData[a].name }))
      .sort((a, b) => a.name > b.name);

    const viewers = Object.values(viewersData).sort();

    const lastViewerAchievements = lastViewerAchievementsData.map(va => ({
      viewer: { id: va.viewer, displayName: viewersData[va.viewer] || va.viewer },
      achievement: { id: va.achievement, name: allAchievementsData[va.achievement].name },
    }));

    const viewerAchievements = allViewerAchievementsData.map(va => ({
      viewer: { id: va.viewer, displayName: viewersData[va.viewer] || va.viewer },
      achievement: { id: va.achievement, name: allAchievementsData[va.achievement].name },
    }));

    const alertVolume = alertVolumeData.volume;

    const followersGoal = followersGoalData;

    return {
      achievements,
      viewers,
      lastViewerAchievements,
      viewerAchievements,
      alertVolume,
      followersGoal,
    };
  });
};

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

export const replayAchievement = (achievement, viewer) => {
  checkAuthenticated();
  return request.post('/api/replay_achievement', {
    achievement,
    viewer,
  }).set(getAuthorization())
    .then(noop);
};

export const postAlertVolume = (volume) => {
  checkAuthenticated();
  return request.post('/api/change_achievement_volume', { volume })
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
