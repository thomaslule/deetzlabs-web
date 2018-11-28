import React from 'react';
import { BehaviorSubject } from 'rxjs';
import * as api from './api';

const ApiContext = React.createContext();

export class ApiContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: {},
    };
  }

  observable(path) {
    const { subjects } = this.state;
    if (!subjects[path]) {
      this.update(path);
    }
    return subjects[path];
  }

  update(path) {
    const { subjects } = this.state;
    if (!subjects[path]) {
      subjects[path] = new BehaviorSubject(undefined);
    }
    api.get(path).then((value) => {
      subjects[path].next(value);
    });
  }

  achievements() {
    return this.observable('achievements');
  }

  lastAchievements() {
    return this.observable('last_achievements');
  }

  viewerAchievements() {
    return this.observable('viewer_achievements');
  }

  viewerNames() {
    return this.observable('viewer_names');
  }

  alertVolume() {
    return this.observable('achievement_alert_volume');
  }

  followersGoal() {
    return this.observable('followers_goal');
  }

  login(username, password) {
    return api.login(username, password);
  }

  async giveAchievement(achievement, viewer) {
    await api.giveAchievement(achievement, viewer);
    this.update('last_achievements');
    this.update('viewer_names');
    this.update('viewer_achievements');
  }

  async replayAchievement(achievement, viewerId) {
    await api.replayAchievement(achievement, viewerId);
  }

  async testAlert() {
    await api.test();
  }

  async changeAlertVolume(volume) {
    await api.postAlertVolume(volume);
  }

  async changeFollowersGoal(goal, html, css) {
    await api.changeFollowersGoal(goal, html, css);
  }

  render() {
    const { children } = this.props;

    return (
      <ApiContext.Provider
        value={{
          login: (username, password) => this.login(username, password),
          achievements: () => this.achievements(),
          lastAchievements: () => this.lastAchievements(),
          viewerAchievements: () => this.viewerAchievements(),
          viewerNames: () => this.viewerNames(),
          alertVolume: () => this.alertVolume(),
          followersGoal: () => this.followersGoal(),
          giveAchievement: (achievement, viewer) => this.giveAchievement(achievement, viewer),
          replayAchievement: (achievement, viewerId) =>
            this.replayAchievement(achievement, viewerId),
          testAlert: () => this.testAlert(),
          changeAlertVolume: volume => this.changeAlertVolume(volume),
          changeFollowersGoal: (goal, html, css) => this.changeFollowersGoal(goal, html, css),
        }}
      >
        {children}
      </ApiContext.Provider>
    );
  }
}

export function withApi(Component) {
  return props => (
    <ApiContext.Consumer>
      {context => <Component {...props} api={context} />}
    </ApiContext.Consumer>
  );
}
