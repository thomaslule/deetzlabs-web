import request from "superagent";
import { getToken, logout } from "./auth";

const getAuthorization = () => ({ Authorization: `OAuth ${getToken()}` });
const noop = res => res;

function logoutIfUnauthorized(err) {
  if (err.status === 401 || err.status === 403) {
    console.error(`Authentication error: ${err.status} ${err.response.text}`);
    logout();
    window.location.replace("/admin/login");
  }
}

export const get = path => {
  return request
    .get(`/api/${path}`)
    .set(getAuthorization())
    .on("error", logoutIfUnauthorized)
    .then(res => res.body);
};

export const post = path => {
  return request
    .post(`/api/${path}`)
    .set(getAuthorization())
    .on("error", logoutIfUnauthorized);
};

export const getClientId = () =>
  request.get("/api/client_id").then(res => res.body);

export const test = () => post("show_test_achievement").then(noop);

export const giveAchievement = (achievement, viewerName) =>
  post("give_achievement")
    .send({ achievement, viewerName })
    .then(noop);

export const replayAchievement = (achievement, viewerId) =>
  post("replay_achievement")
    .send({ achievement, viewerId })
    .then(noop);

export const mute = () => post("mute").then(noop);

export const unmute = () => post("unmute").then(noop);

export const postAlertVolume = volume =>
  post("achievement_alert_volume")
    .send({ volume })
    .then(noop);

export const changeFollowersGoal = (goal, html, css) =>
  post("change_followers_goal")
    .send({ goal, html, css })
    .then(noop);
